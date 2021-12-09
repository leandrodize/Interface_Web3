import { useEffect } from "react";
import {Route, Routes} from "react-router-dom";
import Web3 from "web3";
import MainLayout from "./layouts/main";

function App() {
  useEffect(() => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert("Non-Ethereum browser detected. You should consider trying MetaMask!");
    }
  }, []);
  
  return (
        <Routes>
          <Route path="/home" exact component={MainLayout} />
        </Routes>

  );
}

export default App;
