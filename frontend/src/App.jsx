import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/homePage.jsx";
import Signup from "./components/signup.jsx";
import Login from "./components/login.jsx";
import AddTask from "./components/addTask.jsx";
import CreateManualTasks from "./components/createManualTasks.jsx";
import Profile from "./components/profile.jsx";
import Timetable from "./components/timetable.jsx";
import DetailedTimetable from "./components/detailedTimetable.jsx";
import ProtectedRoute from "./components/protectedRoute.jsx";

export default function App() {
  return (  
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Login />} />

          {/* Protected routes with username */}
          <Route path="/u/:username" element={<ProtectedRoute />}>
            <Route path="addtask" element={<AddTask />} />
            <Route path="manual-tasks" element={<CreateManualTasks />} />
            <Route path="profile" element={<Profile />} />
            <Route path="monthly-timetable" element={<Timetable />} />
            <Route path="detailed-timetable" element={<DetailedTimetable />} />
          </Route>
        </Routes>
      </BrowserRouter>

  )
}
