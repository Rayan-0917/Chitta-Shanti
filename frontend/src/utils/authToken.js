export function getAuthToken() {
  return localStorage.getItem("access_token");
}

export function getUserRole() {
  return localStorage.getItem("role");
}

export function saveAuthData(authData) {
  localStorage.setItem(
    "access_token",
    authData.access_token
  );

  localStorage.setItem(
    "role",
    authData.role
  );
}

export function clearAuthData() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("role");
}