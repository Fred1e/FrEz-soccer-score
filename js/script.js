const apiKey = 'YOUR_API_KEY'; // Replace with your API-Football API key
const apiUrl = 'https://api-football-v1.p.rapidapi.com/v3/fixtures';

// Function to fetch live scores
const fetchLiveScores = async () => {
    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
                'X-RapidAPI-Key': apiKey
            }
        });
        const data = await response.json();
        const matches = data.response;

        const scoreboardElement = document.getElementById('scoreboard');
        const loadingElement = document.getElementById('loading');
        loadingElement.style.display = 'none';

        if (matches.length === 0) {
            scoreboardElement.innerHTML = "<p>No live matches at the moment.</p>";
        } else {
            scoreboardElement.innerHTML = matches.map(match => {
                return `
                    <div class="score-card">
                        <h3>${match.league.name} - ${match.fixture.date}</h3>
                        <p><strong>${match.teams.home.name}</strong> ${match.goals.home} - ${match.goals.away} <strong>${match.teams.away.name}</strong></p>
                        <a href="pages/match-details.html?match=${match.fixture.id}">View Details</a>
                    </div>
                `;
            }).join('');
        }
    } catch (error) {
        console.error('Error fetching live scores:', error);
    }
};

// Fetch live scores on page load
window.onload = fetchLiveScores;
