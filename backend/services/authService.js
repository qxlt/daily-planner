import { supabase } from "../lib/supabase.js";
import bcrypt from "bcrypt";

export const signupUser = async (email, username,password) => {
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  const created_at = new Date().toISOString();
  const updated_at = created_at;
  const profile_pic = "E1EEFF"

  // Insert user into Supabase
  const { data, error } = await supabase
    .from("Users")
    .insert([{ email_address:email, password: hashedPassword, username, created_at, updated_at, profile_pic }])
    .select() //just return the inserted row
    .single(); // Get the single inserted user

  return { data, error };
};

export const loginUser = async (login_credential, password) => {
  // Find user by login credential (email or username)
  const { data: user, error } = await supabase
    .from("Users")
    .select("*")
    .or(`email_address.eq.${login_credential},username.eq.${login_credential}`)
    .single();

  if (error || !user) return { user: null, error: "User not found" };

  // Compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return { user: null, error: "Incorrect password" };

  // Log login time (for demonstration, we just create a log entry string)
  const loginEntry = `Login at ${new Date().toISOString()}`;

  // Append login entry to user's log (assuming user_log is an array of strings)
  const { data: updatedUser, error: updateError } = await supabase
    .from("Users")
    .update({
      user_log: [...(user.user_log || []), loginEntry]  // append new entry
    })
    .or(`email_address.eq.${login_credential},username.eq.${login_credential}`)
    .select()
    .single();

  if (updateError) return { user: null, error: updateError.message };

  return { user: updatedUser, error: null };
};