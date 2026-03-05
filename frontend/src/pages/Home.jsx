import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, FileText, Zap, Award } from 'lucide-react';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home-page">
            <div className="hero-section">
                <h1 className="hero-title">Optimize Your Resume with AI</h1>
                <p className="hero-subtitle">
                    Get actionable feedback, ATS match scoring, and tailored suggestions to land your dream job faster.
                </p>
                <button className="primary-btn pulse-btn" onClick={() => navigate('/analyzer')}>
                    Start Free Analysis <ArrowRight size={18} />
                </button>
            </div>

            <div className="features-section">
                <div className="feature-card">
                    <div className="feature-icon"><FileText size={32} /></div>
                    <h3>Smart Parsing</h3>
                    <p>Extract skills, experience, and education instantly.</p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon"><Zap size={32} /></div>
                    <h3>AI Suggestions</h3>
                    <p>Get line-by-line recommendations to improve impact.</p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon"><Award size={32} /></div>
                    <h3>ATS Scoring</h3>
                    <p>Know how well you match specific Job Descriptions.</p>
                </div>
            </div>
        </div>
    );
};

export default Home;
