import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  clearHistory,
  deleteHistoryItem,
  formatDate,
  getHistory,
  saveHistory,
} from '@/utils/storage';

describe('storage', () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
  });

  it('履歴が空のとき getHistory は空配列を返す', async () => {
    expect(await getHistory()).toEqual([]);
  });

  it('saveHistory は id と createdAt を付与して返す', async () => {
    const saved = await saveHistory({
      type: 'omikuji',
      typeLabel: 'おみくじ',
      title: 'おみくじ・大吉',
      result: '✨ 今日は素晴らしい一日になるでしょう。',
    });
    expect(saved.id).toBeTruthy();
    expect(saved.createdAt).toBeTruthy();
    expect(new Date(saved.createdAt).toString()).not.toBe('Invalid Date');
  });

  it('保存後は getHistory から取り出せて、新しいものが先頭になる', async () => {
    await saveHistory({
      type: 'horoscope',
      typeLabel: '星座占い',
      title: '牡羊座・今日',
      result: '最初の結果',
    });
    await saveHistory({
      type: 'tarot',
      typeLabel: 'タロット',
      title: '3枚引き',
      result: '2番目の結果',
    });
    const history = await getHistory();
    expect(history).toHaveLength(2);
    expect(history[0].title).toBe('3枚引き');
    expect(history[1].title).toBe('牡羊座・今日');
  });

  it('deleteHistoryItem は指定した id のみ削除する', async () => {
    const first = await saveHistory({
      type: 'horoscope',
      typeLabel: '星座占い',
      title: 'A',
      result: 'a',
    });
    await saveHistory({
      type: 'horoscope',
      typeLabel: '星座占い',
      title: 'B',
      result: 'b',
    });
    await deleteHistoryItem(first.id);
    const history = await getHistory();
    expect(history).toHaveLength(1);
    expect(history[0].title).toBe('B');
  });

  it('clearHistory は全履歴を消す', async () => {
    await saveHistory({
      type: 'numerology',
      typeLabel: '数秘術',
      title: 'LP 7',
      result: 'x',
    });
    await clearHistory();
    expect(await getHistory()).toEqual([]);
  });

  it('最大 100 件までに切り詰められる', async () => {
    for (let i = 0; i < 110; i++) {
      await saveHistory({
        type: 'omikuji',
        typeLabel: 'おみくじ',
        title: `No.${i}`,
        result: 'r',
      });
    }
    const history = await getHistory();
    expect(history).toHaveLength(100);
    // 最新が先頭
    expect(history[0].title).toBe('No.109');
  });
});

describe('formatDate', () => {
  it('ISO 文字列を "YYYY/MM/DD HH:mm" 形式で返す', () => {
    const iso = new Date(2025, 0, 5, 9, 7).toISOString();
    const formatted = formatDate(iso);
    expect(formatted).toMatch(/^2025\/01\/05 \d{2}:\d{2}$/);
  });

  it('パース不能な文字列はそのまま返す', () => {
    expect(formatDate('not-a-date')).toBe('not-a-date');
  });
});
