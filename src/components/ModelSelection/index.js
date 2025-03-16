import React from "react";
import './index.css'

const ModelSelection = ({ modelOptions, selectedModels, handleModelSelection }) => {
    return (
        <div className="model-selection-container">
            <h3>Select Sentiment Analysis Models:</h3>
            <div className="model-options">
                {modelOptions.map((model) => (
                    <label key={model} className="model-option">
                        <input
                            type="checkbox"
                            checked={selectedModels.includes(model)}
                            onChange={() => handleModelSelection(model)}
                        />
                        {model}
                    </label>
                ))}
            </div>
        </div>
    );
};

export default ModelSelection;
