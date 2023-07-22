import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { BACKEND_BASE_URL, IMG_BASE_URL } from "../utils/constants";
import { UserContext } from "../App";
import { FaAngleDown, FaAngleUp, FaArrowDown } from "react-icons/fa";

const MyOrderComponent = () => {
    const [user] = useContext(UserContext);
    const [orders, setOrders] = useState([]);
    const [dropdownInd, setDropdownInd] = useState(-1);
    const [orderItems, setOrderItems] = useState([]);

    useEffect(() => {
        getOrders();

    }, []);

    async function getOrders() {
        const response = await axios({
            method: 'GET',
            url: `${BACKEND_BASE_URL}/orders/${user.id}`
        });
        let data = response?.data?.data;
        data.map(async (order, ind) => {
            const response = await getOrderItems(order.id);
            let tot_amount = 0;
            response.map((items) => {
                tot_amount += (items.productCount * items?.Product?.price);
            })
            data[ind].amount = tot_amount;
        })
        setOrders(data);
    }

    async function getOrderItems(orderId) {
        const response = await axios({
            method: 'GET',
            url: `${BACKEND_BASE_URL}/orderItems/${orderId}`
        });
        console.log(response.data.data);
        setOrderItems(response?.data?.data);
        return response.data.data;
    }

    return (
        <>
            <div className = "mb-5">
                <h1 className = "font-bold text-2xl mb-5">Order History</h1>
                <p className = "text-gray-400">Here you can manage your order.</p>
            </div>
            <div className = "grid grid-cols-9 bg-gray-200 rounded-sm p-2 text-gray-400 font-semibold">
                <h2 className = "col-span-1"></h2>
                <h2 className = "col-span-2 flex justify-center">Order Id</h2>
                <h2 className = "col-span-2 flex justify-center">Date</h2>
                <h2 className = "col-span-2 flex justify-center">Items</h2>
                <h2 className = "col-span-2 flex justify-center">Amount</h2>
            </div>
            <div className = " bg-gray-100 rounded-sm text-gray-600 font-semibold">
                {
                    orders.map((order, ind) => {
                        return (
                            <div className = "grid grid-cols-9 px-2 py-3 border">
                                <button className = "col-span-1 flex justify-center border border-gray-300 border-1 w-1/2 py-1 \
                                rounded-sm text-gray-500" onClick = {() => {
                                    if(dropdownInd === ind){
                                        setDropdownInd(-1)
                                    }
                                    else {
                                        setDropdownInd(ind);
                                        getOrderItems(order.id);
                                    }
                                }}>{
                                    (dropdownInd === ind) ?
                                    <FaAngleUp size = {20}/> :
                                    <FaAngleDown size = {20}/>
                                }</button>
                                <h2 className = "col-span-2 flex justify-center">#{order.id}</h2>
                                <h2 className = "col-span-2 flex justify-center">{(new Date(order.date)).toLocaleDateString()}</h2>
                                <h2 className = "col-span-2 flex justify-center">{order.items}</h2>
                                <h2 className = "col-span-2 flex justify-center text-emerald-700">₹{(order.amount * 1).toLocaleString("en-IN")}</h2>
                                {
                                    (dropdownInd === ind) &&
                                    <>
                                        <div className = "col-span-9 bg-gray-200 rounded-sm p-2 text-gray-400 mx-2 mt-4 \
                                        grid grid-cols-4 border border-gray-300">
                                            <h2 className = "col-span-1 flex justify-center">Item</h2>
                                            <h2 className = "col-span-1 flex justify-center">Name</h2>
                                            <h2 className = "col-span-1 flex justify-center">Quantity</h2>
                                            <h2 className = "col-span-1 flex justify-center">Total</h2>
                                        </div>
                                        <div className = "col-span-9 bg-gray-100 rounded-sm p-2 text-gray-500 mx-2 mb-4 \
                                        grid grid-cols-4 border border-gray-300 shadow-sm">
                                            {
                                                orderItems.map((orderItem) => {
                                                    return (
                                                        <>
                                                            <div className = "col-span-1 flex justify-center items-center mb-2 h-full w-full">
                                                                <img className = "w-12 h-14" src = {`${IMG_BASE_URL}/${orderItem?.Product?.imageId}.jpg`}></img>
                                                            </div>
                                                            <h2 className = "col-span-1 flex justify-center items-center">{orderItem?.Product?.name}</h2>
                                                            <h2 className = "col-span-1 flex justify-center items-center">{orderItem?.productCount}</h2>
                                                            <h2 className = "col-span-1 flex justify-center items-center text-emerald-700">₹{(orderItem?.productCount * orderItem?.Product?.price).toLocaleString("en-IN")}</h2>
                                                            <hr className = "col-span-4 border border-gray-200 my-2 rounded"/>
                                                        </>
                                                    );
                                                })
                                            }
                                        </div>
                                    </>
                                }
                            </div>
                        );
                    })
                }
            </div>
        </>
    );
}

export default MyOrderComponent;