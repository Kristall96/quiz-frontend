const API_BASE_URL = "https://quiz-backend-rdcd.onrender.com";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/profile`, {
      credentials: "include",
    });

    const user = await response.json();

    if (!response.ok || user.error) {
      window.location.href = "index.html"; // Redirect to login if not authenticated
      return;
    }

    document.getElementById("username").textContent = user.username;
    document.getElementById("email").textContent = user.email;
    document.getElementById("role").textContent = user.role;
  } catch (error) {
    window.location.href = "index.html"; // Redirect if session is invalid
  }
});
