import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/homePage.jsx";
import Signup from "./components/signup.jsx";
import About from "./components/about.jsx";
import Login from "./components/login.jsx";
import AddTask from "./components/addTask.jsx";

export default function App() {
  return (  
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/addtask" element={<AddTask />} />
        </Routes>
      </BrowserRouter>

  )
}

