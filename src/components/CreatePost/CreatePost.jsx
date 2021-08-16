import { Form, Input, Button, Select, Row, Col, message } from "antd";
import { CameraTwoTone } from "@ant-design/icons";
import { useForm } from "antd/lib/form/Form";
import { useState } from "react";
import PostService from "../../services/post.service";

import {user} from "../../selectors/user.selector";

import "./CreatePost.scss";

const CreatePost = () => {
  const Option = Select.Option;
  const [response, setResponse] = useState(undefined);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);


  const [createPostForm] = useForm();
  const onFinish = (values) => {
    console.log("Success:", values);
    setLoading(true);
    PostService.addPost({body: {empId: user.empId, ...values}})
    .then((res) => {
      setResponse(res.data);
      message.success('Post Created');
    }, (err) => {
      setError(err)
    })
    .finally(() => {
      setLoading(false);
    })
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="create-post-card">
      <div className="header">
        <img
          className="author-img"
          src="https://i.pravatar.cc/70?img=68"
          alt="profile-pic"
        />
        <div className="author">
          <div className="author-name">Liam Neeson</div>
          <div className="author-designation">Tech Lead - Frontend</div>
        </div>
      </div>
      <Form
        name="create-post"
        layout="vertical"
        form={createPostForm}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="content"
          rules={[
            {
              required: true,
              message: "Please enter post description",
            },
          ]}
        >
          <Input.TextArea placeholder="Share your thoughts..." />
        </Form.Item>
        <Row justify="space-between" align="middle">
          <Col xs={{ span: 16 }} md={{ span: 20 }}>
            <Form.Item
              name="tags"
              className="post-tags"
              rules={[
                {
                  required: true,
                  message: "Please select post tags",
                },
              ]}
            >
              <Select placeholder="Select Post Tags" mode="multiple">
                <Option value="AI">AI</Option>
                <Option value="React">React</Option>
                <Option value="Node">Node</Option>
                <Option value="Android">Android</Option>
                <Option value="Java">Java</Option>
                <Option value="NestJs">NestJs</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col>
            <CameraTwoTone
              twoToneColor="#5345cf"
              className="upload-media-icon"
            />
          </Col>
        </Row>
        <Form.Item className="post-form-btn">
          <Button type="primary" htmlType="submit" loading={loading}>
            Post
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default CreatePost;
