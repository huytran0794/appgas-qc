import {
  AXIOS_INSTANCE_GENERATOR,
  AXIOS_ADMIN_INSTANCE_GENERATOR,
} from "./configURL";

const USER_SERVICE = {
  getAllAdmins: async () => {
    let { data } = await AXIOS_ADMIN_INSTANCE_GENERATOR(`admin`).get();
    return data;
  },
  getAllUsers: async () => {
    let { data } = await AXIOS_INSTANCE_GENERATOR(`users`).get();
    return data;
  },
  getAllMasters: async () => {
    let { data } = await AXIOS_ADMIN_INSTANCE_GENERATOR(`master`).get();
    return data;
  },
  getUserById: async (id) => {
    let { data } = await AXIOS_ADMIN_INSTANCE_GENERATOR(`users/${id}`).get();
    return data;
  },
};

export default USER_SERVICE;
