export type TarotCard = {
  id: string;
  nameJa: string;
  nameEn: string;
  arcana: 'major' | 'minor';
  suit?: 'wands' | 'cups' | 'swords' | 'pentacles';
  number?: number;
  keywordsUpright: string[];
  keywordsReversed: string[];
};

const majorArcana: TarotCard[] = [
  { id: 'm-0', nameJa: '愚者', nameEn: 'The Fool', arcana: 'major', number: 0, keywordsUpright: ['自由', '冒険', '可能性'], keywordsReversed: ['無謀', '迷い', '未熟'] },
  { id: 'm-1', nameJa: '魔術師', nameEn: 'The Magician', arcana: 'major', number: 1, keywordsUpright: ['創造', '才能', '始まり'], keywordsReversed: ['優柔不断', '未熟', '怠慢'] },
  { id: 'm-2', nameJa: '女教皇', nameEn: 'The High Priestess', arcana: 'major', number: 2, keywordsUpright: ['直感', '神秘', '知恵'], keywordsReversed: ['秘密', '無知', '孤立'] },
  { id: 'm-3', nameJa: '女帝', nameEn: 'The Empress', arcana: 'major', number: 3, keywordsUpright: ['豊穣', '愛情', '母性'], keywordsReversed: ['浪費', '虚栄', '依存'] },
  { id: 'm-4', nameJa: '皇帝', nameEn: 'The Emperor', arcana: 'major', number: 4, keywordsUpright: ['権威', '統率', '安定'], keywordsReversed: ['支配', '頑固', '衰退'] },
  { id: 'm-5', nameJa: '教皇', nameEn: 'The Hierophant', arcana: 'major', number: 5, keywordsUpright: ['伝統', '導き', '信頼'], keywordsReversed: ['束縛', '偽善', '頑迷'] },
  { id: 'm-6', nameJa: '恋人', nameEn: 'The Lovers', arcana: 'major', number: 6, keywordsUpright: ['愛', '選択', '調和'], keywordsReversed: ['別離', '迷い', '不調和'] },
  { id: 'm-7', nameJa: '戦車', nameEn: 'The Chariot', arcana: 'major', number: 7, keywordsUpright: ['勝利', '前進', '意志'], keywordsReversed: ['暴走', '挫折', '自制心欠如'] },
  { id: 'm-8', nameJa: '力', nameEn: 'Strength', arcana: 'major', number: 8, keywordsUpright: ['勇気', '忍耐', '克己'], keywordsReversed: ['弱気', '傲慢', '放棄'] },
  { id: 'm-9', nameJa: '隠者', nameEn: 'The Hermit', arcana: 'major', number: 9, keywordsUpright: ['内省', '探究', '孤独'], keywordsReversed: ['孤立', '閉鎖', '頑固'] },
  { id: 'm-10', nameJa: '運命の輪', nameEn: 'Wheel of Fortune', arcana: 'major', number: 10, keywordsUpright: ['転機', '幸運', '流れ'], keywordsReversed: ['停滞', '不運', '悪循環'] },
  { id: 'm-11', nameJa: '正義', nameEn: 'Justice', arcana: 'major', number: 11, keywordsUpright: ['公正', '均衡', '真実'], keywordsReversed: ['不正', '偏見', '不均衡'] },
  { id: 'm-12', nameJa: '吊るされた男', nameEn: 'The Hanged Man', arcana: 'major', number: 12, keywordsUpright: ['試練', '受容', '転換'], keywordsReversed: ['犠牲', '停滞', '逃避'] },
  { id: 'm-13', nameJa: '死神', nameEn: 'Death', arcana: 'major', number: 13, keywordsUpright: ['終わり', '再生', '変化'], keywordsReversed: ['停滞', '拒絶', '未練'] },
  { id: 'm-14', nameJa: '節制', nameEn: 'Temperance', arcana: 'major', number: 14, keywordsUpright: ['調和', '融合', '穏やか'], keywordsReversed: ['不均衡', '衝突', '浪費'] },
  { id: 'm-15', nameJa: '悪魔', nameEn: 'The Devil', arcana: 'major', number: 15, keywordsUpright: ['誘惑', '束縛', '欲望'], keywordsReversed: ['解放', '覚醒', '悟り'] },
  { id: 'm-16', nameJa: '塔', nameEn: 'The Tower', arcana: 'major', number: 16, keywordsUpright: ['崩壊', '衝撃', '覚醒'], keywordsReversed: ['回避', '停滞', '執着'] },
  { id: 'm-17', nameJa: '星', nameEn: 'The Star', arcana: 'major', number: 17, keywordsUpright: ['希望', '導き', '未来'], keywordsReversed: ['失望', '落胆', '停滞'] },
  { id: 'm-18', nameJa: '月', nameEn: 'The Moon', arcana: 'major', number: 18, keywordsUpright: ['不安', '幻想', '潜在意識'], keywordsReversed: ['解消', '明晰', '真実'] },
  { id: 'm-19', nameJa: '太陽', nameEn: 'The Sun', arcana: 'major', number: 19, keywordsUpright: ['成功', '喜び', '祝福'], keywordsReversed: ['停滞', '不調', '虚栄'] },
  { id: 'm-20', nameJa: '審判', nameEn: 'Judgement', arcana: 'major', number: 20, keywordsUpright: ['復活', '決断', '赦し'], keywordsReversed: ['後悔', '停滞', '恐怖'] },
  { id: 'm-21', nameJa: '世界', nameEn: 'The World', arcana: 'major', number: 21, keywordsUpright: ['完成', '統合', '達成'], keywordsReversed: ['未完成', '停滞', '不満'] },
];

