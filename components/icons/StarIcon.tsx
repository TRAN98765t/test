import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { colors } from '@/constants/colors';

type Props = {
  size?: number;
  color?: string;
  opacity?: number;
};

export function StarIcon({ size = 16, color = colors.gold, opacity = 1 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" opacity={opacity}>
      <Path
        d="M12 2L13.6 9L21 10L15.5 14.5L17.3 22L12 17.8L6.7 22L8.5 14.5L3 10L10.4 9L12 2Z"
        fill={color}
      />
    </Svg>
  );
}

export function SparkleIcon({ size = 12, color = colors.gold, opacity = 1 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" opacity={opacity}>
      <Path
        d="M12 0L13.5 10.5L24 12L13.5 13.5L12 24L10.5 13.5L0 12L10.5 10.5L12 0Z"
        fill={color}
      />
    </Svg>
  );
}
