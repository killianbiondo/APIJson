import React from 'react';
import '../styles/index.css';

const Card = ({ country }) => {
    return (
        // Structure de la carte avec les informations d'un pays'
        <div className="card">
            <h2 className="card-title">{country.name}</h2>
            <p><strong>Capitale :</strong> {country.capital || 'Non disponible'}</p>
            <p><strong>Région :</strong> {country.region || 'Non disponible'}</p>
            <p><strong>Population :</strong> {country.population.toLocaleString() || 'Non disponible'}</p>
            <p><strong>Langues :</strong> {country.languages
                ? country.languages.map((lang) => lang.name).join(', ')
                : 'Non disponible'}
            </p>
        </div>
    );
};

export default Card;
