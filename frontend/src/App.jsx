import { useEffect, useState } from "react";
import supabase from "./config/supabaseClient";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const { data, error } = await supabase
        .from("Users.    ")  // use quotes if uppercase
        .select('*');

      if (error) {
        console.error("Error fetching user:", error);
      } else if (!data || data.length === 0) {
        console.log("No rows found in the table.");
      } else {
        console.log("Seeded user:", data[0]);
        setUser(data[0]); // save in state
      }
    }

    fetchUser();
  }, []); // <-- empty dependency array ensures this runs only once

  if (!user) return <p>Loading user...</p>;

  return (
    <div>
      <h2>Seeded User</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Streak:</strong> {user.streak}</p>
      <p><strong>Tasks:</strong> {JSON.stringify(user.tasks)}</p>
    </div>
  );
}

