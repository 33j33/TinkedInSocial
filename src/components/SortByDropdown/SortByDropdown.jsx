import "./SortByDropdown.scss";
import { Dropdown, Menu, message, Divider } from "antd";
import { DownOutlined } from "@ant-design/icons";

const SortByDropdown = ({setSortBy, sortBy}) => {
  const onClick = ({key}) => {
    message.info(`Set to ${key.charAt(0).toUpperCase() + key.slice(1)}`, .5);
    setSortBy(key)
  };
  const menu = (
    <Menu selectable selectedKeys={[sortBy]} onClick={onClick}>
      <Menu.Item key="trending">Trending</Menu.Item>
      <Menu.Item key="recency">Recency</Menu.Item>
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
