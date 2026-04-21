const MASTER_NUMBERS = new Set([11, 22, 33]);

function sumDigits(value: number): number {
  return String(value)
    .split('')
    .reduce((acc, c) => acc + (Number.isNaN(Number(c)) ? 0 : Number(c)), 0);
}

function reduceToLifePath(value: number): number {
  let current = value;
  while (current > 9 && !MASTER_NUMBERS.has(current)) {
    current = sumDigits(current);
  }
  return current;
}

export function calcLifePathNumber(date: Date): number {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const total = sumDigits(y) + sumDigits(m) + sumDigits(d);
  return reduceToLifePath(total);
}

export const lifePathDescriptions: Record<number, string> = {
  1: '創始者 — 開拓と独立のエネルギー',
  2: '調和者 — 共感と協力の象徴',
  3: '表現者 — 創造と喜びを広げる者',
  4: '建設者 — 堅実と安定を築く者',
  5: '自由人 — 変化と冒険を愛する魂',
  6: '守護者 — 愛と責任の担い手',
  7: '探究者 — 神秘と真理を求める者',
  8: '達成者 — 力と豊かさの体現者',
  9: '完遂者 — 慈愛と叡智の守り手',
  11: '霊感者 — 直感と啓示のマスターナンバー',
  22: '建築家 — 大きな夢を現実にするマスターナンバー',
  33: '慈愛者 — 無条件の愛を体現するマスターナンバー',
};
