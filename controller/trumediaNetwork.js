import config from "../config.json" assert { type: "json" };

const getToken = () => {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "https://project.trumedianetworks.com/api/token");
        xhr.setRequestHeader("apiKey", config.apiKey);
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                const tokenResponse = JSON.parse(xhr.response);
                resolve(tokenResponse);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send();
    });
}

function getPlayersByToken(token) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "https://project.trumedianetworks.com/api/nfl/players");
        xhr.setRequestHeader("tempToken", token);
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                const playersResponse = JSON.parse(xhr.response);
                resolve(playersResponse);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send();
    });
}

function getPlayerById(token,playersId) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", `https://project.trumedianetworks.com/api/nfl/player/${playersId}`);
        xhr.setRequestHeader("tempToken", token);
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                const playerResponse = JSON.parse(xhr.response);
                resolve(playerResponse.reverse());
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send();
    });
}

export { getToken, getPlayersByToken, getPlayerById };
