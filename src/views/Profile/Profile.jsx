import { Divider } from "antd";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Navbar, PostCard, ProfileHeader } from "../../components";
import "./Profile.scss";

const Profile = () => {
  // const {isLoggedIn} = useSelector(state => state.user);
  // if (!isLoggedIn) {
  //   return <Redirect to="/signin"/>
  // }
  return (
    <div className="profile">
      <Navbar />
      <div className="profile-container">
        <ProfileHeader />
        <Divider orientation="right">User Activity</Divider>
        <div className="posts">
          <PostCard/>
          <PostCard/>
        </div>
      </div>
    </div>
  );
};
export default Profile;