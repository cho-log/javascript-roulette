export const INITIAL_MONEY = 10000;
export const SPIN_TIME = 2000;
export const GAME_OVER_TIME = 2000;

export const ROULETTE_COLORS = [
  { name: 'YELLOW', count: 21, multiplier: 1 },
  { name: 'GREEN', count: 10, multiplier: 3 },
  { name: 'BLUE', count: 6, multiplier: 5 },
  { name: 'PURPLE', count: 2, multiplier: 10 },
  { name: 'RED', count: 1, multiplier: 20 },
];

export const ERROR_MESSAGE = {
  EMPTY_COLOR: '베팅할 색상을 선택해주세요.',
  WRONG_COLOR: '올바른 색상을 선택해주세요.',
  EMPTY_AMOUNT: '베팅 금액을 입력해주세요.',
  WRONG_AMOUNT: '베팅 금액은 1 이상의 정수로 입력해주세요.',
  OVER_MONEY: '가진 돈보다 많이 베팅할 수 없습니다.',
};
