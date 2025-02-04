import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchData } from "./store/productSlice";
import { RootState } from "./store/store";
import stacklineLogo from "./assets/stackline_logo.svg";
import ProductDetails from "./components/ProductDetails";
import SalesTable from "./components/SalesTable";
import SalesChart from './components/SalesChart';
import "./App.css";
import { useAppDispatch } from './store/hooks';

// Main App component that handles the layout and data fetching
// Uses Redux for state management and displays loading/error states
const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const product = useSelector((state: RootState) => state.product.data);
  const status = useSelector((state: RootState) => state.product.status);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error loading product data</div>;
  }

  if (!product) {
    return <div>No product data available</div>;
  }

  return (
    <div className="container">
      <header>
        <img src={stacklineLogo} alt="Stackline Logo" className="logo" />
      </header>
      <main>
        <ProductDetails product={product} />
        <div className="content-right">
          <SalesChart sales={product.sales} />
          <SalesTable sales={product.sales} />
        </div>
      </main>
    </div>
  );
};

export default App;
