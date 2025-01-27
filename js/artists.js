document.addEventListener('DOMContentLoaded', function() {
    loadComponent('header', 'components/header.html');
    loadComponent('footer', 'components/footer.html');
    loadArtists();
});

function loadArtists() {
    fetch('data/artists.json')
        .then(response => response.json())
        .then(artists => {
            const grid = document.getElementById('artists-grid');
            artists.forEach(artist => {
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                    <a href="artist.html?id=${artist.id}">
                        <img src="${artist.photo}" alt="${artist.name}">
                        <h3>${artist.name}</h3>
                    </a>
                `;
                grid.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error loading artists:', error);
        });
}

function loadComponent(id, url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
        })
        .catch(error => {
            console.error('Error loading component:', error);
        });
}
