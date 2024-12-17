import React, { useState } from 'react';

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
        <div style={styles.container}>
            <h1>Recherche d'articles par ID</h1>
            <input
                type="text"
                placeholder="Entrez un ID"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                style={styles.input}
            />
            <button onClick={handleSearch} style={styles.button}>Rechercher</button>
            {error && <p style={styles.error}>{error}</p>}
            {article && (
                <div style={styles.result}>
                    <h2>{article.title}</h2>
                    <p>{article.body}</p>
                </div>
            )}
        </div>
    );
};

// évite de faire un fichier css
const styles = {
    container: { padding: '2rem', textAlign: 'center' },
    input: {
        padding: '0.5rem',
        fontSize: '1rem',
        marginRight: '1rem',
        width: '200px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    button: {
        padding: '0.5rem 1rem',
        fontSize: '1rem',
        backgroundColor: '#007BFF',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    error: { color: 'red', marginTop: '1rem' },
    result: {
        marginTop: '2rem',
        padding: '1rem',
        border: '1px solid #ccc',
        borderRadius: '5px',
        backgroundColor: '#f9f9f9',
    },
};

export default SearchPage;
