import React from 'react';
import { AlertCircle, Lightbulb, ChevronRight } from 'lucide-react';

const SuggestionsPanel = ({ suggestions = [] }) => {
    return (
        <div className="card suggestions-container">
            <div className="card-header">
                <Lightbulb className="header-icon" />
                <h3 className="card-title m-0">Actionable Suggestions</h3>
            </div>

            <div className="suggestions-list">
                {suggestions.map((sug, idx) => (
                    <div key={idx} className={`suggestion-item ${sug.critical ? 'critical' : 'standard'}`}>
                        <div className="sug-icon-wrapper">
                            {sug.critical ? <AlertCircle size={20} /> : <ChevronRight size={20} />}
                        </div>
                        <div className="sug-content">
                            <h4>{sug.title}</h4>
                            <p>{sug.detail}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SuggestionsPanel;
