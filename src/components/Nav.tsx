import { NavLink } from "react-router-dom";
import "./styles.scss";

const Nav = () => {
  return (
    <nav>
      <NavLink to={"/"}>Volunteer</NavLink>
      <NavLink to={"/event"}>Event</NavLink>
      <NavLink to={"/summary"}>Summary</NavLink>
    </nav>
  );
};

export default Nav;
