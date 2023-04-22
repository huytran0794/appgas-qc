import { AXIOS_INSTANCE_GENERATOR } from "./configURL";

const API_URL = AXIOS_INSTANCE_GENERATOR("customers");

const CUSTOMER_SERVICE = {
  //   getAllUser: async () => {
  //     let { data } = await AXIOS_INSTANCE_GENERATOR(BASE_USER_URL).get(
  //       `/getUser`
  //     );
  //     return data;
  //   },

  getAllCustomers: async () => {
    let { data } = await API_URL.get();
    return data;
  },
  //   getCustomer: (customerId) => {
  //     return get(child(generateDbRef(), `/customers/${customerId}`));
  //   },
  //   deleteCustomer: (customerId) => {
  //     return remove(generateDbRef(`/customers/${customerId}`));
  //   },

  //   updateCustomer: (customerId, newCustomerData) => {
  //     return update(generateDbRef(`/customers/${customerId}`), newCustomerData);
  //   },

  //   addCustomer: (customerId, newCustomerData) => {
  //     return set(generateDbRef(`/customers/${customerId}`), newCustomerData);
  //   },
};

export default CUSTOMER_SERVICE;
