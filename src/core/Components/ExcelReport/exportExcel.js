import * as XLSX from "xlsx";

export const exportToExcel = (fileName, dataToExport) => {
  // const ws = XLSX.json_to_sheet(dataToExport);
  // const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
  // const fileType =
  //   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";

  // /* generate XLSX file and send to client */
  // const excelBuffer = write(wb, { bookType: "xlsx", type: "array" });
  // const data = new Blob([excelBuffer], { type: fileType });

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(dataToExport);
  XLSX.utils.book_append_sheet(wb, ws, "Customers");
  XLSX.writeFile(wb, `${fileName}.xlsx`);
};
