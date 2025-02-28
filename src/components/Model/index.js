import React from "react";
import './index.css'
const models = [
    { id: 1, name: "SVM" },
    { id: 2, name: "BERT" },
    { id: 3, name: "Linear Regression" },
    { id: 4, name:"VADER"}
];

const Model = ({ selectedModel, onSelect }) =>{
    return(
        <div className="model-outer-container">
            <p>Choose ML Model</p>
        <div className="model-main-container">
            {models.map((model) => (
                <label key={Model.id} className="radio-label">
                    <input
                        type="radio"
                        name="model"
                        value={model.name}
                        checked={selectedModel === model.name}
                        onChange={() => onSelect(model.name)}
                        className="radio-input"
                        />
                    <span  className="custom-radio"></span>
                    {model.name}
                </label>
            ))}
        </div>
            </div>
    )
}

export default Model