import React, { useEffect, useState } from "react";
import "./Charts.css";
import { Doughnut } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import { Chart, ArcElement, BarElement } from "chart.js";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
Chart.register(ArcElement);
Chart.register(BarElement);
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Charts = (props) => {
  const [profit, setProfit] = useState([]);
  const [expenseLineData, setExpenseLineData] = useState([]);
  const [revenueLineData, setRevenueLineData] = useState([]);

  useEffect(() => {
    const profit = props.lineDataRevenue.map(
      (item, index) => item - props.lineDataExpense[index]
    );
    setProfit(profit.reverse());

    let tempRevenue = props.lineDataRevenue.reverse();
    let tempExpense = props.lineDataExpense.reverse();

    setRevenueLineData(tempRevenue);
    let tempData = tempExpense.map((value) => -value);
    setExpenseLineData(tempData);
  }, [props]);

  // PROFIT LINE CHART
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
        text: "Past 12 Months",
      },
    },
    scales: {
      y: {
        display: false,
      },
      x: {
        display: false,
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const data = {
    labels,
    datasets: [
      {
        data: profit,
        borderColor: "#1ca890", // Teal for the profit line
        backgroundColor: "#1ca890", // Teal for the profit background
      },
    ],
  };

  // REVENUE DOUGHNUT SEMI CIRCLE
  const semiCircleData = {
    labels: ["Revenue", "Expense"],
    datasets: [
      {
        data: [props.totalRevenue, props.totalExpense],
        backgroundColor: ["#1ca890", "#fbd35b"], // Teal for revenue and Yellow for expense
        hoverBackgroundColor: ["#169f77", "#f0c14b"], // Slightly darker hover colors
        circumference: 180,
        rotation: 270,
      },
    ],
  };

  const semiCircleOptions = {
    cutout: "80%",
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Revenue Percentage",
      },
    },
  };

  // STACK CHART DATA
  const stackedData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Revenue",
        data: revenueLineData,
        backgroundColor: "#1ca890", // Teal for Revenue
        borderRadius: 20,
      },
      {
        label: "Expenses",
        data: expenseLineData,
        backgroundColor: "#fbd35b", // Yellow for Expenses
        borderRadius: 20,
      },
    ],
  };

  const stackedOptions = {
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      },

      y: {
        stacked: true,
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          pointStyle: "circle",
          usePointStyle: true,
        },
      },
    },
    barPercentage: 0.4, // Adjust the width of the bars
    categoryPercentage: 0.3, // Adjust the width of the bars
    borderSkipped: "round", // Use rounded corners
  };

  // REVENUE DOUGHNUT SEMI CIRCLE

  const dougnhutFullData = {
    labels: [
      "Fruits",
      "Vegetables",
      "Dairy",
      "Beverages",
      "Snacks",
      "Bakery",
      "Meat",
      "Seafood",
      "Frozen",
      "Oils",
      "Pantry",
    ],
    datasets: [
      {
        data: props.doughnutData, // Ensure this is an array with values for each category
        backgroundColor: [
          "#1ca890", // Teal for Fruits
          "#fbd35b", // Yellow for Vegetables
          "#f0c14b", // Lighter Yellow for Dairy
          "#f78344", // Orange for Beverages
          "#dc3545", // Red for Snacks
          "#6f42c1", // Purple for Bakery
          "#fd7e14", // Dark Orange for Meat
          "#20c997", // Light Green for Seafood
          "#17a2b8", // Cyan for Frozen
          "#ffc107", // Amber for Oils
          "#343a40", // Gray for Pantry
        ],
        hoverBackgroundColor: [
          "#169f77", // Slightly darker Teal for Fruits
          "#f0c14b", // Slightly darker Yellow for Vegetables
          "#d3b32d", // Darker Yellow for Dairy
          "#e96528", // Darker Orange for Beverages
          "#c82333", // Darker Red for Snacks
          "#5a32a6", // Darker Purple for Bakery
          "#e26c0a", // Darker Orange for Meat
          "#1fa283", // Darker Green for Seafood
          "#128fa4", // Darker Cyan for Frozen
          "#e0a800", // Darker Amber for Oils
          "#23272b", // Darker Gray for Pantry
        ],
      },
    ],
  };
  

  const dougnhutFullDOptions = {
    cutout: "60%",
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
        text: "Revenue Category Wise",
      },
    },
  };

  return (
    <>
      <div className="item3 subcontainer card1" id="add-product-section">
        <div>
          <p>${props.totalExpense}</p>
          <p>Expenses Yearly</p>
          <div className="semicircle_container">
            <p>
              <Doughnut
                className="canvas_img doughnut"
                options={semiCircleOptions}
                data={semiCircleData}
              />
            </p>
          </div>
        </div>
      </div>
      <div className="item4 subcontainer card1">
        <div>
          <p>Profit</p>
          <p>Last 12 Months</p>
          <p>
            <Line
              className="canvas_img admin-line-chart"
              options={options}
              data={data}
            />
          </p>
        </div>
      </div>
      <div className="item5 subcontainer">
        <Bar
          className="stackedChart"
          data={stackedData}
          options={stackedOptions}
        />
      </div>
      {/* <div className="item6 subcontainer">
        <div className="item6_text">
          <p>Total Revenue By Categories</p>
          <br />
          <p>For The Whole Year</p>
        </div>
        <div>
          <Doughnut
            className="canvas_img doughnut_full"
            options={dougnhutFullDOptions}
            data={dougnhutFullData}
          />
        </div>
      </div> */}
    </>
  );
};

export default Charts;