const BACKEND_URL = 'http://localhost:5000';

const postsContainer = document.getElementById('posts');
const pagination = document.getElementById('pagination');

const POSTS_PER_PAGE = 5;
let currentPage = 1;
let posts = [];

function logout() {
  localStorage.removeItem('token');
  window.location.href = 'login.html';
}

function renderPosts() {
  postsContainer.innerHTML = '';

  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;
  const currentPosts = posts.slice(start, end);

  currentPosts.forEach(post => {
    const card = document.createElement('div');
    card.className = 'col-md-6';
    card.innerHTML = `
      <div class="card h-100 shadow-sm">
        <div class="card-body">
          <h5 class="card-title">${post.title}</h5>
          <p class="card-text">${post.content.substring(0, 100)}...</p>
          <a href="post.html?id=${post._id}" class="btn btn-primary">View</a>
        </div>
        <div class="card-footer text-muted">
          by ${post.user?.username || 'Unknown'}
        </div>
      </div>
    `;
    postsContainer.appendChild(card);
  });

  renderPagination();
}

function renderPagination() {
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  pagination.innerHTML = '';

  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement('li');
    li.className = `page-item ${i === currentPage ? 'active' : ''}`;
    li.innerHTML = `<button class="page-link">${i}</button>`;
    li.addEventListener('click', () => {
      currentPage = i;
      renderPosts();
    });
    pagination.appendChild(li);
  }
}

async function fetchPosts() {
  try {
    const res = await fetch(`${BACKEND_URL}/api/posts`);
    posts = await res.json();
    renderPosts();
  } catch (err) {
    console.error('Error loading posts', err);
  }
}

fetchPosts();

const createPostForm = document.getElementById('createPostForm');

if (createPostForm) {
  createPostForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value.trim();
    const content = document.getElementById('content').value.trim();
    const token = localStorage.getItem('token');

    if (!token) {
      alert('You must be logged in to create a post.');
      return;
    }

    try {
      const res = await fetch(`${BACKEND_URL}/api/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ title, content })
      });

      const data = await res.json();

      if (res.ok) {
        window.location.href = 'index.html';
      } else {
        alert(data.error || 'Failed to create post');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong');
    }
  });
}

const editPostForm = document.getElementById('editPostForm');

if (editPostForm) {
  const params = new URLSearchParams(window.location.search);
  const postId = params.get('id');
  const token = localStorage.getItem('token');

  async function loadPostForEdit() {
    try {
      const res = await fetch('/api/posts');
      const posts = await res.json();
      const post = posts.find(p => p._id === postId);

      if (!post) {
        alert('Post not found');
        window.location.href = 'index.html';
        return;
      }

      const decoded = parseJwt(token);
      if (decoded.id !== post.user._id) {
        alert('You are not allowed to edit this post');
        window.location.href = 'index.html';
        return;
      }

      document.getElementById('title').value = post.title;
      document.getElementById('content').value = post.content;
    } catch (err) {
      console.error('Error loading post for edit', err);
    }
  }

  editPostForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const updatedTitle = document.getElementById('title').value.trim();
    const updatedContent = document.getElementById('content').value.trim();

    try {
      const res = await fetch(`${BACKEND_URL}/api/posts/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ title: updatedTitle, content: updatedContent })
      });

      const data = await res.json();

      if (res.ok) {
        window.location.href = `post.html?id=${postId}`;
      } else {
        alert(data.error || 'Update failed');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong');
    }
  });

  function parseJwt(token) {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  }

  loadPostForEdit();
}

