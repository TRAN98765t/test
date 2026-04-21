import React, { useMemo, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '@/constants/colors';
import { drawThreeCards, positionLabel, type DrawnTarotCard } from '@/constants/tarotCards';

type CardState = {
  drawn: DrawnTarotCard;
  flipped: boolean;
  anim: Animated.Value;
};

export default function TarotScreen() {
  const router = useRouter();
  const [cards, setCards] = useState<CardState[]>(() => initCards());

  function initCards(): CardState[] {
    return drawThreeCards().map((drawn) => ({
      drawn,
      flipped: false,
      anim: new Animated.Value(0),
    }));
  }

  const flipCard = (index: number) => {
    const card = cards[index];
    if (card.flipped) return;
    Animated.timing(card.anim, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();
    const next = [...cards];
    next[index] = { ...card, flipped: true };
    setCards(next);
  };

  const allFlipped = cards.every((c) => c.flipped);

  const reset = () => {
    setCards(initCards());
  };

  const onReveal = () => {
    const payload = cards
      .map(
        (c) =>
          `${positionLabel[c.drawn.position]}:${c.drawn.card.nameJa}(${c.drawn.reversed ? '逆位置' : '正位置'})`,
      )
      .join(' / ');
    router.push({
      pathname: '/result',
      params: {
        type: 'tarot',
        title: 'タロット・3枚引き',
        cards: payload,
      },
    });
  };

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <View style={styles.container}>
        <Text style={styles.hint}>
          {allFlipped ? '全てのカードがめくれました。運命を読み解きましょう。' : 'カードをタップしてめくってください'}
        </Text>

        <View style={styles.row}>
          {cards.map((c, i) => (
            <TarotCardView key={i} state={c} onPress={() => flipCard(i)} />
          ))}
        </View>

        <View style={styles.actions}>
          <Pressable onPress={reset} style={[styles.btn, styles.btnSecondary]}>
            <Text style={styles.btnSecondaryText}>🔄 引き直す</Text>
          </Pressable>
          <Pressable
            onPress={onReveal}
            disabled={!allFlipped}
            style={[styles.btn, styles.btnPrimary, !allFlipped && { opacity: 0.35 }]}
          >
            <Text style={styles.btnPrimaryText}>✦ 占う ✦</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

function TarotCardView({ state, onPress }: { state: CardState; onPress: () => void }) {
  const frontRotate = state.anim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });
  const backRotate = state.anim.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg'],
  });
  const frontOpacity = state.anim.interpolate({
    inputRange: [0, 0.5, 0.5, 1],
    outputRange: [1, 1, 0, 0],
  });
  const backOpacity = state.anim.interpolate({
    inputRange: [0, 0.5, 0.5, 1],
    outputRange: [0, 0, 1, 1],
  });

  const { card, reversed, position } = state.drawn;

  return (
    <Pressable onPress={onPress} style={styles.cardWrap}>
      <Animated.View
        style={[
          styles.cardFace,
          styles.cardBack,
          { transform: [{ rotateY: frontRotate }], opacity: frontOpacity },
        ]}
      >
        <Text style={styles.cardBackSymbol}>✶</Text>
      </Animated.View>
      <Animated.View
        style={[
          styles.cardFace,
          styles.cardFront,
          {
            transform: [{ rotateY: backRotate }, { rotate: reversed ? '180deg' : '0deg' }],
            opacity: backOpacity,
          },
        ]}
      >
        <Text style={styles.cardPosition}>{positionLabel[position]}</Text>
        <Text style={styles.cardName}>{card.nameJa}</Text>
        <Text style={styles.cardStatus}>{reversed ? '逆位置' : '正位置'}</Text>
      </Animated.View>
    </Pressable>
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
    justifyContent: 'space-between',
  },
  hint: {
    color: colors.subtleText,
    fontSize: 14,
    letterSpacing: 2,
    marginTop: spacing.md,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: spacing.xl,
  },
  cardWrap: {
    width: 100,
    height: 160,
    marginHorizontal: spacing.sm,
  },
  cardFace: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: 100,
    height: 160,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: 'hidden',
  },
  cardBack: {
    backgroundColor: colors.mistPurple,
    borderColor: colors.gold,
  },
  cardBackSymbol: {
    fontSize: 52,
    color: colors.gold,
  },
  cardFront: {
    backgroundColor: '#1a1238',
    borderColor: colors.purple,
    padding: spacing.sm,
  },
  cardPosition: {
    color: colors.gold,
    fontSize: 12,
    letterSpacing: 2,
    marginBottom: 6,
  },
  cardName: {
    color: colors.starWhite,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  cardStatus: {
    marginTop: 8,
    color: colors.subtleText,
    fontSize: 11,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  btn: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 30,
    alignItems: 'center',
    minWidth: 130,
  },
  btnPrimary: {
    backgroundColor: colors.gold,
  },
  btnPrimaryText: {
    color: colors.deepNavy,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 3,
  },
  btnSecondary: {
    borderWidth: 1,
    borderColor: colors.purple,
  },
  btnSecondaryText: {
    color: colors.subtleText,
    fontSize: 14,
    letterSpacing: 2,
  },
});
