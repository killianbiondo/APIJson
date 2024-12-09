import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav style={styles.navbar}>
            <Link to="/" style={styles.link}>Accueil</Link>
            <Link to="/articles" style={styles.link}>Articles</Link>
            <Link to="/search" style={styles.link}>Recherche</Link>
        </nav>
    );
};


// évite de faire un fichier css
const styles = {
    navbar: {
        backgroundColor: '#282c34',
        padding: '1rem',
        display: 'flex',
        gap: '1rem',
    },
    link: {
        color: 'white',
        textDecoration: 'none',
        fontSize: '1.2rem',
    },
};

export default Navbar;
