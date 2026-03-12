import e from "express";
import { supabase } from "../lib/supabase.js";

export const createTasks = async (
    description, 
    start_time, 
    end_time, 
    repeated, 
    category, 
    date_assigned
) => {
    const created_at = new Date().toISOString();    
    const updated_at = created_at;

    let length = null; // default length is null, will be calculated if start_time and end_time are provided

    if (start_time && end_time) {
       const [startHour, startMin] = start_time.split(":").map(Number);
       const [endHour, endMin] = end_time.split(":").map(Number);

        // convert to total minutes
        const startMinutes = startHour * 60 + startMin;
        const endMinutes = endHour * 60 + endMin;

    // validation
    if (startMinutes >= endMinutes) {
      return { data: null, error: new Error("Start time must be before end time") };
    }

    // length in minutes
    length = endMinutes - startMinutes;
  }
    const { data, error } = await supabase
        .from("Tasks")
        .insert([{ 
            description, 
            start_time, 
            end_time, 
            repeated, 
            category, 
            created_at, 
            updated_at, 
            date_assigned, 
            length 
        }])
        .select()
        .single();
        
    return { data, error };
}

export const getAllTasks = async () => {
    const { data, error } = await supabase
        .from("Tasks")
        .select("*");
        
    return { data, error };
}

export const getOneTaskById = async (id) => {
    const { data, error } = await supabase
        .from("Tasks")
        .select("*")
        .eq("id", id)
        .single();
        
    return { data, error };
}

export const getTasksByDate = async (date) => {
    const month = date.slice(0, 2);
    const day = date.slice(2, 4);
    const year = date.slice(4, 8);
    const isoDate = new Date(`${year}-${month}-${day}T00:00:00Z`).toISOString(); // convert to ISO format for comparison
    const { data, error } = await supabase
        .from("Tasks")
        .select("*")
        .eq("date_assigned", isoDate);
        
    return { data, error };
}

export const updateOneTask = async (id, updates) => {
    const updated_at = new Date().toISOString();
    const { data, error } = await supabase
        .from("Tasks")
        .update({ ...updates, updated_at })
        .eq("id", id)
        .select()
        .single();
        
    return { data, error };
}

export const deleteOneTask = async (id) => {
    const { data, error } = await supabase
        .from("Tasks")
        .delete()
        .eq("id", id)
        .select()
        .single();
        
    return { data, error };
}       
