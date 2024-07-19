document.addEventListener('DOMContentLoaded', function() {
    loadComponent('header', 'components/header.html');
    loadComponent('footer', 'components/footer.html');
    loadAlbums();
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

function loadAlbums() {
    fetch('data/releases.json')
        .then(response => response.json())
        .then(albums => {
            fetch('data/artists.json')
                .then(response => response.json())
                .then(artists => {
                    const artistMap = new Map(artists.map(artist => [artist.id, artist.name]));
                    const albumListContainer = document.getElementById('album-list');
                    
                    albums.forEach(album => {
                        const artistName = artistMap.get(album.artist);
                        
                        const albumElement = document.createElement('div');
                        albumElement.classList.add('album');
                        
                        albumElement.innerHTML = `
                            <h3><a href="release.html?id=${album.id}">${album.title}</a></h3>
                            <p>Artista: ${artistName ? artistName : 'Desconhecido'}</p>
                            <img src="${album.cover}" alt="Capa do álbum ${album.title}">
                        `;
                        albumListContainer.appendChild(albumElement);
                    });
                })
                .catch(error => {
                    console.error('Erro ao carregar artistas:', error);
                });
        })
        .catch(error => {
            console.error('Erro ao carregar álbuns:', error);
        });
}