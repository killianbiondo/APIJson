import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ArticlesPage from './components/ArticlesPages';
import SearchPage from './components/SearchPage';
import './styles/App.css';

function App() {
    return (
        <Router>
            <div className="app-container">
                <Navbar />
                <Routes>
                    {/* Page d'accueil */}
                    <Route
                        path="/"
                        element={
                            <div className="home-page">
                                <h1 className="home-title">Bienvenue sur notre site d'informations !</h1>
                                <p className="home-description">
                                    Explorez une collection d'articles intéressants et accédez à des outils pour rechercher
                                    des informations spécifiques. Nous sommes ravis de vous accueillir !
                                </p>
                            </div>
                        }
                    />
                    {/* Autres pages */}
                    <Route path="/articles" element={<ArticlesPage />} />
                    <Route path="/search" element={<SearchPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
