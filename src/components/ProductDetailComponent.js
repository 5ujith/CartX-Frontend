import axios from "axios";
import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_BASE_URL, IMG_BASE_URL } from "../utils/constants.js";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import ProductReviewComponent from "./ProductReviewComponent.js";
import { UserContext } from "../App.js";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ProductDetailComponent = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [user] = useContext(UserContext);

    useEffect(() => {
        getProductDetails();
    }, []);

    useEffect(() => {

    }, [id])

    async function getProductDetails() {
        const response = await axios({
            method: 'GET',
            url: `${BACKEND_BASE_URL}/product/${id}`
        })
        setData(response?.data?.data);
    }

    async function updateCartItem({id, productCount}) {
        const response = await axios({
            method: 'PATCH',
            url: `${BACKEND_BASE_URL}/cart/${id}`,
            data: {
                productCount : productCount + 1
            }
        })
    }

    async function insertCartItem() {
        const payload = {
            productId: data.id,
            userId: user.id,
            productCount: 1 
        };
        const response = await axios({
            method: 'POST',
            url: `${BACKEND_BASE_URL}/cart`,
            data: payload,
        });
    }

    async function cartHandler() {
        const res = await axios({
            method: 'GET',
            url: `${BACKEND_BASE_URL}/cart?productId=${data.id}`
        })
        console.log(res);
        if(res?.data?.valid) {
            updateCartItem(res.data.data);
        }
        else {
            await insertCartItem();
            toast.success("Successfully added to cart!", {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 2000
            })
        }
    }

    async function buyHandler() {
        const res = await axios({
            method: 'POST',
            url: `${BACKEND_BASE_URL}/orders`,
            data: {
                userId : user.id
            }
        })
        const orderId = res?.data?.data?.id;
        const response = await axios({
            method : 'POST',
            url : `${BACKEND_BASE_URL}/orderItems`,
            data : {
                orderId,
                productId : data.id
            }

        })
        console.log(response);
    }

    return data ? (
        <div className = "m-10">
            <div className = "flex justify-around bg-gray-100 py-5 px-1 shadow-sm">
                <div className = "bg-gray-100 rounded-md w-[380px] h-80 flex justify-center p-5">
                    <img className = "w-auto h-56 m-auto" src = {`${IMG_BASE_URL}/${data.imageId}.jpg`} alt = {`${data.name}.jpg`}/>
                </div>
                <div className = "flex items-center">
                    <div>
                        <ToastContainer />
                        <h1 className = "font-bold text-3xl my-1">{data.name}</h1>
                        <h2 className = "font-semibold text-xl my-1">Brand: {data.brandId}</h2>  
                        <div className = "flex items-center">
                        {
                            [...Array(5)].map((star, index) => {
                                return (
                                <FaStar 
                                    size = {17}
                                    color = {((index + 1) <= data.avgRating) ? "#006633" : "grey"}
                                    key= {index}
                                />
                                );
                            })
                        }
                            <h2 className = "ml-1 font-normal">({(data.ratedUsers).toLocaleString("en-IN")})</h2>
                        </div>
                        <div className = "flex justify-center">
                            <hr className = "my-5 w-full border-t-2 border-gray-400 border-opacity-50"/>
                        </div>
                        <div>
                            <h2 className = "font-normal">MRP.: <span className = "font-bold text-xl">₹{(data.price * 1).toLocaleString("en-IN")}</span></h2>
                            <h3 className = "font-normal">Inclusive of all taxes</h3>
                        </div>
                        <div className = "flex justify-center">
                            <hr className = " my-5 w-full border-t-2 border-gray-400 border-opacity-50"/>
                        </div>
                        <div className = "flex justify-around text-white">
                            <button className = "font-semibold border border-emerald-700 bg-emerald-700 rounded-md p-2 mx-1 \
                            hover:bg-transparent hover:text-emerald-700" onClick = {cartHandler}>Add to Cart</button>
                            <button className = "font-semibold border border-emerald-700 bg-emerald-700 rounded-md p-2 mx-1 hover:bg-transparent hover:text-emerald-700"
                            onClick = {buyHandler}>Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className = "flex justify-center">
                <hr className = " mb-10 mt-10 w-1/2 border-t-2 border-gray-600 border-opacity-50"/>
            </div>
            <div className ="bg-gray-100 py-5 px-1 shadow-sm rounded-sm">
                <div className = "mx-5 mb-5">
                    <h2 className = "font-bold text-xl">Specifications</h2>
                </div>
                <ul className = "mx-5 font-sans">
                    {
                        data.about.split(';').map((ele, index) => {
                            return (index % 2 === 0) ? (
                                <li className = "bg-gray-300 px-3 py-4 bg-opacity-30 rounded-sm" key = {index}>{ele}</li>
                            ):(
                                <li className = "bg-gray-400 px-3 py-4 bg-opacity-30 rounded-sm" key = {index}>{ele}</li>
                            );
                        })
                    }
                </ul>  
            </div>
            <div className = "flex justify-center">
                <hr className = " mb-10 mt-10 w-1/2 border-t-2 border-gray-600 border-opacity-50"/>
            </div>
            <ProductReviewComponent productId = {id}/>
        </div>
    ) :
    (
        <div className = "m-10 bg-gray-100 h-96 w-full py-5 px-1">
        </div>
    );
}

export default ProductDetailComponent;
