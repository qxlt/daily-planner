const Signup = () => {  
    return(
        <div className="bg-[url('./pics/pink-beige-polka-dot.png')] bg-cover 
        w-screen h-screen flex flex-col justify-center items-center">
            <h3 className="forest-green-font jacques-francois-regular 
            text-4xl text-center mb-5">Sign up</h3>
            <div className="bg-[url('./pics/floral-banner.png')] bg-cover 
            w-1/3 h-3/4  flex flex-col justify-center 
            items-center rounded-lg shadow-lg">
                <label className="forest-green-font jacques-francois-regular 
                text-2xl mb-3" htmlFor="username">Username:</label>
                <input className="border-2 p-2 rounded-lg mb-5" 
                type="text" id="username" name="username" />
                <label className="forest-green-font jacques-francois-regular 
                text-2xl mb-3" htmlFor="email">Email:</label>
                <input className="border-2 p-2 rounded-lg mb-5" 
                type="email" id="email" name="email" />
                <label className="forest-green-font jacques-francois-regular text-2xl 
                mb-3" htmlFor="password">Password:</label>
                <input className="border-2 p-2 rounded-lg mb-5" 
                type="password" id="password" name="password" />
                <label className="forest-green-font jacques-francois-regular text-2xl 
                mb-3" htmlFor="confirmPassword">Confirm Password:</label>
                <input className="border-2 p-2 rounded-lg mb-5" 
                type="password" id="confirmPassword" name="confirmPassword" />
                <button className="bg-yellow-800 text-white p-3 rounded-lg 
                text-xl tracking-wider hover:bg-yellow-600 hover:shadow-lg 
                hover:scale-105 transition duration-300 ease-in-out cursor-pointer">
                    Sign Up</button>
            </div>
        </div>
    )
}

export default Signup