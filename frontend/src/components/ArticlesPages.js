import React, { useState, useEffect } from 'react';
import Card from './Card';
import ButtonComponent from './ButtonComponents';
import '../styles/index.css';

const ArticlesPage = () => {
    const [countries, setCountries] = useState([]); // Liste des pays
    const [loading, setLoading] = useState(true); // Chargement initial
    const [visibleDetails, setVisibleDetails] = useState({}); // États des cartes visibles

    const API_KEY = 'ca06fe1d47a0e69c0733182637f302d3';
    const API_URL = `https://api.countrylayer.com/v2/all?access_key=${API_KEY}`;

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch(API_URL);
                const data = await response.json();
                setCountries(data);
                setLoading(false);
            } catch (error) {
                console.error("Erreur lors de la récupération des pays :", error);
                setLoading(false);
            }
        };

        fetchCountries();
    }, [API_URL]);

    if (loading) {
        return <p className="text">Chargement...</p>;
    }

    // Gestion de la visibilité des détails
    const toggleDetails = (alpha3Code) => {
        setVisibleDetails((prevState) => ({
            ...prevState,
            [alpha3Code]: !prevState[alpha3Code], // Bascule l'état visible/caché
        }));
    };

    return (
        <div className="container">
            <div className="cards-container">
                {Array.isArray(countries) && countries.map((country) => (
                    <div key={country.alpha3Code} className="country-item">
                        <ButtonComponent
                            articleId={country.alpha3Code}
                            onDetailsClick={() => toggleDetails(country.alpha3Code)}
                        />
                        {visibleDetails[country.alpha3Code] && (
                            <Card country={country}/>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
export default ArticlesPage;
