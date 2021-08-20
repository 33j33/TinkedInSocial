import { NavLink, useHistory } from "react-router-dom";
import { Button } from "antd";
import "./Navbar.scss"
import {FaBars, FaUser} from "react-icons/fa"
import {ImHome} from "react-icons/im";
import { useDispatch } from "react-redux";
import { userActions } from "../../redux/user/user.actions";

const Navbar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleSignOut = () => {
    dispatch({type: userActions.SIGNOUT});
    history.push("/signin");
  }
  return (
    <div className="nav">
      <div className="logo">
          <div>Til Social</div>
      </div>
      <FaBars className="bars-icon"/>
      <div className="nav-menu">
        <NavLink to="/home"><ImHome /> Home</NavLink>
        <NavLink to="/profile"><FaUser /> Profile</NavLink>
        <Button type="primary" onClick={handleSignOut}>
            Sign Out
        </Button>
      </div>
    </div>
  );
};
export default Navbar;
