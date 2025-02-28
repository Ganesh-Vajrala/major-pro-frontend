import React, { useEffect } from "react";
import './index.css';
import { useSelector } from "react-redux";
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css';
import "slick-carousel/slick/slick-theme.css";
import { FaStar } from "react-icons/fa";

const product_details = {
  asin:"B0CMCZL3PN",
  category: {id: "industrial",name:"Industrial & Scientific"},
  country: "IN",
  currency: "INR",
  customers_say: "Customers are unhappy with the refrigerator's cooling capacity. They say it doesn't keep ice cream frozen even at its maximum setting. Opinions vary on the overall performance.",
  product_description: "Bluestar 45 Ltr, 2 Star, Mini Refrigerator with Freezer, Direct Cool, Grey",
  product_num_ratings: 414328,
  product_original_price: "₹11,990",
  product_photo: "https://m.media-amazon.com/images/I/71sAxaLCvHL._SL1500_.jpg",
  product_photos:[
  "https://m.media-amazon.com/images/I/71sAxaLCvHL._SL1500_.jpg", 
  "https://m.media-amazon.com/images/I/71BypCrZLsL._SL1500_.jpg",
  "https://m.media-amazon.com/images/I/81fZBcnnDQL._SL1500_.jpg",
  "https://m.media-amazon.com/images/I/81SbmXl2BsL._SL1500_.jpg",
  "https://m.media-amazon.com/images/I/916rUi3PN4L._SL1500_.jpg"],
  product_price: "8,095",
  product_star_rating: "3.2",
  product_title: "Bluestar 45 Ltr, 2 Star, Mini Refrigerator with Freezer, Direct Cool, Grey, MR60-GG",
  product_url: "https://www.amazon.in/dp/B0CMCZL3PN",	
  }



  
const AmazonAnalysis = () =>{
    //const reviews = useSelector((state) => state.product.reviews);
    const { productDetails, reviews, plainComments,productSummary } = useSelector(
      (state) => state.product
    );
    
    useEffect(() => {
      console.log("Product Details:", productDetails);
      console.log("Reviews:", reviews['BERT']);
      console.log("Plain Comments:", plainComments);
      console.log("prpoductSummary", productSummary)
    }, [productDetails, reviews, plainComments]);

    const settings = {
      dots: false,
      infinite: true,
      speed: 2000, // Transition speed (ms)
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000, // Time before next slide
      pauseOnHover: true,
      arrows: false,
    };

    const getColor = (rating) => {
      if (rating >= 4) return { background: "#e3f6e4", border: "#76d283" }; // High rating
      if (rating >= 2.5) return { background: "#feffda", border: "#dee684" }; // Medium rating
      return { background: "#feecec", border: "#ffc0c0" }; // Low rating
    };
    

    return(
      <div className="product-analysis-main-container">
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
      <p>Analysis</p>
    </div>
    </div>
    )
}
export default AmazonAnalysis;