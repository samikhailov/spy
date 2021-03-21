var game = {}

function HttpClient() {
    this.get = function (url) {
        var request = new XMLHttpRequest();
        request.open("GET", url, false);
        request.send();
        return request.responseText;
    }
}

function renderTemplate(path) {
    let client = new HttpClient();
    let html = client.get(path);
    document.getElementById("app").innerHTML = html;
}

function renderHome() {
    renderTemplate("templates/home.html");
}

function renderSettings() {
    renderTemplate("templates/settings.html");
}

function increaseById(id) {
    let value = document.getElementById(id).innerText
    document.getElementById(id).innerText = parseInt(value, 10) + 1;
}

function decreaseById(id) {
    let value = document.getElementById(id).innerText
    document.getElementById(id).innerText = parseInt(value, 10) - 1;
}

function sample(population, k) {
    result = [];
    let population_ = population.slice();
    for (let i = 0; i < k; i++) {
        index = Math.floor(Math.random() * population_.length);
        result.push(population_[index]);
        population_.splice(index, 1);
    }
    return result.sort();
}

function getLocation() {
    let locations = [
        "База террористов",
        "Банк",
        "Больница",
        "Воинская часть",
        "Выставка  настольных игр",
        "Войско крестоносцев",
        "Зоопарк",
        "Казино",
        "Карнавал ",
        "Киностудия",
        "Корпоративная вечеринка",
        "Лунапарк",
        "Ночной клуб",
        "Овощебаза",
        "Океанский лайнер",
        "Орбитальная станция",
        "Отель",
        "Партизанский отряд",
        "Пассажирский поезд",
        "Пиратский корабль",
        "Пляж",
        "Подводная лодка",
        "Полицейский участок",
        "Полярная станция",
        "Посольство",
        "Ресторан",
        "Самолет",
        "Спа-салон",
        "Станция техобслуживания",
        "Супермаркет",
        "Театр",
        "Хоккейная арена",
        "Университет",
        "Церковь",
        "Цирк-шапито",
        "Школа",
        "База террористов",
        "Банк",
        "Больница",
        "Воинская часть",
        "Выставка  настольных игр",
        "Войско крестоносцев",
        "Зоопарк",
        "Казино",
        "Карнавал ",
        "Киностудия",
        "Корпоративная вечеринка",
        "Лунапарк",
        "Ночной клуб",
        "Овощебаза",
        "Океанский лайнер",
        "Орбитальная станция",
        "Отель",
        "Партизанский отряд",
        "Пассажирский поезд",
        "Пиратский корабль",
        "Пляж",
        "Подводная лодка",
        "Полицейский участок",
        "Полярная станция",
        "Посольство",
        "Ресторан",
        "Самолет",
        "Спа-салон",
        "Станция техобслуживания",
        "Супермаркет",
        "Театр",
        "Хоккейная арена",
        "Университет",
        "Церковь",
        "Цирк-шапито",
        "Школа",
    ]
    return locations[Math.floor(Math.random() * locations.length)]
}

function initGame() {
    game.players = parseInt(document.getElementById("players").innerText, 10)
    game.spys = parseInt(document.getElementById("spys").innerText, 10)
    game.player = 0;
    game.spy_numbers = sample(Array.from(Array(game.players).keys(), x => x + 1), game.spys);
    game.location = getLocation();
    renderHideLocation();
}

function renderOpenLocation() {
    let client = new HttpClient();
    let html = client.get("templates/open-location.html");
    let dom = document.createElement('html');
    dom.innerHTML = html;
    dom.querySelector("#player").innerText = game.player;
    if (game.spy_numbers.includes(game.player)) {
        dom.querySelector("#role").innerText = "Шпион";
        dom.querySelector("#location").innerText = "Все, кроме тебя, знают локацию.";
    } else {
        dom.querySelector("#role").innerText = "Горожанин";
        dom.querySelector("#location").innerText = "Локация: " + game.location;
    }
    document.getElementById("app").innerHTML = dom.innerHTML;
}

function renderHideLocation() {
    game.player++;
    if (game.player > game.players) {
        return renderFinal();
    }
    let client = new HttpClient();
    let html = client.get("templates/hide-location.html");
    let dom = document.createElement('html');
    dom.innerHTML = html;
    dom.querySelector("#player").innerText = game.player;
    document.getElementById("app").innerHTML = dom.innerHTML;
}

function renderFinal() {
    let client = new HttpClient();
    let html = client.get("templates/final.html");
    let dom = document.createElement('html');
    dom.innerHTML = html;
    if (game.spys > 1) {
        dom.querySelector("#message").innerText = "Шпионы – игроки " + game.spy_numbers.join(', ');
    } else {
        dom.querySelector("#message").innerText = "Шпион – игрок " + game.spy_numbers;
    }

    document.getElementById("app").innerHTML = dom.innerHTML;
}

function toggleModal() {
    document.querySelector("#modal").classList.toggle("modal-closed");
    document.querySelector("#modal-overlay").classList.toggle("modal-closed");
}