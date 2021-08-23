import "./Signup.scss";
import { ProfileDetailForm } from "../../components";
const Signup = () => {
  return (
    <div className="signup-page">
      <div className="hero">
        <div className="logo">Til Social</div>
      </div>
      <div className="form-container">
        <div className="form-heading">Employee Details</div>
        <ProfileDetailForm type="signup"/>
      </div>
    </div>
  );
}
export default Signup;