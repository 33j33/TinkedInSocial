import { EditOutlined } from "@ant-design/icons";
import { Drawer } from "antd";
import { useState } from "react";
import ProfileDetailForm from "../ProfileDetailForm/ProfileDetailForm";
import isUrl from "../../common/helpers/isUrl";
import fallbackImage from "../../assets/placeholder.png";
import "./ProfileHeader.scss";

const ProfileHeader = ({ user, isSecondUser }) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  return (
    <div className="header-wrapper">
      <SideDrawer
        drawerVisible={drawerVisible}
        setDrawerVisible={setDrawerVisible}
      />
      <img
        className="profile-img"
        src={isUrl(user.entity?.imgUrl) ? user.entity?.imgUrl : fallbackImage}
        alt="profile-pic"
        style={{ background: "gray" }}
      />
      <div className="header-content">
        <div>
          <div className="name">{user.entity?.name}</div>
          {!isSecondUser && (
            <EditOutlined
              onClick={() => {
                setDrawerVisible(true);
              }}
            />
          )}
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
        <ProfileDetailForm type="profile-edit" />
      </div>
    </Drawer>
  );
};
