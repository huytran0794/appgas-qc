import React, { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import Label from "./Label/Label";
import { useNavigate } from "react-router-dom";
import CustomNotification from "../Notification/CustomNotification";
import USER_SERVICE from "../../services/user.service";

const AddUserForm = ({ layout = "vertical", size = "large", customerInfo }) => {
  const [form] = Form.useForm();
  const initialValues = { ...customerInfo };
  const labelItem = (labelText) => (
    <Label className="text-sm font-medium text-[#67748e] capitalize">
      {labelText}
    </Label>
  );

  const navigate = useNavigate();

  const handleFinish = (values) => {
    values = { ...values, tasks: [] };
    USER_SERVICE.addUser(values)
      .then(() => {
        CustomNotification(
          "success",
          "Add new user ok",
          "Please wait a minute"
        );
        setTimeout(() => {
          navigate("/admin/user-management");
        }, 3000);
      })
      .catch((error) => {
        console.log("error");
        console.log(error);
      });
  };

  const addForm = () => {
    return (
      <Form
        form={form}
        name="add-user"
        layout={layout}
        size={size}
        initialValues={initialValues}
        onFinish={handleFinish}
        className="add-user-form px-4"
      >
        <Form.Item
          label={labelItem("User name")}
          name="username"
          rules={[
            { required: true, message: "Please input your name here" },
            {
              message: "Letters only",
            },
          ]}
        >
          <Input />
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
          label={labelItem("Password")}
          name="password"
          rules={[{ required: true, message: "Please add your password" }]}
        >
          <Input type="passwords" />
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
            Add new
          </Button>
          <Button
            htmlType="button"
            className="btn-cancel bg-[#dc3545] hover:bg-[#bb2d3b] text-white text-sm transition-all duration-[400ms] ml-3 rounded-md outline-none border-none"
            onClick={() => {
              navigate("/");
            }}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    );
  };
  return addForm();
};

export default AddUserForm;
