import { useNavigate } from "react-router-dom";

const AuthenticationComponent = () => {
    const navigate = useNavigate();
    
    const navigateToLogin = () => {
        navigate("/login");
    }

    const navigateToRegister = () => {
        navigate("/register");
    }

    return (
        <div className = "bg-hero-img h-screen bg-contain">
            <div className = "backdrop-blur-sm h-screen w-screen flex justify-center items-center">
                <button className = "px-7 py-3 mx-10 bg-red-400 rounded-md border-2 border-red-400 text-white hover:text-red-400 hover:bg-transparent font-bold" onClick = {navigateToLogin}>Sign In</button>
                <button className = "px-7 py-3 mx-10 bg-red-400 rounded-md border-2 border-red-400 text-white hover:text-red-400 hover:bg-transparent font-bold" onClick = {navigateToRegister}>Sign Up</button>
            </div>
        </div>
    );
}

export default AuthenticationComponent;