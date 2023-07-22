import { useContext, useEffect, useState } from "react";
import CategoryCardComponent from "./CategoryCardComponent";
import axios from "axios";
import { BACKEND_BASE_URL } from "../utils/constants";
import { CategoryContext } from "../App";

const CategoryComponent = () => {
    const [products, setProducts] = useState([]);
    const [categoryId] = useContext(CategoryContext);
    
    useEffect(() => {
        getAllProductsByCategory();
    }, [categoryId]);

    async function getAllProductsByCategory() {
        const response = await axios({
            method: 'GET',
            url: `${BACKEND_BASE_URL}/category/products?categoryId=${categoryId}`
        })
        setProducts(response?.data?.data);
    }

    return (
        <>
            <div className = "flex flex-wrap">
                {
                    products?.map((product) => {
                        return <CategoryCardComponent key = {product.id} {...product}/>

                    })
                }
            </div>
        </>
    );
}

export default CategoryComponent;