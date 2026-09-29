const INITIAL_MONEY = 10000; //게임 시작 시 플레이어는 초기 자금 10,000원을 가진다.
const INITIAL_ROUND = 0;
const COLORS = [
  //확률을 백분율*10으로 저장
  { name: 'YELLOW', probabilityFrom1To1000: 525, multiplier: 1 },
  { name: 'GREEN', probabilityFrom1To1000: 250, multiplier: 3 },
  { name: 'BLUE', probabilityFrom1To1000: 150, multiplier: 5 },
  { name: 'PURPLE', probabilityFrom1To1000: 50, multiplier: 10 },
  { name: 'RED', probabilityFrom1To1000: 25, multiplier: 20 },
];

export default class RouletteGame {
  constructor() {
    this.money = INITIAL_MONEY;
    this.round = INITIAL_ROUND;
    this.isWin = false; //승리 여부 저장
    this.betAmount = 0; //베팅금
    this.moneyChange = 0; //자금 변화량
    this.computerColor = null;
  }
  play(playerColorName, betAmount) {
    if (!this.isValidInput(playerColorName, betAmount)) return false;

    this.betAmount = Number(betAmount); //지수표현을 거른 후 숫자로 변환
    this.money -= this.betAmount; //베팅 시 베팅 금액은 자금에서 차감된다.
    this.moneyChange = this.betAmount; //자금 변화
    this.isWin = false; //초기화
    this.computerColor = this.makeComputerColor();
    gameView.updateMoneyElement(this.money);
    gameView.updateResultElement('룰렛을 돌리는 중...');
    this.addRound();
    this.onGameWin(playerColorName); //승리판단

    return true;
  }
  getResult() {
    //결과값 반환
    return {
      money: this.money,
      round: this.round,
      result: this.makeResultMessage(this.computerColor.name, this.isWin, this.moneyChange),
      moneyChange: this.moneyChange,
      isWin: this.isWin,
      isGameOver: this.money <= 0,
    };
  }
  isValidInput(color, betAmount) {
    //유효하지 않은 입력이 들어오면 alert로 에러 메시지를 표시한다.
    if (color === '') {
      alert('베팅할 색상을 선택해주세요.');
      return false;
    }
    if (!/^[1-9][0-9]*$/.test(betAmount)) {
      alert('베팅금액에 1이상의 정수를 입력해주세요.');
      return false;
    }
    if (this.money < betAmount) {
      alert('베팅금액이 현재자금을 초과합니다.');
      return false;
    }
    return true;
  }
  addRound() {
    this.round++;
  }
  onGameWin(playerColorName) {
    //룰렛 결과가 플레이어가 선택한 색상과 같으면 베팅 성공, 다르면 베팅 실패이다.
    if (playerColorName === this.computerColor.name) {
      this.isWin = true;
      this.moneyChange = this.calculateWinning(this.betAmount, this.computerColor.multiplier);
      this.money += this.moneyChange;
    }
  }
  calculateWinning(betAmount, multiplier) {
    //베팅 성공: 베팅 금액 + (베팅 금액 × 배당)을 획득한다. (원금 회수 + 배당금)
    return betAmount + betAmount * multiplier;
  }
  makeComputerColor() {
    const randomNumber = Math.floor(Math.random() * 1000) + 1;
    return this.convertNumberToColor(randomNumber);
  }
  convertNumberToColor(number) {
    let accumulatedProbability = 0;

    for (const color of COLORS) {
      accumulatedProbability += color.probabilityFrom1To1000;
      if (number <= accumulatedProbability) {
        return color;
      }
    }
  }
  makeResultMessage(colorName, isWin, moneyChange) {
    let resultMessage = `룰렛 결과: ${colorName}\n`;

    if (isWin) resultMessage += `베팅 성공! +`;
    else resultMessage += `베팅 실패! -`;
    resultMessage += `${moneyChange.toLocaleString('ko-KR')}원`;
    return resultMessage;
  }
  resetGame() {
    this.money = INITIAL_MONEY;
    this.round = INITIAL_ROUND;
  }
}
export class RouletteGameView {
  constructor() {
    this.moneyElement = document.getElementById('current-money');
    this.roundElement = document.getElementById('current-round');
    this.resultContent = document.getElementById('result-content');
    this.colorSelectInput = document.getElementById('color-select');
    this.betAmountInput = document.getElementById('bet-amount');
    this.betButton = document.getElementById('bet-button');
    this.stopButton = document.getElementById('stop-button');
    this.restartButton = document.getElementById('restart-button');
    this.gameControl = document.getElementById('game-controls');
  }
  //버튼 클릭에 대한 연결
  bindBetEvent(handler) {
    this.betButton.addEventListener('click', handler);
  }
  bindStopEvent(handler) {
    this.stopButton.addEventListener('click', handler);
  }
  bindRestartEvent(handler) {
    this.restartButton.addEventListener('click', handler);
  }
  getInput() {
    //사용자 입력을 클래스 내부에 복사
    return {
      playerColorName: this.colorSelectInput.value,
      betAmount: this.betAmountInput.value,
    };
  }
  updatePlayView(gameResult) {
    this.updateMoneyElement(gameResult.money);
    this.roundElement.textContent = gameResult.round;
    this.updateResultElement(gameResult.result);
  }
  updateMoneyElement(money) {
    this.moneyElement.textContent = money.toLocaleString('ko-KR'); //자릿수 표시
  }
  updateResultElement(message) {
    this.resultContent.textContent = message;
  }
  appendResultElement(message) {
    const appendMessage = document.createElement('p');

    appendMessage.textContent = message;
    this.resultContent.append(appendMessage);
  }
  displayRestartButton(isDisplay) {
    if (isDisplay) this.restartButton.style.display = 'block';
    else this.restartButton.style.display = 'none';
  }
  disableGameButton(isDisable) {
    this.betButton.disabled = isDisable;
    this.stopButton.disabled = isDisable;
  }
  showEndScreen(gameResult) {
    const title = document.createElement('h2');
    const money = document.createElement('p');
    const round = document.createElement('p');

    title.textContent = '게임 종료';
    money.textContent = `최종 자금: ${gameResult.money.toLocaleString('ko-KR')}원`;
    round.textContent = `플레이한 라운드: ${gameResult.round}`;

    this.resultContent.replaceChildren(title, money, round);
    this.displayRestartButton(true);
    this.gameControl.hidden = true;
  }
  resetView() {
    this.gameControl.hidden = false;
    this.colorSelectInput.value = '';
    this.betAmountInput.value = '';
    this.updatePlayView({
      money: game.money,
      round: game.round,
      result: '',
    });
  }
}

