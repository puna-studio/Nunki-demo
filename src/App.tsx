import "./App.scss";
import { Home } from "./pages/home/Home";
import { Header } from "./components/header/header";
import { MovieProvider } from "./context/movieProvider";

function App() {
  return (
    <div className="App">
      <MovieProvider>
        <Header />
        <Home />
      </MovieProvider>
    </div>
  );
}

export default App;
