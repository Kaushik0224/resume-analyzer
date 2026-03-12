import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

const SkillsList = ({ skills = [], missing = [] }) => {
    return (
        <div className="card skills-container">
            <h3 className="card-title">Skills Analysis</h3>

            <div className="skills-section">
                <h4><CheckCircle size={16} className="success-icon" /> Found Skills</h4>
                <div className="tags-container">
                    {skills.map((skill, idx) => (
                        <span key={idx} className="tag tag-found">{skill}</span>
                    ))}
                    {skills.length === 0 && <p className="text-muted">No key skills detected.</p>}
                </div>
            </div>

            {missing.length > 0 && (
                <div className="skills-section missing-section">
                    <h4><XCircle size={16} className="danger-icon" /> Recommended Additions</h4>
                    <div className="tags-container">
                        {missing.map((skill, idx) => (
                            <span key={idx} className="tag tag-missing">{skill}</span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SkillsList;
