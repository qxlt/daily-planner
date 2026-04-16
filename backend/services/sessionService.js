import crypto from "crypto";

const sessions = new Map();

export const createSession = (user) => {
  const token = crypto.randomBytes(32).toString("hex");

  sessions.set(token, {
    id: user.id,
    username: user.username,
    email_address: user.email_address,
    created_at: new Date().toISOString()
  });

  return token;
};

export const getSession = (token) => {
  if (!token) {
    return null;
  }

  return sessions.get(token) || null;
};

export const deleteSession = (token) => {
  if (!token) {
    return;
  }

  sessions.delete(token);
};
