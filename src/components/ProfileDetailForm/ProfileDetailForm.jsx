import { Form, Input, Button, Select, Upload } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  userOnSaveSelector,
  userSelector,
} from "../../selectors/user.selector";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { saveUser } from "../../redux/user/user.actions";
import "./ProfileDetailForm.scss";
import { PlusOutlined } from "@ant-design/icons";
import MediaServie from "../../services/media.service";

const ProfileDetailForm = ({ type }) => {
  console.log("Profile Form", type);
  const Option = Select.Option;

  const dispatch = useDispatch();
  const history = useHistory();

  // selectors
  const user = useSelector(userSelector);
  const userOnSave = useSelector(userOnSaveSelector);
  const teams = useSelector((state) => state.common.teams);
  const tags = useSelector((state) => state.common.tags);

  // state
  const [form] = Form.useForm();

  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [image, setImage] = useState("");

  // handlers
  const handleFormValuesChange = (value) => {
    if (value.team) {
      setDepartments(teams.find((o) => o.team === value.team).departments);
      form.setFieldsValue({
        department: null,
        designation: null,
      });
    }
    if (value.department) {
      const team = form.getFieldValue("team");
      setDesignations(
        teams
          .find((o) => o.team === team)
          .departments.find((o) => o.name === value.department).designations
      );
      form.setFieldsValue({
        designation: null,
      });
    }
  };

  const onFinish = (values) => {
    console.log("Success:", values);
    dispatch(saveUser({ body: { empId: user.entity.empId, ...values, imgUrl: values.imgUrl.file.response } }));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onRemove = (file) => {
    setImage("");
    console.log("onRemove", file)
    return Promise.resolve()
  }

  useEffect(() => {
    if (type === "signup" && userOnSave?.entity.name) {
      history.push("/home");
    }
  }, [type, userOnSave, history]);

  useEffect(() => {
    if (type === "profile-edit") {
      setDepartments(
        teams.find((o) => o.team === user.entity.team).departments
      );
      setDesignations(
        teams
          .find((o) => o.team === user.entity.team)
          .departments.find((o) => o.name === user.entity.department)
          .designations
      );
    }
  }, [user]);

  return (
    <Form
      form={form}
      name="profile-form"
      initialValues={
        type === "signup"
          ? {}
          : {
            name: user.entity.name,
            team: user.entity.team,
            department: user.entity.department,
            designation: user.entity.designation,
            interests: user.entity.interests,
            bio: user.entity.bio,
          }
      }
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      onValuesChange={handleFormValuesChange}
    >
      <Form.Item
        name="imgUrl"
        className="img-upload"
        valuePropName="file"
        rules={[
          {
            required: true,
            message: "* Required",
          },
        ]}
      >
        <Upload multiple={false}
         accept="image/*"
          customRequest={MediaServie.uploadImage({form, setImage, dest: 'UserProfile'})}
          onRemove={onRemove}
          className="upload"
          listType="picture-card">
          
          {!image && <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>}
        </Upload>
      </Form.Item>
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
          {teams?.map((o, index) => (
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
          {departments?.map((o, idx) => (
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
        <Select placeholder="Designation" dropdownStyle={{ minWidth: "250px" }}>
          {designations?.map((designation, idx) => (
            <Option value={designation} key={idx}>
              {designation}
            </Option>
          ))}
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
        <Select placeholder="Interests" mode="multiple" listHeight={200}>
          {tags?.map((tag, idx) => (
            <Option value={tag} key={idx}>
              {tag}
            </Option>
          ))}
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
        <Button
          type="primary"
          block
          htmlType="submit"
          loading={userOnSave.loader}
        >
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProfileDetailForm;
