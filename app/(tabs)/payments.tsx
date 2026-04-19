import React, { useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeColors } from '@/hooks/use-theme-color';
import {
  PaymentsHeader,
  PaymentsMonthTabs,
  PaymentsGroupCard,
  GroupPayment,
} from '@/feature/payments';

const MOCK_DATA: GroupPayment[] = [
  {
    id: '1', name: 'IT (Kamron)', time: '16:00', code: 'K1',
    studentCount: 7, debt: 3800000, income: 1400000,
    students: [
      { id: 's1', name: 'Umar Solixov',         amount: -1000000 },
      { id: 's2', name: 'Umar Shomirzayev',     amount: -500000  },
      { id: 's3', name: 'Madina Abduqaxorova',  amount:  700000  },
      { id: 's4', name: 'Ibrohim Hamidulayev',  amount: -800000  },
      { id: 's5', name: 'Abduqodir Tohirjonov', amount: -1000000 },
    ],
  },
  { id: '2', name: 'IT (Kamron)', time: '9:00 toq',  code: 'K6', studentCount: 0, debt: 0,       income: 0,       students: [] },
  { id: '3', name: 'IT (Kamron)', time: '18:00 toq', code: '',   studentCount: 6, debt: 1800000, income: 2100000, students: [] },
  { id: '4', name: 'IT (Kamron)', time: '18:00',     code: 'K5', studentCount: 3, debt: 1700000, income: 700000,  students: [] },
  { id: '5', name: 'IT (Kamron)', time: '14:00',     code: 'K4', studentCount: 3, debt: 1000000, income: 2000000, students: [] },
];

export default function PaymentsScreen() {
  const c = useThemeColors();
  const [selectedMonth, setSelectedMonth] = useState(3);
  const [selectedYear, setSelectedYear] = useState(2026);

  const summary = {
    totalIncome: MOCK_DATA.reduce((s, i) => s + i.income, 0),
    totalDebt:   MOCK_DATA.reduce((s, i) => s + i.debt,   0),
  };

  return (
    // ✅ faqat 'top' — tab bar pastni o'zi boshqaradi
    <SafeAreaView
      style={[styles.container, { backgroundColor: c.bg }]}
      edges={['top']}
    >
      <PaymentsHeader
        year={selectedYear}
        summary={summary}
        onYearChange={setSelectedYear}
      />
      <FlatList
        data={MOCK_DATA}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <PaymentsMonthTabs
            selectedMonth={selectedMonth}
            onSelect={setSelectedMonth}
          />
        }
        renderItem={({ item }) => <PaymentsGroupCard item={item} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { paddingBottom: 80 }, // tab bar balandligiga mos
});