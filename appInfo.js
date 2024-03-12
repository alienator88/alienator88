document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const appId = params.get('id'); // Get the ID from the URL
  
    fetch('appslist.json')
      .then(response => response.json())
      .then(apps => {
        const app = apps.find(app => app.id.toString() === appId); // Find the app by ID
        if (app) {
          // Update the page with the app's details
          document.getElementById('appImage').src = app.image;
        //   document.getElementById('screenshot1').src = app.screenshot1;
        //   document.getElementById('screenshot2').src = app.screenshot2;
          document.getElementById('appTitle').textContent = app.title;
          document.getElementById('appDescription').textContent = app.description;
          document.getElementById('download_url').href = app.download_url;
          document.getElementById('repo_url').href = app.repo_url;

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