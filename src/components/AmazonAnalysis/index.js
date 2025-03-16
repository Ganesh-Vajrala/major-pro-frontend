import React, { useEffect, useState } from "react";
import './index.css';
import { useSelector } from "react-redux";
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css';
import "slick-carousel/slick/slick-theme.css";
import { FaStar } from "react-icons/fa";
import { MdOutlineArrowOutward } from "react-icons/md";
import ModelSelection from "../ModelSelection";
import { IoMdArrowRoundBack } from "react-icons/io";
import PieChartComponent from "../PieChartComponent";
import BarChartComponent from "../BarChartComponent";
import {useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

  
const AmazonAnalysis = () =>{
  
    const { productDetails, reviews, plainComments,productSummary } = useSelector(
      (state) => state.product
    );
    const navigate = useNavigate()
    
    useEffect(() => {
      if (!productDetails || !reviews || !plainComments || !productSummary || 
        Object.keys(reviews).length === 0 || plainComments.length === 0) {
      navigate("/");
    }
    //console.log("Redux State:", { productDetails, reviews, plainComments, productSummary });
    
    }, [productDetails, reviews, plainComments,productSummary,navigate]);
    


    
    const [filteredReviews, setFilteredReviews] = useState(reviews[Object.keys(reviews)[0]]);
    const [showAll, setShowAll] = useState(false);

    const [expandedReviews, setExpandedReviews] = useState({});

    const toggleShowMore = () => {
      setShowAll((prev) => !prev);
    };
    

    const handleSentimentClick = (sentiment) => {
      setFilteredReviews(reviews[Object.keys(reviews)[0]].filter((r) => r.sentiment === sentiment));
    };
  
    const handleBarClick = (review) => {
      setFilteredReviews([review]);
    };
     
    if (!productDetails || !reviews || !plainComments || !productSummary) {
      toast.error("🙋‍♂️ Oops! You're accessing page early.",
        {
          position:"bottom-center"
        }
      );
      return null;
    }

    const settings = {
      dots: false,
      infinite: true,
      speed: 2000, 
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      pauseOnHover: true,
      arrows: false,
    };

    const getColor = (rating) => {
      if (rating >= 4) return { background: "#e3f6e4", border: "#76d283" }; // High rating
      if (rating >= 2.5) return { background: "#feffda", border: "#dee684" }; // Medium rating
      return { background: "#feecec", border: "#ffc0c0" }; // Low rating
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
      if (words.length > 36 && !expandedReviews[index]) {
        return (
          <>
            {words.slice(0, 36).join(" ")}...
            <span className="continue-btn" onClick={() => toggleReviewExpansion(index)}>
              Continue
            </span>
          </>
        );
      }
      return (
        <>
          {text}{" "}
          {words.length > 36 && (
            <span className="continue-btn" onClick={() => toggleReviewExpansion(index)}>
              Show Less
            </span>
          )}
        </>
      );
    };

    return(
      <div className="product-analysis-main-container">
        <div className="home-return-button-container">
          <a href="/" className="home-return-button-item"><IoMdArrowRoundBack /> Home</a>
        </div>
        <h1 className="product-analysis-main-container-head">
          Sentimental Analysis
        </h1>
      <div className="product-details-container">
        <div className="carousel-container">
          <Slider {...settings}>
            {productDetails.product_photos.map((image, index) => (
              <div key={index} className="carousel-slide">
                <img src={image} alt={`Slide ${index + 1}`} className="carousel-image" />
                <div className="slide-number">{index + 1} / {productDetails.product_photos.length}</div>
              </div>
            ))}
          </Slider>
        </div>
        <div className="product-details-des-container">
          <p className="product-details-head-title">Product Details</p>
          <h1 className="product-details-title">
            {productDetails.product_title}
          </h1>
          <div className="product-details-price-rating-container">
            <div className="product-price-container">             
              <p className="product-price">Price: <span className="price-value">₹{" "}{
                productDetails.product_price
                }</span></p>
            </div>
            <div className="product-rating-container"
              style={{
                backgroundColor: getColor(parseFloat(productDetails.product_star_rating)).background,
                borderColor: getColor(parseFloat(productDetails.product_star_rating)).border,
              }}
             > 
              <p className="product-rating">Rating: <span className="product-rating-value">{productDetails.product_star_rating+" "}</span><FaStar className="star"/></p>
            </div>
          </div>
          <div className="product-button-link-container">
          <button 
              className="product-button-link" 
              onClick={() =>window.open(productDetails.product_url, "_blank")} 
            >
              <span>
                <span>Product</span>
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
        <p className="product-review-container-head">Product Reviews</p>
        {filteredReviews.slice(0, showAll ? filteredReviews.length : 10).map((review, index) => (
        <div key={index} className="review-box" 
        style={{
          backgroundColor: reviewBackgroundColor(review.sentiment),
          borderColor: reviewBorderColor(review.sentiment),
          }}>
            <div className="review-box-title-container">
          <h1 className="review-box-title">{review.title}</h1>
          <p className="review-author">Author{` - ${review.user}`}</p>
              </div>
          <p className="review-box-review">{truncateText(review.review, index)}</p>
          <div className="review-date-link-container">
            <p className="review-date-container">
              {review.date}
            </p>
            <a href={review.review_url} className="see-review-link" target="_blank">see review <MdOutlineArrowOutward className="cross-arrow" /></a>
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
      <p className="product-summary-head">Product summary</p>
    <div className="product-summery-container">
      <p className="product-summery">{productSummary}</p>
    </div>
    </div>
    )
}
export default AmazonAnalysis;