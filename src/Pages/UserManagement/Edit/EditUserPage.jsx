import { Avatar } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SectionWrapper from "../../../core/Components/SectionWrapper/SectionWrapper";

import Header from "../../../core/Components/Header/Header";
import EditUserForm from "../../../core/Components/Forms/EditUserForm";

import avatar from "../../../core/assets/images/avatar.svg";
import clsx from "clsx";
import USER_SERVICE from "../../../core/services/user.service";

const EditUserPage = () => {
  const { id } = useParams();

  let [userInfo, setUserInfo] = useState({});
  const bgClass = "bg-white rounded-lg shadow-lg p-2";

  useEffect(() => {
    USER_SERVICE.getUserById(id)
      .then((data) => {
        if (Object.keys(data).length) {
          setUserInfo(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const renderPage = (userInfo) => {
    const avatarDiv = (
      <div className="p-[20px] flex justify-center items-center w-full">
        <div className="avatar user-avatar">
          <Avatar
            size={300}
            src={userInfo?.avatar ? userInfo.avatar : avatar}
          />
        </div>
      </div>
    );
    return (
      <div className={clsx("wrapper flex flex-col justify-between", bgClass)}>
        {avatarDiv}
        <div className="w-full">
          <EditUserForm userInfo={userInfo} />
        </div>
      </div>
    );
  };

  if (Object.keys(userInfo).length) {
    return (
      <>
        <Header />
        <SectionWrapper
          sectionClass={"edit-user"}
          title={`Edit user profile`}
          content={renderPage(userInfo)}
        />
      </>
    );
  }
};

export default EditUserPage;
