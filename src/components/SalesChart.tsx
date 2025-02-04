import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import './SalesChart.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Sale {
  weekEnding: string;
  retailSales: number;
  wholesaleSales: number;
}

interface SalesChartProps {
  sales: Sale[];
}

const SalesChart: React.FC<SalesChartProps> = ({ sales }) => {
  const sortedSales = [...sales].sort((a, b) => 
    new Date(a.weekEnding).getTime() - new Date(b.weekEnding).getTime()
  );
  
  const allValues = sortedSales.flatMap(sale => [sale.retailSales, sale.wholesaleSales]);
  const minValue = Math.min(...allValues);
  const maxValue = Math.max(...allValues);
  const padding = (maxValue - minValue) * 0.6; 

  const data = {
    labels: sortedSales.map(sale => {
      const date = new Date(sale.weekEnding);
      return date.toLocaleDateString('en-US', { month: 'short' });
    }),
    datasets: [
      {
        label: 'Retail Sales',
        data: sortedSales.map(sale => sale.retailSales),
        borderColor: '#40A0FF',
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 0,
      },
      {
        label: 'Wholesale Sales',
        data: sortedSales.map(sale => sale.wholesaleSales),
        borderColor: '#AAB0B8',
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          title: (context: any) => {
            const index = context[0].dataIndex;
            const date = new Date(sortedSales[index].weekEnding);
            return `Week Ending: ${date.toLocaleDateString('en-US', { 
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}`;
          },
          label: (context: any) => {
            const value = context.raw;
            return `${context.dataset.label}: $${value.toLocaleString()}`;
          }
        }
      },
    },
    scales: {
      y: {
        min: minValue - padding,
        max: maxValue + padding,
        beginAtZero: false,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          display: false
        }
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: 12, 
        }
      },
    },
  };

  return (
    <div className="sales-chart">
      <h3>Retail Sales</h3>
      <div className="chart-container">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default SalesChart; 