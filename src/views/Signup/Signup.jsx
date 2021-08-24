import "./Signup.scss";
import { ProfileDetailForm } from "../../components";
import { useLocation } from "react-router-dom";
import logo from "../../assets/logo.jpg"

const Signup = () => {
  const {state: {empId}} = useLocation();
  console.log(empId)
  return (
    <div className="signup-page">
      <div className="hero">
      <img src={logo} alt="logo" className="logo" />
        <div className="brand">
          TIL SOCIAL
        </div>
      </div>
      <div className="form-container">
        <div className="form-heading">Employee Details</div>
        <ProfileDetailForm type="signup" empId={empId}/>
      </div>
    </div>
  );
}
export default Signup;