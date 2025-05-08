// Base URL for backend API
const BACKEND_URL = 'http://localhost:5000';

// === Register Form Logic ===
const registerForm = document.getElementById('registerForm');

if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const response = await fetch(`${BACKEND_URL}/api/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
      });

      const data = await response.json();
      console.log('Register response:', data);

      if (response.ok) {
        localStorage.setItem('token', data.token);
        window.location.href = 'index.html';
      } else {
        alert(data.error || 'Registration failed');
      }

    } catch (err) {
      console.error('Frontend error during registration:', err);
      alert('Network error — is the backend running?');
    }
  });
}

// === Login Form Logic ===
const loginForm = document.getElementById('loginForm');

if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const response = await fetch(`${BACKEND_URL}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      console.log('Login response:', data);

      if (response.ok) {
        localStorage.setItem('token', data.token);
        window.location.href = 'index.html';
      } else {
        alert(data.error || 'Login failed');
      }

    } catch (err) {
      console.error('Frontend error during login:', err);
      alert('Network error — is the backend running?');
    }
  });
}
