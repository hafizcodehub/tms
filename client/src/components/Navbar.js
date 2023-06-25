import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [auth, setAuth] = useState(localStorage.getItem('user'));
  const role = auth ? JSON.parse(auth).role : null;

  const navigate = useNavigate();

  const clearLocalStorage = () => {
    localStorage.clear('user');
    setAuth(null);
    navigate('/');
  };

  useEffect(() => {
    setAuth(localStorage.getItem('user'));
  }, [auth, navigate]);

  const handleLinkClick = () => {
    const navbarCollapse = document.getElementById('navbarSupportedContent');
    if (navbarCollapse.classList.contains('show')) {
      navbarCollapse.classList.remove('show');
    }
  };

  const renderNavbarOptions = () => {
    if (role === 'admin') {
      return (
        <>
          <li className="nav-item">
            <Link className="nav-link text-light fw-bold" aria-current="page" to="/Dashboard" onClick={handleLinkClick}>
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-light fw-bold" aria-current="page" to="/clients" onClick={handleLinkClick}>
              Users
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-light fw-bold" aria-current="page" to="/tickets" onClick={handleLinkClick}>
              Tickets
            </Link>
          </li>
          <li>
          <Link className="nav-link text-light fw-bold" aria-current="page" to="/AssignedTicket" onClick={handleLinkClick}>
            Assigned 
          </Link>
          </li>
        </>
      );
    } else if (role === 'user') {
      return (
        <li className="nav-item">
          <Link className="nav-link text-light fw-bold" aria-current="page" to="/tickets" onClick={handleLinkClick}>
            Tickets
          </Link>
        </li>
      );
    } else if (role === 'client') {
      return (
        <li className="nav-item">
          <Link className="nav-link text-light fw-bold" aria-current="page" to="/AssignedTicket" onClick={handleLinkClick}>
            Assigned
          </Link>
        </li>
      );
    } else {
      return null; // Hide the navbar options if the role is not set or invalid
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary shadow">
      <div className="container">
        <img src="./images/logo.png" alt="" className="img-fluid" height={80} width={80} />

        {auth ? (
          <>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className="fa-brands fa-slack text-light"></i>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav m-auto mb-2 mb-lg-0">
                {renderNavbarOptions()}
              </ul>
              <form className="d-flex">
                <button className="btn bg-secondary text-light" onClick={clearLocalStorage}>
                  Logout
                </button>
              </form>
            </div>
          </>
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar;
