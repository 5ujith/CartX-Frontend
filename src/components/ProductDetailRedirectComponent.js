import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"

const ProductDetailRedirectComponent = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        navigate(`/product/${id}`);
    }, []);

    return (
        <div className = "m-10 bg-gray-100 h-96 w-full">
        </div>
    );
}

export default ProductDetailRedirectComponent;