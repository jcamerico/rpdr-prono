import React from "react";
import { NavLink } from "react-router-dom";

// To review, logoutshould not be a link, should be a called to the back with an onClick

function Header(props) {
    return <div>
        <header>
            <div className="px-3 py-2 text-white">
                <div className="container">
                    <nav className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <h5 className="d-flex align-items-center header-title my-2 my-lg-0 me-lg-auto text-decoration-none">RuPaul's Drag Race Forecast</h5>
                        <NavLink to="/" className="nav-link">Home</NavLink>
                        <NavLink to="/results" className="nav-link">Results</NavLink>
                    </nav>
                </div>
            </div>
        </header>
        <div>
            <img src="img/queens.jpg" />
        </div>
    </div>;
}

export default Header;