import { calcLifePathNumber, lifePathDescriptions } from '@/utils/numerologyCalc';

describe('calcLifePathNumber', () => {
  it('一桁になる基本ケース', () => {
    // 2000/01/01 → sumDigits(2000)=2, sumDigits(1)=1, sumDigits(1)=1 → 4
    expect(calcLifePathNumber(new Date(2000, 0, 1))).toBe(4);
  });

  it('二桁は桁和で一桁まで還元する', () => {
    // 1990/05/15 → sumDigits(1990)=19, sumDigits(5)=5, sumDigits(15)=6 → 30 → 3
    expect(calcLifePathNumber(new Date(1990, 4, 15))).toBe(3);
  });

  it('マスターナンバー 11 を還元せず保持する', () => {
    // 1982/04/05 → sumDigits(1982)=20, sumDigits(4)=4, sumDigits(5)=5 → 29 → 11
    expect(calcLifePathNumber(new Date(1982, 3, 5))).toBe(11);
  });

  it('マスターナンバー 22 を還元せず保持する', () => {
    // 1964/01/01 → sumDigits(1964)=20, sumDigits(1)=1, sumDigits(1)=1 → 22
    expect(calcLifePathNumber(new Date(1964, 0, 1))).toBe(22);
  });

  it('全月日を回しても結果は 1..33 の範囲に収まる', () => {
    for (let m = 0; m < 12; m++) {
      for (let d = 1; d <= 28; d++) {
        const n = calcLifePathNumber(new Date(1990, m, d));
        expect(n).toBeGreaterThanOrEqual(1);
        expect(n).toBeLessThanOrEqual(33);
      }
    }
  });

  it('結果のナンバーに対応する説明文が必ず存在する', () => {
    for (let m = 0; m < 12; m++) {
      for (let d = 1; d <= 28; d += 3) {
        const n = calcLifePathNumber(new Date(1990, m, d));
        expect(lifePathDescriptions[n]).toBeDefined();
      }
    }
  });
});
