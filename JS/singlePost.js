const API_BASE_URL = "https://quiz-backend-rdcd.onrender.com";

document.addEventListener("DOMContentLoaded", async () => {
  // Extract the post ID from the URL query string
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id");

  console.log("🔍 Extracted Post ID:", postId); // Debugging

  if (!postId) {
    alert("❌ Invalid post ID. Redirecting to homepage.");
    window.location.href = "/quiz-frontend/index.html"; // Redirect to homepage
    return;
  }

  try {
    // Fetch the blog post using the ID
    const response = await fetch(`${API_BASE_URL}/api/blog/${postId}`);

    if (!response.ok) {
      let errorMessage = "❌ Failed to fetch the blog post.";
      try {
        const error = await response.json();
        errorMessage = error.error || errorMessage;
      } catch (jsonError) {
        console.error("⚠️ Non-JSON error response", jsonError);
      }
      throw new Error(errorMessage);
    }

    const post = await response.json();
    const postContainer = document.getElementById("postContainer");

    // Dynamically display the post details
    postContainer.innerHTML = `
        <h1>${post.title}</h1>
        <img src="${post.coverImage}" alt="${post.title}" style="max-width: 100%; border-radius: 8px;">
        <p>${post.content}</p>
        <button id="goBack" style="padding: 10px; background-color: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer;">
          🔙 Back to Posts
        </button>
    `;

    // ✅ Fixing "Back" button functionality
    document.getElementById("goBack").addEventListener("click", () => {
      window.location.href = "/quiz-frontend/index.html"; // Redirect to homepage
    });
  } catch (err) {
    console.error("❌ Fetch Error:", err.message);
    alert(err.message);
  }
});
