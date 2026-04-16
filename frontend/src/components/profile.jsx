import { faBars, faHouse, faArrowLeft, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { buildProtectedPath } from "../lib/auth.js";


const Profile = () => {
    const navigate = useNavigate();
    const [sideBar, setSideBar] = useState(false);
    const sidebarRef = useRef(null);

    const months = [
    { name: "Jan", days: 31 },
    { name: "Feb", days: 28 },
    { name: "Mar", days: 31 },
    { name: "Apr", days: 30 },
    { name: "May", days: 31 },
    { name: "Jun", days: 30 },
    { name: "Jul", days: 31 },
    { name: "Aug", days: 31 },
    { name: "Sep", days: 30 },
    { name: "Oct", days: 31 },
    { name: "Nov", days: 30 },
    { name: "Dec", days: 31 },
    ];
    
    
       useEffect(() => {
        function handleClickOutside(event) {
          if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
            setSideBar(false);
          }
        }
    
        if (sideBar) {
          document.addEventListener("mousedown", handleClickOutside);
        } else {
          document.removeEventListener("mousedown", handleClickOutside);
        }
    
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [sideBar]);


      const loginDates = [
        "2026-03-20",
        "2026-03-19",
        "2026-03-17"
        ];

        const getPastYearDates = () => {
        const days = [];
        const today = new Date();

        for (let i = 0; i < 365; i++) {
            const d = new Date();
            d.setDate(today.getDate() - i);

            const formatted = d.toISOString().split("T")[0];
            days.push(formatted);
        }

        return days.reverse(); // oldest → newest
        };

        const loginSet = new Set(loginDates);

        const days = getPastYearDates();

    return (
        <div>
            {/* Side bar menu */}
                <div 
                    ref={sidebarRef} 
                    className={`w-1/4 absolute left-0 h-screen
                    flex flex-col bg-[url('./pics/colorful-star.jpg')] bg-contain z-50 
                    transition duration-500 ease-in-out
                    ${sideBar ? "translate-x-0" : "-translate-x-full"}`}>
                      {/* profile */}
                      <div className="flex flex-row p-5 justify-around items-center border-b-2 border-b-forest-green">
                        <div className="flex flex-col justify-center items-center">
                          <Link
                           className="rounded-full w-16 h-16 bg-amber-100 border-2 
                          border-amber-100 hover:border-amber-300" />
                          <span className="jacques-francois-regular text-md mt-1 text-center forest-green-font">Hi,&nbsp;
                            <Link className="hover:underline" to={buildProtectedPath("/profile")}>Username</Link>
                          </span>
                        </div>
                          <FontAwesomeIcon icon={faArrowLeft} className="absolute top-2 right-2" onClick={() => setSideBar(false)} />
                          <div className="jacques-francois-regular text-md text-center forest-green-font">
                            Have been planning for
                          <pre className="jacques-francois-regular text-md text-end forest-green-font">
                            <span className="text-2xl text-medium">45 </span>
                              days
                          </pre>
                        </div>
                    </div>
                      <div>
                        <li className="flex flex-col justify-start items-start">
                          <Link className="p-3 border-b-2 w-full border-b-forest-green beige-bg 
                          jacques-francois-regular forest-green-font hover:underline" to={buildProtectedPath("/monthly-timetable")}>View Monthly Calendar</Link>
                          <Link className="p-3 border-b-2 w-full border-b-forest-green beige-bg 
                          jacques-francois-regular forest-green-font hover:underline" to={buildProtectedPath("/detailed-timetable")}>View Current Timetable</Link>
                          <Link className="p-3 border-b-2 w-full border-b-forest-green beige-bg 
                          jacques-francois-regular forest-green-font hover:underline">Settings</Link>
                        </li>
                      </div>
                    </div>


            {/* main part */}
            <div className={`bg-[url('./pics/colorful-star.jpg')] bg-contain w-screen min-h-screen
             flex flex-col items-center pb-40
            ${sideBar ? "opacity-30" : "opacity-100"} transition duration-300 ease-in-out`}>


                {/* navbar */}
                <div className="z-50 bg-[url('./pics/colorful-star.jpg')] bg-auto
                sticky top-0 h-1/12 w-screen shadow-lg shadow-gray-200 flex flex-row justify-start items-center gap-5 p-5">
                    <FontAwesomeIcon onClick={() => navigate(buildProtectedPath("/addtask"))} icon={faHouse} className="text-2xl forest-green-font cursor-pointer" />
                    <FontAwesomeIcon onClick={() => setSideBar(true)} icon={faBars} className="text-2xl forest-green-font cursor-pointer" />
                </div>

                {/* main part */}
                <div className="flex flex-col justify-center items-center gap-5 w-full min-h-screen
                 relative top-20">
                    <a className="w-40 h-40 bg-amber-100 rounded-full"></a>
                    <div className="flex flex-row justify-center items-center gap-5">
                        <a className="w-12 h-12 bg-amber-100 rounded-full"></a>
                        <a className="w-12 h-12 bg-lime-200 rounded-full"></a>
                        <a className="w-12 h-12 bg-zinc-100 rounded-full"></a>
                        <a className="w-12 h-12 bg-indigo-300 rounded-full"></a>
                        <a className="w-12 h-12 bg-pink-300 rounded-full"></a>
                        <a className="w-12 h-12 bg-mauve-400 rounded-full"></a>
                    </div>
                    <div className="flex flex-col justify-center items-center rounded-lg beige-bg p-3
                     jacques-francois-regular gap-3 w-1/6 mb-10">
                        <div className="">
                            <div className="flex flex-row gap-3 justify-center items-center">
                                <h3 className="text-center text-lg">Username</h3>
                                <FontAwesomeIcon icon={faLock} className="text-sm" />
                            </div>
                            <p className="text-center forest-green-font bg-white rounded-lg p-1">
                                placeholder - username
                                </p>
                        </div>
                        <div>
                            <div className="flex flex-row gap-3 justify-center items-center">
                                <h3 className="text-center text-lg">Email Address</h3>
                                <a className="bg-gray-200 border-2 border-black cursor-pointer rounded-lg">Update</a>
                            </div>
                            <p className="text-center forest-green-font rounded-lg bg-white p-1">placeholder - email</p>
                        </div>
                        <div>
                            <div className="flex flex-row gap-3">
                                <h3 className="text-center text-lg">Password</h3>
                                <a className="bg-gray-200 border border-black cursor-pointer rounded-lg">Reset</a>
                            </div> 
                            <p className="text-center forest-green-font rounded-lg bg-white p-1 text-md">********</p>
                        </div>
                    </div>
                    {/* streaks */}
                    <h2 className="jacques-francois-regular text-2xl forest-green-font">Streaks since joined</h2>
                    <div className="w-1/2 h-auto border flex flex-col bg-white">
                        <div className="flex flex-row jacques-francois-regular border-b">
                            <a className="bg-blue-200 p-1 text-lg border-r-2 w-15 text-center">2026</a>
                            <a className="bg-blue-200 p-1 text-lg border-r-2 w-15 text-center">2025</a>
                            <a className="bg-blue-200 p-1 text-lg border-r-2 w-15 text-center">2024</a>
                        </div>
                        <div className="grid grid-cols-3 border-gray-400">
                            {months.map((month, i) => (
                                <div key={i} className="border border-gray-400 p-2">
                                
                                {/* Month Title */}
                                <h3 className="text-sm text-center mb-2">
                                    {month.name}
                                </h3>

                                {/* Days Grid */}
                                <div className="grid grid-cols-7 justify-items-center">
                                    {Array.from({ length: month.days }).map((_, index) => (
                                    <div
                                        key={index}
                                        className={`w-4 h-4 border border-gray-300 my-1 ${loginSet.has(`2026-${String(i + 1).padStart(2, "0")}-${String(index + 1).padStart(2, "0")}`) ? "bg-green-500" : "bg-gray-200"}`}
                                    />
                                    ))}
                                </div>

                                </div>
                            ))}
                            </div>
                    </div>
                    

                </div>
            </div>
        </div>
    )
}

export default Profile;
