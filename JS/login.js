const loginForm = document.getElementById("loginForm");
const messageDiv = document.getElementById("loginMessage");
const API_BASE_URL = "https://quiz-backend-rdcd.onrender.com";

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const user = {
    email: document.getElementById("email").value.trim(),
    password: document.getElementById("password").value.trim(),
  };

  messageDiv.className = "";
  messageDiv.textContent = "";

  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
      credentials: "include", // sends cookies along with the request
    });

    const data = await response.json();

    if (!response.ok) {
      messageDiv.textContent = data.error || "Login failed!";
      messageDiv.classList.add("error");
      return;
    }

    // Redirect to profile page after successful login
    window.location.href = "profile.html";
  } catch (err) {
    messageDiv.textContent = `Network error: ${err.message}`;
    messageDiv.classList.add("error");
  }
});
