document.addEventListener('DOMContentLoaded', function () {
  fetch('../appslist.json')
    .then(response => response.json())
    .then(apps => {
      const appGrid = document.getElementById('appGrid');
      apps.forEach((app) => {
        const item = document.createElement('div');
        item.className = 'item';

        let badgesHTML = '';
        if (app.badges) {
          const badges = app.badges.split(',');
          badgesHTML = `<div class="badges-container">`;
          badges.forEach(badge => {
            badgesHTML += `<span class="badge">${badge.trim()}</span>`;
          });
          badgesHTML += `</div>`;
        }

        item.innerHTML = `
            <img src="${app.image}" alt="${app.title}" class="item-image">
            <div class="item-content">
              <h2 class="item-title">${app.title}</h2>
              <p class="item-description">${app.description}</p>
              ${badgesHTML}
            </div>
          `;

          appGrid.appendChild(item);

        // Make the item clickable and pass the ID to app.html
        item.addEventListener('click', () => {
          window.location.href = `/appInfo?id=${app.id}`;
        });
      });
    })
    .catch(error => console.error('Error loading the apps data:', error));
});