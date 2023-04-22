import React, { useEffect, useState } from "react";
import UserManageTable from "./UsermanageTable";
import SectionWrapper from "../../core/Components/SectionWrapper/SectionWrapper";
import Header from "../../core/Components/Header/Header";
import { LOCAL_SERVICE } from "../../core/services/localServ";
import { useNavigate } from "react-router-dom";
import USER_SERVICE from "../../core/services/user.service";
const UserManagePage = () => {
  let navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  // fetch api
  useEffect(() => {
    if (LOCAL_SERVICE.user.getRole() === "user") {
      navigate("/");
    }

    // let getSnapShot = (snapshot) => {
    //   if (snapshot.exists()) {
    //     let returnedData = [];
    //     snapshot.forEach((item) => {
    //       returnedData = [
    //         ...returnedData,
    //         {
    //           key: item.key,
    //           ...item.val(),
    //           id: item.key,
    //         },
    //       ];
    //     });
    //     setUserList(returnedData);
    //   }
    // };

    USER_SERVICE.getAllUsers()
      .then((data) => {
        if (data.length) {
          setUserList(data);
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
        sectionClass={"user"}
        title={"User Management"}
        content={<UserManageTable userList={userList} />}
      />
    </>
  );
};

export default UserManagePage;
