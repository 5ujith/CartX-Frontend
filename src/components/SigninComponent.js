import { Link } from "react-router-dom";
import axios from "axios";

const SigninComponent = (props) => {
    const submitHandler = async (event) => {
        try {
            event.preventDefault();
            const formObj = event.target;
            const response = await axios({
                method: 'GET',
                url: `http://localhost:8080/api/login?userName=${formObj.username.value}&password=${formObj.password.value}`, 
            });
            if(response.data.data.valid){
                props.setIsAuthenticated(true);
                props.setUser(response.data.data);
            }
            else {
                alert("Wrong Credentials");
            }
        }
        catch(error) {
            console.log("Something went wrong in the ui");
            throw error;
        }
    }

    return (
        <div className = "bg-hero-img h-screen bg-contain">
            <div className = "backdrop-blur-sm h-screen w-screen flex justify-center items-center">
                <div className = "h-[400px] w-[350px] bg-white bg-opacity-40 backdrop-blur-lg shadow-lg flex justify-center items-center text-red-400 font-semibold">
                    <form onSubmit = { submitHandler }>
                        <div className = "font-bold text-3xl flex justify-center py-5">
                            <h2>Sign In</h2>
                        </div>
                        <div className = "flex justify-center py-4">
                            <label className = "w-[100px] py-1 bg-red-400 bg-opacity-20 rounded-sm flex justify-center" 
                            htmlFor = "username">Username</label>
                            <input type = 'text' id = 'username' className = "w-40 text-red-400 rounded-sm px-3 py-[2px] \
                            font-normal focus:outline-red-400 focus:outline-1"/>
                        </div>
                        <div className = "flex justify-center py-4">
                            <label className = "w-[100px] py-1 bg-red-400 bg-opacity-20 rounded-sm flex justify-center" htmlFor = "password">Password</label>
                            <input type = 'password' id = 'password' className = "w-40 text-red-400 rounded-sm px-3 py-[2px] font-normal focus:outline-red-400 focus:outline-1"/>
                        </div>
                        <div className = "flex justify-center py-4">
                            <button type = "submit" className = "border bg-red-400 px-5 py-2 bg-opacity-30 rounded-md hover:bg-transparent hover:border-red-400">Sign In</button>
                        </div>
                        <div className = "flex justify-center py-4">
                            <p>Not an user? <Link to = "/register"><span className = "text-red-500 hover:underline">Register</span></Link></p>
                        </div> 
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SigninComponent; 