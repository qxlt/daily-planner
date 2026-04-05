import { React, useState, useEffect } from 'react'

const Timetable = () => {

    const [currentDate, setCurrentDate] = useState(new Date());
    const [days, setDays] = useState([]);

    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth(); // month index

    const monthNameEn = new Intl.DateTimeFormat("en-US", {
    month: "long",
    }).format(currentDate);


    const getMonthDays = (year, month) => {
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    const days = [];

        // empty slots before month starts
        for (let i = 0; i < firstDay; i++) {
            days.push(null);
        }

        // actual days
        for (let i = 1; i <= totalDays; i++) {
            days.push({
            date: i,
            fullDate: `${year}-${month + 1}-${i}`,
            tasks: [],
            });
        }

        return days;
    };

    useEffect(() => {
        const newDays = getMonthDays(currentYear, currentMonth);
        setDays(newDays);
    }, [currentYear, currentMonth]);

    const lastMonth = () => {
        setCurrentDate(prev => {
        const d = new Date(prev);
        d.setMonth(d.getMonth() - 1);
        return d;
        });
    };

    const nextMonth = () => {
        setCurrentDate(prev => {
        const d = new Date(prev);
        d.setMonth(d.getMonth() + 1);
        return d;
        });
    };


    
    






    return(
        <div className="w-scrren h-screen bg-[url('./pics/colorful-star.jpg')] bg-contain">
            <div className='m-4 flex flex-row justify-center'>
                <h2 className='jacques-francois-regular text-4xl'>{monthNameEn}</h2>
                <span className='flex flex-row mx-10 items-center'>
                    <button className="flex items-center justify-center w-8 h-8 mx-2 
                    bg-gray-200 text-gray-500 font-extrabold rounded-full shadow-sm hover:bg-gray-300 transition">
                        &lt;
                    </button>
                    <button className='bg-gray-200 p-2 rounded-sm jacques-francois-regular 
                    shadow-sm hover:bg-gray-300 transition'>Today</button>
                    <button className="flex items-center justify-center w-8 h-8 mx-2 
                    bg-gray-200 text-gray-500 font-extrabold rounded-full shadow-sm hover:bg-gray-300 transition">
                        &gt;
                    </button>
                </span>
            </div>

            <div className="grid grid-cols-7 h-6 mt-10">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div
                    key={day}
                    className="text-center font-semibold"
                    >
                    {day}
                    </div>
                ))}
                </div>
            <div className="grid grid-cols-7 gap-px h-auto bg-pink-300 border border-gray-300 mx-4">
                
                {days.map((day, index) => (
                    <div
                    key={index}
                    className="h-36 flex flex-col bg-white"
                    // onClick={() => openDay(day)}
                    >
                    {day != null && 
                    <span className="text-sm font-semibold p-3">{day.date}</span>
                    }
                    

                    {/* <div className="flex flex-col overflow-hidden">
                        {day.tasks.slice(0, 3).map((task, i) => (
                        <div
                            key={i}
                            className="text-xs bg-blue-200 rounded px-1 truncate"
                        >
                            {task.title}
                        </div>
                        ))}

                        {day.tasks.length > 3 && (
                        <span className="text-xs text-gray-500">
                            +{day.tasks.length - 3} more
                        </span>
                        )}
                    </div> */}
                    </div>
                ))}
                </div>
        </div>
    )

}

export default Timetable