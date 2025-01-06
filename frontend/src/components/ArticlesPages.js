import React, { useState, useEffect } from 'react';
import ButtonComponent from './ButtonComponents';
import '../styles/index.css';

const ArticlesPage = () => {
    // États
    const [countries, setCountries] = useState([]); // Liste des pays
    const [loading, setLoading] = useState(true); // Chargement initial
    const [showCountries, setShowCountries] = useState(false); // Contrôle de l'affichage des pays
    const [selectedCountry, setSelectedCountry] = useState(null); // Pays sélectionné

    // Clé API et URL
    const API_KEY = 'ca06fe1d47a0e69c0733182637f302d3';
    const API_URL = `https://api.countrylayer.com/v2/all?access_key=${API_KEY}`;

    // Récupérer la liste des pays
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch(API_URL);
                const data = await response.json();
                console.log("Données des pays :", data); // Vérifiez la structure des données
                setCountries(data); // Mise à jour de la liste des pays
                setLoading(false);
            } catch (error) {
                console.error("Erreur lors de la récupération des pays :", error);
                setLoading(false); // Gestion de l'erreur
            }
        };

        fetchCountries(); // API pour récupérer les pays
    }, [API_URL]);

    // Si en cours de chargement
    if (loading) {
        return <p className="text">Chargement...</p>;
    }

    // Afficher la liste des pays
    const handleShowCountries = () => {
        setShowCountries(true);
    };

    // Afficher les détails d'un pays
    const handleCountryClick = (country) => {
        setSelectedCountry(country); // Met à jour le pays sélectionné
    };

    return (
        <div className="container">
            {!showCountries && (
                <ButtonComponent
                    articleId={null}
                    onDetailsClick={handleShowCountries}
                />
            )}
            {showCountries && (
                <>
                    <ul className="list">
                        {countries.map((country) => (
                            <li key={country.alpha3Code} className="item">
                                <h2 className="text">{country.name}</h2>
                                {/* Bouton pour afficher les détails */}
                                <ButtonComponent
                                    articleId={country.alpha3Code} // Utilisé pour identifier le pays
                                    onDetailsClick={() => handleCountryClick(country)}
                                />
                            </li>
                        ))}
                    </ul>
                    {selectedCountry && (
                        <div className="details">
                            <h2 className="text">Détails pour : {selectedCountry.name}</h2>
                            <p className="text"><strong>Capitale :</strong> {selectedCountry.capital || 'Non disponible'}</p>
                            <p className="text"><strong>Région :</strong> {selectedCountry.region || 'Non disponible'}</p>
                            <p className="text"><strong>Population :</strong> {selectedCountry.population || 'Non disponible'}</p>
                            <p className="text">
                                <strong>Langues :</strong>{' '}
                                {selectedCountry.languages
                                    ? selectedCountry.languages
                                        .map((lang) => lang.name)
                                        .join(', ')
                                    : 'Non disponible'}
                            </p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default ArticlesPage;
