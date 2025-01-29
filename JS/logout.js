const logoutBtn = document.getElementById("logoutBtn");
const API_BASE_URL = "https://quiz-backend-rdcd.onrender.com";

if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    try {
      await fetch(`${API_BASE_URL}/api/logout`, {
        method: "POST",
        credentials: "include", // Ensures cookies are sent for session invalidation
      });

      // Redirect user to login page
      window.location.href = "index.html";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  });
}
