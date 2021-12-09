import {Route, Routes} from "react-router-dom";
import Home from "../src/views/home/index";
import Gallery from "./views/gallery";

function App() {
  return (
        <Routes>
          <Route path="/" exact component={Home} />
          <Route path="/gallery" exact component={Gallery} />
        </Routes>
  );
}

export default App;
