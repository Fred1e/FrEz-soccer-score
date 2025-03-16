<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FrEz Soccer Score - Home</title>
    <style>
        :root {
            --primary-color: #008000; /* Green */
            --secondary-color: #ffffff; /* White */
            --accent-color: #007bff; /* Blue */
            --text-dark: #000;
            --text-light: #fff;
            --bg-light: #f4f4f4;
            --bg-dark: #121212;
        }

        body {
            font-family: Arial, sans-serif;
            background-color: var(--bg-light);
            color: var(--text-dark);
            margin: 0;
            padding: 0;
            transition: all 0.3s ease-in-out;
        }

        .dark-mode {
            background-color: var(--bg-dark);
            color: var(--text-light);
        }

        .header {
            background-color: var(--primary-color);
            padding: 15px;
            text-align: center;
            font-size: 24px;
            font-weight: bold;
            color: var(--secondary-color);
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
        }

        .header img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }

        .toggle-btn {
            background: var(--accent-color);
            color: var(--secondary-color);
            border: none;
            padding: 10px 20px;
            cursor: pointer;
            font-size: 16px;
            margin: 10px;
            border-radius: 20px;
        }

        .nav {
            display: flex;
            justify-content: space-around;
            background: var(--primary-color);
            padding: 10px 0;
        }

        .nav a {
            color: var(--secondary-color);
            text-decoration: none;
            font-size: 18px;
            padding: 10px;
        }

        .nav a.active {
            border-bottom: 2px solid var(--secondary-color);
        }

        .container {
            width: 90%;
            margin: auto;
            max-width: 800px;
            padding: 20px;
        }

        .score-card {
            background: var(--secondary-color);
            padding: 15px;
            border-radius: 15px;
            margin-bottom: 15px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            display: flex;
            align-items: center;
            justify-content: space-between;
            transition: all 0.3s;
        }

        .dark-mode .score-card {
            background: #1e1e1e;
        }

        .team {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .team img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }

        .score {
            font-size: 20px;
            font-weight: bold;
        }

        .status {
            font-size: 14px;
            color: #888;
        }

        .dark-mode .status {
            color: #bbb;
        }
    </style>
</head>
<body>

    <div class="header">
        <img src="https://files.catbox.moe/cza3jt.jpg" alt="Website Icon">
        FrEz Soccer Score
    </div>

    <button class="toggle-btn" onclick="toggleMode()">Toggle Dark/Light Mode</button>

    <nav class="nav">
        <a href="#" class="active">Matches</a>
        <a href="#">Leagues</a>
        <a href="#">Standings</a>
        <a href="#">News</a>
    </nav>

    <div class="container">
        <div id="matches"></div>
    </div>

    <script>
        function toggleMode() {
            document.body.classList.toggle("dark-mode");
        }

        async function fetchMatches() {
            // Placeholder API for live matches
            const response = await fetch('https://api.sampleapis.com/fake-soccer/matches'); // Replace with real API
            const matches = await response.json();
            
            const matchesContainer = document.getElementById('matches');
            matchesContainer.innerHTML = '';

            matches.forEach(match => {
                const matchCard = document.createElement('div');
                matchCard.classList.add('score-card');
                matchCard.innerHTML = `
                    <div class="team">
                        <img src="${match.teamA.logo}" alt="${match.teamA.name}">
                        <span>${match.teamA.name}</span>
                    </div>
                    <div class="score">${match.score}</div>
                    <div class="team">
                        <span>${match.teamB.name}</span>
                        <img src="${match.teamB.logo}" alt="${match.teamB.name}">
                    </div>
                    <div class="status">${match.status}</div>
                `;
                matchesContainer.appendChild(matchCard);
            });
        }

        fetchMatches();
    </script>

</body>
</html>
