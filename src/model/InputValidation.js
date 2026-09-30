export default class InputValidation {
    isValidInput(playerColorInput, betMoneyInput) {
        if (playerColorInput === "") {
            return {
                isValid: false,
                message:"색상을 골라주세요"
            };
        }
        if (betMoneyInput === "") {
            return {
                isValid: false,
                message:"금액을 입력해주세요"
            };
        }
        if (!/^-?\d+$/.test(betMoneyInput)) {
            return {
                isValid: false,
                message:"숫자를 입력해주세요."
            };
        }
        if (Number(betMoneyInput) <= 0) {
            return {
                isValid: false,
                message: "유효한 금액을 입력해주세요."
            };
        }
        return {
            isValid: true
        };
    }

    isValidBetMoney(betMoney, playerMoney) {
        if (betMoney > playerMoney) {
            return {
                 isValid: false,
                 message: "베팅 금액이 가진 금액이하여야 합니다." 
                };
        }
        return { isValid: true };
    }
}
