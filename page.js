import { getToken, getPlayerById } from './controller/trumediaNetwork.js';

var baseUrl = (window.location).href; 
var playerId = baseUrl.substring(baseUrl.lastIndexOf('=') + 1);

const app = document.getElementById('page-root');
const container = document.createElement('div');
container.setAttribute('class', 'page_container');
const tableRows = document.createElement('div');
tableRows.setAttribute('class', 'table_rows');
app.appendChild(container);

async function appPage(){
    const card = document.createElement('div');
    const tokenResponse = await getToken();
    const tempToken = tokenResponse.token;
    const players = await getPlayerById(tempToken, playerId);
    const h1 = document.createElement('h1');
    h1.textContent = players[0].fullName;
    const teamLogo = document.createElement('img');
    teamLogo.src = players[0].teamImage;
    const playerPhoto = document.createElement('img');
    playerPhoto.src = players[0].playerImage;
    container.appendChild(h1);
    container.appendChild(playerPhoto);
    container.appendChild(teamLogo);
    container.appendChild(tableRows);

    // console.log(player);
    players.map(val => {
        const { gameDate, Att,Cmp,Int,PsTD,PsYds,RshTD,RshYds,Rush,Sack,opponent,team } = val;
        const dateRow = document.createElement('div');
        const tableRow = document.createElement('table');
        dateRow.setAttribute('class', 'tabe-row-content');  
        dateRow.innerHTML = `<div class="page-tabe">${gameDate}</div>`;
        tableRow.innerHTML = `
            <tr>
                <th>Att</th>
                <th>Cmp</th>
                <th>Int</th>
                <th>PsTD</th>
                <th>PsYds</th>
                <th>RshTD</th>
                <th>RshYds</th>
                <th>Rush</th>
                <th>Sack</th>
                <th>Opponent</th>
                <th>Team</th>
            </tr>
            <tr>
                <td>${Att}</td>
                <td>${Cmp}</td>
                <td>${Int}</td>
                <td>${PsTD}</td>
                <td>${PsYds}</td>
                <td>${RshTD}</td>
                <td>${RshYds}</td>
                <td>${Rush}</td>
                <td>${Sack}</td>
                <td>${opponent}</td>
                <td>${team}</td>
            </tr>`;
        tableRows.appendChild(dateRow);
        tableRows.appendChild(tableRow);
  
    });
   
}

appPage();