import { Button, Form, Input } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import Label from "../../Components/Forms/Label/Label";
import CustomNotification from "../Notification/CustomNotification";
import USER_SERVICE from "../../services/user.service";

const EditUserForm = ({ layout = "vertical", size = "large", userInfo }) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const initialValues = { ...userInfo };

  const handleFinish = (values) => {
    USER_SERVICE.updateUser(userInfo.id, values)
      .then((res) => {
        CustomNotification("success", "Update user ok", "Please wait a minute");
        setTimeout(() => {
          navigate("/admin/user-management");
        }, 2500);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleFinishFailed = () => {};
  const labelItem = (labelText) => (
    <Label className="text-sm font-medium text-[#67748e] capitalize">
      {labelText}
    </Label>
  );

  return (
    <Form
      form={form}
      name="edit-user"
      layout={layout}
      size={size}
      initialValues={initialValues}
      onFinish={handleFinish}
      onFinishFailed={handleFinishFailed}
      className="edit-user-form px-4"
    >
      <Form.Item
        label={labelItem("User name")}
        name="username"
        rules={[
          { required: true, message: "Please input your name here" },
          {
            pattern:
              /^[A-Za-zỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđỲỌÁẦẢẤỜỄÀẠẰỆẾÝỘẬỐŨỨĨÕÚỮỊỖÌỀỂẨỚẶÒÙỒỢÃỤỦÍỸẮẪỰỈỎỪỶỞÓÉỬỴẲẸÈẼỔẴẺỠƠÔƯĂÊÂĐ' ]+$/,
            message: "Letters only",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item label={labelItem("Password")} name="password">
        <Input type="passwords" />
      </Form.Item>

      <Form.Item
        label={labelItem("Email")}
        name="email"
        rules={[
          { required: true, message: "Please add your email here" },
          {
            type: "email",
            message: "Please use correct email format",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={labelItem("Phone number")}
        name="sdt"
        rules={[
          { required: true, message: "Phone number is required" },
          {
            pattern: /^\d+$/,
            message: "Number only, no whitespace",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item className="form-btn-groups mt-7">
        <Button
          type="primary"
          htmlType="submit"
          className="btn-update bg-[#0d6efd] hover:bg-[#0b5ed7] text-white font-semibold text-sm transition-all duration-[400ms] rounded-md outline-none border-none"
        >
          Update
        </Button>
        <Button
          htmlType="button"
          className="btn-cancel bg-[#dc3545] hover:bg-[#bb2d3b] text-white text-sm transition-all duration-[400ms] ml-3 rounded-md outline-none border-none"
          onClick={() => {
            navigate("/admin/user-management");
          }}
        >
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditUserForm;
