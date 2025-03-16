import React, {useState, useRef, useEffect} from "react"
import './index.css'
import Platform from "../Platform";
import Url from "../Url";
import Model from "../Model";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { persistor } from "../../redux/store";
import { setPlainComments, setProductDetails, setReviewsForModel,setSummerization } from "../../redux/productSlice";
import toast, { Toaster } from 'react-hot-toast';
import {HashLoader} from 'react-spinners';
import { IoIosBarcode } from "react-icons/io";
import { AiOutlineTeam } from "react-icons/ai";
import { BsStack } from "react-icons/bs";
import { GrOverview } from "react-icons/gr";

const Home = () =>{
    const dispatch = useDispatch()
    const [selectedPlatform, setSelectedPlatform] = useState("");
    const [selectedUrl, setSelectedUrl] = useState("");
    const [selectedModel, setSelectedModel] = useState("");
    const [responseData, setResponseData] = useState(null);
    const [loading,setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);


    const navigate = useNavigate()

    const handleAnalyzeClick = async () =>{
        
        if(selectedModel === "" || selectedUrl === "" || selectedModel === ""){
            toast.error("All fields are required. Please complete them. 😢",{
                position: "bottom-center",
                ariaProps: {
                    role: 'status',
                    'aria-live': 'polite',
                  },
                  removeDelay: 1000,
                  
            });
            return
        }
        setLoading(true);
        try{
            await persistor.purge();
            sessionStorage.removeItem("productDetails"); // Remove only specific session data
            sessionStorage.removeItem("reviewsForModel"); 
            sessionStorage.removeItem("plainComments"); 
            sessionStorage.removeItem("productSummary"); 

            dispatch(setProductDetails(null));
            dispatch(setReviewsForModel({ model: "", reviews: [] }));
            dispatch(setPlainComments([]));
            dispatch(setSummerization(""));
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
            if(selectedPlatform === "amazon"){
                toast.success("Analysis completed successfully! 😉",{
                    position: "bottom-center",
                });
                navigate("/analysis/amazon");
            }
            if(selectedPlatform === "flipkart"){
                toast.success("Analysis completed successfully! 😉",{
                    position: "bottom-center",
                });
                navigate("/analysis/flipkart");
            }
            if(selectedPlatform === "instagram"){
                toast.success("Analysis completed successfully! 😉",{
                    position: "bottom-center",
                });
                 navigate("/analysis/instagram");
            }
        }catch(error){
            toast.error("Error! Try again later ⏳",{
                position: "bottom-center",
            });
            console.error(error);
        }finally{
            setLoading(false);
        }
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      };
    
      useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleUrlChange = (newUrl) =>{
        setSelectedUrl(newUrl);
    }

    return(
        <div className="main-home-container">
            {loading && (
        <div className="overlay">
          <HashLoader
          color="#9e9e9e"
          height={18}
          margin={5}
          />
        </div>
      )}
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
                
                <button onClick={handleAnalyzeClick} className="analyze-button" disabled={loading}>Analyze</button>
            </div>
            </div>
            {/* <div className="floating-menu-container" ref={menuRef}>
                <div className="floating-menu-inner-main-menu" onClick={toggleMenu}>
                <IoIosBarcode />
                </div>
                <div className={`floating-menu-inner-sub-menu ${isOpen ? "open" : ""}`}>
                    <div className="floating-menu-icons">
                        <AiOutlineTeam  />
                        <div className="floating-menu-icons-content">
                            <p>Team</p>
                            <p>Members</p>
                        </div>
                    </div>
                    <div className="floating-menu-icons">
                        <BsStack />
                    </div>
                    <div className="floating-menu-icons">
                        <GrOverview/>
                    </div>
                </div>
            </div> */}
            <Toaster/>

        </div>
    )
}
export default Home;