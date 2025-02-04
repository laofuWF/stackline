import React, { useState } from 'react';
import './SalesTable.css';

interface Sale {
  weekEnding: string;
  retailSales: number;
  wholesaleSales: number;
  unitsSold: number;
  retailerMargin: number;
}

interface SalesTableProps {
  sales: Sale[];
}

type SortKey = keyof Sale;
type SortDirection = 'asc' | 'desc';

const SalesTable: React.FC<SalesTableProps> = ({ sales }) => {
  const [sortConfig, setSortConfig] = useState<{
    key: SortKey;
    direction: SortDirection;
  }>({
    key: 'weekEnding',
    direction: 'desc'
  });

  const sortedSales = [...sales].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key: SortKey) => {
    let direction: SortDirection = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key: SortKey) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
    }
    return ' ▾';
  };

  return (
    <div className="sales-table-container">
      <table className="sales-table">
        <thead>
          <tr>
            <th 
              onClick={() => requestSort('weekEnding')} 
              className="sortable"
              data-arrow={getSortIndicator('weekEnding')}
            >
              WEEK ENDING
            </th>
            <th 
              onClick={() => requestSort('retailSales')} 
              className="sortable"
              data-arrow={getSortIndicator('retailSales')}
            >
              RETAIL SALES
            </th>
            <th onClick={() => requestSort('wholesaleSales')} className="sortable">
              WHOLESALE SALES{getSortIndicator('wholesaleSales')}
            </th>
            <th onClick={() => requestSort('unitsSold')} className="sortable">
              UNITS SOLD{getSortIndicator('unitsSold')}
            </th>
            <th onClick={() => requestSort('retailerMargin')} className="sortable">
              RETAILER MARGIN{getSortIndicator('retailerMargin')}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedSales.map((sale, index) => (
            <tr key={index}>
              <td>{new Date(sale.weekEnding).toLocaleDateString()}</td>
              <td>${sale.retailSales.toLocaleString()}</td>
              <td>${sale.wholesaleSales.toLocaleString()}</td>
              <td>{sale.unitsSold.toLocaleString()}</td>
              <td>${sale.retailerMargin.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesTable; 