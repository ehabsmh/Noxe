import React, { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { NoxeContext } from "./Context/Store";

interface Props {
  userData: null | object;
  logout: () => void;
}

const Navbar: React.FC<Props> = ({ userData, logout }) => {
  const context = useContext(NoxeContext);
  return (
    <>
      <nav
        ref={context.navbarRef}
        className="navbar navbar-expand-lg bg-transparent navbar-dark"
      >
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold fs-3" to={"home"}>
            Noxe
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {userData ? (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to={"home"}
                    >
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      aria-current="page"
                      to={"movies"}
                    >
                      Movies
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      aria-current="page"
                      to={"tvseries"}
                    >
                      Tv Series
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to={"motd"}>
                      Movie of the day
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to={"about"}>
                      About
                    </Link>
                  </li>
                  <li className="nav-item mb-3 mb-lg-0">
                    <Link
                      className="nav-link "
                      aria-current="page"
                      to={"networks"}
                    >
                      Networks
                    </Link>
                  </li>
                </>
              ) : (
                ""
              )}
            </ul>
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item mb-3 mb-lg-0 d-flex align-items-center">
                <i className="fa-brands fa-facebook text-white fs-5 mx-2"></i>{" "}
                <i className="fa-brands fa-spotify text-white fs-5 mx-2"></i>{" "}
                <i className="fa-brands fa-instagram text-white fs-5 mx-2"></i>{" "}
                <i className="fa-brands fa-youtube text-white fs-5 mx-2"></i>{" "}
              </li>
              {userData ? (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      aria-current="page"
                      to={"/profile"}
                    >
                      My Profile
                    </Link>
                  </li>
                  <li className="nav-item">
                    <span
                      onClick={logout}
                      className="nav-link logout-btn"
                      aria-current="page"
                    >
                      Logout
                    </span>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item ms-lg-5">
                    <Link className="nav-link" aria-current="page" to={"login"}>
                      Login
                    </Link>
                  </li>
                  <li className="nav-item ">
                    <Link
                      className="nav-link"
                      aria-current="page"
                      to={"register"}
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
