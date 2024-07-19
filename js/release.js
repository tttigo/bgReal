document.addEventListener('DOMContentLoaded', function() {
    loadComponent('header', 'components/header.html');
    loadComponent('footer', 'components/footer.html');
    loadRelease();
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
                document.getElementById('release-cover').src = release.cover;
                document.getElementById('release-details').innerHTML = `
                    <h3>${release.title}</h3>
                    <p>Details about the release go here.</p>
                `;
            } else {
                document.getElementById('release-details').innerHTML = '<p>Release not found.</p>';
            }
        })
        .catch(error => {
            console.error('Error loading release details:', error);
        });
}