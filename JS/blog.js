document.addEventListener("DOMContentLoaded", async () => {
  const API_BASE_URL = "https://quiz-backend-rdcd.onrender.com";
  try {
    // Fetch all blog posts from the backend
    const response = await fetch(`${API_BASE_URL}/api/blogs`, {
      method: "GET",
    });

    // Check for response errors
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to fetch blog posts");
    }

    // Parse the JSON response
    const posts = await response.json();

    // Get the parent container where blog posts will be rendered
    const blog = document.getElementById("blog");

    // Dynamically render each blog post
    posts.forEach((post) => {
      const div = document.createElement("div");
      div.id = "blogDiv";
      div.setAttribute("data-id", post._id);

      div.innerHTML = `
          <ul id="blogUl">
            <li class="blogLi">
              <h2>${post.title}</h2>
            </li>
            <li class="blogLi">
              <img src="${post.coverImage}" alt="${post.title}" />
            </li>
          </ul>
        `;

      // Add a click listener to each blog post
      div.addEventListener("click", async () => {
        try {
          await fetch(`${API_BASE_URL}/api/blog/${post._id}/views`, {
            method: "PATCH",
          });
          window.location.href = `/quiz-frontend/HTML/singlePost.html?id=${post._id}`;
        } catch (err) {
          alert(err);
        }
      });

      // Append the rendered post to the blog container
      blog.appendChild(div);
    });
  } catch (err) {
    alert(err.message);
  }
});
