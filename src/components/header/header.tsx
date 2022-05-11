import "./header.scss";
import logo from "../../assets/logo.svg";

export const Header = () => {
  return (
    <div className="header">
      <img src={logo} width="100" />
      <nav>
        <a>Home</a>
        <a>Watchlist</a>
        <a>Discover</a>
      </nav>
    </div>
  );
};
