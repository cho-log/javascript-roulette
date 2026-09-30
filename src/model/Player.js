export default class Player {
    constructor() {
        this.money = 10000;
        this.round = 0;
    }
    bet(betMoney) {
        this.money -= betMoney;
    }

    win(playerColor, betMoney) {
        this.round += 1;
        let dividendRate;
        if (playerColor === "YELLOW") {
            dividendRate = 1;
        }
        else if (playerColor === "GREEN") {
            dividendRate = 3;
        }
        else if (playerColor === "BLUE") {
            dividendRate = 5;
        }
        else if (playerColor === "PURPLE") {
            dividendRate = 10;
        }
        else {
            dividendRate = 20;
        }
        this.money = this.money + (betMoney * dividendRate) + betMoney;
        return betMoney * dividendRate + betMoney;
    }
    lose(betMoney) {
        this.round += 1;

        return betMoney;
    }

    reset() {
        this.money = 10000;
        this.round = 0;
    }
}
