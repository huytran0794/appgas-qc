import { Button, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Label from "./Label/Label";
import TextArea from "antd/es/input/TextArea";
import { nanoid } from "@reduxjs/toolkit";

import CustomNotification from "../Notification/CustomNotification";

import { isValidCoordinate } from "../../utils/utils";
import CUSTOMER_SERVICE from "../../services/customer.service";
import USER_SERVICE from "../../services/user.service";

const TaskDetailForm = ({
  layout = "vertical",
  size = "large",
  taskInfo,
  userInfo,
}) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  let initialValues = { ...taskInfo };

  const [customerInfo, setCustomerInfo] = useState({});
  useEffect(() => {
    CUSTOMER_SERVICE.getCustomer(taskInfo.customer_id)
      .then((data) => {
        if (Object.keys(data).length) {
          setCustomerInfo(data);
        }
      })
      .catch((err) => {});
  }, []);

  const handleFinish = (values) => {
    let completeDateTime = new Date();
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };

    let newOrderHistory = {
      order_id: nanoid(6),
      order: values.order,
      note: values.note,
      complete_date: completeDateTime.toLocaleDateString("en-US", options),
    };

    let newCustomerInfo = {
      ...customerInfo,
      order_history: [...customerInfo.order_history, newOrderHistory],
    };

    taskInfo.completed = true;
    let taskIdx = userInfo.tasks.findIndex((task) => task.id === taskInfo.id);
    if (taskIdx > -1) {
      userInfo.tasks[taskIdx] = { ...taskInfo };
      Promise.all([
        CUSTOMER_SERVICE.updateCustomer(taskInfo.customer_id, newCustomerInfo),
        USER_SERVICE.updateUser(userInfo.id, userInfo),
      ])
        .then(() => {
          CustomNotification(
            "success",
            `Complete`,
            `Task ${taskInfo.id} completed`
          );
          setTimeout(() => {
            navigate("/user/task-tracking");
          }, 2500);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const labelItem = (labelText) => (
    <Label className="text-sm font-medium text-[#67748e] capitalize">
      {labelText}
    </Label>
  );
  const renderForm = () => {
    let mapCoordinate = initialValues.map.split(",");
    let latitude = "";
    let longtitude = "";
    let mapUrl = "";
    if (mapCoordinate.length > 1) {
      latitude = mapCoordinate[0].trim();
      longtitude = mapCoordinate[1].trim();
      mapUrl = `https://www.google.pt/maps/dir//${latitude},${longtitude}/@${latitude},${longtitude},20z`;
    }

    initialValues.map = mapUrl;

    return (
      <Form
        form={form}
        name="user-task-detail"
        layout={layout}
        size={size}
        onFinish={handleFinish}
        className="user-task-detail-form px-4"
        initialValues={initialValues}
      >
        <Form.Item name="sdt" label={labelItem("Customer phone number")}>
          <Input placeholder="Customer phone number" disabled />
        </Form.Item>
        <Form.Item name="fullname" label={labelItem("Customer name")}>
          <Input placeholder="Customer name" disabled />
        </Form.Item>
        <Form.Item name="address" label={labelItem("Address")}>
          <Input placeholder="Address" disabled />
        </Form.Item>
        <div className="google-map-action">
          <Form.Item name="map" label={labelItem("Google map")}>
            <Input placeholder="Google map" disabled />
          </Form.Item>
          <div className="action">
            <a
              href={initialValues.map ? initialValues.map : "#"}
              target="_blank"
            >
              <img
                src="https://templates.envytheme.com/joxi/default/assets/images/icon/maximize.svg"
                alt="map"
              />
            </a>
          </div>
        </div>
        <Form.Item label={labelItem("Order")} name="order">
          <TextArea placeholder="Order" disabled />
        </Form.Item>
        <Form.Item label={labelItem("Order note")} name="note">
          <TextArea placeholder="Order note:" disabled />
        </Form.Item>
        <Form.Item label={labelItem("Customer note")} name="specialNote">
          <TextArea placeholder="Customer note: " disabled />
        </Form.Item>
        <Form.Item className="form-btn-groups">
          <Button
            type="primary"
            htmlType="submit"
            className="btn-update bg-[#0d6efd] hover:bg-[#0b5ed7] text-white rounded-[4px] font-semibold text-sm transition-all duration-[400ms]"
          >
            Complete
          </Button>
          <Button
            htmlType="button"
            className="btn-cancel bg-[#dc3545] hover:bg-[#bb2d3b] rounded-[4px] text-white text-sm transition-all duration-[400ms] ml-3"
            onClick={() => {
              navigate("/user/task-tracking/");
            }}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    );
  };
  if (Object.keys(taskInfo).length && Object.keys(customerInfo).length) {
    initialValues = { ...initialValues, specialNote: customerInfo.note };
    return renderForm();
  }
};

export default TaskDetailForm;
