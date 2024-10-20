import { useNavigate } from "react-router-dom";
import "./../App.css";
import { register } from "../API/Auth";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";

const Register = () => {
  const navigate = useNavigate();
  const [role,setRole]=useState();
  
  console.log(role);


  const HandleReceiptFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let obj = {};
    for (let [key, value] of formData.entries()) {
      obj[key] = value;
    }
    console.log(obj);
    // fetch("http://localhost:8080/mandi/register", {
    //   method:"POST",
    //   body:formData
    // })
    //   .then((res) => res.json())
    //   .then((data) => console.log(data));
    const result= await register(formData);
    console.log(result);
    toast(result.message);
    // toast(result.message);
    e.target.reset();
    navigate('/login',{ state: { message: result.message }});
  };

  const HandleGoBackClick = (e) => {
    navigate("/login");
  };

  const HandleRoleChange=(e)=>{
    setRole((val)=>e.target.value);
  }

  return (
    <div className="custom-receipt-container">
    <ToastContainer/>
      <form className="receipt-form" onSubmit={HandleReceiptFormSubmit}>
        <h2>Register</h2>
        <div className="mb-3">
          <label htmlFor="userName" className="form-label">
            Role
          </label>
          <select
            className="form-select"
            id="role"
            name="role"
            aria-label="Select Role"
            onChange={HandleRoleChange}
            defaultValue=""
            required
          >
            <option value="" disabled>
              Select Role...
            </option>
            <option value="trader">व्यापारी/Trader</option>
            <option value="accountant">मुनीम/Accountant</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="userName" className="form-label">
            Email/Phone Number
          </label>
          <input
            type="text"
            className="form-control"
            id="userName"
            name="userName"
            aria-describedby="userNameHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="userName" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            aria-describedby="userNameHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="firmName" className="form-label">
            Firm's Name
          </label>
          <input
            type="text"
            className="form-control"
            name="firmName"
            aria-describedby="firmNameHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="firmName" className="form-label">
            Firm's Address
          </label>
          <input
            type="text"
            className="form-control"
            id="firmAddress"
            name="firmAddress"
            aria-describedby="firmNameHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="rate" className="form-label">
            Mobile Number
          </label>
          <input
            type="text"
            name="mobileNumber"
            className="form-control"
            id="mobileNumber"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="weight" className="form-label">
            GST Number
          </label>
          <input
            type="text"
            className="form-control"
            id="GST Number"
            name="gstNumber"
            aria-describedby="weightHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="weight" className="form-label">
            PAN Number
          </label>
          <input
            type="text"
            className="form-control"
            id="panNumber"
            name="panNumber"
            aria-describedby="weightHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="inputGroupFile02" className="form-label">
            Upload PAN Card Photo
          </label>
          <input
            type="file"
            name="pan_photo"
            className="form-control"
            id="pan_photo"
          />
        </div>
        <div className="d-flex mb-3">
          <button
            className="btn btn-secondary mx-2 btn-lg"
            onClick={HandleGoBackClick}
          >
            Go Back
          </button>
          <button type="submit" className="btn btn-success mx-2 btn-lg">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