const suits: { suit: NonNullable<TarotCard['suit']>; jaSuit: string }[] = [
  { suit: 'wands', jaSuit: '棒' },
  { suit: 'cups', jaSuit: '聖杯' },
  { suit: 'swords', jaSuit: '剣' },
  { suit: 'pentacles', jaSuit: '金貨' },
];

const courtNames = ['ペイジ', 'ナイト', 'クイーン', 'キング'];

const minorArcana: TarotCard[] = suits.flatMap(({ suit, jaSuit }) => {
  const numbered: TarotCard[] = Array.from({ length: 10 }, (_, i) => {
    const num = i + 1;
    const numJa = num === 1 ? 'エース' : String(num);
    return {
      id: `${suit}-${num}`,
      nameJa: `${jaSuit}の${numJa}`,
      nameEn: `${num === 1 ? 'Ace' : num} of ${suit.charAt(0).toUpperCase() + suit.slice(1)}`,
      arcana: 'minor' as const,
      suit,
      number: num,
      keywordsUpright: ['流れ', '始まり', '成長'],
      keywordsReversed: ['停滞', '迷い', '不調'],
    };
  });
  const courts: TarotCard[] = courtNames.map((court, idx) => ({
    id: `${suit}-court-${idx}`,
    nameJa: `${jaSuit}の${court}`,
    nameEn: `${court} of ${suit.charAt(0).toUpperCase() + suit.slice(1)}`,
    arcana: 'minor' as const,
    suit,
    keywordsUpright: ['人物', '役割', '象徴'],
    keywordsReversed: ['影', '未熟', '偏り'],
  }));
  return [...numbered, ...courts];
});

export const tarotCards: TarotCard[] = [...majorArcana, ...minorArcana];

export type DrawnTarotCard = {
  card: TarotCard;
  reversed: boolean;
  position: 'past' | 'present' | 'future';
};

export function drawThreeCards(): DrawnTarotCard[] {
  const positions: DrawnTarotCard['position'][] = ['past', 'present', 'future'];
  const pool = [...tarotCards];
  const drawn: DrawnTarotCard[] = [];
  for (const position of positions) {
    const idx = Math.floor(Math.random() * pool.length);
    const [card] = pool.splice(idx, 1);
    drawn.push({
      card,
      reversed: Math.random() < 0.5,
      position,
    });
  }
  return drawn;
}

export const positionLabel: Record<DrawnTarotCard['position'], string> = {
  past: '過去',
  present: '現在',
  future: '未来',
};
