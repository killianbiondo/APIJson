import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/index.css';

const Navbar = () => {
    const [isMobile, setIsMobile] = useState(false); // Utilisé pour les petits écrans (menu hamburger)

    const toggleMenu = () => {
        setIsMobile(!isMobile); // Change l'état du menu
    };

    return (
        <nav className={`navbar ${isMobile ? 'mobile' : ''}`}>
            <div className="logo">
                <Link to="/" className="nav-link">MonSite</Link>
            </div>
            <div className={`nav-links ${isMobile ? 'show' : ''}`}>
                <Link to="/" className="nav-link">Accueil</Link>
                <Link to="/articles" className="nav-link">Articles</Link>
                <Link to="/search" className="nav-link">Recherche</Link>
            </div>
            <div className="hamburger" onClick={toggleMenu}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
        </nav>
    );
};

export default Navbar;
