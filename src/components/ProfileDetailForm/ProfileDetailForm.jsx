import { Form, Input, Button, Select } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userOnSaveSelector, userSelector } from "../../selectors/user.selector";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { saveUser } from "../../redux/user/user.actions";
import "./ProfileDetailForm.scss";

const ProfileDetailForm = () => {
  const Option = Select.Option;

  const dispatch = useDispatch();
  const history = useHistory();

  // selectors
  const user = useSelector(userSelector);
  const userOnSave = useSelector(userOnSaveSelector);
  const teams = useSelector(state => state.common.teams);
  const tags = useSelector(state => state.common.tags);

  // state
  const [form] = Form.useForm();

  const [departments, setDepartments] = useState([]
    // teams[0].departments
  );
  const [designations, setDesignations] = useState([]
    // teams[0].departments[0].designations
  );


  // handlers
  const handleFormValuesChange = (value) => {
    if (value.team) {
      setDepartments(teams.find(o => o.team === value.team).departments);
    }
    if (value.department) {
      const team = form.getFieldValue("team")
      console.log(value)
      setDesignations(teams
        .find(o => o.team === team).departments
        .find(o => o.name === value.department).designations)
    }
  };


  const onFinish = (values) => {
    console.log("Success:", values);
    dispatch(saveUser({ body: { empId: user.entity.empId, ...values } }))
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    if (userOnSave.entity?.name) {
      history.push('/home');
    }
  }, [userOnSave, history])

  return (
    <Form
      form={form}
      name="profile-form"
      initialValues={{
        // team: teams[0].team,
        // department: teams[0].departments[0].name,
        // designation: teams[0].departments[0].designations[0]
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      onValuesChange={handleFormValuesChange}
    >
      <Form.Item
        name="name"
        rules={[
          {
            type: "string",
            required: true,
            message: "* Required",
          },
          {
            pattern: "^[A-Za-z\\s]{1,}[\\.]{0,1}[A-Za-z\\s]{0,}",
            message: "Not a valid name",
          },
        ]}
      >
        <Input placeholder="Full Name" />
      </Form.Item>
      <Form.Item
        name="team"
        rules={[
          {
            required: true,
            message: "* Required",
          },
        ]}
      >
        <Select placeholder="Team">
          {teams.map((o, index) => (
            <Option value={o.team} key={index}>
              {o.team}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="department"
        rules={[
          {
            required: true,
            message: "* Required",
          },
        ]}
      >
        <Select placeholder="Department">
          {departments.map((o, idx) => (
            <Option value={o.name} key={idx}>
              {o.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="designation"
        rules={[
          {
            required: true,
            message: "* Required",
          },
        ]}
      >
        <Select placeholder="Designation" dropdownStyle={{ minWidth: '250px' }}>
          {
            designations.map((designation, idx) => (
              <Option value={designation} key={idx}>{designation}</Option>
            ))
          }
        </Select>
      </Form.Item>
      <Form.Item
        name="interests"
        className="interests-input"
        rules={[
          {
            required: true,
            message: "* Required",
          },
          {
            validator(_, value) {
              if (value.length < 3) {
                return Promise.reject(new Error("Select atleast 3 interests"));
              } else {
                return Promise.resolve();
              }
            },
          },
        ]}
      >
        <Select placeholder="Interests" mode="multiple">
          {
            tags.map((tag, idx) => (
              <Option value={tag} key={idx}>{tag}</Option>
            ))
          }
        </Select>
      </Form.Item>
      <Form.Item
        name="bio"
        className="bio-input"
        rules={[
          {
            required: true,
            message: "* Required",
          },
        ]}
      >
        <Input.TextArea placeholder="Give a short description about yourself" />
      </Form.Item>
      <Form.Item className="btn">
        <Button type="primary" block htmlType="submit" loading={userOnSave.loader}>
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProfileDetailForm;
