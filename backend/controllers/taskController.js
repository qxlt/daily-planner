import { createTasks, getAllTasks, getTasksByDate, updateOneTask, deleteOneTask, getOneTaskById } from "../services/taskService.js";

export const createTask = async (req, res) => {
    const username = req.user?.username;
    const { 
        description, 
        start_time, 
        end_time, 
        repeated, 
        category, 
        date_assigned 
    } = req.body;
    if (!description || !date_assigned || repeated === undefined) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const { data, error } = await createTasks(
        username,
        description,
        start_time, 
        end_time, 
        repeated, 
        category, 
        date_assigned
    );

    if (error) return res.status(400).json({ error: error.message });
    res.status(201).json({ message: "Task created", task: data });
}

export const getTasks = async (req, res) => {
    const username = req.user?.username;
    const { data, error } = await getAllTasks(username);

    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json({ tasks: data });
}

export const getTaskById = async (req, res) => {
    const username = req.user?.username;
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Task ID required" });

    const { data, error } = await getOneTaskById(id, username);

    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json({ task: data });
}

export const getTaskByDate = async (req, res) => {
    const username = req.user?.username;
    const { date } = req.params;
    if (!date) return res.status(400).json({ error: "Date parameter required" });

    const { data, error } = await getTasksByDate(date, username);

    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json({ tasks: data });
}

export const updateTask = async (req, res) => {
    const username = req.user?.username;
    const { id } = req.params;
    const updates = req.body;
    if (!id) return res.status(400).json({ error: "Task ID required" });

    const { data, error } = await updateOneTask(id, updates, username);

    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json({ message: "Task updated", task: data });
}

export const deleteTask = async (req, res) => {
    const username = req.user?.username;
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Task ID required" });

    const { data, error } = await deleteOneTask(id, username);

    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json({ message: "Task deleted", task: data });
}       
