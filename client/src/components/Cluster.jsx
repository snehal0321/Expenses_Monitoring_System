import React, { useEffect, useState } from "react";
import "./Cluster.css";
import InputModule from "./InputModel.jsx";
import Expenses from "./Expenses.jsx";
import ExpensesFilter from "./ExpensesFilter.jsx";

function Cluster({ SelectedCluster }) {
  const [showInputBox, setShowInputBox] = useState(false);
  const [clusters, setClusters] = useState([]);
  const [selectedCluster, setSelectedCluster] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState("");

  // Fetch all clusters
  const fetchCluster = async () => {
    try {
      const response = await fetch(
        "https://expenses-monitoring-system-1.onrender.com/api/expenses/cluster/find"
      );
      const data = await response.json();
      const processedData = data.map((item) => ({
        ...item,
        date: new Date(item.date),
      }));
      setClusters(processedData);
      setIsLoading(false);

      console.log("Fetched clusters:", data);
    } catch (error) {
      console.error("Error fetching clusters:", error);
    }
  };

  useEffect(() => {
    fetchCluster();
  }, []);

  const items = clusters;

  function handleYearChange(year) {
    setSelectedYear(year);
  }

  const filteredItems = items.filter(
    (item) =>
      item.date.toLocaleString("default", { month: "long" }) === selectedYear
  );

  useEffect(() => {
    if (isLoading) return;
    if (filteredItems.length === 0) {
      // setShowDialog(true);
      console.log("No items found for", selectedYear);
      // setError(`No items found for ${selectedYear}.`);
    } else {
      // setShowDialog(false);
      //  setError('');
    }
  }, [filteredItems]);

  // When a cluster is clicked
  const handleClusterClick = (clusterType) => {
    setSelectedCluster(clusterType); // set selected cluster object
    SelectedCluster && SelectedCluster(clusterType); // optional parent callback
  };

  // Handle adding new cluster
  async function handleSave() {
    const title = document.getElementById("Title").value;
    const balance = document.getElementById("Balance").value;

    const ExpenseData = { title, balance };

    const response = await fetch(
      "https://expenses-monitoring-system-1.onrender.com/api/expenses/cluster/save",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ExpenseData),
      }
    );
    const data = await response.json();
    console.log("Saved:", data);
    setShowInputBox(false);
    fetchCluster();
  }

  if (isLoading) return <div>Loading clusters...</div>;

  return (
    <>
      <div>
        <ExpensesFilter
          selected={selectedYear}
          selectedYear={handleYearChange}
          expensesData={clusters}
        />
      </div>
      <div className="cluster">
        {showInputBox && (
          <InputModule
            open={showInputBox}
            onClose={() => setShowInputBox(false)}
            onSave={handleSave}
          >
            <h2>Credit Details</h2>
            <input id="Title" type="text" placeholder="Title" />
            <br />
            <input id="Balance" type="number" placeholder="Balance" />
            <br />
          </InputModule>
        )}

        <nav className="cluster-nav">
          <ul className="cluster-list">
            {clusters.map((clusterItem) => (
              <li
                key={clusterItem._id}
                className={`cluster-item ${
                  selectedCluster?._id === clusterItem._id ? "active" : ""
                }`}
                onClick={() => handleClusterClick(clusterItem)}
              >
                {clusterItem.title}
              </li>
            ))}
            <li className="cluster-item" onClick={() => setShowInputBox(true)}>
              <button>Add</button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Cluster;
