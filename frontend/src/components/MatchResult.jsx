import React from 'react';
import { Target } from 'lucide-react';

const MatchResult = ({ matchPercentage, role }) => {
    return (
        <div className="card match-result-container">
            <div className="match-header">
                <Target size={24} className="match-icon" />
                <h3 className="card-title m-0">ATS Match</h3>
            </div>

            <p className="role-text">Assessed for: <strong>{role || "General Role"}</strong></p>

            <div className="progress-bar-container">
                <div
                    className="progress-bar-fill"
                    style={{ width: `${matchPercentage}%`, backgroundColor: matchPercentage > 75 ? '#10b981' : matchPercentage > 50 ? '#f59e0b' : '#ef4444' }}
                ></div>
            </div>
            <div className="match-footer">
                <span className="match-perc">{matchPercentage}% Match</span>
            </div>
        </div>
    );
};

export default MatchResult;
