import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Analyzer from './pages/Analyzer';
import Results from './pages/Results';

function App() {
    return (
        <BrowserRouter>
            <div className="app-container">
                <header className="navbar">
                    <div className="logo-container">
                        <span className="logo-text">AI Resume Pro</span>
                    </div>
                    <nav className="nav-links">
                        <a href="/">Home</a>
                        <a href="/analyzer">Analyze</a>
                    </nav>
                </header>

                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/analyzer" element={<Analyzer />} />
                        <Route path="/results" element={<Results />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;
