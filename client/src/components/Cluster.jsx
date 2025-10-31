import React, { useEffect } from "react";
import "./Cluster.css"; // You'll need to create this CSS file
import InputModule from "./InputModel.jsx";
import { useState } from "react";

function Cluster({ SelectedCluster }) {
  const [showInputBox, setShowInputBox] = useState(false);
  const [cluster, setCluster] = useState([]);

  const fetchCluster = async () => {
    try {
      const response = await fetch(
        "https://expenses-monitoring-system-1.onrender.com/api/expenses/cluster/"
      );
      const data = await response.json();
      setCluster(data);
      setIsLoading(false);

      console.log("Fetched expenses:", data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  useEffect(() => {
    fetchCluster();
  }, []);

  const handleClusterClick = (clusterType) => {
    // Handle cluster selection logic here
    SelectedCluster(clusterType);
  };

  function handleAdd() {
    setShowInputBox(true);
  }
  async function handleSave() {
    const title = document.getElementById("Title").value;
    const balance = document.getElementById("Balance").value;
    const ExpenseData = {
      title: title,
      balance: balance,
    };

    const response = await fetch(
      "https://expenses-monitoring-system-1.onrender.com/api/expenses/cluster/save",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ExpenseData),
      }
    );
    const data = await response.json();
    console.log("Saved:", data);
    setShowInputBox(false);
    fetchCluster();
  }

  return (
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
          {cluster.map((clusterItem) => (
            <li
              className="cluster-item"
              onClick={() => handleClusterClick(clusterItem.title)}
            >
              {clusterItem.title}
            </li>
          ))}
          <li className="cluster-item" onClick={handleAdd}>
            <button>Add</button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Cluster;
