import { AXIOS_INSTANCE_GENERATOR } from "./configURL";

const CUSTOMER_SERVICE = {
  getAllCustomers: async () => {
    let { data } = await AXIOS_INSTANCE_GENERATOR().get(`customers`);
    return data;
  },
  getCustomer: async (id) => {
    let { data } = await AXIOS_INSTANCE_GENERATOR().get(`customers/${id}`);
    return data;
  },
  updateCustomer: async (id, newCustomerData) => {
    let { data } = await AXIOS_INSTANCE_GENERATOR().put(
      `customers/${id}`,
      newCustomerData
    );
    return data;
  },
  deleteCustomer: async (id) => {
    let { data } = await AXIOS_INSTANCE_GENERATOR().delete(`customers/${id}`);
    return data;
  },
  addCustomer: async (newCustomerData) => {
    let { data } = await AXIOS_INSTANCE_GENERATOR().post(
      `customers`,
      newCustomerData
    );
    return data;
  },
};

export default CUSTOMER_SERVICE;
