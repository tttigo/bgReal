document.addEventListener('DOMContentLoaded', function() {
    loadComponent('header', 'components/header.html');
    loadComponent('footer', 'components/footer.html');
    loadArtist();
});

function loadArtist() {
    const urlParams = new URLSearchParams(window.location.search);
    const artistId = urlParams.get('id');
    if (!artistId) {
        document.getElementById('artist-details').innerHTML = '<p>Artist not found.</p>';
        return;
    }
    
    fetch('data/artists.json')
        .then(response => response.json())
        .then(artists => {
            const artist = artists.find(a => a.id === artistId);
            if (artist) {
                document.getElementById('artist-details').innerHTML = `
                    <img src="${artist.photo}" alt="${artist.name}">
                    <h1>${artist.name}</h1>
                    <p>${artist.biography}</p>
                `;
                loadArtistReleases(artist.releases);
            } else {
                document.getElementById('artist-details').innerHTML = '<p>Artist not found.</p>';
            }
        })
        .catch(error => {
            console.error('Error loading artist details:', error);
        });
}

function loadArtistReleases(releases) {
    fetch('data/releases.json')
        .then(response => response.json())
        .then(allReleases => {
            const artistReleases = allReleases.filter(r => releases.includes(r.id));
            const grid = document.getElementById('artist-releases');
            artistReleases.forEach(release => {
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                    <a href="release.html?id=${release.id}">
                        <img src="${release.cover}" alt="${release.title}">
                        <h3>${release.title}</h3>
                    </a>
                `;
                grid.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error loading artist releases:', error);
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
