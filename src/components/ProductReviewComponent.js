import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { BACKEND_BASE_URL } from "../utils/constants.js";
import { UserContext } from "../App.js";
import ProductReviewCardComponent from "./ProductReviewCardComponent.js";

const ProductReviewComponent = ({productId}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [ratingScore, setRatingScore] = useState(0);
    const [reviews, setReviews] = useState([]);
    const [user] = useContext(UserContext);

    async function getProductReviews() {
        const response = await axios({
            method: 'GET',
            url: `${BACKEND_BASE_URL}/product/reviews?productId=${productId}`
        })
        setReviews(response.data.data);
    }

    useEffect(() => {
        getProductReviews();
    }, []);

    const newReviewHandler = () => {
        setIsVisible(!isVisible);
    }

    const getRating = () => {
        setRatingScore(document.getElementById("rating-slider").value);
    }

    const submitHandler = async (event) => {
        try {
            event.preventDefault();
            const formObj = event?.target;
            const response = await axios({
                method: 'POST',
                url: `${BACKEND_BASE_URL}/product/review`,
                data: {
                    title: formObj["title"].value,
                    content: formObj["review-content"].value,
                    rating: parseInt(formObj["rating-slider"].value),
                    userId: parseInt(user.id),
                    productId: parseInt(productId),
                    date: new Date()
                }
            });
            newReviewHandler();
            getProductReviews();
        }
        catch(error) {
            console.log("Something went wrong in the Ui(Product Review Submit)");
        }
    }

    return (
        <>
            {
                isVisible &&
                <div className = "fixed inset-0 backdrop-blur-sm text-white z-10">
                    <button className = "relative text-black" onClick = {newReviewHandler}>X</button>
                    <div className = "flex justify-center items-center text-white">
                        <div className = "bg-gray-400 bg-opacity-50 p-5 w-1/3 flex justify-center">
                            <div className = "w-full">
                                <form onSubmit = {submitHandler}>
                                    <input className = "w-full p-1 outline-none bg-transparent border placeholder-white my-2" type = "text" id = "title" placeholder = "Enter title.."/>
                                    <div className = "bg-transparent flex my-2">
                                        <input id = "rating-slider" type="range" min = "0" max = "5" value = {ratingScore} onChange = {getRating} className = "w-full"/>
                                        <p className = "ml-1 font-semibold text-white">{ratingScore}</p>
                                    </div>
                                    <textarea id = "review-content" placeholder = "Share your thoughts.." className = "text-black p-1 my-2 w-full"></textarea>
                                    <div className = "flex justify-center">
                                        <button type = "submit" className = "border p-1 rounded-md bg-gray-400 hover:bg-transparent\
                                        hover:border-gray-500 hover:text-gray-600">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div> 
            }
            <div className ="bg-gray-200 shadow-sm rounded-sm flex">
                <div className = "mx-5 mb-5 w-1/3 py-5">
                    <h2 className = "font-bold text-xl mb-1">Review this product</h2>
                    <h3 className = "font-normal my-1">Share your thoughts with other customers</h3>
                    <button className = "border border-gray-400 bg-gray-400 bg-opacity-50 p-2 my-1\
                    rounded-md font-normal hover:bg-transparent" onClick = {newReviewHandler}>Write a product review</button>
                </div>
                <div className = "w-2/3 max-h-96 bg-gray-100 py-5 px-5 overflow-y-scroll">
                    <h2 className = "font-bold text-xl">Customer Reviews</h2>
                    {
                        (reviews.length !== 0) &&
                        reviews?.map((review) => {
                            return <ProductReviewCardComponent key = {review.id} {...review}/>
                        })
                    }
                </div>
            </div>
        </>
    );
}

export default ProductReviewComponent;
