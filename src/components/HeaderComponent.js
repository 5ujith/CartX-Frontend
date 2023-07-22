import { Link } from "react-router-dom";
import '../App.css';
import { FaShoppingCart, FaUser, FaSearch, FaShoppingBasket, FaShoppingBag } from "react-icons/fa";
import SearchResultComponent from "./SearchResultComponent";
import axios from "axios";
import { BACKEND_BASE_URL } from "../utils/constants";
import { useContext, useEffect, useState } from "react";
import { CategoryContext } from "../App";

// {
//     name: 'Grocery'
// },
// {
//     name: 'Mobiles'
// },
// {
//     name: 'Fashion'
// },
// {
//     name: 'Electronics'
// },
// {
//     name: 'Home & Furniture'
// },
// {
//     name: 'Appliances'
// }

const HeaderComponent = () => {
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useContext(CategoryContext);

    useEffect(() => {
        getAllCategories();
    }, [])

    async function getAllCategories() {
        const response = await axios({
            method: 'GET',
            url: `${BACKEND_BASE_URL}/categories`
        })
        console.log(response);
        setCategories(response?.data?.data);
    }

    return (
        <nav className = "grid grid-cols-5 justify-evenly bg-white text-emerald-700 font-semibold border border-gray-200 shadow-sm">
            <div className = "flex py-3 px-3 col-span-1 justify-center items-center">
                <Link to = "/" className = "flex justify-center items-center">
                    <FaShoppingBag className = "mx-1"/>
                    <h1 >CartX</h1>
                </Link>
            </div>
            <div className = "col-span-2 w-full h-[48px] flex">
                <div className = "w-full z-20">
                    <SearchResultComponent />
                </div>
                <button className = "h-full border-r items-center flex px-2 hover:bg-emerald-700 hover:text-white">
                    <FaSearch />
                </button>
            </div>
            <ul className = "justify-around col-span-2 grid grid-cols-3">
                <Link to = '/category'>
                    <li className = "col-span-1 flex items-center justify-center hover:text-white hover:cursor-pointer hover:bg-emerald-700 hover:rounded-sm px-3 py-3 group relative w-full">
                        <FaShoppingBasket className = "mx-1"/> Category
                        <ul className = "text-white hidden top-[48px] left-[0px] rounded-sm w-full group-hover:block absolute bg-emerald-700 z-20">
                            {categories.map((category) => {
                                return (
                                <li key = {category.id} className = "flex justify-center w-full p-1 hover:bg-white hover:text-emerald-700 border\
                                border-emerald-700" id = {category?.name} onClick = {() => {
                                    setCategoryId(category?.id);
                                }}>{category?.name}</li>
                                );
                            })}
                        </ul>
                    </li>
                </Link>
                <Link to = '/cart'><li className = "col-span-1 justify-center hover:text-white hover:cursor-pointer hover:bg-emerald-700 hover:rounded-sm px-3 \
                py-3 flex items-center border-x w-full"><FaShoppingCart className = "mx-1"/> Cart</li></Link>
                <Link to = '/profile'><li className = "col-span-1 hover:text-white hover:cursor-pointer hover:bg-emerald-700 hover:rounded-sm px-3 \
                py-3 flex items-center justify-center"><FaUser className = "mx-1"/> Profile</li></Link>
            </ul>
        </nav>
    );
}

export default HeaderComponent;