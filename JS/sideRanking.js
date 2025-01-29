const API_BASE_URL = "https://quiz-backend-rdcd.onrender.com";
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/rank`, {
      method: "GET",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to fetch");
    }

    const userPoints = await response.json();
    const leftAside = document.getElementById("asideLeft");
    const leaderBoard = document.createElement("h3");
    leaderBoard.id = "leaderboard";
    leaderBoard.textContent = "Leaderboard";
    leftAside.appendChild(leaderBoard);
    userPoints.forEach((points) => {
      const ul = document.createElement("ul");
      ul.id = "leftAsitUl";
      ul.innerHTML = `
        <li class="leftAsitLi">
            ${points.username}
        </li>
        <li class="leftAsitLi">
            ${points.points} pts.
        </li>
        `;
      leftAside.appendChild(ul);
    });
  } catch (err) {
    alert(err.message);
  }
});
