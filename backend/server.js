import express from "express";
import cors from "cors";
const port = process.env.PORT || 3001;
import { signup, login } from "./controllers/authController.js";
import { createTask, getTasks, getTaskByDate, updateTask, deleteTask, getTaskById } from "./controllers/taskController.js";      

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Planner API running");
});

app.post("/signup", signup);

app.post("/login", login);

app.post("/add-task", createTask);

app.get("/tasks", getTasks);

app.get("/tasks/:id", getTaskById);

app.get("/tasks/date/:date", getTaskByDate);

app.put("/tasks/:id", updateTask);

app.delete("/tasks/:id", deleteTask);



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});