import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { BACKEND_BASE_URL } from "../utils/constants";
import { UserContext } from "../App";
import CartCardComponent from "./CartCardComponent";

const CartComponent = () => {
    const [cartItems, setCartItems] = useState([]);
    const [user] = useContext(UserContext);
    const [subTotal, setSubTotal] = useState(0);

    useEffect(() => {
        getCartItems();
    }, [])

    useEffect(() => {
        setSubTotal(cartItems?.reduce(calculateSubTotal, 0));
    }, [cartItems])

    function calculateSubTotal(total, elem) {
        return total + (elem.Product.price * elem.productCount);
    }

    async function getCartItems() {
        try {
            const response = await axios({
                method: 'GET',
                url: `${BACKEND_BASE_URL}/carts?userId=${user.id}`
            })
            console.log(response);
            setCartItems(response?.data?.data);
        }
        catch(error) {
            console.log("Something went wrong in Cart Component");
            console.log(error);
        }
    }

    async function checkoutHandler() {
        const order = await axios({
            method: 'POST',
            url: `${BACKEND_BASE_URL}/orders`,
            data: {
                userId : user.id,
                date: new Date().toLocaleDateString(),
                items: cartItems.length
            }
        })
        const data = [];
        cartItems.map((cartItem) => {
            data.push({
                orderId : order?.data?.data?.id,
                productId : cartItem.productId,
                productCount: cartItem.productCount
            })
        })
        
        await axios({
            method: 'POST',
            url: `${BACKEND_BASE_URL}/orderItems`,
            data
        })
    }

    return (
        <div className = "grid grid-cols-4">
            <div className = "col-span-4 lg:col-span-3">
                <div className = "grid grid-cols-5 py-8 bg-gray-300 my-1 rounded-md mx-1 shadow-md">
                    <h1 className = "col-span-1 flex justify-center font-bold">Item</h1>
                    <h1 className = "col-span-2 flex justify-center font-bold">Name</h1>
                    <h1 className = "col-span-1 flex justify-center font-bold">Quantity</h1>
                    <h1 className = "col-span-1 flex justify-center font-bold">Total</h1>
                </div>
                <div>
                {
                    cartItems.map((cartItem, index) => {
                        return <CartCardComponent key = {cartItem.id} {...cartItem} cartId = {cartItem.id} 
                        cartItems = {cartItems} index = {index} setCartItems = {setCartItems} setSubTotal = {setSubTotal} subTotal = {subTotal}/>
                    })
                }
                </div>
            </div>
            <div className = "lg:col-span-1 lg:relative col-span-4 mx-1 relative bottom-0 right-0 mr-1">
                <div className = "bg-gray-300 shadow-md rounded-md px-2 my-1 py-5">
                    <div className = "flex justify-center w-full mb-4 text-xl">
                        <h2 className = "font-bold">Order Summary</h2>
                    </div>
                    <div className = "flex justify-center my-1">
                        <hr className = "border w-full"/>
                    </div>
                    <div className = "flex justify-between my-1">
                        <h2 className = "font-semibold mr-20">Subtotal</h2>
                        <h3 className = "font-bold text-emerald-700">₹{subTotal.toLocaleString("en-IN")}</h3>
                    </div>
                    <div className = "flex justify-between my-1">
                        <h2 className = "font-semibold mr-20">Sales Tax</h2>
                        <h3 className = "font-bold text-emerald-700">₹{(subTotal * 0.005).toLocaleString("en-IN")}</h3>
                    </div>
                    <div className = "flex justify-center my-1">
                        <hr className = "border w-full"/>
                    </div>
                    <div className = "flex my-1 justify-between">
                        <h2 className = "font-semibold mr-20">Grand Total</h2>
                        <h3 className = "font-bold text-emerald-700">₹{((subTotal * 0.005) + subTotal).toLocaleString("en-IN")}</h3>
                    </div>
                    <div className = "flex justify-center my-1">
                        <hr className = "border w-full"/>
                    </div>
                    <div className = "flex justify-center mt-4">
                        <button className = "bg-emerald-700 py-2 px-3 border border-emerald-700 rounded-md text-white w-1/2 font-semibold hover:bg-white \
                        hover:text-emerald-700" onClick = {checkoutHandler}>Checkout</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartComponent;