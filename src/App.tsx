import "./App.scss";
import { Home } from "./pages/home/Home";
import { Selections } from "./pages/selections/Selections";
import { MovieProvider } from "./context/movieProvider";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <MovieProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route index element={<Home />} />
              <Route path="selections" element={<Selections />} />
            </Route>
          </Routes>
        </BrowserRouter>
        {/* <Home /> */}
      </MovieProvider>
    </div>
  );
}

export default App;
