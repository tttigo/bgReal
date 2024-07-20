document.addEventListener('DOMContentLoaded', function() {
    loadComponent('header', 'components/header.html');
    loadComponent('footer', 'components/footer.html');
    loadRelease();
});

function loadRelease() {
    const urlParams = new URLSearchParams(window.location.search);
    const releaseId = urlParams.get('id');
    if (!releaseId) {
        document.getElementById('release-details').innerHTML = '<p>Release not found.</p>';
        return;
    }
    
    fetch('data/releases.json')
        .then(response => response.json())
        .then(releases => {
            const release = releases.find(r => r.id === releaseId);
            if (release) {
                document.getElementById('release-details').innerHTML = `
                    <img src="${release.cover}" alt="${release.title}">
                    <h3>${release.title}</h3>
                    <h3>${release.date}</h3>
                    <p>Artist ID: ${release.artist}</p>
                `;
                loadReleaseArtist(release.artist);
            } else {
                document.getElementById('release-details').innerHTML = '<p>Release not found.</p>';
            }
        })
        .catch(error => {
            console.error('Error loading release details:', error);
        });
}

function loadReleaseArtist(artistId) {
    fetch('data/artists.json')
        .then(response => response.json())
        .then(artists => {
            const artist = artists.find(a => a.id === artistId);
            if (artist) {
                document.getElementById('release-artist').innerHTML = `
                    <a href="artist.html?id=${artist.id}">
                        <img src="${artist.photo}" alt="${artist.name}">
                        <h3>${artist.name}</h3>
                    </a>
                `;
            } else {
                document.getElementById('release-artist').innerHTML = '<p>Artist not found.</p>';
            }
        })
        .catch(error => {
            console.error('Error loading artist details:', error);
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
