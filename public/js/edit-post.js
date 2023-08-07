async function editFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value;
  const content = document.querySelector('input[name="content"]').value;

  // Extract the correct id from the URL
  const urlParts = window.location.pathname.split('/');
  const id = urlParts[urlParts.length - 1];

  if (event.target.classList.contains('edit-post-btn')) {
    // If the clicked element has the class "edit-post-btn," it's the update button
    const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        post_id: id,
        title,
        content,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  } else if (event.target.classList.contains('delete-post-btn')) {
    // If the clicked element has the class "delete-post-btn," it's the delete button
    const confirmDelete = confirm('Are you sure you want to delete this post?');
    if (confirmDelete) {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
  }
}

document.querySelector('.edit-post-form').addEventListener('click', editFormHandler);
