import "./Signup.scss";
import { ProfileDetailForm } from "../../components";
const Signup = () => {
  return (
    <div className="signup-page">
      <div className="hero"></div>
      <div className="form-container">
        <div className="form-heading">Employee Details</div>
        <ProfileDetailForm signup/>
      </div>
    </div>
  );
}
export default Signup;