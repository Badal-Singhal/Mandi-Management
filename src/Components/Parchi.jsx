import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "../../src/Invoice.css";
import { useLocation } from "react-router-dom";
import { getProfileInfo, sentPDF } from "../API/Auth";

const Parchi = () => {
  const [profile, setProfile] = useState([]);
  const location = useLocation();
  let alldheri = location.state.dheri;

  const firmName = profile[0]?.firmName || "N/A";
  const firmAddress = profile[0]?.firmAddress || "N/A";
  const gstin = profile[0]?.gstNumber || "N/A";
  const mobile = profile[0]?.mobileNumber || "N/A";
  const customerName = alldheri[0]?.firmName || "N/A";

  const items = alldheri;
  const date = new Date();
  let parchi_no = `${date.getFullYear()}/${(date.getUTCMonth() + 1)
    .toString()
    .padStart(2, "0")}/BANDHU-${localStorage.getItem("user_id")}/${Number(
    localStorage.getItem("parchiNumber")
  )}`;

  useEffect(() => {
    HandleProfileInfo();
  }, []);

  const HandleProfileInfo = () => {
    const data = localStorage.getItem("user_id");
    let obj = { user_id: data };
    getProfileInfo(obj).then((res) => setProfile(res.data || []));
  };

  const createPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const cellPadding = 3;
    const lineHeight = 8;

    // Header Information
    doc.setFontSize(10);
    doc.text(`GSTIN: ${gstin}`, 10, 10);
    doc.text(`M. NO.: ${mobile}`, pageWidth - 60, 10);
    doc.text("Purchase Book", pageWidth / 2, 20, null, null, "center");
    doc.setFontSize(20);
    doc.text(firmName, pageWidth / 2, 30, null, null, "center");
    doc.setFontSize(10);
    doc.text(
      `${firmAddress} [Address]`,
      pageWidth / 2,
      40,
      null,
      null,
      "center"
    );
    doc.text(`Customer: ${customerName}`, 10, 50);
    doc.text(`Parchi No: ${parchi_no}`, 10, 60);
    doc.text(
      `Date: ${date.toLocaleString().split(",")[0]}`,
      pageWidth - 60,
      50
    );

    // Table Headers
    const startX = 10;
    const startY = 70;
    const colWidths = [10, 50, 50, 30, 30, 30]; // Widths for each column
    const headers = [
      "S.No.",
      "Name of Firm",
      "Jins Ka Naam",
      "Anumanit Vazan",
      "Dar",
      "Remarks",
    ];

    let currentY = startY;
    doc.setFontSize(10);
    headers.forEach((header, i) => {
      doc.text(
        header,
        startX + colWidths.slice(0, i).reduce((a, b) => a + b, 0) + cellPadding,
        currentY
      );
    });

    // Draw a line under headers
    doc.line(
      startX,
      currentY + 2,
      startX + colWidths.reduce((a, b) => a + b, 0),
      currentY + 2
    );
    currentY += lineHeight;

    // Table Rows
    items.forEach((item, index) => {
      const row = [
        (index + 1).toString(),
        item.firmName || "",
        item.dheri || "",
        item.weight?.toString() || "",
        item.rate?.toString() || "",
        item.remarks || "",
      ];

      row.forEach((text, i) => {
        doc.text(
          text,
          startX +
            colWidths.slice(0, i).reduce((a, b) => a + b, 0) +
            cellPadding,
          currentY
        );
      });

      currentY += lineHeight;

      // Check for page break
      if (currentY > doc.internal.pageSize.getHeight() - 20) {
        doc.addPage();
        currentY = startY;
      }
    });
    return doc;
  };

  const downloadPDF = () => {
    const doc = createPDF();
    doc.save("invoice.pdf");
  };

  const sendPDF = () => {
    const doc = createPDF();
    const blob=doc.output("blob");
    blobToBase64(blob).then((base64) => {
      let obj = { data: base64 };
      sentPDF(obj).then((res) => {
        console.log(res);
      });
    });
  };

  function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  return (
    <div className="invoice">
      <div className="header">
        <div className="left">GSTIN: {gstin}</div>
        <div className="right">M. NO.{mobile}</div>
      </div>
      <div className="title">Purchase Book</div>
      <div className="firm-name">{firmName}</div>
      <div className="firm-Address">{firmAddress} [Address]</div>
      <div className="header">
        <div className="left">Customer: {customerName}</div>
        <div className="right">Date: {date.toLocaleString().split(",")[0]}</div>
      </div>
      <table className="purchase-book-table">
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Name of Firm</th>
            <th>Jins ka Naam</th>
            <th>Anumanit Vazan</th>
            <th>Dar</th>
            <th>Remarks</th>
          </tr>
        </thead>
        {alldheri.length !== 0 && (
          <tbody>
            {alldheri.map((val, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{val.firmName}</td>
                <td>{val.dheri}</td>
                <td>{val.weight}</td>
                <td>{val.rate}</td>
                <td>{val.remarks}</td>
              </tr>
            ))}
          </tbody>
        )}
        {alldheri.length === 0 && (
          <tbody>
            <tr>
              <td colSpan="100%" style={{ textAlign: "center" }}>
                <b>No Dheri created</b>
              </td>
            </tr>
          </tbody>
        )}
      </table>
      <button id="parchibtn" onClick={downloadPDF}>
        Download Invoice
      </button>
      <button onClick={sendPDF}>Send</button>
    </div>
  );
};

export default Parchi;
