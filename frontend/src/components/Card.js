import React from 'react';

const Card = ({ country }) => {
    const flagUrl = country.flag || `https://flagcdn.com/w320/${country.alpha2Code?.toLowerCase()}.png`;

    return (
        <div className="card">
            <h2>{country.name || 'Nom non disponible'}</h2>
            {flagUrl && (
                <img
                    src={flagUrl}
                    alt={`Drapeau de ${country.name || 'ce pays'}`}
                    className="flag"
                />
            )}
            <p><strong>Capitale :</strong> {country.capital || 'Non disponible'}</p>
            <p><strong>Population :</strong> {country.population ? country.population.toLocaleString() : 'Non disponible'}</p>
            <p><strong>Langues parlées :</strong> {country.languages || 'Non disponible'}</p>
        </div>
    );
};

export default Card;
