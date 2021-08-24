import "./Signup.scss";
import { ProfileDetailForm } from "../../components";
import { useLocation } from "react-router-dom";
const Signup = () => {
  const {state: {empId}} = useLocation();
  console.log(empId)
  return (
    <div className="signup-page">
      <div className="hero">
        <div className="logo">Til Social</div>
      </div>
      <div className="form-container">
        <div className="form-heading">Employee Details</div>
        <ProfileDetailForm type="signup" empId={empId}/>
      </div>
    </div>
  );
}
export default Signup;