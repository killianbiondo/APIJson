import React from 'react';

const ButtonComponent = ({ articleId, onDetailsClick }) => {
    return (
        <div style={styles.buttonContainer}>
            <button onClick={() => onDetailsClick(articleId)} style={styles.button}>
                Voir les détails
            </button>
        </div>
    );
};


// évite de faire un fichier css
const styles = {
    buttonContainer: { display: 'flex', gap: '1rem', marginTop: '0.5rem' },
    button: { padding: '0.5rem 1rem', cursor: 'pointer', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px' },
};

export default ButtonComponent;
