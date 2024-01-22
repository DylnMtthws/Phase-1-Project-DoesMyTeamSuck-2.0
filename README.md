#Does My Team Suck? 

This application displays a table of Premier League teams, allowing users to view their statistics and even offer some playful commentary on their performance.

Key Features:

-Interactive Table: Displays teams in a sortable table with their logos, names, xGD (expected goal difference), and positions.
-Additional Details: Provides additional team statistics (goals for, goals against, expected goals, expected goals against) upon clicking a team.
-Team Quality Assessment: Offers a humorous assessment of a team's quality based on its xGD when the "Does My Team Suck?" button is clicked.
-Live Updates: Fetches data from a local server (http://localhost:3000/PLTeams) and allows users to edit a team's xGD directly in the table.

Usage:

1. Ensure a local server is running at http://localhost:3000/PLTeams and providing the necessary team data.
2. Open the application in a web browser.
3. The table will automatically populate with team data.

Interact with the table by:
Viewing additional details by clicking on a team's row.
Assessing a team's quality by clicking the "Does My Team Suck?" button.
Updating a team's xGD by entering a new value in the input field and clicking "Update."

Additional Notes:

The "Quality Quotient" used for team assessment is calculated as (xGD / matches) * 100.
The application includes basic styling using CSS classes.
The code is written in JavaScript and uses the Fetch API to interact with the server.
