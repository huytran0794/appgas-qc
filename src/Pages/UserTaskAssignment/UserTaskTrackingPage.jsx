import React, { useEffect, useState } from "react";
import SectionWrapper from "../../core/Components/SectionWrapper/SectionWrapper";
import Header from "../../core/Components/Header/Header";
import { useNavigate } from "react-router-dom";

import UserTaskTrackingTable from "./UserTaskTrackingTable";
import { LOCAL_SERVICE } from "../../core/services/localServ";
import USER_SERVICE from "../../core/services/user.service";
const UserTaskTrackingPage = () => {
  let navigate = useNavigate();
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    if (LOCAL_SERVICE.user.getRole() !== "user") {
      navigate("/");
    }

    let currentUserInfo = LOCAL_SERVICE.user.get();
    USER_SERVICE.getUserById(currentUserInfo.id)
      .then((data) => {
        if (data.tasks.length) {
          let userTaskList = data.tasks.filter(
            (item) => item.completed == false
          );
          setTaskList(userTaskList);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Header />
      <SectionWrapper
        sectionClass={"user-task-tracking"}
        title={"Task List"}
        content={<UserTaskTrackingTable taskList={taskList} />}
      />
    </>
  );

  // return <div>aaaa</div>;
};

export default UserTaskTrackingPage;
