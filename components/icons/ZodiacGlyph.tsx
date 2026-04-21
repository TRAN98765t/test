import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { colors } from '@/constants/colors';

type Props = {
  symbol: string;
  size?: number;
  color?: string;
};

/**
 * 星座シンボル(♈♉♊…)を、円形の星座盤風フレームで囲って装飾的に見せるコンポーネント。
 * Unicodeグリフ本体は装飾性を優先して Text にフォールバックしている。
 */
export function ZodiacGlyph({ symbol, size = 48, color = colors.gold }: Props) {
  const radius = size / 2 - 2;
  return (
    <View style={{ width: size, height: size }}>
      <Svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={StyleSheet.absoluteFill}
      >
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeOpacity={0.4}
          strokeWidth={1}
          fill="transparent"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius - 3}
          stroke={color}
          strokeOpacity={0.15}
          strokeWidth={0.5}
          strokeDasharray="2 3"
          fill="transparent"
        />
      </Svg>
      <View style={[styles.center, { width: size, height: size }]}>
        <Text style={{ color, fontSize: size * 0.55, lineHeight: size }}>{symbol}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
