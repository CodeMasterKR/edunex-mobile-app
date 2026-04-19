import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useThemeColors } from '@/hooks/use-theme-color';

const MONTHS = ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'Iyn', 'Iyl', 'Avg', 'Sen', 'Okt', 'Noy', 'Dek'];

interface Props {
  selectedMonth: number; // 0–11
  onSelect: (index: number) => void;
}

export function PaymentsMonthTabs({ selectedMonth, onSelect }: Props) {
  const c = useThemeColors();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {MONTHS.map((month, index) => {
        const active = index === selectedMonth;
        return (
          <TouchableOpacity
            key={month}
            onPress={() => onSelect(index)}
            style={[
              styles.tab,
              active
                ? { backgroundColor: c.accent }
                : { backgroundColor: 'transparent' },
            ]}
          >
            <Text
              style={[
                styles.label,
                { color: active ? '#FFFFFF' : c.muted },
              ]}
            >
              {month}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 6,
    flexDirection: 'row',
  },
  tab: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
  },
});