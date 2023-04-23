import { AXIOS_FILE_INSTANCE_GENERATOR } from "./configURL";

const FILE_SERVICE = {
  send: async (fileData) => {
    let { data } = await AXIOS_FILE_INSTANCE_GENERATOR.post(
      "https://www.filestackapi.com/api/store/S3?key=AdyQCaz6ORJedc1nuXLq1z",
      fileData
    );
    return data;
  },
};

export default FILE_SERVICE;
