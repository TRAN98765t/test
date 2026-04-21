import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { colors } from '@/constants/colors';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.deepNavy },
          headerTintColor: colors.gold,
          headerTitleStyle: { fontWeight: '600', letterSpacing: 2 },
          headerShadowVisible: false,
          contentStyle: { backgroundColor: colors.deepNavy },
          animation: 'fade',
        }}
      >
        <Stack.Screen name="index" options={{ title: '占い師AI' }} />
        <Stack.Screen name="horoscope" options={{ title: '星座占い' }} />
        <Stack.Screen name="tarot" options={{ title: 'タロット占い' }} />
        <Stack.Screen name="numerology" options={{ title: '数秘術' }} />
        <Stack.Screen name="omikuji" options={{ title: 'おみくじ' }} />
        <Stack.Screen name="result" options={{ title: '占い結果' }} />
        <Stack.Screen name="history" options={{ title: '履歴' }} />
      </Stack>
    </SafeAreaProvider>
  );
}
