import { AXIOS_ADMIN_INSTANCE_GENERATOR } from "./configURL";

const MASTER_SERVICE = {
  //   getAllAdmins: async () => {
  //     let { data } = await AXIOS_ADMIN_INSTANCE_GENERATOR().get(`admin`);
  //     return data;
  //   },
  //   getAllUsers: async () => {
  //     let { data } = await AXIOS_INSTANCE_GENERATOR().get(`users`);
  //     return data;
  //   },
  //   getAllMasters: async () => {
  //     let { data } = await AXIOS_ADMIN_INSTANCE_GENERATOR().get(`master`);
  //     return data;
  //   },
  //   getUserById: async (id) => {
  //     let { data } = await AXIOS_INSTANCE_GENERATOR().get(`users/${id}`);
  //     return data;
  //   },
  //   updateUser: async (id, newUserData) => {
  //     let { data } = await AXIOS_INSTANCE_GENERATOR().put(
  //       `users/${id}`,
  //       newUserData
  //     );
  //     return data;
  //   },
  addAdmin: async (adminData) => {
    let { data } = await AXIOS_ADMIN_INSTANCE_GENERATOR().post(
      `admin`,
      adminData
    );
    return data;
  },
};

export default MASTER_SERVICE;
