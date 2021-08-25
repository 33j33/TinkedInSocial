import "./Signup.scss";
import { ProfileDetailForm } from "../../components";
import { Redirect, useLocation } from "react-router-dom";
import logo from "../../assets/logo.jpg";

const Signup = () => {
  const { state } = useLocation();
  console.log(state?.empId);
  if (!state?.empId) {
    return <Redirect to="/signin" />;
  } else
    return (
      <div className="signup-page">
        <div className="hero">
          <img src={logo} alt="logo" className="logo" />
          <div className="brand">TIL SOCIAL</div>
        </div>
        <div className="form-container">
          <div className="form-heading">Employee Details</div>
          <ProfileDetailForm type="signup" empId={state.empId} />
        </div>
      </div>
    );
};
export default Signup;
