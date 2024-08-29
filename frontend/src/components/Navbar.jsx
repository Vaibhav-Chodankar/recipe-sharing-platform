import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.min.js';

function Navbar() {
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg fixed-top bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Recipe Sharing Platform</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {!isAuthenticated ? (
                            <>
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                </ul>
                                <ul className="navbar-nav d-flex">
                                    <li className="nav-item me-3">
                                        <Link className="btn btn-sm btn-outline-primary" to="/login">Login</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="btn btn-sm btn-outline-primary" to="/register">Register</Link>
                                    </li>
                                </ul>
                            </>
                        ) : (
                            <>
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/">All Recipes</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/my-recipes">My Recipes</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/collections">My Collections</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/add-recipe">Add Recipe</Link>
                                    </li>
                                </ul>
                                <ul className="d-flex navbar-nav">
                                    <li className="nav-item">
                                        <button className="btn btn-sm btn-outline-danger" onClick={handleLogout}>Logout</button>
                                    </li>
                                </ul>

                            </>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
