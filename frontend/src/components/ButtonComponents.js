import React from 'react';
import '../styles/index.css';

const ButtonComponent = ({ articleId, onDetailsClick }) => {
    return (
        <div className="button-container">
            <button
                onClick={() => {
                    console.log("Bouton cliqué pour l'ID :", articleId); // Débogage
                    onDetailsClick(); // Appeler la fonction de gestion
                }}
                className="button"
            >
                Voir les détails
            </button>
        </div>
    );
};

export default ButtonComponent;
