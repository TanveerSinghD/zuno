'use strict';
// The native authentication session normally intercepts this URL before it loads.
// Never display, store, exchange, or forward authorization codes in this fallback page.
const query = new URLSearchParams(window.location.search);
const denied = query.has('error');
const hasCode = query.has('code');
if (window.location.search || window.location.hash) {
  window.history.replaceState(null, '', window.location.pathname);
}
if (denied) {
  document.getElementById('callback-title').textContent = 'Connection paused.';
  document.getElementById('callback-description').textContent = 'Spotify access wasn’t granted. Return to Zuno and try again when you’re ready.';
} else if (hasCode) {
  document.getElementById('callback-description').textContent = 'Return to the Zuno iPhone app to finish connecting. Seeing this page alone does not confirm a completed sign-in.';
}
