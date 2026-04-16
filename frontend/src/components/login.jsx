import React, { useState } from 'react';
import navbar from "./navBar.jsx";
import { useNavigate } from 'react-router-dom';
import { buildProtectedPath, setAuthSession } from "../lib/auth.js";

const Login = () => {

    const [loginCred, setLoginCred] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();


    const handlesubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:3001/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ login_credential: loginCred, password })
            });
            const data = await res.json();
            if (res.ok) {
                const message = data.message || "Login successful";
                if (data.token) {
                    setAuthSession(data.token, data.user);
                }
                setError("");
                alert(`Congrats! ${message}`);
                navigate(buildProtectedPath("/addtask", data.user?.username));
            } else {
                const message = data.error || "Something is wrong with your login credentials.";
                setError(message);
                alert(message);
                console.log("Backend error:", message);
            }
        } catch (err) {
            setError("Network error");
            alert("Something is wrong. Please try again.");
            console.error(err.message);
        }
    };

    return(
        <div className="bg-[url('./pics/pink-beige-polka-dot.png')] bg-cover 
        w-screen h-screen flex flex-col justify-center items-center">
            {navbar()}
            <h3 className="forest-green-font jacques-francois-regular 
            text-5xl text-center mb-12">Sign in</h3>
            <form
                onSubmit={handlesubmit}
                className="bg-[url('./pics/floral-banner.png')] bg-cover 
                w-1/3 h-1/2 flex flex-col justify-center items-center rounded-lg shadow-lg "
            >
                <div className="flex flex-col justify-center items-center w-3/5">
                    <div className="h-1/3 w-full flex flex-col justify-center items-center mb-2">        
                        <label className="forest-green-font jacques-francois-regular 
                        text-2xl w-full text-left mb-2" htmlFor="username">Username/Email:</label>
                        <input autoFocus onChange={(e) => setLoginCred(e.target.value)} 
                        className="bg-zinc-100 w-full p-2 rounded-3xl h-12 jacques-francois-regular
                        focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300" 
                        type="text" id="username" name="username" />
                    </div>
                    <div className="h-1/3 w-full flex flex-col justify-center items-center mb-2">
                        <label className="forest-green-font jacques-francois-regular text-2xl 
                        mb-2 w-full text-left" htmlFor="password">Password:<span className="text-red-500">*</span></label>
                        <input onChange={(e) => setPassword(e.target.value)} 
                        className="bg-zinc-100 p-2 w-full rounded-3xl h-12 jacques-francois-regular
                        focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300" 
                        type="password" id="password" name="password" />
                    </div>
                    <div className="h-1/3 flex flex-col justify-center items-center my-3">
                        <button type="submit" className="bg-zinc-100 forest-green-font jacques-francois-regular p-3 rounded-lg 
                    text-xl tracking-wider hover:forest-green-bg hover:!text-zinc-100 hover:shadow-lg hover:scale-105 
                    transition duration-300 ease-in-out cursor-pointer">
                        Submit
                        </button>
                    </div>            
                </div>     
            </form>
            
        </div>
    )
}

export default Login
