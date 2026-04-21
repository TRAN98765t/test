import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '@/constants/colors';
import { SparkleIcon, StarIcon } from './StarIcon';

type Props = {
  color?: string;
};

export function SparkleDivider({ color = colors.gold }: Props) {
  return (
    <View style={styles.row}>
      <View style={[styles.line, { backgroundColor: color }]} />
      <SparkleIcon size={10} color={color} opacity={0.6} />
      <StarIcon size={14} color={color} />
      <SparkleIcon size={10} color={color} opacity={0.6} />
      <View style={[styles.line, { backgroundColor: color }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginVertical: 8,
  },
  line: {
    width: 40,
    height: 1,
    opacity: 0.35,
  },
});
