let currentTeam;

document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/PLTeams')
        .then(response => response.json())
        .then(data => {
            // Sort the data based on a numeric property (e.g., position or xGD)
            const sortedData = data.sort((a, b) => b.xGD - a.xGD);

            // Iterate through the sorted data and display each team
            sortedData.forEach(team => displayTeam(team));
        })
})

function displayTeam(data) {
    // Create a new table row for each team
    let row = document.createElement('tr');

    // Create DOM elements for each piece of data within the row
    let clubLogoCell = document.createElement('td');
    let clubNameCell = document.createElement('td');
    let clubxGDCell = document.createElement('td');
    let clubPositionCell = document.createElement('td');
    let editButtonCell = document.createElement('td')
    let input = document.createElement('input')

    //add CSS customization functionality
    clubLogoCell.className = 'cell'
    clubNameCell.className = 'cell'
    clubxGDCell.className = 'cell'
    clubPositionCell.className = 'cell'
    editButtonCell.className = 'Button'
    input.className = 'input'

    //Add Shadow to each cell but NOT input or update
    mouseOverShadow(clubLogoCell)
    mouseOverShadow(clubNameCell)
    mouseOverShadow(clubxGDCell)
    mouseOverShadow(clubPositionCell)

    function mouseOverShadow(cell) {
        cell.addEventListener('mouseover', () => {
            cell.classList.add('row-with-shadow'); 
            });
            cell.addEventListener('mouseout', () => {
            cell.classList.remove('row-with-shadow'); 
            });
            cell.addEventListener('click', () =>{
                aDetails.textContent = ''
                textDivContainer.textContent = ''
                additionalDetails(data)
            })
    }

    // Set the appropriate properties/textContent
    let clubLogo = document.createElement('img');
    clubLogo.src = data.logo; // Assuming 'logo' is the URL to the image
    let clubName = document.createTextNode(data.teamName);
    let clubxGD = document.createTextNode(data.xGD);
    let clubPosition = document.createTextNode(data.position);
    let editButton = document.createTextNode("Update")
         
    // Append data to the respective table cells
    clubLogoCell.appendChild(clubLogo);
    clubNameCell.appendChild(clubName);
    clubxGDCell.appendChild(clubxGD);
    clubPositionCell.appendChild(clubPosition);
    editButtonCell.appendChild(editButton)

    // Append cells to the row
    row.appendChild(clubLogoCell);
    row.appendChild(clubNameCell);
    row.appendChild(clubxGDCell);
    row.appendChild(clubPositionCell);
    row.appendChild(input)
    row.appendChild(editButtonCell)
    // Append the row to the table body
    let tableBody = document.querySelector('.table-body');
    tableBody.appendChild(row);

    //Patch new xGD to add table functionality
    editButtonCell.addEventListener('click', (e) => {
        e.preventDefault()
        let inputData = input.value
        fetch(`http://localhost:3000/PLTeams/${data.id}`, { 
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ xGD: inputData }) 
    })

        .then(res => res.json())
        .catch(e => console.log(e))
    })
}

//Globally available container for cb function^^
let aDetails = document.querySelector('.aInfoContainer')
let textDivContainer = document.querySelector('.text-response-container')

function additionalDetails(team) {
    let currentTeam = team;
    let div = document.createElement('div')
    div.className = 'aInfo'
    currentDiv = div

    let title = document.createElement('h3')
    title.textContent = "Additional Stats"
    let name = document.createElement('p')
    let goalsFor = document.createElement('p')
    let goalsAgainst = document.createElement('p')
    let xG = document.createElement('p')
    let xGA = document.createElement('p')
    let dmtsBtn = document.createElement('btn')
    let deleteBtn = document.createElement('btn')

    name.textContent = `${currentTeam.teamName}`
    goalsFor.textContent = `Goals For: ${currentTeam.goalsFor}`
    goalsAgainst.textContent = `Goals Against: ${currentTeam.goalsAgainst}`
    xG.textContent = `Expected Goals: ${currentTeam.xGFor}`
    xGA.textContent = `Expected Goals: ${currentTeam.xGAgainst}`

    dmtsBtn.className = 'Button'
    dmtsBtn.textContent = 'Does My Team Suck?'
    deleteBtn.className = 'deleteButton'
    deleteBtn.textContent = 'X'

    div.append(name, goalsFor, xG, goalsAgainst, xGA, dmtsBtn, deleteBtn)

    deleteBtn.addEventListener("click", () =>{
        textDivContainer.textContent = ''
        div.remove()
    })
    
    //variable available outside of dmtsBtn & deleteBtn for access
    let textDivContainer = document.querySelector('.text-response-container')
   
    dmtsBtn.addEventListener('click', () => {
        textDivContainer.innerHTML = ''
        let textDiv = document.createElement('div')
        textDiv.className = 'text-response'
        

        let manCityResponse = "Yeah yeah yeah...probably the greatest team ever assembled"
        let veryGoodTeamResponse = "Watch out Pep! This team is good. Very good."
        let goodTeamResponse = 'Keep this up and you\'ll be playing in Europe next season!'
        let okayTeamResponse = 'Comfortably mid-table...not bad, not good'
        let badTeamResponse = 'You probablyyyyy won\'t be relegated?'
        let veryBadTeamResponse = 'Have fun in the Championship next year.'

        const qualityQuotient = (team.xGD/team.matches)*100

        if ( qualityQuotient > 100 && currentTeam.teamName === "Manchester City") {
            textDiv.textContent = manCityResponse
            }
        else if ( qualityQuotient > 100) {
        textDiv.textContent = veryGoodTeamResponse
        } else if (qualityQuotient <= 100 && qualityQuotient > 50) {
            textDiv.textContent = goodTeamResponse
        } else if (qualityQuotient <= 50 && qualityQuotient > 0) {
            textDiv.textContent = okayTeamResponse
        } else if (qualityQuotient <= 0 && qualityQuotient > -60) {
            textDiv.textContent = badTeamResponse
        } else (textDiv.textContent = veryBadTeamResponse)

        textDivContainer.append(textDiv)
    })
    aDetails.append(div)
}