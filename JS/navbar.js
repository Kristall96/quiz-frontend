document.addEventListener("DOMContentLoaded", async () => {
  const authLinks = document.getElementById("authLinks");
  if (!authLinks) {
    console.error(
      "❌ Navbar element not found! Make sure #authLinks exists in HTML."
    );
    return;
  }

  const API_BASE_URL = "https://quiz-backend-rdcd.onrender.com";

  try {
    const response = await fetch(`${API_BASE_URL}/api/users/profile`, {
      credentials: "include", // ✅ Ensure cookies are included
    });

    const user = await response.json();
    console.log("🔍 Profile Response:", user);

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
            method: "POST",
            credentials: "include",
          });
          window.location.reload();
        });
    } else {
      console.log("❌ User is NOT logged in.");
      authLinks.innerHTML = `
                <li><a class="menuText" href="./HTML/login.html">Log in</a></li>
                <li><a class="menuText" href="./HTML/register.html">Sign up for free</a></li>
            `;
    }
  } catch (error) {
    console.error("🔥 Error checking authentication:", error);
  }
});
