import { Divider } from "antd";
import { Navbar, PostCard, ProfileHeader } from "../../components";
import "./Profile.scss";

const Profile = () => {
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