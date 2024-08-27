import React, { useEffect, useState } from "react";
import "./../App.css"; // Ensure your CSS file is imported
import { useNavigate } from "react-router-dom";
import { getPurchaseBook } from "../API/Auth";

const PurchaseBook = () => {
  const navigate = useNavigate();
  // const [isSarsoSelect, setIsSarsoSelect] = useState(false);
  const [purchaseBook, setPurchaseBook] = useState([]);
  console.log(purchaseBook);

  const HandleOnGoBackClick = () => {
    navigate("/");
  };

  // const HandleCropSelect=()=>{

  // }

  const HandleOnCreateReceiptClick = () => {
    navigate("/create-receipt");
  };

  useEffect(() => {
    let user_id = localStorage.getItem("user_id");
    let obj = {
      user_id: user_id,
    };
    getPurchaseBook(obj).then((res) => {
      setPurchaseBook((val) => res.data);
      let map = new Map();
      for (let i = 0; i < res.data.length; i++) {
        map.set(res.data[i].parchi_no, res.data[i]);
      }

      console.log(map.size);
      localStorage.setItem("parchiNumber",map.size)
    });
  }, []);

  return (
    <div className="purchase-book-container">
      <div className="d-flex justify-content-between">
        <div>
          <h2 id="heading">Purchase Book</h2>
        </div>
        <div>
          <button
            onClick={HandleOnGoBackClick}
            className="btn btn-secondary me-2"
          >
            Go Back
          </button>
          <button
            className="btn btn-success"
            // data-bs-toggle="modal"
            // data-bs-target="#staticBackdrop"
            onClick={HandleOnCreateReceiptClick}
          >
            Create Receipt
          </button>
        </div>
      </div>

      <table className="purchase-book-table">
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Date</th>
            <th>Parchi No.</th>
            <th>Name of firm</th>
            <th>Jins ka naam</th>
            <th>Anumanit vazan</th>
            <th>Dar</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {purchaseBook.length != 0 &&
            purchaseBook.map((val, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{val.created_at.split("T")[0]}</td>
                <td>{val.parchi_no}</td>
                <td>{val.supplierName}</td>
                <td>{val.dheri}</td>
                <td>{val.weight}</td>
                <td>{val.rate}</td>
                <td>{val.remarks}</td>
              </tr>
            ))}

          {purchaseBook.length == 0 && (
            <tr>
              <td colSpan="100%" style={{ textAlign: "center" }}>
                No data available
              </td>
            </tr>
          )}

          {/* Repeat rows as necessary */}
        </tbody>
      </table>
      {/* <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Receipt
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <form>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="firmName" className="form-label">
                    Firm's Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firmName"
                    aria-describedby="firmNameHelp"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="addDheri" className="form-label">
                    Add Dheri
                  </label>
                  <select
                    className="form-select form-select-sm"
                    id="addDheri"
                    aria-label="Small select example"
                    onChange={HandleCropSelect}
                  >
                    <option value="" selected disabled>
                      Select Crop...
                    </option>
                    <option value={1}>Jo</option>
                    <option value={2}>Gehu</option>
                    <option value={3}>Sarso</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="rate" className="form-label">
                    Rate
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="rate"
                    aria-describedby="rateHelp"
                  />
                </div>
                {isSarsoSelect && <div>
                  <div className="mb-3">
                    <label htmlFor="lab" className="form-label">
                      Lab
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="lab"
                      aria-describedby="labHelp"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="amount" className="form-label">
                      Amount
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="amount"
                      aria-describedby="amountHelp"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="finalRate" className="form-label">
                      Final Rate
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="finalRate"
                      aria-describedby="finalRateHelp"
                    />
                  </div>
                </div>}
                <div className="mb-3">
                  <label htmlFor="weight" className="form-label">
                    Anumanit Vajan
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="weight"
                    aria-describedby="weightHelp"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="remarks" className="form-label">
                    Remarks
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="remarks"
                    aria-describedby="remarksHelp"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default PurchaseBook;
