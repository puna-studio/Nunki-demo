import "./App.scss";
import { Home } from "./pages/home/Home";
import {Header } from './components/header/header'
function App() {
  return (
    <div className="App">
      <Header></Header>
      <Home></Home>
    </div>
  );
}

export default App;
