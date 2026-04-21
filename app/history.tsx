import React, { useCallback, useEffect, useState } from 'react';
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '@/constants/colors';
import {
  clearHistory,
  deleteHistoryItem,
  formatDate,
  getHistory,
  type FortuneHistoryItem,
} from '@/utils/storage';

export default function HistoryScreen() {
  const [items, setItems] = useState<FortuneHistoryItem[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const load = useCallback(async () => {
    const data = await getHistory();
    setItems(data);
  }, []);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load]),
  );

  useEffect(() => {
    load();
  }, [load]);

  const onDelete = (id: string) => {
    Alert.alert('削除しますか?', 'この占い結果を履歴から削除します。', [
      { text: 'キャンセル', style: 'cancel' },
      {
        text: '削除',
        style: 'destructive',
        onPress: async () => {
          await deleteHistoryItem(id);
          await load();
        },
      },
    ]);
  };

  const onClearAll = () => {
    if (items.length === 0) return;
    Alert.alert('全て削除しますか?', 'すべての履歴を削除します。元に戻せません。', [
      { text: 'キャンセル', style: 'cancel' },
      {
        text: '全削除',
        style: 'destructive',
        onPress: async () => {
          await clearHistory();
          await load();
        },
      },
    ]);
  };

  if (items.length === 0) {
    return (
      <SafeAreaView style={styles.safe} edges={['bottom']}>
        <View style={styles.empty}>
          <Text style={styles.emptyEmoji}>🌙</Text>
          <Text style={styles.emptyText}>まだ履歴がありません</Text>
          <Text style={styles.emptySubtext}>占い結果を保存するとここに表示されます</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <Pressable onPress={onClearAll} style={styles.clearAll}>
            <Text style={styles.clearAllText}>全削除</Text>
          </Pressable>
        }
        renderItem={({ item }) => {
          const expanded = expandedId === item.id;
          const preview = item.result.length > 80 ? item.result.slice(0, 80) + '…' : item.result;
          return (
            <Pressable
              onPress={() => setExpandedId(expanded ? null : item.id)}
              onLongPress={() => onDelete(item.id)}
              style={styles.card}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.cardType}>{item.typeLabel}</Text>
                <Text style={styles.cardDate}>{formatDate(item.createdAt)}</Text>
              </View>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardBody}>{expanded ? item.result : preview}</Text>
              <Text style={styles.cardHint}>
                {expanded ? 'タップで閉じる / 長押しで削除' : 'タップで詳細 / 長押しで削除'}
              </Text>
            </Pressable>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.deepNavy,
  },
  list: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: spacing.md,
  },
  emptyText: {
    color: colors.gold,
    fontSize: 18,
    letterSpacing: 3,
  },
  emptySubtext: {
    color: colors.subtleText,
    fontSize: 13,
    marginTop: spacing.sm,
  },
  clearAll: {
    alignSelf: 'flex-end',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.danger,
  },
  clearAllText: {
    color: colors.danger,
    fontSize: 12,
    letterSpacing: 2,
  },
  card: {
    padding: spacing.md,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.purple,
    backgroundColor: colors.mistPurple,
    marginBottom: spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  cardType: {
    color: colors.gold,
    fontSize: 12,
    letterSpacing: 2,
  },
  cardDate: {
    color: colors.subtleText,
    fontSize: 11,
  },
  cardTitle: {
    color: colors.starWhite,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  cardBody: {
    color: colors.starWhite,
    fontSize: 13,
    lineHeight: 22,
  },
  cardHint: {
    marginTop: spacing.sm,
    color: colors.subtleText,
    fontSize: 10,
    letterSpacing: 1,
  },
});
