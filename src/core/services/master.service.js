import { AXIOS_INSTANCE_GENERATOR } from "./configURL";

const MASTER_SERVICE = {
  addAdmin: async (adminData) => {
    let { data } = await AXIOS_INSTANCE_GENERATOR().post(`admin`, adminData);
    return data;
  },
};

export default MASTER_SERVICE;
