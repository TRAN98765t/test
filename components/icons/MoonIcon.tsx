import React from 'react';
import Svg, { Circle, Defs, G, LinearGradient, Path, Stop } from 'react-native-svg';
import { colors } from '@/constants/colors';

type Props = {
  size?: number;
  color?: string;
};

export function MoonIcon({ size = 64, color = colors.gold }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <Defs>
        <LinearGradient id="moonGrad" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor={color} stopOpacity={1} />
          <Stop offset="1" stopColor={color} stopOpacity={0.6} />
        </LinearGradient>
      </Defs>
      <G>
        <Path
          d="M44 8a24 24 0 1 0 12 35A20 20 0 0 1 44 8z"
          fill="url(#moonGrad)"
        />
        <Circle cx="50" cy="20" r="1.5" fill={color} opacity={0.8} />
        <Circle cx="14" cy="14" r="1" fill={color} opacity={0.9} />
        <Circle cx="56" cy="50" r="1.2" fill={color} opacity={0.7} />
      </G>
    </Svg>
  );
}
