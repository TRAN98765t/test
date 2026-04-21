import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { colors, spacing } from '@/constants/colors';

type Props = {
  message?: string;
};

export function LoadingStars({ message = '星々が囁いています…' }: Props) {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('@/assets/lottie/stars.json')}
        autoPlay
        loop
        style={styles.lottie}
      />
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
  lottie: {
    width: 300,
    height: 140,
  },
  message: {
    marginTop: spacing.md,
    color: colors.subtleText,
    fontSize: 14,
    letterSpacing: 2,
  },
});
