import React, { useState, useEffect } from 'react';
import '../styles/index.css';

const SearchById = () => {
    const [searchId, setSearchId] = useState(''); // Stocke l'ID entré dans la barre de recherche
    const [country, setCountry] = useState(null); // Stocke les données du pays recherché
    const [error, setError] = useState(null); // Stocke les erreurs éventuelles
    const [loading, setLoading] = useState(false); // Indique si une requête est en cours

    // Remplacez par votre clé API
    const API_KEY = 'ca06fe1d47a0e69c0733182637f302d3';
    const API_URL = `https://api.countrylayer.com/v2/alpha`;

    // Fonction pour rechercher un pays par son ID
    const handleSearch = async () => {
        if (!searchId) {
            setError('Veuillez entrer un ID valide.');
            setCountry(null);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_URL}/${searchId}?access_key=${API_KEY}`);
            if (!response.ok) {
                throw new Error("Aucun pays trouvé pour cet ID.");
            }
            const data = await response.json();
            setCountry(data); // Met à jour les données du pays
        } catch (err) {
            setError(err.message); // Capture les erreurs
            setCountry(null);
        } finally {
            setLoading(false); // Arrête le chargement
        }
    };

    return (
        <div className="container">
            <h1 className="text">Rechercher un pays par ID</h1>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Entrez l'ID du pays (ex: FRA)"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value.toUpperCase())} // Stocke l'ID en majuscules
                    className="input"
                />
                <button onClick={handleSearch} className="button">Rechercher</button>
            </div>

            {loading && <p className="text">Chargement...</p>}
            {error && <p className="error">{error}</p>}

            {country && (
                <div className="details">
                    <h2 className="text">Détails pour : {country.name}</h2>
                    <p className="text"><strong>Capitale :</strong> {country.capital || 'Non disponible'}</p>
                </div>
            )}
        </div>
    );
};

export default SearchById;
