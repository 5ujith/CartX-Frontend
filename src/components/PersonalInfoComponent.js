import { useContext, useState } from "react";
import { UserContext } from "../App";
import { FaEdit, FaInbox, FaLandmark, FaLanguage, FaLock, FaUser } from "react-icons/fa";
import axios from "axios";
import { BACKEND_BASE_URL } from "../utils/constants";
import { ToastContainer, toast } from "react-toastify";

const PersonalInfoComponent = () => {
    const [user, setUser] = useContext(UserContext);
    const [userDetails, setUserDetails] = useState({
        userName : user.userName,
        email : user.email,
        password : user.password
    });

    function setDetails(event) {
        setUserDetails({
            ...userDetails,
            [event.target.name] : event.target.value
        });
    }

    async function updateUserDetails() {
        try {
            await axios({
                method: 'PATCH',
                url: `${BACKEND_BASE_URL}/users/${user.id}`,
                data: userDetails
            })
            toast.success("User updated successfully !", {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 2000
            })
            setUser({...user, ...userDetails});
        }
        catch(error) {
            console.log("Something went wrong in PersonalInfo Component");
            console.log(error);
        }
    }


    return (
        <div>
            <ToastContainer />
            <div className = "mb-5">
                <h1 className = "font-bold text-2xl mb-5">Personal Information</h1>
                <p className = "text-gray-400">Manage your personal information, including phone numbers
                and email address where you can be contacted.</p>
            </div>
            <div className = "grid grid-cols-2">
                <div className = "col-span-1 m-5 w-3/4 bg-gray-200 p-5 flex justify-between items-center rounded-md shadow-md">
                    <div>
                        <h2 className = "pb-1 font-semibold">Name</h2>
                        <input type = "text" className = "font-light bg-transparent \
                        outline-none border-b border-gray-400 w-3/4" name = "userName"
                        value = {userDetails.userName} onChange = {setDetails}
                        ></input>
                    </div>
                    <div> 
                        <div className = "border rounded-full border-emerald-700 p-1">
                            <FaUser className = "text-emerald-700"/>
                        </div>
                    </div>
                </div>
                <div className = "col-span-1 m-5 w-3/4 bg-gray-200 p-5 flex justify-between items-center rounded-md shadow-md">
                    <div>
                        <h2 className = "pb-1 font-semibold">Password</h2>
                        <input type = "password" className = "font-light bg-transparent \
                        outline-none border-b border-gray-400 w-3/4" value = {userDetails.password}
                        onChange = {setDetails} name = "password"></input>
                    </div>
                    <div>
                        <div className = "border rounded-full border-emerald-700 p-1">
                            <FaLock className = "text-emerald-700"/>
                        </div>
                    </div>
                </div>
                <div className = "col-span-1 m-5 w-3/4 bg-gray-200 p-5 flex justify-between items-center rounded-md shadow-md">
                    <div>
                        <h2 className = "pb-1 font-semibold">Email</h2>
                        <input type = "email" className = "font-light bg-transparent \
                        outline-none border-b border-gray-400 w-3/4" name = "email"
                        value = {userDetails.email} onChange = {setDetails}></input>
                    </div>
                    <div>
                        <div className = "border rounded-full border-emerald-700 p-1">
                            <FaInbox className = "text-emerald-700"/>
                        </div>
                    </div>
                </div>
                <div className = "col-span-1 m-5 w-3/4 bg-gray-200 p-5 flex justify-between items-center rounded-md shadow-md">
                    <div>
                        <h2 className = "pb-1 font-semibold">Country</h2>
                        <input type = "text" className = "font-light bg-transparent \
                        outline-none border-b border-gray-400 w-3/4" value = "India(IN)"></input>
                    </div>
                    <div>
                        <div className = "border rounded-full border-emerald-700 p-1">
                            <FaLandmark className = "text-emerald-700"/>
                        </div>
                    </div>
                </div>
                <div className = "col-span-1 m-5 w-3/4 bg-gray-200 p-5 flex justify-between items-center rounded-md shadow-md">
                    <div>
                        <h2 className = "pb-1 font-semibold">Language</h2>
                        <input type = "text" className = "font-light bg-transparent \
                        outline-none border-b border-gray-400 w-3/4" value = "English(UK)"></input>
                    </div>
                    <div>
                        <div className = "border rounded-full border-emerald-700 p-1">
                            <FaLanguage className = "text-emerald-700"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className = "flex justify-center my-5">
                <button className = "px-3 py-1 bg-emerald-700 border border-emerald-700 rounded-md \
                text-white hover:bg-transparent hover:text-emerald-700 font-semibold"
                onClick = {updateUserDetails}>Save</button>
            </div>
        </div>
    )
}

export default PersonalInfoComponent;