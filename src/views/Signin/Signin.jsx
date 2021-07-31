
import { Form, Input, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import "./Signin.scss"
import React from "react";
const Signin = () => {

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="signin-page">
      <div className="hero"></div>
      <div className="form-container">
        <div className="form-heading">
          Sign In
        </div>
        <Form
          name="signin"
          // wrapperCol={{
          //   span: 16,
          // }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="employee_id"
            rules={[
              {
                required: true,
                message: 'Please input your Employee ID!',
              },
            ]}
          >
            <Input prefix={<UserOutlined/>} placeholder="Employee ID" />
          </Form.Item>
          <Form.Item
          >
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
      </div>
  );
}
export default Signin;