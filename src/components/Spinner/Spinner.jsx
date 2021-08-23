import { Spin } from "antd";

const Spinner = () => {
  return (
    <div style={{ margin: "1rem", display: "flex", justifyContent: "center" }}>
      <Spin size="large" />
    </div>
  );
};
export default Spinner;
