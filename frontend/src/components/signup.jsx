import { useState } from "react";
import { Link } from "react-router-dom";
import navbar from "./navBar.jsx";
import { useNavigate } from "react-router-dom";

const Signup = () => {  
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    const pwRules = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /[0-9]/.test(password),
            special: /[!@#$%^&*+]/.test(password),
        };
    

    const ruleValues = Object.values(pwRules);
    const isValid = ruleValues.filter(Boolean).length >= 3;

    const isValidEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        if (!isValidEmail(email)) {
            alert("Please enter a valid email address!");
            return;
        }

        if (!isValid) {
            alert("Password does not meet the requirements!");
            return;
        }

        try {
            const res = await fetch("http://localhost:3001/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, email, password })
            });
            const data = await res.json();
            if (res.ok) {
                // Successful signup
                navigate("/signin");
                
            } else {
                // Backend returned error
                alert(data.message || "Signup failed");
            }
        } catch (err) {
            alert("Network error");
            console.error(err);
        }
    };


    return(
        <div className="bg-[url('./pics/pink-beige-polka-dot.png')] bg-cover 
        w-screen h-screen flex flex-col justify-center items-center">
            {navbar()}
            <h3 className="forest-green-font jacques-francois-regular
            text-5xl text-center mb-12">Sign up</h3>
            <div className="bg-[url('./pics/floral-banner.png')] bg-cover 
            w-1/3 h-2/3 flex flex-col justify-center items-center rounded-lg shadow-lg ">
                <div className="flex flex-col justify-center 
                items-center w-3/5">
                    <div className="h-1/5 w-full flex flex-col justify-center items-center mb-2">        
                        <label className="forest-green-font jacques-francois-regular 
                        text-2xl w-full text-left mb-2" htmlFor="username">Username:</label>
                        <input onChange={(e) => setUsername(e.target.value)} autoFocus
                        className="bg-zinc-100 w-full p-2 rounded-3xl h-12 jacques-francois-regular
                         focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300" 
                        type="text" id="username" name="username" placeholder="e.g. email@example.com" />
                    </div>
                    <div className="h-1/5 w-full flex flex-col justify-center items-center mb-2">
                        <label className="forest-green-font jacques-francois-regular 
                        text-2xl mb-2 w-full text-left" htmlFor="email">Email:</label>
                        <input onChange={(e) => setEmail(e.target.value)} 
                        className={`bg-zinc-100 w-full p-2 rounded-3xl h-12 jacques-francois-regular
                        `} 
                        type="email" id="email" name="email" placeholder="e.g. Jane Doe" />
                    </div>

                    <div className="h-1/5 w-full flex flex-col justify-center items-center mb-2">
                        <label className="forest-green-font jacques-francois-regular text-2xl 
                        mb-2 w-full text-left" htmlFor="password">Password:<span className="text-red-500" onClick={() => setShowRules(!showRules)}>*</span></label>
                        <input onChange={(e) => setPassword(e.target.value)} 
                        className={`bg-zinc-100 p-2 w-full rounded-3xl h-12 jacques-francois-regular
                        ${isValid ? `focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300`
                                : `focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500`
                            }" `}
                        type="password" id="password" name="password" placeholder="your password here" />
                    </div>

                    <div className="h-1/5 w-full flex flex-col justify-center items-center mb-2">
                        <label className="forest-green-font jacques-francois-regular text-2xl 
                        mb-2 w-full text-left" htmlFor="confirmPassword">Confirm Password:</label>
                        <input onChange={(e) => setConfirmPassword(e.target.value)} 
                        className={`bg-zinc-100 p-2 w-full rounded-3xl h-12 jacques-francois-regular
                        ${isValid && password === confirmPassword ? `focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300`
                                : `focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500`
                            }" `}
                        type="password" id="confirmPassword" name="confirmPassword" placeholder="confirm your password" />
                    </div>
                    <div className="h-1/5 flex flex-col justify-center items-center my-3">
                        <button onClick={handleSubmit} className="bg-zinc-100 forest-green-font jacques-francois-regular p-3 rounded-lg 
                    text-xl tracking-wider hover:forest-green-bg hover:!text-zinc-100 hover:shadow-lg hover:scale-105 
                    transition duration-300 ease-in-out cursor-pointer">
                        Submit
                        </button>
                    </div>
                    
                </div>     
                <div className="bg-zinc-100 px-5 rounded-3xl forest-green-font jacques-francois-regular text-lg mt-2">
                        Already has an account? Click <Link to="/signin" className="bg-blue-100 hover:underline">here</Link> to sign in.
                </div>  
            </div>
            {!isValid && (
            <div className="jacques-francois-regular fixed right-6 top-1/2 -translate-y-1/2 
            w-72 p-4 bg-white border rounded-2xl shadow-xl z-50 text-sm">
                <p className="font-semibold mb-2 ">Password must include 3 of the rules:</p>
                <ul className="space-y-1">
                <li className="text-amber-600">
                    • At least 8 characters
                </li>
                <li className="text-amber-600">
                    • One uppercase letter
                </li>
                <li className="text-amber-600">
                    • One lowercase letter
                </li>
                <li className="text-amber-600">
                    • One number
                </li>
                <li className="text-amber-600">
                    • One special character,including !@#$%^&*+
                </li>
                </ul>
            </div>
)}
        </div>
    )
}

export default Signup