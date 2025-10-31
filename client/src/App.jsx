import Expenses from "./components/Expenses.jsx";
import "./App.css";
import reactLogo from "./assets/FullLogo.png";
import Cluster from "./components/Cluster.jsx";
import { Row, Col, Space } from "antd";
import { useState } from "react";

function App() {
  const [cluster, setCluster] = useState("");

  function handleSelectedCluster(clusterType) {
    setCluster(clusterType);
    console.log(`Selected cluster: ${clusterType}`);
  }

  return (
    <>
      <div>
        <img src={reactLogo} alt="React Logo" className="logo" width="100" />
        <Cluster SelectedCluster={handleSelectedCluster} />
        <Expenses ClusterType={cluster} />
      </div>
    </>
  );
}

export default App;
