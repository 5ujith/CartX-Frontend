import { FaStar } from "react-icons/fa";

const ProductReviewCardComponent = ({title, content, date, rating, User}) => {
    return (
        <div className = "p-2 bg-gray-300 my-3 shadow-md">
            <div>
                <div className = "flex items-center mx-1">
                    <div className = "relative w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-500">
                        <svg className = "absolute w-10 h-10 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                    </div>
                    <h1 className = "mx-1 font-semibold">{User.userName}</h1>
                </div>
                <h2>Reviewed on {new Date(date).toDateString()}</h2>
            </div>
            <hr className = "my-1 w-3/4 border-t-2 border-gray-600 border-opacity-50"/>
            <div className = "flex items-center">
                {
                    [...Array(5)].map((star, index) => {
                        return (
                        <FaStar 
                            size = {17}
                            color = {((index + 1) <= rating) ? "#006633" : "grey"}
                            key= {index}
                        />
                        );
                    })
                }
                <h1 className = "font-semibold mx-1">{title}</h1>
            </div>
            <p>{content}</p>
        </div>
    );
}

export default ProductReviewCardComponent;