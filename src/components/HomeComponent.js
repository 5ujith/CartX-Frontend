import { Link } from "react-router-dom";

const HomeComponent = () => {
    return (
        <>
            <div className = "h-full">
                <div className = "grid grid-cols-2 h-full mx-10">
                    <div className = "bg-cover bg-no-repeat bg-center bg-hero-img1 \
                    rounded-tl-full rounded-br-full  h-2/4 my-auto col-span-1">
                    </div>
                    <div className = "col-span-1 font-bold text-3xl flex items-center justify-center">
                        <div>
                            <h1 className = "my-3">Your <span className = "text-emerald-700 text-4xl">One Stop Shop</span></h1>
                            <h2 className = "my-3"><span className = "text-emerald-700 text-4xl">For All</span> Your Needs</h2>
                            <div className = "font-semibold text-2xl">
                                <Link to = '/category'>
                                    <button className = "bg-emerald-700 p-2 text-white border border-emerald-700 \
                                    rounded-md hover:bg-white hover:text-emerald-700">Shop Now</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomeComponent;