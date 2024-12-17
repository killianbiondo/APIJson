import React from 'react';
import '../styles/index.css'; // Import des styles CSS globaux

const ButtonComponent = ({ articleId, onDetailsClick }) => {
    return (
        <div className="button-container">
            <button onClick={() => onDetailsClick(articleId)} className="button">
                {articleId ? "Voir les détails" : "Afficher tous les pays"}
            </button>
        </div>
    );
};

export default ButtonComponent;
