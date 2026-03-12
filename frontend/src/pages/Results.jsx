import React from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import ScoreCard from '../components/ScoreCard';
import SkillsList from '../components/SkillsList';
import SuggestionsPanel from '../components/SuggestionsPanel';
import MatchResult from '../components/MatchResult';

const Results = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const result = location.state?.result;

    // Fallback if accessed directly without data
    if (!result) {
        return <Navigate to="/analyzer" />;
    }

    return (
        <div className="results-page fade-in">
            <header className="results-header">
                <h2>Analysis Complete</h2>
                <button className="secondary-btn" onClick={() => navigate('/analyzer')}>Analyze Another</button>
            </header>

            <div className="results-grid">
                <div className="left-column">
                    <ScoreCard score={result.overallScore} />
                    <MatchResult matchPercentage={result.atsMatch} role={result.assumedRole} />
                    <SkillsList skills={result.extractedSkills} missing={result.missingSkills} />
                </div>

                <div className="right-column">
                    <SuggestionsPanel suggestions={result.suggestions} />
                </div>
            </div>
        </div>
    );
};

export default Results;
