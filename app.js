// frontend/app.js

import { API_URL } from './config.js';

const container = document.getElementById('comments');

/**
 * Renderiza comentarios en pantalla
 */
function renderComments(comments) {
  container.innerHTML = '';

  comments.forEach(c => {
    const div = document.createElement('div');
    div.className = 'comment';

    div.innerHTML = `
      <div class="name">${c.from?.name || 'Anon'}</div>
      <div>${c.message || ''}</div>
    `;

    container.appendChild(div);
  });
}

/**
 * Obtener comentarios desde backend
 */
async function fetchComments() {
  try {
    const res = await fetch(`${API_URL}/comments`);
    const data = await res.json();

    renderComments(data.data || []);
  } catch (err) {
    console.error(err);
  }
}

// polling
setInterval(fetchComments, 4000);
fetchComments();