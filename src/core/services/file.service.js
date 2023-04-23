import { AXIOS_FILE_INSTANCE_GENERATOR } from "./configURL";

const FILE_SERVICE = {
  send: async (fileData) => {
    let { data } = await AXIOS_FILE_INSTANCE_GENERATOR().post(
      `upload`,
      fileData
    );
    return data;
  },
};

export default FILE_SERVICE;
