import { toast, ToastContainer } from "react-toastify";
import { login } from "../API/Auth";
import 'react-toastify/dist/ReactToastify.css';
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({setIsAuthenticated}) => {

  const myForm=useRef(null);
  const navigate=useNavigate();
  


  const HandleReceiptFormSubmit = async(e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const result=await login(formData)
    console.log(result)
    toast(result.message);
    if(result.resu){
      localStorage.setItem("token",result.data.token);
      localStorage.setItem("user_id",result.data.user_id)
      setIsAuthenticated(true);
      navigate('/',{ state: { message: result.message }});
    }
  };

  const HandleOnClear = () => {
    if (myForm.current) {
      myForm.current.reset();
    }
  };

  const HandleOnRegisterClick=()=>{
    navigate('/register');
  }

  return (
    <div className="custom-receipt-container">
      <ToastContainer/>
      <form ref={myForm} className="receipt-form" onSubmit={HandleReceiptFormSubmit}>
        <h2>Login</h2>
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
          />
        </div>
        <div className="d-flex mb-3">
          <button
            className="btn btn-secondary mx-2 btn-lg"
            onClick={HandleOnClear}
            type="button"
          >
            Clear
          </button>
          <button type="submit" className="btn btn-success mx-2 btn-lg">
            Submit
          </button>
          <button type="button" className="btn btn-primary mx-2 btn-lg" onClick={HandleOnRegisterClick}>
            Register Here
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
