import React, { useEffect, useState } from "react";
import './index.css';
import { useSelector } from "react-redux";
import { IoMdArrowRoundBack } from "react-icons/io";
import PieChartComponent from "../PieChartComponent";
import BarChartComponent from "../BarChartComponent";
import { MdOutlineArrowOutward } from "react-icons/md";
import { BounceLoader, ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const InstagramAnalysis = () =>{

    const { productDetails, reviews, plainComments,productSummary } = useSelector(
        (state) => state.product
      );
    const [loading, setLoading] = useState(true);

    const [filteredReviews, setFilteredReviews] = useState(reviews[Object.keys(reviews)[0]]);
     const [showAll, setShowAll] = useState(false);
         
         const [expandedReviews, setExpandedReviews] = useState({});
     
         const toggleShowMore = () => {
             setShowAll((prev) => !prev);
         };
          
    const navigate = useNavigate()
    useEffect(()=>{
        if (!productDetails || !reviews || !plainComments || !productSummary || 
            Object.keys(reviews).length === 0 || plainComments.length === 0) {
          navigate("/");
            }
    },[navigate,productDetails,productSummary,reviews,plainComments]);

    if (!productDetails || !reviews || !plainComments || !productSummary) {
        toast.error("🙋‍♂️ Oops! You're accessing page early.",
          {
            position:"bottom-center"
          }
        );
        return null;
      }

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        return date.toISOString().split('T')[0];
    };

    const handleSentimentClick = (sentiment) => {
        setFilteredReviews(reviews[Object.keys(reviews)[0]].filter((r) => r.sentiment === sentiment));
      };
    
      const handleBarClick = (review) => {
        setFilteredReviews([review]);
      };
    
      const toggleReviewExpansion = (index) => {
        setExpandedReviews((prev) => ({
          ...prev,
          [index]: !prev[index], 
        }));
      };
  
      const reviewBackgroundColor = (sentiment) =>{
        console.log(sentiment);
        if (sentiment === "Positive") return "#e3f6e4";
        if (sentiment === "Negative") return "#feecec";
        return "#feffda";
      }
      const reviewBorderColor = (sentiment) =>{
        if (sentiment === "Positive") return "#76d283";
        if (sentiment === "Negative") return "#ffc0c0";
        return "#dee684";
      }
    
      const truncateText = (text, index) => {
        const words = text.split(" ");
        if (words.length > 20 && !expandedReviews[index]) {
          return (
            <>
              {words.slice(0, 20).join(" ")}...
              <span className="continue-btn" onClick={() => toggleReviewExpansion(index)}>
                Continue
              </span>
            </>
          );
        }
        return (
          <>
            {text}{" "}
            {words.length > 20 && (
              <span className="continue-btn" onClick={() => toggleReviewExpansion(index)}>
                Show Less
              </span>
            )}
          </>
        );
      };
    
    return (
        <div className="product-analysis-main-container">
            <div className="home-return-button-container">
                <a href="/" className="home-return-button-item"><IoMdArrowRoundBack /> Home</a>
            </div>
            <h1 className="product-analysis-main-container-head">
                Sentimental Analysis
            </h1>
            <div className="product-details-container">
                <div className="carousel-container">
                {loading && <BounceLoader color="#808080" size={50} />}
                <img 
                src={`http://localhost:5000/proxy?url=${encodeURIComponent(productDetails[0].displayUrl)}`} 
                className="carousel-image" alt="picimage" 
                onLoad={() => setLoading(false)}
                onError={() => setLoading(false)} 
                style={{ display: loading ? "none" : "block" }}
                />
                </div>
                <div className="product-details-des-container">
                <p className="product-details-head-title">Post Details</p>
                <div className="product-details-price-rating-container insta-bio-container"> 
                    <p className="product-price">
                        Post Author : <b>{productDetails[0].ownerFullName}</b>
                    </p>
                    <p className ="product-price">
                        Post Date : <b>{formatDate(productDetails[0].timestamp)}</b>
                    </p>
                </div>
                <div className="product-details-price-rating-container insta-bio-container"> 
                    <p className="product-price">
                        Likes Count : <b>{productDetails[0].likesCount} ❤️</b>
                    </p>
                </div>
                <div className="product-button-link-container insta-link-buttons">
                    <button 
                        className="product-button-link" 
                        onClick={() =>window.open(`https://instagram.com/${productDetails[0].ownerUsername}`, "_blank")} 
                        >
                        <span>
                            <span>Post Uid</span>
                            <span aria-hidden="true">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                            </svg>
                            </span>
                        </span>
                    </button>
                    <button 
                        className="product-button-link" 
                        onClick={() =>window.open(productDetails[0].url, "_blank")} 
                        >
                        <span>
                            <span>Post link</span>
                            <span aria-hidden="true">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                            </svg>
                            </span>
                        </span>
                    </button>
                    </div>
                </div>
            </div>
            <div className="product-analysis-container">
                <div className="model-choosen-container">
                    <p className="model-choosen-item"> Model Used: {Object.keys(reviews)[0]}</p>
                </div>
                <div class="graph-container">
                    <div>
                        <PieChartComponent data={reviews[Object.keys(reviews)[0]]} onSegmentClick={handleSentimentClick} />
                    </div>
                    <div className="bar-chart-container">
                        <p className="confidence-chart-head">Confidence Chart</p>
                        <BarChartComponent data={reviews[Object.keys(reviews)[0]]} onBarClick={handleBarClick} />
                    </div>
                </div>
                <div className="product-review-container">
                    <p className="product-review-head1">Post Reviews</p>
                    {filteredReviews.slice(0, showAll ? filteredReviews.length : 10).map((review, index) => (
                        <div key={index} className="review-box" 
                        style={{
                        backgroundColor: reviewBackgroundColor(review.sentiment),
                        borderColor: reviewBorderColor(review.sentiment),
                        }}>
                            <div className="review-box-title-container">
                        <p className="review-author">Author{` - ${review.ownerUsername}`}</p>
                            </div>
                        <p className="review-box-review">{truncateText(review.text, index)}</p>
                        <div className="review-date-link-container">
                            <p className="review-date-container">
                            Commented Date - {formatDate(review.timestamp)}
                            </p>
                            
                        </div>
                        </div>
                    ))}
                    <div className="show-more-less-btn-container">
                        {filteredReviews.length > 10 && (
                            <button onClick={toggleShowMore} className="show-more-less-btn">
                            {showAll ? "Show Less" : "Show More"}
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <p className="product-summary-head">Post summary</p>
            <div className="product-summery-container">
                <p className="product-summery">{productSummary}</p>
            </div>
        </div>
    )
}
export default InstagramAnalysis;