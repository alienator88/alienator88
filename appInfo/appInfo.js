document.addEventListener('DOMContentLoaded', function () {
  const params = new URLSearchParams(window.location.search);
  const appId = params.get('id'); // Get the ID from the URL

  fetch('../appslist.json')
    .then(response => response.json())
    .then(apps => {
      const app = apps.find(app => app.id.toString() === appId); // Find the app by ID
      if (app) {
        // Update the page with the app's details
        document.title = app.title + " - Alin Lupascu"
        document.getElementById('appImage').src = app.image;
        document.getElementById('appTitle').textContent = app.title;
        document.getElementById('appDescription').textContent = app.description;
        document.getElementById('download_url').href = app.download_url;
        document.getElementById('repo_url').href = app.repo_url;

        if (app.brew) {
          document.getElementById('brew').textContent = app.brew;
        } else {
          document.getElementById('brewContainer').remove();
        }

        if (app.screenshot1) {
          document.getElementById('screenshot1').src = app.screenshot1;
        } else {
          document.getElementById('screenshot1').remove();
        }

        if (app.screenshot2) {
          document.getElementById('screenshot2').src = app.screenshot2;
        } else {
          document.getElementById('screenshot2').remove();
        }

      }
    })
    .catch(error => console.error('Error loading the apps data:', error));
});


function copyToClipboard() {
  // Create a temporary textarea element
  const textarea = document.createElement('textarea');
  // Set its value to the code you want to copy
  textarea.value = document.querySelector('.code-snippet code').innerText;
  // Append it to the body
  document.body.appendChild(textarea);
  // Select its content
  textarea.select();
  // Copy the content
  document.execCommand('copy');
  // Remove the textarea element from the body
  document.body.removeChild(textarea);
  
  // Find the element that needs its class changed
  const copyBtn = document.getElementById('copy-btn');
  
  // Change the class to 'fas fa-check'
  copyBtn.className = 'fas fa-check';
  
  // Set a timeout to change the class back to 'fas fa-copy' after 2 seconds
  setTimeout(() => {
    copyBtn.className = 'fas fa-clipboard';
  }, 2000);
}