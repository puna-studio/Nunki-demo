import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import "./navbar.scss";

export const Navbar = () => {
  return (
    <div className="header">
      <Link to={"/"}>
        <img src={logo} width="100" />
      </Link>

      <nav>
        <Link to={"/"}>Home</Link>
        <Link to={"/selections"}>Selections</Link>
      </nav>
    </div>
  );
};
