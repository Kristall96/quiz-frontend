const API_BASE_URL = "https://quiz-backend-rdcd.onrender.com";

document.addEventListener("DOMContentLoaded", async () => {
  const authLinks = document.getElementById("authLinks");
  if (!authLinks) return console.error("Navbar element not found!");

  try {
    const response = await fetch(`${API_BASE_URL}/api/users/profile`, {
      // ✅ Corrected path
      credentials: "include",
    });

    const user = await response.json();
    console.log("Profile Response:", user); // ✅ Log profile response

    if (response.ok && user.username) {
      console.log("✅ User is logged in:", user);
      authLinks.innerHTML = `
                <li><a class="menuText" href="./HTML/profile.html">Profile</a></li>
                <li><a class="menuText" id="logoutBtn" href="#">Logout</a></li>
            `;
      document
        .getElementById("logoutBtn")
        .addEventListener("click", async () => {
          await fetch(`${API_BASE_URL}/api/users/logout`, {
            // ✅ Ensure logout route is correct
            method: "POST",
            credentials: "include",
          });
          window.location.reload(); // ✅ Refresh page after logout
        });
    } else {
      console.log("❌ User is NOT logged in.");
      authLinks.innerHTML = `
                <li><a class="menuText" href="./HTML/login.html">Log in</a></li>
                <li><a class="menuText" href="./HTML/register.html">Sign up for free</a></li>
            `;
    }
  } catch (error) {
    console.error("Error checking authentication:", error);
  }
});
