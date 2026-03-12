import React from 'react';
import { Loader2 } from 'lucide-react';

const Loader = ({ message = "Loading..." }) => {
    return (
        <div className="loader-container">
            <Loader2 className="spinner" size={48} />
            <p className="loader-text pulse-text">{message}</p>

            <div className="scanning-bars">
                <div className="bar bar1"></div>
                <div className="bar bar2"></div>
                <div className="bar bar3"></div>
            </div>
        </div>
    );
};

export default Loader;
