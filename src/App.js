import {Route, Routes} from "react-router-dom";
import Home from "../src/views/home/index";

function App() {
  return (
        <Routes>
          <Route path="/" exact component={Home} />
        </Routes>
  );
}

export default App;
