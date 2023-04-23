import { AXIOS_INSTANCE_GENERATOR } from "./configURL";

const USER_SERVICE = {
  getAllAdmins: async () => {
    let { data } = await AXIOS_INSTANCE_GENERATOR().get(`admin`);
    return data;
  },
  getAllUsers: async () => {
    let { data } = await AXIOS_INSTANCE_GENERATOR().get(`users`);
    return data;
  },
  getAllMasters: async () => {
    let { data } = await AXIOS_INSTANCE_GENERATOR().get(`master`);
    return data;
  },
  getUserById: async (id) => {
    let { data } = await AXIOS_INSTANCE_GENERATOR().get(`users/${id}`);
    return data;
  },
  updateUser: async (id, newUserData) => {
    let { data } = await AXIOS_INSTANCE_GENERATOR().put(
      `users/${id}`,
      newUserData
    );
    return data;
  },
  deleteUser: async (id) => {
    let { data } = await AXIOS_INSTANCE_GENERATOR().delete(`users/${id}`);
    return data;
  },
  addUser: async (userData) => {
    let { data } = await AXIOS_INSTANCE_GENERATOR().post(`users`, userData);
    return data;
  },
};

export default USER_SERVICE;
