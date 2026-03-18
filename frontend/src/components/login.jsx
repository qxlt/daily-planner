import React, { useState } from 'react';
import navbar from "./navBar.jsx";

const Login = () => {

    return(
        <div className="bg-[url('./pics/pink-beige-polka-dot.png')] bg-cover 
        w-screen h-screen flex flex-col justify-center items-center">
            {navbar()}
            <h3 className="forest-green-font jacques-francois-regular 
            text-5xl text-center mb-12">Sign in</h3>
            <div className="bg-[url('./pics/floral-banner.png')] bg-cover 
            w-1/3 h-1/2 flex flex-col justify-center items-center rounded-lg shadow-lg ">
                <div className="flex flex-col justify-center 
                items-center w-3/5">
                    <div className="h-1/3 w-full flex flex-col justify-center items-center mb-2">        
                        <label className="forest-green-font jacques-francois-regular 
                        text-2xl w-full text-left mb-2" htmlFor="username">Username/Email:</label>
                        <input className="bg-zinc-100 w-full p-2 rounded-3xl h-12 jacques-francois-regular" 
                        type="text" id="username" name="username" />
                    </div>
                    <div className="h-1/3 w-full flex flex-col justify-center items-center mb-2">
                        <label className="forest-green-font jacques-francois-regular text-2xl 
                        mb-2 w-full text-left" htmlFor="password">Password:<span className="text-red-500" onClick={() => setShowRules(!showRules)}>*</span></label>
                        <input className="bg-zinc-100 p-2 w-full rounded-3xl h-12 jacques-francois-regular" 
                        type="password" id="password" name="password" />
                    </div>
                    <div className="h-1/3 flex flex-col justify-center items-center my-3">
                        <button className="bg-zinc-100 forest-green-font jacques-francois-regular p-3 rounded-lg 
                    text-xl tracking-wider hover:forest-green-bg hover:!text-zinc-100 hover:shadow-lg hover:scale-105 
                    transition duration-300 ease-in-out cursor-pointer">
                        Submit
                        </button>
                    </div>            
                </div>     
            </div>
            
        </div>
    )
}

export default Login