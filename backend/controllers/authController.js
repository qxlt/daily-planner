import { signupUser, loginUser } from "../services/authService.js";

export const signup = async (req, res) => {
  const { email, password, username } = req.body;
  if (!email || !password || !username) return res.status(400).json({ error: "All fields required" });

  const { data, error } = await signupUser(email, username, password);

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json({ message: "User created", user: data });
};

export const login = async (req, res) => {
  const { login_credential, password } = req.body;
  if (!login_credential || !password) return res.status(400).json({ error: "Login credential & password required" });

  const { user, error } = await loginUser(login_credential, password);

  if (error) return res.status(400).json({ error });
  res.status(200).json({ message: "Login successful", user });
};