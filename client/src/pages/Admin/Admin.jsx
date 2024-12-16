import React, { useState, useEffect } from "react";
import "./Admin.css";
import logo from "../../imgs/logo.png";
import { FaChartBar } from "react-icons/fa";
import { FaTruck } from "react-icons/fa";
import { GiClothes } from "react-icons/gi";
import { IoPeopleSharp } from "react-icons/io5";
import { FiPlusCircle } from "react-icons/fi";
import ProductForm from "./ProductForm/ProductForm";
import Statistics from "./Statistics/Statistics";
import Charts from "./Charts/Charts";
import PopularProducts from "./PopularProducts/PopularProducts";
import ProuctsTable from "./Tables/ProductsTable";
import OrdersTable from "./Tables/OrdersTable";
import CustomersTable from "./Tables/CustomersTable";
import axios from "axios";

// Tabs Data
const tabs = [
  {
    logo: <FaChartBar className="tab_logo" />,
    name: "Statistics",
    href: "#stat-section",
  },
  {
    logo: <GiClothes className="tab_logo" />,
    name: "Products",
    href: "#product-table-section",
  },
  {
    logo: <FaTruck className="tab_logo" />,
    name: "Orders",
    href: "#order-table-section",
  },
  {
    logo: <IoPeopleSharp className="tab_logo" />,
    name: "Customers",
    href: "#customer-table-section",
  },
  {
    logo: <FiPlusCircle className="tab_logo" />,
    name: "Add New Product",
    href: "#new-section",
  },
];

const Tab = ({ logo, name, href }) => (
  <div className="tab ds">
    <a href={href} className="tab-link">
      {logo}
      {name}
    </a>
  </div>
);

const Admin = () => {
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [yearlyExpense, setYearlyExpense] = useState([]);
  const [yearlyRevenue, setYearlyRevenue] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [yearlyCategoryRevenue, setYearlyCategoryRevenue] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentDate = new Date();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();
        if (month === 1) {
          month = 12;
          year--;
        }

        // Fetch total sales
        const salesResponse = await axios.get(
          "http://localhost:4001/api/admin/totalSales12Months"
        );
        setTotalSales(salesResponse.data);

        // Fetch customers
        const customersResponse = await axios.get(
          "http://localhost:4001/api/admin/getAllCustomers"
        );
        setCustomers(customersResponse.data);

        // Fetch orders
        const ordersResponse = await axios.get(
          "http://localhost:4001/api/admin/getAllOrders"
        );
        setOrders(ordersResponse.data);

        // Fetch products
        const productsResponse = await axios.get(
          "http://localhost:4001/api/products/"
        );
        setProducts(productsResponse.data);

        // Fetch trending products
        const trendingResponse = await axios.get(
          "http://localhost:4001/api/admin/trendingProducts"
        );
        setTrendingProducts(trendingResponse.data);

        // Fetch yearly expense
        const expenseResponse = await axios.get(
          `http://localhost:4001/api/admin/getYearlyExpense/${month}/${year}`
        );
        setYearlyExpense(expenseResponse.data);

        // Fetch yearly revenue
        const revenueResponse = await axios.get(
          `http://localhost:4001/api/admin/getYearlyRevenue/${month}/${year}`
        );
        setYearlyRevenue(revenueResponse.data);

        // Fetch total revenue by category
        const categoryRevenueResponse = await axios.get(
          `http://localhost:4001/api/admin/getTotalRevenueByCategory/${month}/${year}`
        );
        setYearlyCategoryRevenue(
          categoryRevenueResponse.data.map((item) => item.value)
        );
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  // Calculate total expense
  useEffect(() => {
    setTotalExpense(
      yearlyExpense.reduce((total, expense) => total + expense, 0)
    );
  }, [yearlyExpense]);

  // Calculate total revenue
  useEffect(() => {
    setTotalRevenue(
      yearlyRevenue.reduce((total, revenue) => total + revenue, 0)
    );
  }, [yearlyRevenue]);

  return (
    <div className="bgcol">
      <aside>
        <div id="logo">
          <img src={logo} alt="logo" id="logo_img" />
          GrocerLynk
        </div>

        <div id="tabs" className="ds">
          {tabs.map((tab) => (
            <Tab key={tab.name} logo={tab.logo} name={tab.name} href={tab.href} />
          ))}
        </div>
      </aside>
      <div className="admin-container">
        <Statistics
          totalSales={totalSales}
          totalCustomers={customers.length}
          totalProducts={products.length}
          totalProfit={totalRevenue - totalExpense}
        />
        <Charts
          doughnutData={yearlyCategoryRevenue}
          lineDataExpense={yearlyExpense}
          lineDataRevenue={yearlyRevenue}
          totalRevenue={totalRevenue}
          totalExpense={totalExpense}
        />
        <PopularProducts popularProducts={trendingProducts} />
        <ProuctsTable products={products} />
        <OrdersTable orderss={orders} />
        <CustomersTable customers={customers} />
        <ProductForm />
        <div className="empty-space"></div>
      </div>
    </div>
  );
};

export default Admin;