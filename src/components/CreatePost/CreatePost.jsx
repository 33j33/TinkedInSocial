import { Form, Input, Button, Select, Row, Col, message, Upload } from "antd";
import { CameraFilled} from "@ant-design/icons";
import { useForm } from "antd/lib/form/Form";
import { useState } from "react";
import PostService from "../../services/post.service";

import { userSelector } from "../../selectors/user.selector";

import "./CreatePost.scss";
import { useSelector } from "react-redux";
import MediaServie from "../../services/media.service";

const CreatePost = () => {
  const Option = Select.Option;
  // state
  const [createPostForm] = useForm();
  const [response, setResponse] = useState(undefined);
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");

  // selectors
  const user = useSelector(userSelector);
  const tags = useSelector((state) => state.common.tags);

  // handlers
  const onFinish = (values) => {
    console.log("Success:", values);
    setLoading(true);
    PostService.addPost({ body: { empId: user.entity.empId, ...values, images: [values.imgUrl?.file?.response] } })
      .then(
        (res) => {
          setResponse(res.data);
          message.success("Post Created");
        },
        (err) => {
          setError(err);
        }
      )
      .finally(() => {
        setLoading(false);
        createPostForm.resetFields(["content", "imgUrl", "tags"])
        setImage("");
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onRemove = (file) => {
    setImage("");
    console.log("onRemove", file);
    return Promise.resolve();
  };

  return (
    <div className="create-post-card">
      <div className="header">
        <img
          className="author-img"
          src={user.entity?.imgUrl}
          alt="profile-pic"
        />
        <div className="author">
          <div className="author-name">{user.entity.name}</div>
          <div className="author-designation">{user.entity.designation}</div>
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
              <Select
                placeholder="Select Post Tags"
                mode="multiple"
                listHeight={200}
              >
                {tags?.map((tag, idx) => (
                  <Option value={tag} key={idx}>
                    {tag}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              name="imgUrl"
              className="img-upload"
              valuePropName="file"
            >
              <Upload
                multiple={false}
                accept="image/*"
                customRequest={MediaServie.uploadImage({
                  form: createPostForm,
                  setImage,
                  dest: "Feed",
                })}
                onRemove={onRemove}
                className="upload"
                listType="text"
              >
                {!image && (
                  <Button type="default" icon={<CameraFilled className="upload-icon"/>}>
                    <span>Upload</span>
                  </Button>
                )}
              </Upload>
            </Form.Item>
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
