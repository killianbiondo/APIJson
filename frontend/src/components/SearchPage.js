import React, { useState, useEffect } from 'react';
import Card from './Card';
import '../styles/index.css';

const SearchPage = () => {
    const [searchInput, setSearchInput] = useState('');
    const [countryInput, setCountryInput] = useState('us'); // Valeur par défaut pour les USA
    const [city, setCity] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (!searchInput.trim()) {
            setError('Veuillez entrer un code postal valide.');
            setCity(null);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // Construire l'URL en fonction du pays et du code postal
            const response = await fetch(`http://api.zippopotam.us/${countryInput}/${searchInput}`);
            if (!response.ok) {
                throw new Error('Aucune ville trouvée pour ce code postal.');
            }
            const data = await response.json();
            const place = data.places[0]; // Première ville associée au code postal

            setCity({
                name: place['place name'],
                region: place['state'],
                country: data['country abbreviation'],
                coordinates: `Lat: ${place.latitude}, Long: ${place.longitude}`,
            });
        } catch (err) {
            setError(err.message);
            setCity(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h1 className="text">Rechercher une ville par code postal</h1>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Entrez un code postal (ex: 90210)"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="input"
                />

                <select
                    value={countryInput}
                    onChange={(e) => setCountryInput(e.target.value)}
                    className="input"
                >
                    <option value="us">États-Unis</option>
                    <option value="fr">France</option>
                    <option value="de">Allemagne</option>
                    <option value="gb">Royaume-Uni</option>
                    {/* Ajouter d'autres pays si nécessaire */}
                </select>

                <button onClick={handleSearch} className="button">Rechercher</button>
            </div>

            {loading && <p className="text">Chargement...</p>}
            {error && <p className="error">{error}</p>}

            {city && (
                <Card
                    country={{
                        name: city.name,
                        region: city.region,
                        country: city.country,
                        coordinates: city.coordinates,
                    }}
                />
            )}
        </div>
    );
};

export default SearchPage;
