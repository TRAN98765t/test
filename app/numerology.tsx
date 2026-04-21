import React, { useMemo, useState } from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '@/constants/colors';
import { calcLifePathNumber, lifePathDescriptions } from '@/utils/numerologyCalc';

function formatDate(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}年${m}月${day}日`;
}

export default function NumerologyScreen() {
  const router = useRouter();
  const [date, setDate] = useState<Date>(new Date(2000, 0, 1));
  const [name, setName] = useState('');
  const [showPicker, setShowPicker] = useState(Platform.OS === 'ios');

  const lifePath = useMemo(() => calcLifePathNumber(date), [date]);

  const onChangeDate = (_event: unknown, selected?: Date) => {
    if (Platform.OS !== 'ios') {
      setShowPicker(false);
    }
    if (selected) setDate(selected);
  };

  const onSubmit = () => {
    router.push({
      pathname: '/result',
      params: {
        type: 'numerology',
        title: `数秘術 (LP ${lifePath})`,
        birthdate: formatDate(date),
        lifePathNumber: String(lifePath),
        name: name.trim(),
      },
    });
  };

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.sectionTitle}>生年月日</Text>

        {Platform.OS === 'android' && (
          <Pressable style={styles.dateField} onPress={() => setShowPicker(true)}>
            <Text style={styles.dateText}>{formatDate(date)}</Text>
          </Pressable>
        )}
        {showPicker && (
          <View style={styles.pickerWrap}>
            <DateTimePicker
              value={date}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={onChangeDate}
              maximumDate={new Date()}
              themeVariant="dark"
              textColor={colors.starWhite}
            />
          </View>
        )}

        <Text style={styles.sectionTitle}>お名前 (任意)</Text>
        <TextInput
          placeholder="例: 星野 ひかり"
          placeholderTextColor={colors.subtleText}
          style={styles.input}
          value={name}
          onChangeText={setName}
          maxLength={40}
        />

        <View style={styles.lifePathBox}>
          <Text style={styles.lifePathLabel}>ライフパスナンバー</Text>
          <Text style={styles.lifePathNumber}>{lifePath}</Text>
          <Text style={styles.lifePathDesc}>
            {lifePathDescriptions[lifePath] ?? '神秘のナンバー'}
          </Text>
        </View>

        <Pressable onPress={onSubmit} style={({ pressed }) => [styles.submit, pressed && { opacity: 0.8 }]}>
          <Text style={styles.submitText}>✦ 占う ✦</Text>
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
  sectionTitle: {
    color: colors.gold,
    fontSize: 15,
    letterSpacing: 2,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  dateField: {
    padding: spacing.md,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.purple,
    backgroundColor: colors.mistPurple,
  },
  dateText: {
    color: colors.starWhite,
    fontSize: 16,
    letterSpacing: 2,
  },
  pickerWrap: {
    backgroundColor: colors.mistPurple,
    borderRadius: 14,
    overflow: 'hidden',
    marginTop: spacing.sm,
  },
  input: {
    padding: spacing.md,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.purple,
    backgroundColor: colors.mistPurple,
    color: colors.starWhite,
    fontSize: 16,
  },
  lifePathBox: {
    marginTop: spacing.xl,
    padding: spacing.lg,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.gold,
    alignItems: 'center',
    backgroundColor: colors.mistPurple,
  },
  lifePathLabel: {
    color: colors.subtleText,
    fontSize: 13,
    letterSpacing: 3,
  },
  lifePathNumber: {
    color: colors.gold,
    fontSize: 56,
    fontWeight: '700',
    marginVertical: spacing.sm,
  },
  lifePathDesc: {
    color: colors.starWhite,
    fontSize: 14,
    textAlign: 'center',
  },
  submit: {
    marginTop: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: 30,
    backgroundColor: colors.gold,
    alignItems: 'center',
  },
  submitText: {
    color: colors.deepNavy,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 4,
  },
});
