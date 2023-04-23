import axios from "axios";
const BASE_URL = "https://6445959a0431e885f000a4e4.mockapi.io";
const AXIOS_INSTANCE_GENERATOR = () => {
  let config = {
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  };

  return axios.create(config);
};

export { AXIOS_INSTANCE_GENERATOR };
