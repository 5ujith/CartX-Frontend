import { Link } from "react-router-dom";
import { IMG_BASE_URL } from "../utils/constants";
import { FaStar } from "react-icons/fa";

const CategoryCardComponent = ({id, name, price, imageId, avgRating, ratedUsers}) => {
    return (
        <div className = "w-52 bg-gray-200 mr-5 my-3 px-3 py-5 ml-6 shadow-md transform transition duration-300 hover:scale-105 z-10">
            <Link to = {`/product/${id}`}>
                <div className = "flex justify-center mb-2">
                    <img src = {`${IMG_BASE_URL}/${imageId}.jpg`} className = "w-auto h-28" alt = {`${name}.jpg`}/>
                </div>
                <div className = "mt-6">
                    <hr className = "border-1 border-black my-2"/>
                    <h1 className = "font-bold">{name}</h1>
                    <h1 className = "font-normal">MRP: <span className = "font-bold text-md">₹{price.toLocaleString("en-IN")}</span></h1>
                    <div className = "flex items-center">
                    {
                        [...Array(5)].map((star, index) => {
                            return (
                            <FaStar 
                                size = {17}
                                color = {((index + 1) <= avgRating) ? "#006633" : "grey"}
                                key= {index}
                            />
                            );
                        })
                    }
                        <h2 className = "ml-1">({(ratedUsers * 1).toLocaleString("en-IN")})</h2>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default CategoryCardComponent;