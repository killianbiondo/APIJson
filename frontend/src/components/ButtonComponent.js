import React from 'react';

const ButtonComponent = ({ articleId, onDetailsClick }) => (
    <button onClick={onDetailsClick}>
        {articleId ? `Voir détails de ${articleId}` : "Voir les pays"}
    </button>
);

export default ButtonComponent;
