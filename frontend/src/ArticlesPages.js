import React, { useState, useEffect } from 'react';
import ButtonComponent from './ButtonComponents';

const ArticlesPage = () => {
    // États pour gérer la liste des articles, l'état de chargement, et l'article sélectionné
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedArticle, setSelectedArticle] = useState(null);

    // useEffect permet de récupérer les articles
    useEffect(() => {
        const fetchArticles = async () => {
            try {
                // Appel à l'API pour récupérer tous les articles
                const response = await fetch('https://jsonplaceholder.typicode.com/posts');
                const data = await response.json();
                setArticles(data);
                setLoading(false);
            } catch (error) {
                console.error("Erreur lors de la récupération des articles :", error);
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    // Fonction pour récupérer les détails d'un article spécifique
    const fetchArticleDetails = async (id) => {
        try {
            // Appel à l'API pour récupérer les détails d'un article en particulier
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
            const data = await response.json();
            setSelectedArticle(data);
        } catch (error) {
            console.error("Erreur lors de la récupération des détails de l'article :", error);
        }
    };

    // Si les articles sont en cours de chargement, affiche un message
    if (loading) {
        return <p>Chargement des articles...</p>;
    }

    return (
        <div style={styles.container}>
            <h1>Articles</h1>
            {/* Affichage de la liste des articles */}
            <ul style={styles.list}>
                {articles.slice(0,4).map(article => (
                    <li key={article.id} style={styles.item}>
                        <h2>{article.title}</h2>
                        <p>{article.body}</p>
                        {/* Bouton pour afficher les détails d'un article */}
                        <ButtonComponent articleId={article.id} onDetailsClick={fetchArticleDetails} />
                    </li>
                ))}
            </ul>

            {/* Affichage des détails de l'article sélectionné */}
            {selectedArticle && (
                <div style={styles.details}>
                    <h2>Détails de l'article</h2>
                    <p><strong>ID :</strong> {selectedArticle.id}</p>
                    <p><strong>Titre :</strong> {selectedArticle.title}</p>
                    <p><strong>Contenu :</strong> {selectedArticle.body}</p>
                </div>
            )}
        </div>
    );
};



// évite de faire un fichier css
const styles = {
    container: { padding: '2rem' },
    list: { listStyle: 'none', padding: 0 },
    item: { borderBottom: '1px solid #ccc', marginBottom: '1rem', paddingBottom: '1rem' },
    details: { marginTop: '2rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f9f9f9' },
};

export default ArticlesPage;
