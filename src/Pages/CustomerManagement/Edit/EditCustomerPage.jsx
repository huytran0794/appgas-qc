import { Avatar } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditCustomerForm from "../../../core/Components/Forms/EditCustomerForm";
import SectionWrapper from "../../../core/Components/SectionWrapper/SectionWrapper";
import Header from "../../../core/Components/Header/Header";

import { isValidUrl } from "../../../core/utils/utils";
import avatar from "../../../core/assets/images/avatar_2.svg";
import clsx from "clsx";
import CUSTOMER_SERVICE from "../../../core/services/customer.service";

const EditCustomerPage = () => {
  const { id } = useParams();
  let [customerInfo, setCustomerInfo] = useState({});
  const bgClass = "bg-white rounded-lg shadow-lg p-2";
  useEffect(() => {
    CUSTOMER_SERVICE.getCustomer(id)
      .then((data) => {
        data.note = data.note.trim();
        setCustomerInfo(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const renderPage = (customerInfo) => {
    const avatarDiv = (
      <div className="flex justify-center items-center">
        <div className="avatar">
          <Avatar
            size={200}
            src={isValidUrl(customerInfo.avatar) ? customerInfo.avatar : avatar}
          />
        </div>
      </div>
    );
    return (
      <div className={clsx("wrapper flex flex-col justify-between", bgClass)}>
        {avatarDiv}
        <div className="customer-info">
          <EditCustomerForm customerInfo={customerInfo} />
        </div>
      </div>
    );
  };

  if (Object.keys(customerInfo).length) {
    return (
      <>
        <Header />
        <SectionWrapper
          sectionClass={"edit-customer"}
          title={`Edit customer profile`}
          content={renderPage(customerInfo)}
        />
      </>
    );
  }
};

export default EditCustomerPage;
