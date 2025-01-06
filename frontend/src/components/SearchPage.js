import React, { useState } from 'react';
import Card from './Card';
import '../styles/index.css';

const SearchById = () => {
    const [searchInput, setSearchInput] = useState(''); // Stocke l'entrée utilisateur
    const [country, setCountry] = useState(null); // Stocke les données du pays recherché
    const [error, setError] = useState(null); // Stocke les erreurs éventuelles
    const [loading, setLoading] = useState(false); // Indique si une requête est en cours

    const API_KEY = '47c9ff6f9f566f1c773e324e341cb15a';
    const API_URL = 'https://api.countrylayer.com/v2';

    const handleSearch = async () => {
        if (!searchInput.trim()) {
            setError('Veuillez entrer un code ou un nom de pays valide.');
            setCountry(null);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            let response;
            if (searchInput.length === 2 || searchInput.length === 3) {
                // Recherche par code (alpha-2 ou alpha-3)
                response = await fetch(`${API_URL}/alpha/${searchInput}?access_key=${API_KEY}`);
            } else {
                // Recherche par nom
                response = await fetch(`${API_URL}/name/${searchInput}?access_key=${API_KEY}`);
            }

            if (!response.ok) {
                throw new Error("Aucun pays trouvé pour cette recherche.");
            }

            const data = await response.json();
            const countryData = Array.isArray(data) ? data[0] : data; // Gère le cas où l'API retourne un tableau (par nom)

            setCountry(countryData); // Met à jour les données du pays
        } catch (err) {
            setError(err.message); // Capture les erreurs
            setCountry(null);
        } finally {
            setLoading(false); // Arrête le chargement
        }
    };

    return (
        <div className="container">
            <h1 className="text">Rechercher un pays</h1>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Entrez un code (FR/FRA) ou un nom de pays (France)"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value.trim())}
                    className="input"
                />
                <button onClick={handleSearch} className="button">Rechercher</button>
            </div>

            {loading && <p className="text">Chargement...</p>}
            {error && <p className="error">{error}</p>}

            {country && (
                <Card
                    country={{
                        name: country.name || 'Nom non disponible',
                        capital: country.capital || 'Non disponible',
                        population: country.population || 0,
                        languages: country.languages?.map((lang) => lang.name).join(', ') || 'Non disponible',
                        flag: country.flag || null,
                    }}
                />
            )}
        </div>
    );
};

export default SearchById;
