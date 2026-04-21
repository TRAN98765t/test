import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '@/constants/colors';

const STAR_COUNT = 9;

function Star({ delay }: { delay: number }) {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(anim, {
          toValue: 1,
          duration: 2200,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(anim, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [anim, delay]);

  const translateY = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [-10, 120],
  });
  const opacity = anim.interpolate({
    inputRange: [0, 0.2, 0.8, 1],
    outputRange: [0, 1, 1, 0],
  });

  const left = ((delay * 37) % 280) + 10;

  return (
    <Animated.Text
      style={[
        styles.star,
        {
          left,
          opacity,
          transform: [{ translateY }],
        },
      ]}
    >
      ✦
    </Animated.Text>
  );
}

type Props = {
  message?: string;
};

export function LoadingStars({ message = '星々が囁いています…' }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.sky}>
        {Array.from({ length: STAR_COUNT }).map((_, i) => (
          <Star key={i} delay={i * 250} />
        ))}
      </View>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xl,
  },
  sky: {
    width: 300,
    height: 140,
    overflow: 'hidden',
    position: 'relative',
  },
  star: {
    position: 'absolute',
    top: 0,
    color: colors.gold,
    fontSize: 20,
  },
  message: {
    marginTop: spacing.md,
    color: colors.subtleText,
    fontSize: 14,
    letterSpacing: 2,
  },
});
