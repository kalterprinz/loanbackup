import React, { useState, useEffect } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import axios from "axios";
import './Graphs.css';

const Graphs = () => {
  const [repaymentStatusData, setRepaymentStatusData] = useState({ paid: 0, overdue: 0, upcoming: 0 });
  const [loanTypeData, setLoanTypeData] = useState({ personal: 0, educational: 0, pensioner: 0 });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: paydata } = await axios.get('http://localhost:3001/loans/payment/graph');
        const { data: typedata } = await axios.get('http://localhost:3001/loans/type/graph');

        setRepaymentStatusData({
          paid: paydata.paid || 0,
          overdue: paydata.overdue || 0,
          upcoming: paydata.upcoming || 0,
        });

        setLoanTypeData({
          personal: typedata.personal || 0,
          educational: typedata.educational || 0,
          pensioner: typedata.pensioner || 0,
        });

        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  console.log('Stats:', loanTypeData);
  const repaymentStatusChartData = {
    labels: ["Paid", "Overdue", "Upcoming"],
    datasets: [
      {
        label: "Loan Repayment Status",
        data: [repaymentStatusData.paid, repaymentStatusData.overdue, repaymentStatusData.upcoming],
        backgroundColor: ["#4caf50", "#f44336", "#ff9800"],
        borderColor: ["#4caf50", "#f44336", "#ff9800"],
        borderWidth: 1,
      },
    ],
  };

  const loanTypeDonutData = {
    labels: ["Personal", "Educational", "Pensioner"],
    datasets: [
      {
        label: "Loan Portfolio Breakdown",
        data: [loanTypeData.personal, loanTypeData.educational, loanTypeData.pensioner],
        backgroundColor: ["#4caf50", "#f44336", "#ff9800"],
        borderColor: ["#4caf50", "#f44336", "#ff9800"],
      },
    ],
  };

  return (
    <div className="graphs">
      {loading ? (
        <div className="loader">Loading...</div>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="small-graphs">
          <div className="small-graph">
            <h3>Loan Repayment Status</h3>
            <Bar
              data={repaymentStatusChartData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    display: true,
                    position: "top",
                  },
                },
              }}
            />
          </div>
          <div className="small-graph">
            <h3>Loan Portfolio Breakdown</h3>
            <Doughnut
              data={loanTypeDonutData}
              options={{
                plugins: {
                  tooltip: {
                    enabled: true,
                  },
                },
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Graphs;
