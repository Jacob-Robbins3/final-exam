const BACKEND_URL = 'http://localhost:5000';

const postContainer = document.getElementById('post');
const commentsList = document.getElementById('comments');
const commentForm = document.getElementById('commentForm');
const commentText = document.getElementById('commentText');

const params = new URLSearchParams(window.location.search);
const postId = params.get('id');
if (!postId) {
  alert('No post ID found in URL.');
  window.location.href = 'index.html';
}

async function loadPost() {
  try {
    const res = await fetch(`${BACKEND_URL}/api/posts`);
    const posts = await res.json();
    const post = posts.find(p => p._id === postId);

    if (!post) {
      postContainer.innerHTML = '<p>Post not found</p>';
      return;
    }

    const token = localStorage.getItem('token');
    const currentUserId = token ? parseJwt(token)?.id : null;
    const isAuthor = currentUserId === post.user?._id;

    postContainer.innerHTML = `
      <div class="card shadow-sm">
        <div class="card-body">
          <h3>${post.title}</h3>
          <p>${post.content}</p>
          <small class="text-muted">by ${post.user?.username || 'Unknown'}</small>

          ${isAuthor ? `
            <div class="mt-3">
              <a href="edit.html?id=${post._id}" class="btn btn-warning me-2">Edit</a>
              <button class="btn btn-danger" onclick="deletePost('${post._id}')">Delete</button>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  } catch (err) {
    console.error('Failed to load post:', err);
  }
}

async function loadComments() {
  try {
    const res = await fetch(`${BACKEND_URL}/api/comments/${postId}`);
    const comments = await res.json();

    console.log('Loaded comments:', comments); // ✅ Add this

    commentsList.innerHTML = '';
    comments.forEach(comment => {
      const li = document.createElement('li');
      li.className = 'list-group-item';
      li.innerHTML = `<strong>${comment.user?.username || 'Anonymous'}:</strong> ${comment.content}`;
      commentsList.appendChild(li);
    });
  } catch (err) {
    console.error('Failed to load comments:', err);
  }
}

commentForm?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const token = localStorage.getItem('token');
  if (!token) {
    alert('Please log in to comment.');
    return;
  }

  try {
    const res = await fetch(`${BACKEND_URL}/api/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        content: commentText.value,
        post: postId
      })
    });
    
    const data = await res.json();

    if (!res.ok) {
      alert(data.error || 'Failed to post comment');
      return;
    }

    commentText.value = '';
    loadComments();
  } catch (err) {
    console.error('Comment error:', err);
    alert('Something went wrong');
  }
});

async function deletePost(postId) {
  const token = localStorage.getItem('token');
  if (!confirm('Are you sure you want to delete this post?')) return;

  try {
    const res = await fetch(`${BACKEND_URL}/api/posts/${postId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (res.ok) {
      alert('Post deleted');
      window.location.href = 'index.html';
    } else {
      const data = await res.json();
      alert(data.error || 'Delete failed');
    }
  } catch (err) {
    console.error(err);
    alert('Something went wrong');
  }
}

function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
}

loadPost();
loadComments();

