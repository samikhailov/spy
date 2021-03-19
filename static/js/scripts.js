var global = {currentPlayer: 0};

function HttpClient() {
    this.get = function (url) {
        var request = new XMLHttpRequest();
        request.open("GET", url, false);
        request.send();
        return JSON.parse(request.responseText)
    }
}

function getgameData() {
    var client = new HttpClient();
    global.gameData = client.get('/api/v1/game?players=5&spys=1');
    global.currentPlayer = 0;
    renderHideLocationScreen();
}

function renderHomeScreen() {
    html = `
    <p><a href="#" onclick="renderSettingsSreen()">Новая игра</a></p>\
    <p><a href="#" onclick="alert('Ты не узнаешь')">Как играть</a></p>`;
    document.querySelector("body > container").innerHTML = html;
}

function renderSettingsSreen() {
    let html = `\
    <p>Игроки: 5</p>\
    <p>Шпионы: 1</p>\
    <p><a href="#" onclick="getgameData();">Начать игру</a></p>\
    <p><a href="#" onclick="renderHomeScreen();">Назад</a></p>`;
    document.querySelector("body > container").innerHTML = html;
}

function renderHideLocationScreen() {
    global.currentPlayer++;
    if (global.currentPlayer > global.gameData.players) {
        return renderEndScreen();
    }
    let html = `\
    <p>Игрок ` + global.currentPlayer + `</p>\
    <p><a href="#" onclick="renderOpenLocationScreen(` + global.currentPlayer + `)">Узнать</a></p>`;
    document.querySelector("body > container").innerHTML = html;
}

function renderOpenLocationScreen() {
    var html_part;
    if (global.gameData.spy_indexes.includes(global.currentPlayer)) {
        html_part = `\
        <p>Ты шпион</p>\
        <p>Все, кроме тебя, знаю локацию. Не пались.</p>`;
    } else {
        html_part = `\
        <p>Ты местный</p>\
        <p>Локация: `+ global.gameData.location +`</p>`;
    }
    let html = `\
    <p>Игрок ` + global.currentPlayer + `</p>\
    `+ html_part +`
    <p><a href="#" onclick="renderHideLocationScreen()">Понятно</a></p>`;
    document.querySelector("body > container").innerHTML = html;
}

function renderEndScreen() {
    let html = `\
    <p><a href="#" onclick="alert('Шпион - игрок ` + global.gameData.spy_indexes + `')">Узнать шпиона</a></p>\
    <p><a href="#" onclick="renderSettingsSreen()">Новая игра</a></p>`;
    document.querySelector("body > container").innerHTML = html;
}