import { getSession } from "../services/sessionService.js";

export const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ error: "Authentication required" });
  }

  const session = getSession(token);

  if (!session) {
    return res.status(401).json({ error: "Session expired or invalid" });
  }

  req.user = session;
  req.token = token;
  next();
};
