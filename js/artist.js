document.addEventListener('DOMContentLoaded', function() {
    loadComponent('header', 'components/header.html');
    loadComponent('footer', 'components/footer.html');
    loadArtist();
});

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
                document.getElementById('artist-photo').src = artist.photo;
                document.getElementById('artist-details').innerHTML = `
                    <h3>${artist.name}</h3>
                    <p>${artist.bio}</p>
                    <h4>Releases</h4>
                    <section id="artist-releases" class="artist-releases">
                        <!-- Artist releases will be dynamically loaded here -->
                    </section>
                `;
                loadReleases(artist.releases);
            } else {
                document.getElementById('artist-details').innerHTML = '<p>Artist not found.</p>';
            }
        })
        .catch(error => {
            console.error('Error loading artist details:', error);
        });
}

function loadReleases(releaseIds) {
    fetch('data/releases.json')
        .then(response => response.json())
        .then(releases => {
            const releasesContainer = document.getElementById('artist-releases');
            releaseIds.forEach(id => {
                const release = releases.find(r => r.id === id);
                if (release) {
                    const releaseElement = document.createElement('div');
                    releaseElement.classList.add('artist-release');
                    
                    releaseElement.innerHTML = `
                        <h5><a href="release.html?id=${release.id}">${release.title}</a></h5>
                        <img src="${release.cover}" alt="Cover of ${release.title}">
                    `;
                    releasesContainer.appendChild(releaseElement);
                }
            });
        })
        .catch(error => {
            console.error('Error loading artist releases:', error);
        });
}