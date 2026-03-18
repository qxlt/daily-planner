import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const navbar = () => {
    return (
        <div className="w-full h-16 flex flex-row justify-between items-center beige-bg shadow-md absolute top-0">
            <h1 className="text-left text-2xl font-bold jacques-francois-regular mx-5 forest-green-font">Daily Planner
                <span className="jacques-francois-regular text-sm"> - By Qinxi</span></h1>
            <Link to="/" className="mr-15"><FontAwesomeIcon icon={faHouse} /></Link>
        </div>
    );
}

export default navbar;