import USER_SERVICE from "../services/user.service";

const checkLogin = (item, values) => {
  return item.findIndex(
    (data) => data.email === values.email && data.password === values.password
  );
};

const checkAdminInfo = async ({ email, password }) => {
  let userData = {};
  return USER_SERVICE.getAllAdmins()
    .then((data) => {
      if (data.length) {
        userData = data.find(
          (user) => user.email === email && user.password === password
        );
      }
      return userData ? { ...userData, role: "admin" } : {};
    })
    .catch((error) => {
      console.log(error);
    });
};

const checkUserInfo = async ({ email, password }) => {
  let userData = {};
  return USER_SERVICE.getAllUsers()
    .then((data) => {
      if (data.length) {
        userData = data.find(
          (user) => user.email === email && user.password === password
        );
      }

      return userData ? { ...userData, role: "user" } : {};
    })
    .catch((error) => {
      console.log(error);
    });
};

const checkMasterInfo = async ({ email, password }) => {
  let userData = {};
  return USER_SERVICE.getAllMasters()
    .then((data) => {
      if (data.length) {
        userData = data.find(
          (user) => user.email === email && user.password === password
        );
      }

      return userData ? { ...userData, role: "master" } : {};
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

const checkAllInfo = async (values) => {
  let userData = {};
  try {
    userData = await checkUserInfo(values);
    if (!Object.keys(userData).length) {
      userData = await checkAdminInfo(values);
    }
    if (!Object.keys(userData).length) {
      userData = await checkMasterInfo(values);
    }
  } catch (error) {
    console.log("error overall");
    console.log(error);
  }

  return userData;
};

export { checkLogin, checkAllInfo };
