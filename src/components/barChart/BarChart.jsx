import React, { useEffect } from 'react';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

const BarChart = () => {
  useEffect(() => {
    // Register the required components
    Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

    // Chart configuration
    const config = {
      type: "bar",
      data: {
        labels: [
          "Mon",
          "Tue",
          "Wed",
          "Thur",
          "Fri",
          "Sat",
          
        ],
        datasets: [
          {
            label: new Date().getFullYear() - 1,
            fill: false,
            backgroundColor: "#F24A2533",
            borderColor: "#F24A2533",
            data: [27, 68, 86, 74, 10, 4, 87],
            barThickness: 8,
          },
          {
            label: new Date().getFullYear(),
            backgroundColor: "#F24A25",
            borderColor: "#F24A25",
            data: [30, 78, 56, 34, 100, 45, 13],
            fill: false,
            barThickness: 8,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: "Orders Chart",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        legend: {
          labels: {
            fontColor: "",
          },
          align: "end",
          position: "bottom",
        },
        scales: {
          x: {
            display: true,
            grid: {
              borderDash: [2],
              borderDashOffset: [2],
              // color: "#F24A25",
              zeroLineColor: "#EFEFEF",
              zeroLineBorderDash: [2],
              zeroLineBorderDashOffset: [2],
            },
          },
          y: {
            display: true,
            grid: {
              borderDash: [2],
              drawBorder: false,
              borderDashOffset: [2],
              color: "#EFEFEF",
              zeroLineColor: "#EFEFEF",

              zeroLineBorderDash: [2],
              zeroLineBorderDashOffset: [2],
            },
          },
        },
      },
    };

    const ctx = document.getElementById("bar-chart").getContext("2d");
    const myBar = new Chart(ctx, config);

    // Cleanup function to destroy the chart when component unmounts
    return () => {
      myBar.destroy();
    };
  }, []);

  return (
    <div className="relative flex flex-col min-w-0 break-words h-full bg-white w-full mb-6 shadow-lg rounded">
      <div className="rounded-t mb-0 px-4 h-full py-8 bg-transparent">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full max-w-full flex-grow flex-1">
            
          </div>
        </div>
      </div>
      <div className="p-4  flex-auto">
        {/* Chart */}
        <div className="relative h-full">
          <canvas id="bar-chart"></canvas>
        </div>
      </div>
    </div>
  );
};

export default BarChart;
