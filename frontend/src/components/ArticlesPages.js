import React, { useState, useEffect } from 'react';
import Card from './Card';
import ButtonComponent from './ButtonComponent';
import '../styles/index.css';

const ArticlesPage = () => {
    const [cities, setCities] = useState([]); // Liste des villes
    const [loading, setLoading] = useState(false); // Chargement
    const [visibleDetails, setVisibleDetails] = useState({}); // États des cartes visibles
    const [selectedCountry, setSelectedCountry] = useState(null); // Pays sélectionné

    // API_URL de base
    const API_URL = `http://api.zippopotam.us`;

    // Fonction pour récupérer les villes d'un pays avec un code postal
    const fetchCities = async (country, postalCode) => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/${country}/${postalCode}`);
            const data = await response.json();

            console.log(data); // Vérification de la réponse de l'API

            if (data && data.places) {
                const places = data.places.map((place) => ({
                    name: place['place name'],
                    longitude: place['longitude'],
                    latitude: place['latitude'],
                    state: place['state'],
                    country: data['country abbreviation'],
                    postalCode: place['postal code'], // Code postal
                }));
                setCities(places);
            } else {
                console.error('Aucune ville trouvée');
                setCities([]);
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des villes :", error);
        } finally {
            setLoading(false);
        }
    };

    // Gestion de la sélection du pays
    const handleCountrySelect = (country) => {
        console.log(`Pays sélectionné: ${country}`);
        setSelectedCountry(country);

        // Essaye avec un code postal par défaut (par exemple 90210 pour les États-Unis)
        fetchCities(country, '90210');  // Teste avec un code postal fixe pour l'instant
    };

    // Gestion de la visibilité des détails
    const toggleDetails = (cityName) => {
        setVisibleDetails((prevState) => ({
            ...prevState,
            [cityName]: !prevState[cityName], // Bascule l'état visible/caché
        }));
    };

    // Liste des pays à afficher
    const countries = [
        { code: 'us', name: 'États-Unis' },
        { code: 'fr', name: 'France' },
        { code: 'de', name: 'Allemagne' },
        { code: 'gb', name: 'Royaume-Uni' },
    ];

    return (
        <div className="container">
            {/* Affichage des boutons de pays */}
            <div className="button-container">
                {countries.map((country) => (
                    <ButtonComponent
                        key={country.code}
                        articleId={country.code}
                        onClick={() => handleCountrySelect(country.code)}
                    >
                        {country.name}
                    </ButtonComponent>
                ))}
            </div>

            {loading && <p className="text">Chargement des villes...</p>}

            {/* Affichage des villes lorsque un pays est sélectionné */}
            {selectedCountry && !loading && (
                <div className="cards-container">
                    {cities.length > 0 ? (
                        cities.map((city, index) => (
                            <div key={index} className="country-item">
                                <ButtonComponent
                                    articleId={city.name}
                                    onDetailsClick={() => toggleDetails(city.name)}
                                >
                                    {city.name}
                                </ButtonComponent>

                                {visibleDetails[city.name] && (
                                    <Card
                                        country={{
                                            name: city.name,
                                            region: city.state,
                                            country: city.country,
                                            postalCode: city.postalCode,
                                            coordinates: `Lat: ${city.latitude}, Long: ${city.longitude}`,
                                        }}
                                    />
                                )}
                            </div>
                        ))
                    ) : (
                        <p>Aucune ville trouvée pour ce pays.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default ArticlesPage;
