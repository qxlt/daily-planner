import express from "express";
import cors from "cors";
const port = process.env.PORT || 3001;
import { signup, login } from "./controllers/authController.js";
import { createTask, getTasks, getTaskByDate, updateTask, deleteTask, getTaskById } from "./controllers/taskController.js";      
import { GoogleGenAI } from "@google/genai";

const app = express();
const ai = new GoogleGenAI({})

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Planner API running");
});

app.post("/signup", signup);

app.post("/login", login);

app.post("/add-task", createTask);

app.post("/parse-tasks", async (req, res) => {
  const { input } = req.body;

  try {
    const response = await ai.models.generateContent({
      model:"gemini-3-flash-preview",
      contents:`
                You are a task parser.

                Convert user input into structured JSON.

                Rules:
                - Extract tasks
                - Each task must include:
                  - name (string)
                - Each task can possibly include:
                  - start_time (24h format HH:MM or null)
                  - end_time (24h format HH:MM or null)
                  - is_repeated (boolean, default false)
                - If time is not specified, use null
                - Return ONLY valid JSON array
                - Do NOT include markdown
                - Do NOT include explanations

                User input: ${input}
                          `
    });
    const output =
      response.candidates?.[0]?.content?.parts?.[0]?.text || "";

    const cleanOutput = output
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    
      const parsed = JSON.parse(cleanOutput);
      res.json(parsed)
  }
  catch (error) {
    console.error("Error parsing tasks:", error);
    res.status(500).json({ error: "Failed to parse tasks" });
  }
})

app.get("/tasks", getTasks);

app.get("/tasks/:id", getTaskById);

app.get("/tasks/date/:date", getTaskByDate);

app.put("/tasks/:id", updateTask);

app.delete("/tasks/:id", deleteTask);



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});