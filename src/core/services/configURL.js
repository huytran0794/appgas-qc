import axios from "axios";
const BASE_URL = "https://6443ab6a90738aa7c0754268.mockapi.io";
const BASE_2_URL = "https://6443d61990738aa7c078b356.mockapi.io";
const BASE_FILE_URL = "https://api.anonfiles.com/";

const AXIOS_INSTANCE_GENERATOR = () => {
  let config = {
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  };

  return axios.create(config);
};

const AXIOS_ADMIN_INSTANCE_GENERATOR = () => {
  let config = {
    baseURL: BASE_2_URL,
    headers: {
      "Content-Type": "application/json",
    },
  };

  return axios.create(config);
};

const AXIOS_FILE_INSTANCE_GENERATOR = () => {
  let config = {
    baseURL: BASE_FILE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  };

  return axios.create(config);
};

export {
  AXIOS_INSTANCE_GENERATOR,
  AXIOS_ADMIN_INSTANCE_GENERATOR,
  AXIOS_FILE_INSTANCE_GENERATOR,
};
