export default class Roulette {
    spin(playerColor,betMoney) {
        const random = Math.random() * 100;

        if (random <= 52.5) {
            return "YELLOW";
        }
        else if (random <=77.5){
            return "GREEN";
        }
        else if(random<=92.5){
            return "BLUE";
        }
        else if(random<=97.5){
            return "PURPLE";
        }
        else{
            return "RED";
        }
    }
}
