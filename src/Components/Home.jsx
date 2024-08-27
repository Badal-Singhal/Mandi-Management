import { useLocation, useNavigate } from 'react-router-dom';
import './../App.css'; 
import { toast, ToastContainer } from 'react-toastify';
import { useEffect } from 'react';

const Home = () => {
    const navigate=useNavigate();
    const location=useLocation();
    console.log(location);

    useEffect(()=>{
      if(location.state && location.state.message){
        toast(location.state.message);
        navigate(location.pathname, { replace: true, state: {} });
      }
    },[location])

    const HandlePurchaseBookClick=()=>{
        navigate('/purchase_book');
    }

    const HandleBaardanaRegisterClick=()=>{
        navigate('/baardana_register');
    }

    const HandleInwardStockClick=()=>{
        navigate('/inward_stock_register');
    }

  return (
    <div className="d-flex gap-2 home-buttons-container">
      <ToastContainer/>
      <button className="btn btn-primary home-button" type="button" onClick={HandlePurchaseBookClick}>
        PURCHASE BOOK
      </button>
      <button className="btn btn-primary home-button" type="button" onClick={HandleBaardanaRegisterClick}>
        BAARDANA REGISTER
      </button>
      <button className="btn btn-primary home-button" type="button" onClick={HandleInwardStockClick}>
        INWARD STOCK REGISTER
      </button>
    </div>
  );
};

export default Home;
