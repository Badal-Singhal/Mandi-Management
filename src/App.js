
import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PurchaseBook from "./Components/PurchaseBook";
import BaardanaRegister from "./Components/BaardanaRegister";
import InwardStockRegister from "./Components/InwardStockRegister";
import CreateReceipt from "./Components/CreateReceipt";
import Register from "./Components/Register";
import Login from "./Components/Login";
import PrivateRoute from "./Components/PrivateRoute";
import { useState } from "react";
import Parchi from "./Components/Parchi";
import UpdateProfile from "./Components/UpdateProfile";
import ViewImage from "./Components/ViewImage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const AllRoutes = [
    {
      path: "/",
      element: <Home/>,
    },
    {
      path: "/purchase_book",
      element: <PurchaseBook/>,
    },
    {
      path: "baardana_register",
      element: <BaardanaRegister/>,
    },
    {
      path: "inward_stock_register",
      element: <InwardStockRegister/>,
    },
    {
      path: "/create-receipt",
      element: <CreateReceipt/>,
    },
    {
      path: "/parchi",
      element: <Parchi/>,
    },
    {
      path:"/update-Profile",
      element: <UpdateProfile/>
    },
    {
      path:"/view-image",
      element: <ViewImage/>
    }
  ];
  return (
    <div>
      <BrowserRouter>
        <Navbar isAuthenticated={isAuthenticated} />
        <Routes>
          {AllRoutes.map((val, index) => (
            <Route
              key={index}
              path={val.path}
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  {val.element}
                </PrivateRoute>
              }
            />
          ))}
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
