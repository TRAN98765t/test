import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
import { colors, spacing } from '@/constants/colors';

type Props = {
  text: string;
};

export function ResultText({ text }: Props) {
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fade.setValue(0);
    Animated.timing(fade, {
      toValue: 1,
      duration: 900,
      useNativeDriver: true,
    }).start();
  }, [text, fade]);

  return (
    <Animated.View style={[styles.container, { opacity: fade }]}>
      <Text style={styles.text}>{text}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    borderRadius: 18,
    backgroundColor: colors.mistPurple,
    borderWidth: 1,
    borderColor: colors.purple,
  },
  text: {
    color: colors.starWhite,
    fontSize: 15,
    lineHeight: 26,
  },
});
