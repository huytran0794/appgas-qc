import React, { useEffect } from "react";
import Header from "../../../core/Components/Header/Header";
import TaskDetailForm from "../../../core/Components/Forms/TaskDetailForm";
import { useState } from "react";
import { useParams } from "react-router-dom";
import SectionWrapper from "../../../core/Components/SectionWrapper/SectionWrapper";
import { LOCAL_SERVICE } from "../../../core/services/localServ";
import clsx from "clsx";
import USER_SERVICE from "../../../core/services/user.service";

const UserTaskDetail = () => {
  const { taskId } = useParams();
  let [taskInfo, setTaskInfo] = useState({});
  let userInfo = LOCAL_SERVICE.user.get();
  const bgClass = "bg-white rounded-lg shadow-lg p-2";

  useEffect(() => {
    USER_SERVICE.getUserById(userInfo.id)
      .then((data) => {
        if (Object.keys(data).length) {
          let taskIdx = data.tasks.findIndex((task) => task.id === taskId);
          if (taskIdx > -1) {
            setTaskInfo(data.tasks[taskIdx]);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const renderPage = (taskInfo) => {
    return (
      <div className={clsx("wrapper flex flex-col justify-between", bgClass)}>
        <div className="w-full">
          <TaskDetailForm taskInfo={taskInfo} userInfo={userInfo} />
        </div>
      </div>
    );
  };
  if (Object.keys(taskInfo).length) {
    return (
      <>
        <Header />
        <SectionWrapper
          sectionClass={"user-task-detail"}
          title={`Task Detail`}
          content={renderPage(taskInfo)}
        />
      </>
    );
  }
};

export default UserTaskDetail;
