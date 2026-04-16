import { supabase } from "../lib/supabase.js";

export const createTasks = async (
    associated_user,
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
            length,
            associated_user
        }])
        .select()
        .single();
        
    return { data, error };
}

export const getAllTasks = async (associated_user) => {
    const { data, error } = await supabase
        .from("Tasks")
        .select("*")
        .eq("associated_user", associated_user);
        
    return { data, error };
}

export const getOneTaskById = async (id, associated_user) => {
    const { data, error } = await supabase
        .from("Tasks")
        .select("*")
        .eq("id", id)
        .eq("associated_user", associated_user)
        .single();
        
    return { data, error };
}

export const getTasksByDate = async (date, associated_user) => {
    const month = date.slice(0, 2);
    const day = date.slice(2, 4);
    const year = date.slice(4, 8);
    const isoDate = new Date(`${year}-${month}-${day}T00:00:00Z`).toISOString(); // convert to ISO format for comparison
    const { data, error } = await supabase
        .from("Tasks")
        .select("*")
        .eq("date_assigned", isoDate)
        .eq("associated_user", associated_user);
        
    return { data, error };
}

export const updateOneTask = async (id, updates, associated_user) => {
    const updated_at = new Date().toISOString();
    const { associated_user: _ignoredUser, ...safeUpdates } = updates;
    const { data, error } = await supabase
        .from("Tasks")
        .update({ ...safeUpdates, updated_at })
        .eq("id", id)
        .eq("associated_user", associated_user)
        .select()
        .single();
        
    return { data, error };
}

export const deleteOneTask = async (id, associated_user) => {
    const { data, error } = await supabase
        .from("Tasks")
        .delete()
        .eq("id", id)
        .eq("associated_user", associated_user)
        .select()
        .single();
        
    return { data, error };
}       
