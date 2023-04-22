import React, { useEffect, useState } from "react";
import SectionWrapper from "../../core/Components/SectionWrapper/SectionWrapper";
import Header from "../../core/Components/Header/Header";
import { LOCAL_SERVICE } from "../../core/services/localServ";
import { useNavigate } from "react-router-dom";
import UserTaskManageTable from "./UserTaskManageTable";
import USER_SERVICE from "../../core/services/user.service";
const UserTaskPage = () => {
  let navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    if (LOCAL_SERVICE.user.getRole() === "user") {
      navigate("/");
    }
    USER_SERVICE.getAllUsers()
      .then((data) => {
        if (data.length) {
          setUserList(data);
        }
      })
      .catch((error) => {
        console.log("error");
        console.log(error);
      });
  }, []);

  return (
    <>
      <Header />
      <SectionWrapper
        sectionClass={"user"}
        title={"Task Assign"}
        content={<UserTaskManageTable userList={userList} />}
      />
    </>
  );
};

export default UserTaskPage;
