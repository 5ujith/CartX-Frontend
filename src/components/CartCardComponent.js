import { useEffect, useState } from "react";
import { BACKEND_BASE_URL, IMG_BASE_URL } from "../utils/constants";
import { FaMinus, FaPlus } from "react-icons/fa";
import axios from "axios";

const CartCardComponent = ({productCount, Product, cartId, cartItems, index, setCartItems, setSubTotal, subTotal}) => {
    const [itemCount, setItemCount] = useState(productCount);

    async function deleteCartItem() {
        const response = await axios({
            method: 'DELETE',
            url: `${BACKEND_BASE_URL}/cart/${cartId}`
        })
    }

    async function updateCartItem(id, productCount) {
        const response = await axios({
            method: 'PATCH',
            url: `${BACKEND_BASE_URL}/cart/${id}`,
            data: {
                productCount : productCount,
            }
        })
    }

    function increaseItemCount() {
        updateCartItem(cartId, itemCount + 1);
        setSubTotal(subTotal + Product.price);
        setItemCount(itemCount + 1);
    }

    async function decreaseItemCount() {
        setSubTotal(subTotal - Product.price);
        if(itemCount <= 1) {
            setItemCount(itemCount - 1);
            await deleteCartItem();
            const updatedCartItems = [];
            cartItems.map((cartItem, curr_index) => {
                if(curr_index !== index) {
                    updatedCartItems.push(cartItem);
                }
            })
            await setCartItems(updatedCartItems);
        }
        else {
            updateCartItem(cartId, itemCount - 1);
            setItemCount(itemCount - 1);
        }
    }

    return (
        <div className = "grid grid-cols-5 py-4 bg-gray-100 shadow-md rounded-md mx-2 my-2">
            <div className = "col-span-1 flex justify-center items-center">
                <img className = 'w-auto h-20' src = {`${IMG_BASE_URL}/${Product.imageId}.jpg`} alt = {`${Product.name}.jpg`}></img>
            </div>
            <div className = "col-span-2 flex justify-center items-center">
                <h1 className = "font-semibold">{Product.name}</h1>
            </div>
            <div className = "col-span-1 flex justify-center font-semibold">
                <div className = "flex items-center">
                    <button className = "px-1 py-1 border border-gray-300 rounded-l-md \
                    flex text-emerald-700" onClick = {decreaseItemCount}><FaMinus size = {15}/></button>
                    <h1 className = "border-t border-b border-gray-300 px-2">{itemCount}</h1>
                    <button className = "px-1 py-1 border border-gray-300 rounded-r-md \
                    text-emerald-700" onClick = {increaseItemCount}><FaPlus size = {15}/></button>
                </div>
            </div>
            <h1 className = "col-span-1 flex justify-center font-semibold items-center text-emerald-700">₹{(parseFloat(Product.price) * parseInt(itemCount)).toLocaleString("en-IN")}</h1>
        </div>
    );
}

export default CartCardComponent;

