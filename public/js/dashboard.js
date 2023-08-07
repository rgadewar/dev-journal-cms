document.addEventListener('DOMContentLoaded', () => {
    const addCommentButtons = document.querySelectorAll('.add-comment-btn');
    if (addCommentButtons) {
      addCommentButtons.forEach(button => {
        button.addEventListener('click', () => {
          const postId = button.getAttribute('data-post-id');
          window.location.href = `/add-comment?post_id=${postId}`;
        });
      });
    }
  });