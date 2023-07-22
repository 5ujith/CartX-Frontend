import { useContext, useState } from "react";
import { FaUser } from "react-icons/fa";
import { UserContext } from "../App";
import MyOrderComponent from "./MyOrderComponent";
import PersonalInfoComponent from "./PersonalInfoComponent";

const UserProfileComponent = () => {
    const [user] = useContext(UserContext);
    const [page, setPage] = useState(1);

    function navigateTo(pageNo) {
        setPage(pageNo);
    }

    return (
        <div className = "m-5 lg:mx-20 min-h-min">
            <div className = "flex w-full justify-between items-center">
                <h1 className = "font-bold text-lg">CartX Account</h1>
                <button className = "p-2 bg-emerald-700 rounded-md text-white \
                font-semibold hover:bg-white hover:text-emerald-700 border border-emerald-700">Sign Out</button>
            </div>
            <div className = "flex justify-center mt-5">
                <hr className = "border w-full"/>
            </div>
            <div className = "flex">
                <div className = "w-1/4">
                    <div>
                        <div className = "my-8">
                            <div className = "my-3 flex justify-start">
                                <div className = "bg-gray-400 inline-block rounded-full p-3">
                                    <FaUser size={50} color="white"/>
                                </div>
                            </div>
                            <h1 className = "text-black font-bold flex justify-start text-lg">{user.userName}</h1>
                            <h2 className = "font-light text-sm flex justify-start">{user.email}</h2>
                        </div>
                        <div className = "flex justify-start">
                            <ul>
                                <li key = {1} className = {`mb-5 text-xl font-semibold hover:cursor-pointer hover:text-emerald-700
                                ${(page === 1) ?  "text-emerald-700" : "text-gray-400"}`} onClick = {() => {
                                    navigateTo(1)}
                                }>Personal Information</li>
                                <li key = {3} className = {`my-5 text-xl font-semibold hover:cursor-pointer hover:text-emerald-700
                                ${(page === 2) ?  "text-emerald-700" : "text-gray-400"}`} onClick = {() => {
                                    navigateTo(2)}
                                }>Order History</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className = "w-3/4 h-screen my-8">
                    {
                        (page === 1) ? 
                        <PersonalInfoComponent />
                        : (page === 2) ?
                        <MyOrderComponent/>
                        : <></>
                    }
                </div>
            </div>
        </div>
    );
}

export default UserProfileComponent;