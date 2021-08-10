import "./ProfileHeader.scss";
import { EditOutlined } from "@ant-design/icons";
import { Drawer } from "antd";
import { useState } from "react";
import ProfileDetailForm from "../ProfileDetailForm/ProfileDetailForm";

const ProfileHeader = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  return (
    <div className="header-wrapper">
      <SideDrawer
        drawerVisible={drawerVisible}
        setDrawerVisible={setDrawerVisible}
      />
      <img
        className="profile-img"
        src="https://i.pravatar.cc/100?img=12"
        alt="profile-pic"
      />
      <div className="header-content">
        <div>
          <div className="name">John Doe</div>
          <EditOutlined
            onClick={() => {
              setDrawerVisible(true);
            }}
          />
        </div>
        <div className="designation">Software Developer at Times Internet</div>
        <div>
          <div className="category">
            <span>Department: </span>Technology
          </div>
          <div className="category">
            <span>Team: </span>Dineout
          </div>
          <div className="category">
            <span>Employee ID: </span>1234534
          </div>
        </div>
        <div className="bio">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
          earum laborum tenetur vitae voluptatum animi molestias sapiente odio,
          beatae pariatur expedita inventore quia qui cupiditate placeat
          voluptate in architecto? Possimus!
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;

const SideDrawer = ({ drawerVisible, setDrawerVisible }) => {
  return (
    <Drawer
      placement="left"
      closable={true}
      onClose={() => {
        setDrawerVisible(false);
      }}
      visible={drawerVisible}
      width={window.innerWidth > 900 ? 500 : window.innerWidth - 100}
    >
        <div className="profile-edit-drawer-body-wrapper">
        <div className="form-heading">Edit Profile</div>
        <ProfileDetailForm />
        </div>
    </Drawer>
  );
};
