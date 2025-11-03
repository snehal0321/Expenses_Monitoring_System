import Expenses from "./components/Expenses.jsx";
import "./App.css";
import reactLogo from "./assets/FullLogo.png";
import Cluster from "./components/Cluster.jsx";
import { Row, Col, Space } from "antd";
import { useState } from "react";

function App() {
  const [cluster, setCluster] = useState({});
  const [clusterSelected, setClusteSelected] = useState(false);

  function handleSelectedCluster(clusterType) {
    setCluster(clusterType);
    setClusteSelected(true);
  }
  console.log("Selected Cluster", cluster.title);

  return (
    <>
      <div>
        <img src={reactLogo} alt="React Logo" className="logo" width="100" />
        <Cluster SelectedCluster={handleSelectedCluster} />
        {clusterSelected ? (
          <Expenses ClusterType={cluster} />
        ) : (
          <h3>Select Mode</h3>
        )}
      </div>
    </>
  );
}

export default App;
