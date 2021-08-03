import "./SortByDropdown.scss";
import { Dropdown, Menu, message, Divider } from "antd";
import { DownOutlined } from "@ant-design/icons";

const SortByDropdown = () => {
  const onClick = ({ key }) => {
    message.info(`Click on item ${key}`);
  };
  const menu = (
    <Menu onClick={onClick}>
      <Menu.Item key="1">Trending</Menu.Item>
      <Menu.Item key="2">Recent</Menu.Item>
    </Menu>
  );
  return (
    <div className="dropdown-container">
      <Divider orientation="right">
        <Dropdown overlay={menu}>
          <span>
            Sort By <DownOutlined />
          </span>
        </Dropdown>
      </Divider>
    </div>
  );
};
export default SortByDropdown;
