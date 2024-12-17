import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/index.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <Link to="/" className="nav-link">Accueil</Link>
            <Link to="/articles" className="nav-link">Articles</Link>
            <Link to="/search" className="nav-link">Recherche</Link>
        </nav>
    );
};

export default Navbar;
