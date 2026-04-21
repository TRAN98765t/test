import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import * as Sharing from 'expo-sharing';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as FileSystem from 'expo-file-system';
import { LoadingStars } from '@/components/LoadingStars';
import { ResultText } from '@/components/ResultText';
import { colors, spacing } from '@/constants/colors';
import { getFortuneReading, type FortuneInput, type FortuneType } from '@/utils/claudeApi';
import { saveHistory } from '@/utils/storage';

const typeLabelMap: Record<FortuneType, string> = {
  horoscope: '星座占い',
  tarot: 'タロット占い',
  numerology: '数秘術',
  omikuji: 'おみくじ',
};

export default function ResultScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<Record<string, string>>();
  const type = (params.type ?? 'horoscope') as FortuneType;
  const title = params.title ?? typeLabelMap[type];

  const fortuneInput = useMemo<FortuneInput>(() => {
    const { type: _t, title: _title, ...rest } = params;
    const cleaned: FortuneInput = {};
    for (const [k, v] of Object.entries(rest)) {
      if (typeof v === 'string') cleaned[k] = v;
    }
    return cleaned;
  }, [params]);

  const [loading, setLoading] = useState(true);
  const [text, setText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const fetchReading = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getFortuneReading({ type, input: fortuneInput });
      setText(result);
    } catch (err) {
      const msg = err instanceof Error ? err.message : '占い結果の取得に失敗しました。';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [type, fortuneInput]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await getFortuneReading({ type, input: fortuneInput });
        if (!cancelled) setText(result);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : '占い結果の取得に失敗しました。');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [type, fortuneInput]);

  const onSave = async () => {
    if (!text || saved) return;
    await saveHistory({
      type,
      typeLabel: typeLabelMap[type],
      title,
      result: text,
    });
    setSaved(true);
    Alert.alert('保存しました', 'この占い結果を履歴に追加しました。');
  };

  const onShare = async () => {
    if (!text) return;
    const body = `【${title}】\n\n${text}\n\n— 占い師AI より`;
    try {
      if (await Sharing.isAvailableAsync()) {
        const path = `${FileSystem.cacheDirectory}fortune-${Date.now()}.txt`;
        await FileSystem.writeAsStringAsync(path, body);
        await Sharing.shareAsync(path, {
          dialogTitle: title,
          mimeType: 'text/plain',
        });
      } else {
        Alert.alert('シェア機能はこの端末では利用できません');
      }
    } catch {
      Alert.alert('シェアに失敗しました', 'もう一度お試しください。');
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.typeBadge}>{typeLabelMap[type]}</Text>
          <Text style={styles.title}>{title}</Text>
        </View>

        {loading && <LoadingStars message="星々が囁いています…" />}

        {!loading && error && (
          <View style={styles.errorBox}>
            <Text style={styles.errorTitle}>✦ 通信障害 ✦</Text>
            <Text style={styles.errorMessage}>{error}</Text>
            <Pressable onPress={fetchReading} style={styles.retryBtn}>
              <Text style={styles.retryBtnText}>再度占う</Text>
            </Pressable>
          </View>
        )}

        {!loading && !error && text.length > 0 && (
          <>
            <ResultText text={text} />

            <View style={styles.actions}>
              <Pressable onPress={onShare} style={[styles.btn, styles.btnSecondary]}>
                <Text style={styles.btnSecondaryText}>📤 シェア</Text>
              </Pressable>
              <Pressable
                onPress={onSave}
                disabled={saved}
                style={[styles.btn, styles.btnPrimary, saved && { opacity: 0.5 }]}
              >
                <Text style={styles.btnPrimaryText}>{saved ? '✓ 保存済み' : '💾 保存'}</Text>
              </Pressable>
            </View>

            <Pressable onPress={() => router.replace('/')} style={styles.homeBtn}>
              <Text style={styles.homeBtnText}>🌙 最初に戻る</Text>
            </Pressable>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.deepNavy,
  },
  container: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  typeBadge: {
    color: colors.gold,
    fontSize: 12,
    letterSpacing: 4,
    marginBottom: spacing.xs,
  },
  title: {
    color: colors.starWhite,
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 3,
  },
  errorBox: {
    padding: spacing.lg,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.danger,
    backgroundColor: colors.mistPurple,
    alignItems: 'center',
  },
  errorTitle: {
    color: colors.danger,
    fontSize: 16,
    letterSpacing: 3,
    marginBottom: spacing.sm,
  },
  errorMessage: {
    color: colors.starWhite,
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
  },
  retryBtn: {
    marginTop: spacing.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.gold,
  },
  retryBtnText: {
    color: colors.gold,
    letterSpacing: 2,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  btn: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: 28,
    alignItems: 'center',
  },
  btnPrimary: { backgroundColor: colors.gold },
  btnPrimaryText: {
    color: colors.deepNavy,
    fontWeight: '700',
    letterSpacing: 3,
  },
  btnSecondary: {
    borderWidth: 1,
    borderColor: colors.purple,
  },
  btnSecondaryText: {
    color: colors.starWhite,
    letterSpacing: 2,
  },
  homeBtn: {
    marginTop: spacing.lg,
    alignSelf: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  homeBtnText: {
    color: colors.subtleText,
    letterSpacing: 3,
  },
});
