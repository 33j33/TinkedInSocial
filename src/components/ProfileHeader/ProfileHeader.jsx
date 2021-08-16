import "./ProfileHeader.scss";
import { EditOutlined } from "@ant-design/icons";
import { Drawer } from "antd";
import { useState } from "react";
import ProfileDetailForm from "../ProfileDetailForm/ProfileDetailForm";
import { useSelector } from "react-redux";
import { userSelector } from "../../selectors/user.selector";

const ProfileHeader = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const user = useSelector(userSelector);
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
          <div className="name">{user.entity?.name}</div>
          <EditOutlined
            onClick={() => {
              setDrawerVisible(true);
            }}
          />
        </div>
        <div className="designation">{user.entity?.designation}</div>
        <div>
          <div className="category">
            <span>Department: </span>
            {user.entity?.department}
          </div>
          <div className="category">
            <span>Team: </span>
            {user.entity?.team}
          </div>
          <div className="category">
            <span>Employee ID: </span>
            {user.entity?.empId}
          </div>
        </div>
        <div className="bio">
          {user.entity?.bio}
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus
          ipsam autem voluptate nam enim tenetur placeat repudiandae minima
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
        <ProfileDetailForm type="profile-edit"/>
      </div>
    </Drawer>
  );
};
