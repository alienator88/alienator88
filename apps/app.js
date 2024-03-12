document.addEventListener('DOMContentLoaded', function() {
    fetch('../appslist.json')
      .then(response => response.json())
      .then(apps => {
        const appGrid = document.getElementById('appGrid');
        apps.forEach((app, index) => {
          const columnClass = index % 2 === 0 ? 'column left-column' : 'column right-column'; // Alternate column class
          const column = document.querySelector(`.${columnClass}`) || document.createElement('div');
          column.className = columnClass;
  
          const item = document.createElement('div');
          item.className = 'item';
          item.innerHTML = `
            <img src="${app.image}" alt="${app.title}" class="item-image">
            <div class="item-content">
              <h2 class="item-title">${app.title}</h2>
              <p class="item-description">${app.description}</p>
            </div>
          `;
          
          if (!document.querySelector(`.${columnClass}`)) {
            appGrid.appendChild(column);
          }
          column.appendChild(item);

          // Make the item clickable and pass the ID to app.html
          item.addEventListener('click', () => {
            window.location.href = `/appInfo?id=${app.id}`;
          });
        });
      })
      .catch(error => console.error('Error loading the apps data:', error));
  });
  