import random

from flask import Flask, jsonify, render_template, request

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/api/v1/game")
def game():
    try:
        players = int(request.args.get("players"))
        spys = int(request.args.get("spys"))
        if players < 3 or spys < 1:
            raise ValueError
        spy_indexes = random.sample(range(1, players + 1), spys)
        location = random.choice(
            [
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
        )
        return jsonify(players=players, spys=spys, spy_indexes=spy_indexes, location=location), 200
    except (ValueError, TypeError):
        return jsonify(status="error", message="bad request"), 400