import { Form, Input, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../../selectors/user.selector';
import { fetchUser, userActions } from '../../redux/user/user.actions';
import { Redirect, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';

import "./Signin.scss";

const Signin = () => {
  const user = useSelector(userSelector);
  const dispatch = useDispatch();
  const history = useHistory()
  const [empId, setEmpId] = useState("");

  useEffect(() => {
    if (user?.error?.status === "404" && user?.error?.error === 'UserNotFoundException') {
      // dispatch({ type: userActions.FETCH_USER_SUCCESS, payload: { empId } })
      history.push({pathname: '/signup', state: {empId}});
    }
  }, [user, history, empId, dispatch]);

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
      <div className="hero">
        <div className="logo">
          Til Social
        </div>
      </div>
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
                message: '* Required',
              },
              {
                validator(_, value) {
                  if (isNaN(value)) {
                    return Promise.reject(new Error('Employee ID should contain only numeric characters'))
                  }
                  const length = value.toString().length;
                  if (length !== 8){
                    return Promise.reject(new Error('Enter an 8-digit Employee ID'))
                  }
                  if (value.slice(0,4) !== "1450") {
                    return Promise.reject(new Error('Enter an employee ID starting with 1450'))
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