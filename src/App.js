import {Route, Routes} from "react-router-dom";
import MainLayout from "./layouts/main";
import Home from "./views/home";
import Gallery from "./views/gallery";
import NFT from "./views/nft"


function App() {
  return (
      <MainLayout>
        <Routes>
          <Route path="/" exact component={Home} />
          <Route path="/gallery" exact component={Gallery} />
          <Route path="/gallery/:tokenId" exact component={NFT}/>
        </Routes>
      </MainLayout>
  );
}


export default App;
