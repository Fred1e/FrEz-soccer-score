const upcomingMatchesApiUrl = 'https://api-football-v1.p.rapidapi.com/v3/fixtures?next=10';

// Function to fetch upcoming matches
const fetchUpcomingMatches = async () => {
    try {
        const response = await fetch(upcomingMatchesApiUrl, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
                'X-RapidAPI-Key': apiKey
            }
        });
        const data = await response.json();
        const matches = data.response;

        const matchesElement = document.getElementById('upcomingMatches');
        if (matches.length === 0) {
            matchesElement.innerHTML = "<p>No upcoming matches.</p>";
        } else {
            matchesElement.innerHTML = matches.map(match => {
                return `
                    <div class="score-card">
                        <h3>${match.league.name} - ${match.fixture.date}</h3>
                        <p><strong>${match.teams.home.name}</strong> vs <strong>${match.teams.away.name}</strong></p>
                    </div>
                `;
            }).join('');
        }
    } catch (error) {
        console.error('Error fetching upcoming matches:', error);
    }
};

// Fetch upcoming matches on page load
window.onload = fetchUpcomingMatches;
