import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '@/constants/colors';

const OMIKUJI_RESULTS = [
  { key: 'daikichi', label: '大吉', weight: 10, accent: '#FFD66B' },
  { key: 'chukichi', label: '中吉', weight: 18, accent: '#F7B267' },
  { key: 'shokichi', label: '小吉', weight: 22, accent: '#F4A261' },
  { key: 'kichi', label: '吉', weight: 25, accent: '#E9C46A' },
  { key: 'suekichi', label: '末吉', weight: 15, accent: '#BDB2FF' },
  { key: 'kyo', label: '凶', weight: 8, accent: '#9B8BFF' },
  { key: 'daikyo', label: '大凶', weight: 2, accent: '#6B5CA5' },
] as const;

type OmikujiResult = (typeof OMIKUJI_RESULTS)[number];

function drawOmikuji(): OmikujiResult {
  const total = OMIKUJI_RESULTS.reduce((sum, r) => sum + r.weight, 0);
  let roll = Math.random() * total;
  for (const r of OMIKUJI_RESULTS) {
    roll -= r.weight;
    if (roll <= 0) return r;
  }
  return OMIKUJI_RESULTS[0];
}

export default function OmikujiScreen() {
  const router = useRouter();
  const shake = useRef(new Animated.Value(0)).current;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [result, setResult] = useState<OmikujiResult | null>(null);
  const [shaking, setShaking] = useState(false);

  useEffect(() => {
    if (!shaking) return;
    const seq = Animated.loop(
      Animated.sequence([
        Animated.timing(shake, { toValue: 1, duration: 90, easing: Easing.linear, useNativeDriver: true }),
        Animated.timing(shake, { toValue: -1, duration: 90, easing: Easing.linear, useNativeDriver: true }),
      ]),
    );
    seq.start();
    return () => seq.stop();
  }, [shaking, shake]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const rotate = shake.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ['-6deg', '0deg', '6deg'],
  });

  const startShake = () => {
    if (shaking || result) return;
    setShaking(true);
    timerRef.current = setTimeout(() => {
      setShaking(false);
      shake.setValue(0);
      setResult(drawOmikuji());
      timerRef.current = null;
    }, 1500);
  };

  const onReveal = () => {
    if (!result) return;
    router.push({
      pathname: '/result',
      params: {
        type: 'omikuji',
        title: `おみくじ・${result.label}`,
        result: result.label,
      },
    });
  };

  const reset = () => setResult(null);

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <View style={styles.container}>
        <Text style={styles.hint}>
          {result ? 'おみくじが出ました' : '筒をタップして振ってください'}
        </Text>

        <Animated.View style={[styles.tube, { transform: [{ rotate }] }]}>
          <Text style={styles.tubeEmoji}>🎋</Text>
          <Text style={styles.tubeLabel}>御神籤</Text>
        </Animated.View>

        {result ? (
          <View style={[styles.resultBadge, { borderColor: result.accent }]}>
            <Text style={[styles.resultText, { color: result.accent }]}>{result.label}</Text>
          </View>
        ) : (
          <Pressable onPress={startShake} style={({ pressed }) => [styles.drawButton, pressed && { opacity: 0.8 }]}>
            <Text style={styles.drawButtonText}>{shaking ? '振っています…' : '筒を振る'}</Text>
          </Pressable>
        )}

        {result && (
          <View style={styles.actions}>
            <Pressable onPress={reset} style={[styles.btn, styles.btnSecondary]}>
              <Text style={styles.btnSecondaryText}>🔄 もう一度</Text>
            </Pressable>
            <Pressable onPress={onReveal} style={[styles.btn, styles.btnPrimary]}>
              <Text style={styles.btnPrimaryText}>✦ 占う ✦</Text>
            </Pressable>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.deepNavy,
  },
  container: {
    flex: 1,
    padding: spacing.md,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  hint: {
    color: colors.subtleText,
    fontSize: 14,
    letterSpacing: 2,
  },
  tube: {
    width: 140,
    height: 220,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: colors.gold,
    backgroundColor: colors.mistPurple,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tubeEmoji: {
    fontSize: 64,
  },
  tubeLabel: {
    color: colors.gold,
    fontSize: 16,
    letterSpacing: 4,
    marginTop: spacing.sm,
  },
  drawButton: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: 30,
    backgroundColor: colors.gold,
  },
  drawButtonText: {
    color: colors.deepNavy,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 3,
  },
  resultBadge: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: 24,
    borderWidth: 2,
    backgroundColor: colors.mistPurple,
  },
  resultText: {
    fontSize: 40,
    fontWeight: '700',
    letterSpacing: 8,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  btn: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 30,
    minWidth: 130,
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
    color: colors.subtleText,
    letterSpacing: 2,
  },
});
