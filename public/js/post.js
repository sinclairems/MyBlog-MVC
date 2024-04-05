// Assuming you have a form element with id "postForm" in your HTML

// Get the form element
const form = document.getElementById('postForm');

// Add a submit event listener to the form
form.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent the default form submission

  // Get the input values from the form
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  // Check if the form is for updating an existing post or creating a new post
  const postId = document.getElementById('postId').value; // Assuming you have an input field with id "postId" to store the post ID

  if (postId) {
    // Update existing post
    updatePost(postId, title, content);
  } else {
    // Create new post
    createPost(title, content);
  }
});

// Function to update a post
function updatePost(postId, title, content) {
  // Send an AJAX request to update the post with the given postId
  // You can use fetch or any other AJAX library to send the request
  // Example using fetch:
  fetch(`/api/posts/${postId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, content }),
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response data
      console.log('Post updated:', data);
    })
    .catch((error) => {
      console.error('Error updating post:', error);
    });
}

// Function to create a new post
function createPost(title, content) {
  // Send an AJAX request to create a new post
  // You can use fetch or any other AJAX library to send the request
  // Example using fetch:
  fetch('/api/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, content }),
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response data
      console.log('New post created:', data);
    })
    .catch((error) => {
      console.error('Error creating post:', error);
    });
}

