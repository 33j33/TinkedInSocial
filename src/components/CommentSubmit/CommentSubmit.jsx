import { Form, Input, Button, Row, Col } from "antd";
import { useSelector } from "react-redux";
import { userSelector } from "../../selectors/user.selector";
import "./CommentSubmit.scss";

const CommentSubmit = ({postComment, postId}) => {
  const user = useSelector(userSelector);
  const onFinish = (values) => {
    console.log("Success:", values);
    postComment({body: {postId, empId: user.entity.empId, comment: values.comment}})
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="comment-submit-wrapper">
      <Form
        name="comment-submit-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Row justify="space-between">
            <Col xs={{span: 17}} md={{span: 20}}>
          <Form.Item
            name="comment"
            rules={[
              {
                required: true,
                message: "* Required",
              },
            ]}
          >
            <Input.TextArea  autoSize={{minRows: 1, maxRows: 6}} placeholder="Write your comment here" />
          </Form.Item>
          </Col>
          <Col>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Comment
            </Button>
          </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
export default CommentSubmit;
