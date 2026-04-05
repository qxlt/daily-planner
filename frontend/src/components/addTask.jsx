import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";


const AddTask = () => {

  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [displayTasks, setDisplayTasks] = useState(false);
  const [sideBar, setSideBar] = useState(false);
  const sidebarRef = useRef(null);

  const generateTimetable = async (e) => {
    e.preventDefault();
        try {
            const res = await fetch("http://localhost:3001/parse-tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ input })
            });
            const data = await res.json();
            if (data.ok) {
                setTasks(data.tasks);
            }
        } catch (error) {
            console.error("Error generating timetable:", error);
        }
    }


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
                <Link className="hover:underline" to={"/profile"}>Username</Link>
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
              jacques-francois-regular forest-green-font hover:underline">View Monthly Calendar</Link>
              <Link className="p-3 border-b-2 w-full border-b-forest-green beige-bg 
              jacques-francois-regular forest-green-font hover:underline" to="/monthly-timetable">View Current Timetable</Link>
              <Link className="p-3 border-b-2 w-full border-b-forest-green beige-bg 
              jacques-francois-regular forest-green-font hover:underline">Settings</Link>
            </li>
          </div>
        </div>
      <div className={`w-screen h-screen flex flex-col items-center bg-[url('./pics/colorful-star.jpg')] bg-contain 
        ${sideBar ? `opacity-30` : `opacity-100`} transition duration-500 ease-in-out`}>
          <div className="w-screen h-14 border-b-2 border-b-gray-200 relative top-0 flex justify-start items-center">
              <FontAwesomeIcon icon={faBars} className="ml-10 text-2xl" onClick={() => setSideBar(true)} />
          </div>
          <div className="bg-[url('./pics/floral-banner.png')] bg-contain w-2/3 h-3/4 mt-20 rounded-xl
          flex flex-col items-center justify-center">
              <h2 className="jacques-francois-regular text-4xl forest-green-font">Start your day by adding tasks</h2>
              <div className="w-full flex flex-col items-center justify-center mt-15">
                <textarea onChange={(e) => setInput(e.target.value)}
                  type="text" autoFocus
                  className="resize-none focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300
                  rounded-xl w-3/4 h-auto beige-bg p-5 jacques-francois-regular  text-gray-400"
                  placeholder="e.g. meeting starts @3. After work date with boyfriend and do laundry before bedtime" 
                />
                <div className="flex flex-row justify-between w-3/4 mt-1">
                  <Link to="" className="forest-green-font jacques-francois-regular  rounded-lg hover:underline">View Existed Timetable</Link>
                  <Link to="" className="forest-green-font jacques-francois-regular rounded-lg hover:underline">Add Fixed-Hour Events</Link>
                </div>
              </div>
              <button onClick={generateTimetable} className="mt-5 button-beige-bg w-1/6 h-auto jacques-francois-regular 
              text-xl rounded-2xl forest-green-font hover:scale-105 hover:transition hover:duration-300 hover:!font-bold">Generate Timetable</button>
          </div>
           
          {displayTasks && tasks.length > 0 (
            
          )}
      </div>
    </div>
  );
};

export default AddTask;