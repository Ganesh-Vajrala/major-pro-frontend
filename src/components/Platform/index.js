import React, { useState } from "react";
import './index.css';

const platforms = [
    { id: 1, name: "amazon", src: "https://www.logo.wine/a/logo/Amazon_(company)/Amazon_(company)-Logo.wine.svg" },
    { id: 2, name: "flipkart", src: "https://www.logo.wine/a/logo/Flipkart/Flipkart-Logo.wine.svg" },
    { id: 3, name: "instagram", src: "https://www.logo.wine/a/logo/Instagram/Instagram-Wordmark-Logo.wine.svg" }
];

const Platform = ({ onSelect }) => {
    const [selectedId, setSelectedId] = useState(null);

    const handleSelect = (id, name) => {
        setSelectedId(prevId => {
            const newId = prevId === id ? null : id; 
            onSelect(newId ? name : "");            
            return newId;
        });
    };

    return (
        <div className="platform-container">
            {platforms.map(platform => (
                <div
                    key={platform.id}
                    className={`platform-item-container ${selectedId === platform.id ? 'selected' : ''}`}
                    onClick={() => handleSelect(platform.id, platform.name)}
                >
                    <img className="platform-img" src={platform.src} alt={platform.name} />
                </div>
            ))}
        </div>
    );
};

export default Platform;
