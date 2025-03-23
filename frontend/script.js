document.addEventListener("DOMContentLoaded", function () {
    fetch("/live-matches")
        .then(response => response.json())
        .then(data => {
            let liveContainer = document.getElementById("liveMatches");
            data.forEach(match => {
                let matchElement = document.createElement("div");
                matchElement.innerHTML = `<h2>${match.HomeTeam} vs ${match.AwayTeam}</h2><p>Score: ${match.HomeTeamScore} - ${match.AwayTeamScore}</p>`;
                liveContainer.appendChild(matchElement);
            });
        })
        .catch(error => console.error("Error loading live matches:", error));

    fetch("/daily-matches")
        .then(response => response.json())
        .then(data => {
            let dailyContainer = document.getElementById("dailyMatches");
            data.forEach(match => {
                let matchElement = document.createElement("div");
                matchElement.innerHTML = `<h2>${match.HomeTeam} vs ${match.AwayTeam}</h2><p>Match Time: ${match.Day}</p>`;
                dailyContainer.appendChild(matchElement);
            });
        })
        .catch(error => console.error("Error loading daily matches:", error));

    fetch("/teams")
        .then(response => response.json())
        .then(data => {
            let teamsContainer = document.getElementById("teams");
            data.forEach(team => {
                let teamElement = document.createElement("div");
                teamElement.innerHTML = `<h2>${team.Name}</h2><p>Location: ${team.City}</p>`;
                teamsContainer.appendChild(teamElement);
            });
        })
        .catch(error => console.error("Error loading teams:", error));

    fetch("/players")
        .then(response => response.json())
        .then(data => {
            let playersContainer = document.getElementById("players");
            data.forEach(player => {
                let playerElement = document.createElement("div");
                playerElement.innerHTML = `<h2>${player.FirstName} ${player.LastName}</h2><p>Position: ${player.Position}</p>`;
                playersContainer.appendChild(playerElement);
            });
        })
        .catch(error => console.error("Error loading players:", error));
});
