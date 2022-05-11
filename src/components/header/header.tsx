import "./header.scss";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";

export const Header = () => {
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
