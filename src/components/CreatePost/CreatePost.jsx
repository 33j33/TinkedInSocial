import { Form, Input, Button, Select, Row, Col } from "antd";
import { CameraTwoTone } from "@ant-design/icons";
import "./CreatePost.scss";
import { useForm } from "antd/lib/form/Form";

const CreatePost = () => {
  const Option = Select.Option;
  const [createPostForm] = useForm();
  const onFinish = (values) => {
    console.log("Success:", values);
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
          <Button type="primary" htmlType="submit">
            Post
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default CreatePost;
