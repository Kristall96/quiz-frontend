const API_BASE_URL = "https://quiz-backend-rdcd.onrender.com";

document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id");

  console.log("Extracted Post ID:", postId);

  if (!postId) {
    alert("Invalid post ID");
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/blog/${postId}`);

    if (!response.ok) {
      let errorMessage = "Failed to fetch the blog post";
      try {
        const error = await response.json();
        errorMessage = error.error || errorMessage;
      } catch (jsonError) {
        console.error("Non-JSON error response", jsonError);
      }
      throw new Error(errorMessage);
    }

    const post = await response.json();
    const postContainer = document.getElementById("postContainer");

    postContainer.innerHTML = `
        <h1>${post.title}</h1>
        <img src="${post.coverImage}" alt="${post.title}">
        <p>${post.content}</p>
        <button id="goBack">Back to Posts</button>
      `;

    document.getElementById("goBack").addEventListener("click", () => {
      window.location.href = "/quiz-frontend/index.html";
    });
  } catch (err) {
    console.error("Fetch Error:", err.message);
    alert(err.message);
  }
});
