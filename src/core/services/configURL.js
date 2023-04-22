import axios from "axios";
const BASE_URL = "https://6443ab6a90738aa7c0754268.mockapi.io";
const BASE_2_URL = "https://6443d61990738aa7c078b356.mockapi.io";

const AXIOS_INSTANCE_GENERATOR = (endpoint) => {
  let config = {
    baseURL: `${BASE_URL}/${endpoint}`,
    headers: {
      "Content-Type": "application/json",
    },
  };

  return axios.create(config);
};

const AXIOS_ADMIN_INSTANCE_GENERATOR = (endpoint) => {
  let config = {
    baseURL: `${BASE_2_URL}/${endpoint}`,
    headers: {
      "Content-Type": "application/json",
    },
  };

  return axios.create(config);
};

export { AXIOS_INSTANCE_GENERATOR, AXIOS_ADMIN_INSTANCE_GENERATOR };
