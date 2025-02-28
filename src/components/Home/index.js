import React, {useState} from "react"
import './index.css'
import Platform from "../Platform";
import Url from "../Url";
import Model from "../Model";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPlainComments, setProductDetails, setReviewsForModel,setSummerization } from "../../redux/productSlice";

const Home = () =>{
    const dispatch = useDispatch()
    const [selectedPlatform, setSelectedPlatform] = useState("");
    const [selectedUrl, setSelectedUrl] = useState("");
    const [selectedModel, setSelectedModel] = useState("");
    const [responseData, setResponseData] = useState(null);



    const navigate = useNavigate()

    const handleAnalyzeClick = async () =>{
        
        try{
            const response = await fetch("http://localhost:5000/analyze",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({
                    platform:selectedPlatform,
                    link:selectedUrl,
                    model:selectedModel
                }),
            });
            if(!response.ok){
                throw new Error("NetWork Response was not ok!");

            }
            const data = await response.json();
            setResponseData(data);
            dispatch(setProductDetails(data.product_details));
            dispatch(setReviewsForModel({ model: data.model_used, reviews: data.reviews }));
            dispatch(setPlainComments(data.plain_comments));
            dispatch(setSummerization(data.product_summary))
            console.log(data);
            navigate("/analysis/amazon");
        }catch(error){
            console.error(error);
        }

        //navigate("/analysis");
    }

    const handleUrlChange = (newUrl) =>{
        setSelectedUrl(newUrl);
    }

    return(
        <div className="main-home-container">
            <div className="home-inner-container">
                <div className="home-main-head-container">
                    <h1 className="home-main-head">
                        Sentimental Analysis
                    </h1>
                </div>
            <Platform onSelect={setSelectedPlatform} />
            <Url onUrlChange = {handleUrlChange}/>
            <Model selectedModel={selectedModel} onSelect={setSelectedModel}/>
            <div className="analyze-button-container">
                
                <button onClick={handleAnalyzeClick} className="analyze-button">Analyze</button>
            </div>
            </div>
        </div>
    )
}
export default Home;