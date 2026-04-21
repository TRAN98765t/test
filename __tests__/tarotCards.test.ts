import { drawThreeCards, positionLabel, tarotCards } from '@/constants/tarotCards';

describe('tarotCards 定数', () => {
  it('合計 78 枚(大アルカナ 22 + 小アルカナ 56)であること', () => {
    expect(tarotCards).toHaveLength(78);
    expect(tarotCards.filter((c) => c.arcana === 'major')).toHaveLength(22);
    expect(tarotCards.filter((c) => c.arcana === 'minor')).toHaveLength(56);
  });

  it('各カードは一意な id を持つ', () => {
    const ids = new Set(tarotCards.map((c) => c.id));
    expect(ids.size).toBe(tarotCards.length);
  });

  it('小アルカナは 4 スート × 14 枚 = 56 枚になる', () => {
    const suits = ['wands', 'cups', 'swords', 'pentacles'] as const;
    for (const s of suits) {
      expect(tarotCards.filter((c) => c.suit === s)).toHaveLength(14);
    }
  });

  it('positionLabel は過去・現在・未来をすべて定義する', () => {
    expect(positionLabel.past).toBe('過去');
    expect(positionLabel.present).toBe('現在');
    expect(positionLabel.future).toBe('未来');
  });
});

describe('drawThreeCards', () => {
  it('3枚のカードが重複なく引かれる', () => {
    const drawn = drawThreeCards();
    expect(drawn).toHaveLength(3);
    const uniqueIds = new Set(drawn.map((d) => d.card.id));
    expect(uniqueIds.size).toBe(3);
  });

  it('ポジションは past / present / future の順で固定', () => {
    const drawn = drawThreeCards();
    expect(drawn.map((d) => d.position)).toEqual(['past', 'present', 'future']);
  });

  it('多数回呼んでも必ず 78枚のプールから引かれる', () => {
    const poolIds = new Set(tarotCards.map((c) => c.id));
    for (let i = 0; i < 50; i++) {
      const drawn = drawThreeCards();
      for (const d of drawn) {
        expect(poolIds.has(d.card.id)).toBe(true);
      }
    }
  });

  it('正位置 / 逆位置 の双方が確率的に出現する', () => {
    let anyReversed = false;
    let anyUpright = false;
    for (let i = 0; i < 100; i++) {
      const drawn = drawThreeCards();
      for (const d of drawn) {
        if (d.reversed) anyReversed = true;
        else anyUpright = true;
      }
      if (anyReversed && anyUpright) break;
    }
    expect(anyReversed).toBe(true);
    expect(anyUpright).toBe(true);
  });
});
