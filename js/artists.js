document.addEventListener('DOMContentLoaded', function() {
    loadComponent('header', 'components/header.html');
    loadComponent('footer', 'components/footer.html');
    loadArtists();
});

function loadComponent(id, url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
        })
        .catch(error => {
            console.error('Erro ao carregar o componente:', error);
        });
}

function loadArtists() {
    fetch('data/artists.json')
        .then(response => response.json())
        .then(data => {
            const artistListContainer = document.getElementById('artist-list');
            data.forEach(artist => {
                const artistElement = document.createElement('div');
                artistElement.classList.add('artist');
                
                artistElement.innerHTML = `
                    <h3><a href="artist.html?id=${artist.id}">${artist.name}</a></h3>
                    <img src="${artist.photo}" alt="Foto de ${artist.name}">
                `;
                artistListContainer.appendChild(artistElement);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar a lista de artistas:', error);
        });
}