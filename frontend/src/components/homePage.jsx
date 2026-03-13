import React from "react";
import "../App.css";
import { Link } from "react-router-dom";

const HomePage = () => {
    return(
    <div className="bg-[url('./pics/pink-beige-polka-dot.png')] bg-cover relative h-screen flex flex-col justify-center">
        
        <Link to="/signup"  className="absolute top-10 right-15">
            <h4 className="text-end p-3 border-2 border-yellow-800 rounded-lg text-2xl tracking-wider forest-green-font 
            bg-[url('./pics/floral-banner.png')] bg-cover jacques-francois-regular 
            hover:bg-none hover:forest-green-bg hover:pink-dot-font  hover:shadow-lg hover:scale-105 transition duration-1000 ease-in-out cursor-pointer">
            Sign Up
            </h4>
        </Link>    
        <h1 className="forest-green-font text-7xl text-center 
        bg-[url('./pics/floral-banner.png')] p-10 bg-cover 
        jacques-francois-regular tracking-wider ">Daily Planner.</h1>
        <div className="text-center bottom-3 absolute w-full jacques-francois-regular forest-green-font">
            <hr className="" />
            <p>&copy; 2026 <Link to="/about" className="underline hover:text-white hover:bg-neutral-400 hover:bg-opacity-50 hover:cursor-pointer">Daily Planner.</Link> All rights reserved.</p>
        </div>
    </div>)
}    

export default HomePage