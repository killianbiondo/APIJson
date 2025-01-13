import React from 'react';
import '../styles/index.css';

const Card = ({ country }) => {
    return (
        <div className="card">
            <h2 className="card-title">{country.name}</h2>
            <p><strong>Région :</strong> {country.region || 'Non disponible'}</p>
            <p><strong>Pays :</strong> {country.country || 'Non disponible'}</p>
            <p><strong>Coordonnées :</strong> {country.coordinates || 'Non disponible'}</p>
        </div>
    );
};

export default Card;
