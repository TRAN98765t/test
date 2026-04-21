import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ZodiacGlyph } from '@/components/icons/ZodiacGlyph';
import { colors, spacing } from '@/constants/colors';
import { horoscopePeriods, zodiacSigns, type HoroscopePeriod } from '@/constants/zodiacSigns';

export default function HoroscopeScreen() {
  const router = useRouter();
  const [signId, setSignId] = useState<string | null>(null);
  const [period, setPeriod] = useState<HoroscopePeriod>('today');

  const canSubmit = signId !== null;

  const onSubmit = () => {
    if (!signId) return;
    const sign = zodiacSigns.find((s) => s.id === signId);
    if (!sign) return;
    const periodLabel = horoscopePeriods.find((p) => p.id === period)?.label ?? '今日';
    router.push({
      pathname: '/result',
      params: {
        type: 'horoscope',
        title: `${sign.nameJa}・${periodLabel}`,
        sign: sign.nameJa,
        period: periodLabel,
      },
    });
  };

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.sectionTitle}>あなたの星座を選んでください</Text>

        <View style={styles.grid}>
          {zodiacSigns.map((sign) => {
            const selected = sign.id === signId;
            return (
              <Pressable
                key={sign.id}
                onPress={() => setSignId(sign.id)}
                style={[styles.signCell, selected && styles.signCellSelected]}
              >
                <ZodiacGlyph
                  symbol={sign.symbol}
                  size={44}
                  color={selected ? colors.gold : colors.subtleText}
                />
                <Text style={styles.signName}>{sign.nameJa}</Text>
                <Text style={styles.signPeriod}>{sign.period}</Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={styles.sectionTitle}>占う期間</Text>
        <View style={styles.periodRow}>
          {horoscopePeriods.map((p) => {
            const selected = p.id === period;
            return (
              <Pressable
                key={p.id}
                onPress={() => setPeriod(p.id)}
                style={[styles.periodChip, selected && styles.periodChipSelected]}
              >
                <Text style={[styles.periodChipText, selected && styles.periodChipTextSelected]}>
                  {p.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Pressable
          onPress={onSubmit}
          disabled={!canSubmit}
          style={({ pressed }) => [
            styles.submit,
            !canSubmit && styles.submitDisabled,
            pressed && canSubmit && { opacity: 0.8 },
          ]}
        >
          <Text style={styles.submitText}>✦ 占う ✦</Text>
        </Pressable>
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
  sectionTitle: {
    color: colors.gold,
    fontSize: 15,
    letterSpacing: 2,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  signCell: {
    width: '31%',
    margin: '1%',
    paddingVertical: spacing.md,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.purple,
    alignItems: 'center',
    backgroundColor: colors.mistPurple,
  },
  signCellSelected: {
    borderColor: colors.gold,
    backgroundColor: '#3a2a66',
  },
  signName: {
    marginTop: 4,
    color: colors.starWhite,
    fontSize: 13,
  },
  signPeriod: {
    marginTop: 2,
    color: colors.subtleText,
    fontSize: 10,
  },
  periodRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  periodChip: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.purple,
    alignItems: 'center',
    backgroundColor: colors.mistPurple,
  },
  periodChipSelected: {
    borderColor: colors.gold,
    backgroundColor: '#3a2a66',
  },
  periodChipText: {
    color: colors.subtleText,
    fontSize: 14,
    letterSpacing: 2,
  },
  periodChipTextSelected: {
    color: colors.gold,
    fontWeight: '600',
  },
  submit: {
    marginTop: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: 30,
    backgroundColor: colors.gold,
    alignItems: 'center',
  },
  submitDisabled: {
    opacity: 0.35,
  },
  submitText: {
    color: colors.deepNavy,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 4,
  },
});
