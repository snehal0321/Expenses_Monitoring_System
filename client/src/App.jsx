import Expenses from "./components/Expenses.jsx";
import "./App.css";
import reactLogo from "./assets/FullLogo.png";
import Cluster from "./components/Cluster.jsx";
import { Row, Col, Space } from "antd";
import { useState } from "react";

function App() {
  const [cluster, setCluster] = useState({});
  const [clusterSelected, setClusterSelected] = useState(false);

  function handleSelectedCluster(clusterType) {
    setCluster(clusterType);
    setClusterSelected(true);
  }

  //if (processedData.length > 0) {
  //   setSelectedYear(
  //     processedData[0].date.toLocaleString("default", { month: "long" })
  //   );
  // }

  console.log("Selected Cluster", cluster);

  return (
    <>
      <div>
        <img src={reactLogo} alt="React Logo" className="logo" width="100" />
        <Cluster SelectedCluster={handleSelectedCluster} />
        {clusterSelected && cluster ? (
          <Expenses key={cluster._id} ClusterType={cluster} />
        ) : (
          <h3>Select Mode</h3>
        )}
      </div>
    </>
  );
}

export default App;
