function formatMoney(money) {
  return money.toLocaleString('ko-KR');
}

export default class GameView {
  constructor() {
    this.money = document.querySelector('#current-money');
    this.round = document.querySelector('#current-round');
    this.controls = document.querySelector('#game-controls');
    this.colorSelect = document.querySelector('#color-select');
    this.betAmount = document.querySelector('#bet-amount');
    this.betButton = document.querySelector('#bet-button');
    this.stopButton = document.querySelector('#stop-button');
    this.resultBox = document.querySelector('#result-box');
    this.resultContent = document.querySelector('#result-content');
    this.restartButton = document.querySelector('#restart-button');
  }

  bindBet(handler) {
    this.betButton.addEventListener('click', handler);
  }

  bindStop(handler) {
    this.stopButton.addEventListener('click', handler);
  }

  bindRestart(handler) {
    this.restartButton.addEventListener('click', handler);
  }

  getColor() {
    return this.colorSelect.value;
  }

  getAmount() {
    return this.betAmount.value;
  }

  showStatus(money, round) {
    this.money.textContent = formatMoney(money);
    this.round.textContent = round;
  }

  disableButtons(isDisabled) {
    this.betButton.disabled = isDisabled;
    this.stopButton.disabled = isDisabled;
  }

  clearResult() {
    this.resultContent.textContent = '';
  }

  addLine(text, className = '') {
    const line = document.createElement('p');
    line.textContent = text;
    line.className = className;
    this.resultContent.appendChild(line);
    return line;
  }

  showSpinning() {
    this.resultBox.style.display = 'block';
    this.clearResult();
    this.addLine('룰렛을 돌리는 중...');
  }

  showResult(resultColor, prize, amount) {
    this.clearResult();
    const colorLine = this.addLine('룰렛 결과: ');
    const colorText = document.createElement('strong');
    colorText.textContent = resultColor;
    colorText.className = `result-color ${resultColor.toLowerCase()}`;
    colorLine.appendChild(colorText);
    if (prize > 0) {
      this.addLine(`베팅 성공! +${formatMoney(prize)}원`, 'result-win');
      return;
    }
    this.addLine(`베팅 실패! -${formatMoney(amount)}원`, 'result-lose');
  }

  appendGameOverNotice() {
    this.addLine('게임이 곧 종료됩니다.');
  }

  showGameOver(money, round) {
    this.resultBox.style.display = 'block';
    this.clearResult();
    this.addLine('게임 종료');
    this.addLine(`최종 자금: ${formatMoney(money)}원`);
    this.addLine(`플레이한 라운드: ${round}`);
    this.controls.style.display = 'none';
    this.restartButton.style.display = 'block';
  }

  showStartScreen() {
    this.colorSelect.value = '';
    this.betAmount.value = '';
    this.clearResult();
    this.resultBox.style.display = 'none';
    this.controls.style.display = 'block';
    this.restartButton.style.display = 'none';
    this.disableButtons(false);
  }
}
