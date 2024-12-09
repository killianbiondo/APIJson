import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import ArticlesPage from './ArticlesPages';
import SearchPage from './SearchPage';

function App() {
    return (
        <Router>
            <div>
                <Navbar />
                <Routes>
                    <Route path="/" element={<h1>Bienvenue sur le site !</h1>} />
                    <Route path="/articles" element={<ArticlesPage />} />
                    <Route path="/search" element={<SearchPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
