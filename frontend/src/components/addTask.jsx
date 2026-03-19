import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const AddTask = () => {
  return (
    <div className="w-screen h-screen flex flex-col items-center bg-[url('./pics/colorful-star.jpg')] bg-fixed">
        <div className="w-screen h-14 border-b-2 border-b-gray-200 relative top-0 flex justify-start items-center">
            <FontAwesomeIcon icon={faBars} className="ml-10 text-2xl" />
        </div>
        <div className="bg-[url('./pics/floral-banner.png')] bg-cover w-3/5 h-3/4 mt-20">
            <h2 className="jacques-francois-regular">Start your day by adding tasks</h2>
            <input type="text" className="jacques-francois-regular"
            placeholder="e.g. meeting starts @3. After work date with boyfriend and do laundry before bedtime" />
        </div>
    </div>
  );s
};

export default AddTask;