const game = new RouletteGame();
const gameView = new RouletteGameView();

gameView.updateMoneyElement(game.money); //현재 자금은 10,000이 표시된다.
gameView.disableGameButton(false); //베팅, 중단 버튼을 활성화한다.
gameView.displayRestartButton(false); //다시 시작 버튼은 보이지 않는다.
gameView.bindBetEvent(handleBet);
gameView.bindStopEvent(handleStop);
gameView.bindRestartEvent(handleRestart);

function handleBet() {
  //베팅을 진행하면 색상과 베팅 금액을 입력한다.
  const { playerColorName, betAmount } = gameView.getInput();
  const isPlayed = game.play(playerColorName, betAmount); //betAmount는 문자열로 입력됨
  const gameResult = game.getResult();

  if (!isPlayed) return; //유효하지않은 입력 시 중단
  gameView.disableGameButton(true); //베팅 버튼과 중단 버튼은 비활성화된다.
  setTimeout(() => {
    gameView.updatePlayView(gameResult);
    gameView.disableGameButton(false); //베팅 버튼과 중단 버튼은 다시 활성화된다.
    if (gameResult.isGameOver) {
      finishGame(gameResult);
      return;
    }
  }, 2000);
}
function handleStop() {
  return finishGame({ money: game.money, round: game.round, isGameOver: false });
}
function finishGame(result) {
  if (result.isGameOver) {
    gameView.disableGameButton(true); //파산 시 베팅,중단 버튼을 숨긴다.
    gameView.appendResultElement('게임이 곧 종료됩니다.');
    setTimeout(() => {
      gameView.showEndScreen(result);
    }, 2000);

    return;
  }
  gameView.showEndScreen(result);
}
function handleRestart() {
  game.resetGame();
  gameView.resetView();
  gameView.displayRestartButton(false); //다시 시작 버튼은 보이지 않는다.
}
