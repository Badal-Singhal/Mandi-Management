import { useState } from "react";
import { getProfileInfo } from "../API/Auth";
import { useNavigate } from "react-router-dom";

const Navbar = ({ isAuthenticated }) => {
  const [profile, setProfile] = useState([]);
  const navigate = useNavigate();

  const HandleProfileInfo = () => {
    const data = localStorage.getItem("user_id");
    let obj = { user_id: data };
    getProfileInfo(obj).then((res) => setProfile((val) => res.data));
  };

  const HandleLogout = () => {
    localStorage.clear("user_id");
    localStorage.clear("token");
    window.location.reload();
  };

  const HandleUpdateProfile=()=>{
    navigate("/update-Profile")
  }

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Boli Bandhu
        </a>
        {isAuthenticated && (
          <button
            onClick={HandleProfileInfo}
            className="navbar-toggler ms-auto"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasDarkNavbar"
            aria-controls="offcanvasDarkNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
        )}
        <div
          className="offcanvas offcanvas-end text-bg-dark"
          tabIndex={-1}
          id="offcanvasDarkNavbar"
          aria-labelledby="offcanvasDarkNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">
              Hello {profile[0]?.firmName}
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            />
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
                <button className="active" aria-current="page" data-bs-dismiss="offcanvas" onClick={HandleUpdateProfile}>
                  Update Profile
                </button>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Link
                </a>
                <button onClick={HandleLogout} className="btn btn-success">
                  Logout
                </button>
              </li>
              {/* <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </a>
                <ul className="dropdown-menu dropdown-menu-dark">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li> */}
            </ul>
            {/* <form className="d-flex mt-3" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-success" type="submit">
                Search
              </button>
            </form> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
