const form = document.getElementById("registerForm");
const messageDiv = document.getElementById("message");
const API_BASE_URL = "https://quiz-backend-rdcd.onrender.com";
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const user = {
    username: document.getElementById("username").value.trim(),
    email: document.getElementById("email").value.trim(),
    password: document.getElementById("password").value.trim(),
  };

  messageDiv.className = "";
  messageDiv.textContent = "";

  try {
    const response = await fetch("${API_BASE_URL}/api/register1", {
      method: "POST",
      headers: {
        "Content-Type": `application/json`,
      },
      body: JSON.stringify(user),
    });

    const data = await response.json();

    if (!response.ok) {
      messageDiv.textContent = data.error || "Registration failed!";
      messageDiv.classList.add("error");
      return;
    }

    messageDiv.textContent = "Registration successful! You can now Login.";
    messageDiv.classList.add("success");
  } catch (err) {
    messageDiv.textContent = `Network error: ${err.message}`;
    messageDiv.classList.add(`error`);
  }
});
