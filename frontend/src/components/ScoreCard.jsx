import React from 'react';
import { formatScore } from '../utils/formatScore';

const ScoreCard = ({ score }) => {
    const { colorClass, label } = formatScore(score);

    return (
        <div className="card scorecard-container">
            <h3 className="card-title">Overall Resume Score</h3>
            <div className={`score-circle ${colorClass}`}>
                <span className="score-value">{score}</span>
                <span className="score-max">/100</span>
            </div>
            <p className={`score-label ${colorClass}-text`}>{label}</p>
        </div>
    );
};

export default ScoreCard;
