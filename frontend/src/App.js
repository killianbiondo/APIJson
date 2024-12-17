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
                <Navbar/>
                <Routes>
                    <Route path="/" element={<h1 className="title">Bienvenue sur le site !</h1>}/>
                    <Route path="/articles" element={<ArticlesPage/>}/>
                    <Route path="/search" element={<SearchPage/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
