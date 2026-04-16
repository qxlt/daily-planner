const AUTH_STORAGE_KEY = "daily_planner_auth";

export const setAuthSession = (token, user) => {
  localStorage.setItem(
    AUTH_STORAGE_KEY,
    JSON.stringify({
      token,
      user
    })
  );
};

export const getAuthSession = () => {
  const storedValue = localStorage.getItem(AUTH_STORAGE_KEY);

  if (!storedValue) {
    return null;
  }

  try {
    return JSON.parse(storedValue);
  } catch (error) {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    return null;
  }
};

export const getAuthToken = () => {
  return getAuthSession()?.token || "";
};

export const getAuthUsername = () => {
  return getAuthSession()?.user?.username || "";
};

export const buildProtectedPath = (path, username = getAuthUsername()) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  if (!username) {
    return normalizedPath;
  }

  return `/u/${username}${normalizedPath}`;
};

export const isAuthenticated = () => {
  return Boolean(getAuthToken());
};

export const clearAuthSession = () => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
};
