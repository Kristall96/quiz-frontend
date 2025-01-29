const API_BASE_URL = "https://quiz-backend-rdcd.onrender.com"; // Change if needed

document.addEventListener("DOMContentLoaded", async () => {
  const authLinks = document.getElementById("authLinks");
  if (!authLinks) return;

  try {
    const response = await fetch(`${API_BASE_URL}/api/profile`, {
      credentials: "include", // ✅ Ensure credentials are included
    });

    const user = await response.json();

    if (response.ok && user.username) {
      // ✅ User is logged in, show Profile & Logout
      authLinks.innerHTML = `
                <li><a class="menuText" href="./HTML/profile.html">Profile</a></li>
                <li><a class="menuText" id="logoutBtn" href="#">Logout</a></li>
            `;

      // ✅ Add logout event listener
      document
        .getElementById("logoutBtn")
        .addEventListener("click", async () => {
          await fetch(`${API_BASE_URL}/api/logout`, {
            method: "POST",
            credentials: "include",
          });

          window.location.reload(); // ✅ Refresh page after logout
        });
    } else {
      // ✅ User is not logged in, show Login & Register
      authLinks.innerHTML = `
                <li><a class="menuText" href="./HTML/login.html">Log in</a></li>
                <li><a class="menuText" href="./HTML/register.html">Sign up for free</a></li>
            `;
    }
  } catch (error) {
    console.error("Error checking authentication:", error);
    authLinks.innerHTML = `
            <li><a class="menuText" href="./HTML/login.html">Log in</a></li>
            <li><a class="menuText" href="./HTML/register.html">Sign up for free</a></li>
        `;
  }
});
