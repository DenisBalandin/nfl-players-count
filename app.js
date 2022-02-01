import { getToken, getPlayersByToken, getPlayerById } from './controller/trumediaNetwork.js';
 
const app = document.getElementById('root');
const logo = document.createElement('img');
logo.src = 'logo.svg';
logo.setAttribute('class', 'logo');
const container = document.createElement('div');
container.setAttribute('class', 'container');
app.appendChild(logo);
app.appendChild(container);

async function cards(){
    const tokenResponse = await getToken();
    const tempToken = tokenResponse.token;
    const players = await getPlayersByToken(tempToken);
    players.map(async(val) => {
        const {playerId,fullName } = val;
        let playerData = await getPlayerById(tempToken, playerId);
        const {RshYds,Att,Cmp} = playerData[0];

        const card = document.createElement('div');
        card.setAttribute('class', 'card');
        const cardHeader = document.createElement('div');
        cardHeader.innerHTML = `<a href="/page.html?id=${playerId}"><h1>${fullName}</h1></a>`;

        const cardContent = document.createElement('div');
        cardContent.setAttribute('class', 'card-content');
        const cardImages = document.createElement('div');
        const playerPhoto = document.createElement('img');
        playerPhoto.src = val.playerImage;
        const teamLogo = document.createElement('img');
        teamLogo.src = val.teamImage;
        cardContent.innerHTML = ` <table>
              <tr>
                  <th>RshYds</th>
                  <th>Att</th>
                  <th>Cmp</th>
              </tr>
              <tr>
                  <td>${RshYds}</td>
                  <td>${Att}</td>
                  <td>${Cmp}</td>
              </tr>
            </table>`;
        card.appendChild(cardHeader);
        cardImages.appendChild(playerPhoto);
        container.appendChild(card);
        cardImages.appendChild(teamLogo);
        cardContent.appendChild(cardImages);
        card.appendChild(cardContent);
    });
}
cards();


