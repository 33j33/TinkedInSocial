import { NavLink } from "react-router-dom";
import { Button } from "antd";
import "./Navbar.scss"
import {FaBars, FaUser} from "react-icons/fa"
import {ImHome} from "react-icons/im";

const Navbar = () => {
  return (
    <nav>
      <div className="logo">
          <div>TinkedIn</div>
      </div>
      <FaBars className="bars-icon"/>
      <div className="nav-menu">
        <NavLink to="/home"><ImHome /> Home</NavLink>
        <NavLink to="/profile"><FaUser /> Profile</NavLink>
        <Button type="primary">
            Sign Out
        </Button>
      </div>
    </nav>
  );
};
export default Navbar;
