import Expenses from "./components/Expenses.jsx";
import "./App.css";
import reactLogo from "./assets/FullLogo.png";
import Cluster from "./components/Cluster.jsx";
import { useState, useContext } from "react";
import { AuthContext } from "./AuthContext.jsx";
import Modal from "./components/Modal.jsx";
import ProfileMenu from "./components/ProfileMenu.jsx";

function App() {
  const [cluster, setCluster] = useState({});
  const [clusterSelected, setClusterSelected] = useState(false);
  const { user } = useContext(AuthContext);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);

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
      <Modal
        onClose={() => setShowWelcomeMessage(false)}
        open={showWelcomeMessage}
        mode={"error-root"}
        pop={true}
      >
        <p>Welcome {user}, you have successfully logged in!</p>
      </Modal>

      <div className="app-header">
        <img src={reactLogo} alt="React Logo" className="logo" width="100" />
        <ProfileMenu />
      </div>

      <div className="App">
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
