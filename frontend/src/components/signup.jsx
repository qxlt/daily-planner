import { useState } from "react";
import { Link } from "react-router-dom";
import navbar from "./navBar.jsx";

const Signup = () => {  
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showRules, setShowRules] = useState(false);


    const rules = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*]/.test(password),
  };

    const isValid = Object.values(rules).every(Boolean);


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
                        <input className="bg-zinc-100 w-full p-2 rounded-3xl h-12 jacques-francois-regular" 
                        type="text" id="username" name="username" placeholder="e.g. email@example.com" />
                    </div>
                    <div className="h-1/5 w-full flex flex-col justify-center items-center mb-2">
                        <label className="forest-green-font jacques-francois-regular 
                        text-2xl mb-2 w-full text-left" htmlFor="email">Email:</label>
                        <input className="bg-zinc-100 w-full p-2 rounded-3xl h-12 jacques-francois-regular" 
                        type="email" id="email" name="email" placeholder="e.g. Jane Doe" />
                    </div>

                    <div className="h-1/5 w-full flex flex-col justify-center items-center mb-2">
                        <label className="forest-green-font jacques-francois-regular text-2xl 
                        mb-2 w-full text-left" htmlFor="password">Password:<span className="text-red-500" onClick={() => setShowRules(!showRules)}>*</span></label>
                        <input className="bg-zinc-100 p-2 w-full rounded-3xl h-12 jacques-francois-regular" 
                        type="password" id="password" name="password" placeholder="your password here" />
                    </div>

                    <div className="h-1/5 w-full flex flex-col justify-center items-center mb-2">
                        <label className="forest-green-font jacques-francois-regular text-2xl 
                        mb-2 w-full text-left" htmlFor="confirmPassword">Confirm Password:</label>
                        <input className="bg-zinc-100 p-2 w-full rounded-3xl h-12 jacques-francois-regular" 
                        type="password" id="confirmPassword" name="confirmPassword" placeholder="confirm your password" />
                    </div>
                    <div className="h-1/5 flex flex-col justify-center items-center my-3">
                        <button className="bg-zinc-100 forest-green-font jacques-francois-regular p-3 rounded-lg 
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
            {showRules && (
            <div className="fixed right-6 top-1/2 -translate-y-1/2 w-72 p-4 bg-white border rounded-2xl shadow-xl z-50 text-sm">
                <p className="font-semibold mb-2">Password must include:</p>

                <ul className="space-y-1">
                <li className={rules.length ? "text-green-600" : "text-red-500"}>
                    • At least 8 characters
                </li>
                <li className={rules.uppercase ? "text-green-600" : "text-red-500"}>
                    • One uppercase letter
                </li>
                <li className={rules.lowercase ? "text-green-600" : "text-red-500"}>
                    • One lowercase letter
                </li>
                <li className={rules.number ? "text-green-600" : "text-red-500"}>
                    • One number
                </li>
                <li className={rules.special ? "text-green-600" : "text-red-500"}>
                    • One special character
                </li>
                </ul>
            </div>
)}
        </div>
    )
}

export default Signup