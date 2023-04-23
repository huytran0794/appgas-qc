import React, { useEffect, useState } from "react";
import CustomerManageTable from "./CustomerManageTable";
import SectionWrapper from "../../core/Components/SectionWrapper/SectionWrapper";
import Header from "../../core/Components/Header/Header";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { MdOutlineManageAccounts } from "react-icons/md";
import { RiFileExcel2Line } from "react-icons/ri";
import { LOCAL_SERVICE } from "../../core/services/localServ";

import { exportToExcel } from "../../core/Components/ExcelReport/exportExcel";
import { sendMailWithFile } from "../../core/Components/Email/sendMail";
import CustomNotification from "../../core/Components/Notification/CustomNotification";

import CUSTOMER_SERVICE from "../../core/services/customer.service";
import { LoadingOutlined } from "@ant-design/icons";
import { convertBinaryData } from "../../core/utils/utils";
import FileSaver from "file-saver";
const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);

const CustomerListPage = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [customerList, setCustomerList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    CUSTOMER_SERVICE.getAllCustomers()
      .then((data) => {
        setCustomerList(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (loading) {
      // const fileName = "report";
      // const currentDate = new Date().getTime();
      // let report_name = `${fileName}_${currentDate}`;
      // let blob = exportToExcel(customerList);
      // let formdata = new FormData();
      // formdata.append("file", blob, `${report_name}.xlsx`);
      // FILE_SERVICE.send(formdata)
      //   .then((data) => {
      //     console.log("file data");
      //     console.log(data);
      //   })
      //   .catch((error) => {
      //     console.log("error");
      //     console.log(error);
      //   });
      // setLoading(false);
      const fileName = "report";
      const currentDate = new Date().getTime();
      let reportName = `${fileName}_${currentDate}`;
      let timeOutId = setTimeout(() => {
        let tempFile = exportToExcel(reportName, customerList);
        let blobFile = new Blob([convertBinaryData(tempFile)], {
          type: "application/octet-stream",
        });

        console.log(blobFile);
        FileSaver.saveAs(blobFile, `${reportName}.xlsx`);
        setLoading(false);
      }, 2500);
      return () => {
        clearTimeout(timeOutId);
      };
    }
  }, [loading]);

  let handleSearchInput = (searchTxt) => {
    setSearch(searchTxt);
  };

  let handleExportFile = (customerList) => {
    setLoading(true);
    // let excelFile = exportToExcel(, customerList);
    // const fileRef = ref(storage, `files/${fileName}_${currentDate}.xlsx`);
    // uploadBytes(fileRef, fileBlobData)
    //   .then(() => {
    //     CustomNotification("info", "Exporting data", "Please wait a minute");
    //     return getDownloadURL(fileRef);
    //   })
    //   .then((url) => {
    //     let templateParams = {
    //       from_name: "system",
    //       message: `Link download: ${url}`,
    //       to_email: LOCAL_SERVICE.user.get().email,
    //     };
    //     return sendMailWithFile(templateParams);
    //   })
    //   .then((result) => {
    //     CustomNotification(
    //       "success",
    //       "Email is sent",
    //       "Please check your inbox"
    //     );
    //   })
    //   .catch((error) => {
    //     CustomNotification("error", "Error", "Something went wrong");
    //     console.log(error);
    //   });
    // FILE_SERVICE.send({ file: fileBlobData })
    //   .then((data) => {
    //     console.log("data");
    //     console.log(data);
    //   })
    //   .catch((error) => {
    //     console.log("error");
    //     console.log(error);
    //   });
  };

  let renderTitle = () => {
    return (
      <div className="wrapper">
        <p>Customer List</p>

        <div className="button-group">
          <Button
            className="flex items-center justify-center bg-indigo-500/100 p-5 w-full mb-5"
            onClick={() => {
              navigate("/manager");
            }}
          >
            <MdOutlineManageAccounts color="#fff" size={28} />
          </Button>

          {LOCAL_SERVICE.user.getRole() === "master" && (
            <Button
              className="flex items-center justify-center bg-indigo-500/100 p-5 w-full mb-5"
              onClick={() => handleExportFile(customerList)}
              loading={loading}
            >
              {!loading ? <RiFileExcel2Line color="#fff" size={24} /> : ""}
            </Button>
          )}
        </div>
      </div>
    );
  };
  if (customerList.length) {
    return (
      <>
        <Header handleSearchInput={handleSearchInput} />
        <SectionWrapper
          sectionClass={"customers"}
          title={renderTitle()}
          titleClass="flex items-center justify-center"
          content={
            <CustomerManageTable
              search={search}
              customerListData={customerList}
            />
          }
        />
      </>
    );
  }
};

export default CustomerListPage;
