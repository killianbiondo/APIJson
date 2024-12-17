import React, { useState } from 'react';
import '../styles/index.css';

const SearchPage = () => {
    const [searchId, setSearchId] = useState('');
    const [article, setArticle] = useState(null);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        if (!searchId || isNaN(searchId) || searchId < 1 || searchId > 500) {
            setError("Veuillez entrer un ID valide entre 1 et 500.");
            setArticle(null);
            return;
        }

        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${searchId}`);
            if (!response.ok) {
                throw new Error("Aucun article trouvé pour cet ID.");
            }
            const data = await response.json();
            setArticle(data);
            setError(null);
        } catch (err) {
            setError(err.message);
            setArticle(null);
        }
    };

    return (
        <div className="search-container">
            <h1 className="text">Recherche d'articles par ID</h1>
            <input
                type="text"
                placeholder="Entrez un ID"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="input"
            />
            <button onClick={handleSearch} className="button">Rechercher</button>
            {error && <p className="error text">{error}</p>}
            {article && (
                <div className="result">
                    <h2 className="text">{article.title}</h2>
                    <p className="text">{article.body}</p>
                </div>
            )}
        </div>
    );
};

export default SearchPage;
