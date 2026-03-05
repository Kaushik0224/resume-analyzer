import React, { useCallback, useState } from 'react';
import { UploadCloud, FileType } from 'lucide-react';

const UploadBox = ({ onUpload }) => {
    const [dragActive, setDragActive] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleDrag = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    }, []);

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleFile = (file) => {
        setSelectedFile(file);
        // Simulate slight delay before starting upload visually
        setTimeout(() => {
            onUpload(file);
        }, 600);
    };

    return (
        <div
            className={`upload-box ${dragActive ? 'drag-active' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
        >
            <input type="file" id="resume-upload" className="file-input" onChange={handleChange} accept=".pdf,.doc,.docx" />
            <label htmlFor="resume-upload" className="upload-label">
                <UploadCloud size={48} className="upload-icon" />
                {selectedFile ? (
                    <div className="file-selected">
                        <FileType size={24} />
                        <span>{selectedFile.name}</span>
                    </div>
                ) : (
                    <>
                        <p className="upload-text"><strong>Click to upload</strong> or drag and drop</p>
                        <p className="upload-hint">PDF, DOCX up to 5MB</p>
                    </>
                )}
            </label>
        </div>
    );
};

export default UploadBox;
