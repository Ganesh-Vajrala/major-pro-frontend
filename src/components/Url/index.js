import React from "react";
import './index.css'

const Url = ({onUrlChange}) =>{

    const handleInputChange = (event) =>{
        onUrlChange(event.target.value);
    }

    return(
        <div className="url-main-container">
            <div className="url-inner-container">
                <label htmlFor="UrlInput">Enter the URL</label>
                <input type="text" className="url-input-field" id="UrlInput" onChange={handleInputChange}/>
            </div>
        </div>
    )
}
export default Url