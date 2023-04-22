import React from "react";

import { AiOutlineEdit } from "react-icons/ai";
import { FiTrash } from "react-icons/fi";
import { SlEye } from "react-icons/sl";

import { Modal, Popover, Space } from "antd";

import { useNavigate } from "react-router-dom";
import { DesktopView, MobileView } from "../../core/HOC/Responsive";

import { TfiMore } from "react-icons/tfi";
import USER_SERVICE from "../../core/services/user.service";
import CustomNotification from "../../core/Components/Notification/CustomNotification";

const UserActionButtons = ({ userData }) => {
  const { confirm } = Modal;
  const navigate = useNavigate();
  const showDeleteConfirm = (title, content = "", handleOK) => {
    confirm({
      title: title,
      content: content,
      okText: "Yes",
      okButtonProps: {
        className: "btn-delete-ok",
      },
      cancelButtonProps: {
        className: "btn-delete-cancel",
      },
      cancelText: "No",
      onOk() {
        handleOK();
      },
      onCancel() {
        console.log("Cancel");
      },
      centered: true,
      wrapClassName: "modal-confirm-delete",
    });
  };

  const handleDeleteUser = (userData) => {
    showDeleteConfirm(
      `Are you sure you want to delete user ${userData.username} ?`,
      "",
      () => deleteUser(userData)
    );
  };

  const deleteUser = (userData) => {
    USER_SERVICE.deleteUser(userData.id)
      .then(() => {
        CustomNotification("success", "Delete user ok", "Please wait a minute");
        setTimeout(() => {
          navigate("/admin/user-management");
        }, 2000);
      })
      .catch((error) => {
        console.log("error");
        console.log(error);
      });
  };

  const handleView = (userData) => {
    navigate(`/admin/user/view/${userData.id}`);
  };
  const handleEdit = () => {
    navigate(`/admin/user/edit/${userData.id}`);
  };

  const renderButtons = () => {
    return (
      <>
        <DesktopView>{renderDesktopViewButtons()}</DesktopView>
        <MobileView>{renderMobileViewButtons()}</MobileView>
      </>
    );
  };

  const renderDesktopViewButtons = () => {
    return (
      <Space size={"middle"} align={"center"} className="btn-actions">
        <SlEye
          onClick={() => handleView(userData)}
          className="cursor-pointer"
          size={"20px"}
          color={"#3F80FD"}
        />
        <AiOutlineEdit
          onClick={() => handleEdit(userData)}
          className="cursor-pointer"
          size={"20px"}
          color={"#82D973"}
        />
        <FiTrash
          onClick={() => {
            handleDeleteUser(userData);
          }}
          className="cursor-pointer"
          size={"20px"}
          color={"red"}
        />
      </Space>
    );
  };
  const renderMobileViewButtons = () => {
    let popOverContent = (
      <Space align={"center"} className="btn-actions justify-center w-full">
        <SlEye
          onClick={() => handleView(userData)}
          className="cursor-pointer"
          size={"20px"}
          color={"#3F80FD"}
        />
        <AiOutlineEdit
          onClick={() => handleEdit(userData)}
          className="cursor-pointer"
          size={"20px"}
          color={"#82D973"}
        />
        <FiTrash
          onClick={() => {
            handleDeleteUser(userData);
          }}
          className="cursor-pointer"
          size={"20px"}
          color={"red"}
        />
      </Space>
    );
    return (
      <Popover placement="bottomRight" content={popOverContent} trigger="click">
        <TfiMore size={20} />
      </Popover>
    );
  };
  return <div>{renderButtons()}</div>;
};

export default UserActionButtons;
