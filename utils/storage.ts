import AsyncStorage from '@react-native-async-storage/async-storage';
import type { FortuneType } from './claudeApi';

const STORAGE_KEY = '@uranai-app/history';

export type FortuneHistoryItem = {
  id: string;
  type: FortuneType;
  typeLabel: string;
  title: string;
  result: string;
  createdAt: string;
};

export async function getHistory(): Promise<FortuneHistoryItem[]> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as FortuneHistoryItem[];
  } catch {
    return [];
  }
}

export async function saveHistory(
  item: Omit<FortuneHistoryItem, 'id' | 'createdAt'>,
): Promise<FortuneHistoryItem> {
  const history = await getHistory();
  const newItem: FortuneHistoryItem = {
    ...item,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
  };
  const next = [newItem, ...history].slice(0, 100);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return newItem;
}

export async function deleteHistoryItem(id: string): Promise<void> {
  const history = await getHistory();
  const next = history.filter((item) => item.id !== id);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

export async function clearHistory(): Promise<void> {
  await AsyncStorage.removeItem(STORAGE_KEY);
}

export function formatDate(iso: string): string {
  try {
    const d = new Date(iso);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hh = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    return `${y}/${m}/${day} ${hh}:${mm}`;
  } catch {
    return iso;
  }
}
