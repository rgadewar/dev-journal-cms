document.addEventListener('DOMContentLoaded', function () {
  // Your create-post.js code here
  const createPostHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post-title').value;
    const content = document.querySelector('#content').value;

    if (title && content) {
      const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        // Post created successfully, reload the dashboard to see the updated list of posts
        window.location.replace('/dashboard');
      } else {
        // Post creation failed, show the error message returned by the server
        const responseData = await response.json();
        alert(responseData.error);
      }
    }
  };

  document.querySelector('#new-post-form').addEventListener('submit', createPostHandler);
});