import { Form, Input, Button, Select } from "antd";
import "./ProfileDetailForm.scss";

const ProfileDetailForm = () => {
  const Option = Select.Option;
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
      <Form
        name="profile-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your Full Name",
            },
          ]}
        >
          <Input placeholder="Full Name" />
        </Form.Item>
        <Form.Item name="team">
          <Select placeholder="Team">
            <Option value="Dineout">Dineout</Option>
            <Option value="Gaana">Gaana</Option>
            <Option value="ET Money">ET Money</Option>
          </Select>
        </Form.Item>
        <Form.Item name="department">
          <Select placeholder="Department">
            <Option value="HR">HR</Option>
            <Option value="Tech">Tech</Option>
          </Select>
        </Form.Item>
        <Form.Item name="designation">
          <Select placeholder="Designation">
            <Option value="Tech Lead">Tech Lead</Option>
            <Option value="SDE 1">SDE 1</Option>
            <Option value="SDE 2">SDE 2</Option>
          </Select>
        </Form.Item>
        <Form.Item name="interests" className="interests-input">
          <Select placeholder="Interests" mode="multiple">
            <Option value="AI">AI</Option>
            <Option value="React">React</Option>
            <Option value="Node">Node</Option>
            <Option value="Android">Android</Option>
            <Option value="Java">Java</Option>
            <Option value="NestJs">NestJs</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="bio"
          className="bio-input"
          rules={[
            {
              required: true,
              message: "Please input your Bio",
            },
          ]}
        >
          <Input.TextArea placeholder="Give a short description about yourself" />
        </Form.Item>
        <Form.Item className="btn">
          <Button type="primary" block htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
  );
};

export default ProfileDetailForm;
