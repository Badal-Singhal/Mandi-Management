import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../App.css";
import { createRecipt } from "../API/Auth";
import { toast, ToastContainer } from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const CreateReceipt = () => {
  const [isSarsoSelect, setIsSarsoSelect] = useState(false);
  const [alldheri, setDheri] = useState([]);
  const [lab, setLab] = useState("");
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();

  console.log(alldheri);
  let date = new Date();

  let parchi_no = `${date.getFullYear()}/${(date.getUTCMonth() + 1)
    .toString()
    .padStart(2, "0")}/BANDHU-${localStorage.getItem("user_id")}/${
    Number(localStorage.getItem("parchiNumber")) + 1
  }`;
  console.log(parchi_no);

  const HandleCropSelect = (e) => {
    if (e.target.value === "Sarso") {
      setIsSarsoSelect(true);
    } else {
      setIsSarsoSelect(false);
    }
  };

  // const HandleReceiptFormSubmit = (e) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.target);
  //   let obj = {};
  //   for (let [key, value] of formData.entries()) {
  //     if(key!="photo"){
  //       obj[key] = value;
  //     }else{
  //       const reader = new FileReader();
  //       reader.readAsDataURL(value);
  //     }

  //   }
  //   setDheri((val) => [...val, obj]);
  //   e.target.reset();
  //   setIsSarsoSelect(false);
  // };

  const HandleReceiptFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let obj = {};

    const processFormData = (formData) => {
      return new Promise((resolve, reject) => {
        for (let [key, value] of formData.entries()) {
          if (key !== "photo") {
            obj[key] = value;
          } else {
            const reader = new FileReader();
            reader.onload = () => {
              obj[key] = reader.result;
              resolve(obj);
            };
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(value);
          }
        }
      });
    };

    processFormData(formData)
      .then((data) => {
        setDheri((val) => [...val, data]);
        e.target.reset();
        setIsSarsoSelect(false);
      })
      .catch((error) => console.error("Error reading file:", error));
  };

  const HandleGoBackClick = (e) => {
    navigate("/purchase_book");
  };

  const HandleLabChange = (e) => {
    setLab(Number(e.target.value));
  };
  const HandleAmountChnage = (e) => {
    setAmount(Number(e.target.value));
  };

  const handleDelete = (item) => {
    const updatedDheri = alldheri.filter((d) => d !== item);
    setDheri(updatedDheri);
  };

  const HandleOnCreateParchi = () => {
    if (alldheri.length === 0) {
      return toast("Dheri is Empty");
    } else {
      const user_id = localStorage.getItem("user_id");
      let obj = { alldheri, user_id: user_id, parchi_no: parchi_no };
      createRecipt(obj).then((res) => {
        if (res.message === "Success") {
          toast("Data Inserted Successfully");
          localStorage.setItem(
            "parchiNumber",
            Number(localStorage.getItem("parchiNumber")) + 1
          );
        }
      });

      setDheri((val) => []);
      navigate("/Parchi", { state: { dheri: alldheri } });
    }
  };

  return (
    <div className="custom-receipt-container">
      <ToastContainer />
      <form className="receipt-form" onSubmit={HandleReceiptFormSubmit}>
        <h2>Create Receipt</h2>
        <div className="mb-3">
          <label htmlFor="firmName" className="form-label">
            Firm's Name
          </label>
          <input
            type="text"
            className="form-control"
            id="firmName"
            name="firmName"
            aria-describedby="firmNameHelp"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="addDheri" className="form-label">
            Add Dheri
          </label>
          <select
            className="form-select"
            id="addDheri"
            name="dheri"
            aria-label="Select Crop"
            onChange={HandleCropSelect}
            defaultValue=""
            required
          >
            <option value="" disabled>
              Select Crop...
            </option>
            <option value="Jo">जौ/Jo</option>
            <option value="Gehu">गेहूं/Gehu</option>
            <option value="Sarso">सरसों/Sarso</option>
          </select>
        </div>
        {!isSarsoSelect && <div className="mb-3">
          <label htmlFor="rate" className="form-label">
            Rate
          </label>
          <input
            type="number"
            name="rate"
            className="form-control"
            id="rate"
            aria-describedby="rateHelp"
            required
          />
        </div>}
        {isSarsoSelect && (
          <div>
            <div className="mb-3">
              <label htmlFor="lab" className="form-label">
                Lab
              </label>
              <input
                type="number"
                className="form-control"
                id="lab"
                name="lab"
                value={lab}
                aria-describedby="labHelp"
                onChange={HandleLabChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="amount" className="form-label">
                Amount
              </label>
              <input
                type="number"
                value={amount}
                className="form-control"
                name="amount"
                id="amount"
                onChange={HandleAmountChnage}
                aria-describedby="amountHelp"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="finalRate" className="form-label">
                Final Rate
              </label>
              <input
                type="number"
                className="form-control"
                id="finalRate"
                name="finalRate"
                value={lab * 100 + amount}
                readOnly
                aria-describedby="finalRateHelp"
              />
            </div>
          </div>
        )}
        <div className="mb-3">
          <label htmlFor="weight" className="form-label">
            Estimated Weight
          </label>
          <input
            type="number"
            className="form-control"
            id="weight"
            name="weight"
            aria-describedby="weightHelp"
            required
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
            name="remarks"
            aria-describedby="remarksHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="inputGroupFile02" className="form-label">
            Add Photo
          </label>
          <input
            type="file"
            name="photo"
            className="form-control"
            id="inputGroupFile02"
          />
        </div>
        <div className="d-flex mb-3 ">
          <button
            className="btn btn-secondary mx-2 "
            onClick={HandleGoBackClick}
          >
            Go Back
          </button>
          <button type="submit" className="btn btn-success mx-2">
            Create Dheri
          </button>
        </div>
      </form>
      <table className="purchase-book-table">
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Name of firm</th>
            <th>Jins ka naam</th>
            <th>Anumanit vazan</th>
            <th>Dar</th>
            <th>Remarks</th>
            <th>Action</th>
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
                <td>{val.dheri!=='Sarso'?val.rate:val.finalRate}</td>
                <td>{val.remarks}</td>
                <td>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(val)}
                  title="Delete this entry"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
                </td>
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
      <div className="d-grid gap-2 mt-4">
        <button
          className="btn btn-primary"
          type="button"
          onClick={HandleOnCreateParchi}
        >
          Save & Create Parchi
        </button>
      </div>
    </div>
  );
};

export default CreateReceipt;
