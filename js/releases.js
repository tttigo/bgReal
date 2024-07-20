document.addEventListener('DOMContentLoaded', function() {
    loadComponent('header', 'components/header.html');
    loadComponent('footer', 'components/footer.html');
    loadReleases();
});

function loadReleases() {
    fetch('data/releases.json')
        .then(response => response.json())
        .then(releases => {
            const grid = document.getElementById('releases-grid');
            releases.forEach(release => {
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
            console.error('Error loading releases:', error);
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
