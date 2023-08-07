document.addEventListener('DOMContentLoaded', () => {
    const addCommentForm = document.getElementById('add-comment-form');
  
    if (addCommentForm) {
      addCommentForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the form from submitting normally
  
        const formData = new FormData(addCommentForm);
        const postId = formData.get('post_id');
        const commentContent = formData.get('comment-content');
        const userId = formData.get('user_id'); // Get the user ID from the form
  
        try {
          // Make a POST request to the server to add the comment
          const response = await fetch('/api/comments/add-comment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              post_id: postId,
              content: commentContent,
              user_id: userId, // Include the user ID in the request body
            }),
          });
  
          // Handle the response as needed
  
        } catch (err) {
          console.error('Error adding comment:', err);
        }
      });
    }
  });
  