import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FortuneCard } from '@/components/FortuneCard';
import { MoonIcon } from '@/components/icons/MoonIcon';
import { SparkleDivider } from '@/components/icons/SparkleDivider';
import { colors, spacing } from '@/constants/colors';

type FortuneMenu = {
  key: 'horoscope' | 'tarot' | 'numerology' | 'omikuji';
  title: string;
  subtitle: string;
  emoji: string;
  route: '/horoscope' | '/tarot' | '/numerology' | '/omikuji';
};

const menus: FortuneMenu[] = [
  { key: 'horoscope', title: '星座占い', subtitle: '12星座の導き', emoji: '♈', route: '/horoscope' },
  { key: 'tarot', title: 'タロット占い', subtitle: '3枚のカードで読む運命', emoji: '🃏', route: '/tarot' },
  { key: 'numerology', title: '数秘術', subtitle: '生年月日が語る本質', emoji: '🔢', route: '/numerology' },
  { key: 'omikuji', title: 'おみくじ', subtitle: '筒を振って運勢を引く', emoji: '🎋', route: '/omikuji' },
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.hero}>
          <MoonIcon size={72} />
          <Text style={styles.title}>占い師AI</Text>
          <Text style={styles.tagline}>星々の叡智が、あなたを導きます</Text>
          <SparkleDivider />
        </View>

        <View style={styles.grid}>
          {menus.map((m, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <View key={m.key} style={[styles.cell, isEven ? styles.cellLeft : styles.cellRight]}>
                <FortuneCard
                  title={m.title}
                  subtitle={m.subtitle}
                  emoji={m.emoji}
                  onPress={() => router.push(m.route)}
                />
              </View>
            );
          })}
        </View>

        <Pressable
          onPress={() => router.push('/history')}
          style={({ pressed }) => [styles.historyButton, pressed && { opacity: 0.7 }]}
        >
          <Text style={styles.historyButtonText}>📜 過去の占い履歴を見る</Text>
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
  hero: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  title: {
    marginTop: spacing.md,
    fontSize: 32,
    fontWeight: '700',
    color: colors.gold,
    letterSpacing: 6,
  },
  tagline: {
    marginTop: spacing.sm,
    color: colors.subtleText,
    fontSize: 14,
    letterSpacing: 2,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: spacing.md,
  },
  cell: {
    width: '50%',
  },
  cellLeft: {},
  cellRight: {},
  historyButton: {
    marginTop: spacing.xl,
    alignSelf: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.gold,
  },
  historyButtonText: {
    color: colors.gold,
    fontSize: 14,
    letterSpacing: 2,
  },
});
