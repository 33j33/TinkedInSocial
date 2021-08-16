import { Form, Input, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../../selectors/user.selector';
import { fetchUser, userActions } from '../../redux/user/user.actions';
import { Redirect, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchCommonData } from '../../redux/global/commonData.actions';

import "./Signin.scss";

const Signin = () => {
  const user = useSelector(userSelector);
  const dispatch = useDispatch();
  const history = useHistory()
  const [empId, setEmpId] = useState("");

  useEffect(() => {
    if (user?.error?.status === "404" && user?.error?.error === 'UserNotFoundException') {
      dispatch({ type: userActions.FETCH_USER_SUCCESS, payload: { empId } })
      history.push('/signup');
    }
  }, [user, history, empId, dispatch]);

  useEffect(() => {
    dispatch(fetchCommonData())
  }, [dispatch]);

  const onFinish = (values) => {
    console.log('Success:', values);
    setEmpId(values.employee_id);
    dispatch(fetchUser({ id: values.employee_id }));
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  if (user.isLoggedIn) {
    return <Redirect to = "/home" />
  }
  return (
    <div className="signin-page">
      <div className="hero"></div>
      <div className="form-container">
        <div className="form-heading">
          Sign In
        </div>
        <Form
          name="signin"
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
              {
                validator(_, value) {
                  if (isNaN(value)) {
                    return Promise.reject(new Error('Employee ID should contain only numeric characters'))
                  }
                  else {
                    return Promise.resolve();
                  }
                }
              }
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Employee ID" />
          </Form.Item>
          <Form.Item
          >
            <Button type="primary" htmlType="submit" loading={user.loader}>
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
export default Signin;