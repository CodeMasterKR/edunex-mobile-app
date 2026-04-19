import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useState } from 'react';
import { useThemeColors } from '@/hooks/use-theme-color';
import Ionicons from '@expo/vector-icons/Ionicons';
import { MOCK_STUDENTS } from './students-tab';
import { Attendance } from '../types';

type DayType = 'odd' | 'even';
const DAY_TYPE: DayType = 'odd';

const MONTHS = [
  'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun',
  'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr',
];

const MOCK_ATTENDANCE: Attendance[] = [
  { id: '1',  studentId: 'ST1853', date: '2026-04-01', status: 'present' },
  { id: '2',  studentId: 'ST1853', date: '2026-04-03', status: 'present' },
  { id: '3',  studentId: 'ST1853', date: '2026-04-05', status: 'absent'  },
  { id: '4',  studentId: 'ST1853', date: '2026-04-07', status: 'present' },
  { id: '5',  studentId: 'ST1853', date: '2026-04-09', status: 'late'    },
  { id: '6',  studentId: 'ST1853', date: '2026-04-11', status: 'present' },
  { id: '7',  studentId: 'ST1853', date: '2026-04-13', status: 'present' },
  { id: '8',  studentId: 'ST1853', date: '2026-04-15', status: 'present' },
  { id: '9',  studentId: 'ST1853', date: '2026-04-17', status: 'absent'  },
  { id: '10', studentId: 'ST1854', date: '2026-04-01', status: 'present' },
  { id: '11', studentId: 'ST1854', date: '2026-04-03', status: 'late'    },
  { id: '12', studentId: 'ST1854', date: '2026-04-05', status: 'present' },
  { id: '13', studentId: 'ST1854', date: '2026-04-07', status: 'present' },
  { id: '14', studentId: 'ST1854', date: '2026-04-09', status: 'present' },
  { id: '15', studentId: 'ST1854', date: '2026-04-11', status: 'absent'  },
  { id: '16', studentId: 'ST1854', date: '2026-04-13', status: 'present' },
  { id: '17', studentId: 'ST1854', date: '2026-04-15', status: 'present' },
  { id: '18', studentId: 'ST1854', date: '2026-04-17', status: 'present' },
  { id: '19', studentId: 'ST1855', date: '2026-04-01', status: 'absent'  },
  { id: '20', studentId: 'ST1855', date: '2026-04-03', status: 'present' },
  { id: '21', studentId: 'ST1855', date: '2026-04-05', status: 'present' },
  { id: '22', studentId: 'ST1855', date: '2026-04-07', status: 'late'    },
  { id: '23', studentId: 'ST1855', date: '2026-04-09', status: 'present' },
  { id: '24', studentId: 'ST1855', date: '2026-04-11', status: 'present' },
  { id: '25', studentId: 'ST1855', date: '2026-04-13', status: 'absent'  },
  { id: '26', studentId: 'ST1855', date: '2026-04-15', status: 'present' },
  { id: '27', studentId: 'ST1855', date: '2026-04-17', status: 'present' },
  { id: '28', studentId: 'ST1856', date: '2026-04-01', status: 'present' },
  { id: '29', studentId: 'ST1856', date: '2026-04-03', status: 'present' },
  { id: '30', studentId: 'ST1856', date: '2026-04-05', status: 'present' },
  { id: '31', studentId: 'ST1856', date: '2026-04-07', status: 'present' },
  { id: '32', studentId: 'ST1856', date: '2026-04-09', status: 'absent'  },
  { id: '33', studentId: 'ST1856', date: '2026-04-11', status: 'present' },
  { id: '34', studentId: 'ST1856', date: '2026-04-13', status: 'late'    },
  { id: '35', studentId: 'ST1856', date: '2026-04-15', status: 'present' },
  { id: '36', studentId: 'ST1856', date: '2026-04-17', status: 'present' },
  { id: '37', studentId: 'ST1857', date: '2026-04-01', status: 'present' },
  { id: '38', studentId: 'ST1857', date: '2026-04-03', status: 'present' },
  { id: '39', studentId: 'ST1857', date: '2026-04-05', status: 'late'    },
  { id: '40', studentId: 'ST1857', date: '2026-04-07', status: 'present' },
  { id: '41', studentId: 'ST1857', date: '2026-04-09', status: 'present' },
  { id: '42', studentId: 'ST1857', date: '2026-04-11', status: 'present' },
  { id: '43', studentId: 'ST1857', date: '2026-04-13', status: 'present' },
  { id: '44', studentId: 'ST1857', date: '2026-04-15', status: 'absent'  },
  { id: '45', studentId: 'ST1857', date: '2026-04-17', status: 'present' },
];

type Props = {
  attendances: Attendance[];
};

function getClassDays(year: number, month: number, dayType: DayType): number[] {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days: number[] = [];
  for (let d = 1; d <= daysInMonth; d++) {
    if (dayType === 'odd' && d % 2 !== 0) days.push(d);
    if (dayType === 'even' && d % 2 === 0) days.push(d);
  }
  return days;
}

function StatusDot({ status }: { status: Attendance['status'] | null }) {
  const c = useThemeColors();
  if (!status) return <View style={[styles.dot, { backgroundColor: c.border }]} />;
  const color =
    status === 'present' ? '#10b981' :
    status === 'absent'  ? '#ef4444' : '#f59e0b';
  return (
    <View style={[styles.dotActive, { backgroundColor: color }]}>
      <Ionicons
        name={status === 'absent' ? 'close' : status === 'late' ? 'time' : 'checkmark'}
        size={9}
        color="#fff"
      />
    </View>
  );
}

export function AttendanceTab({ attendances }: Props) {
  const c = useThemeColors();
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth());
  const [year] = useState(now.getFullYear());

  const days = getClassDays(year, month, DAY_TYPE);

  // Mock + tashqaridan kelgan attendances merge — yangi yozuv ustunlik qiladi
  const allAttendances = [...MOCK_ATTENDANCE];
  attendances.forEach(a => {
    const idx = allAttendances.findIndex(
      x => x.studentId === a.studentId && x.date === a.date
    );
    if (idx !== -1) allAttendances[idx] = a;
    else allAttendances.push(a);
  });

  const getStatus = (studentId: string, day: number): Attendance['status'] | null => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return allAttendances.find(a => a.studentId === studentId && a.date === dateStr)?.status ?? null;
  };

  const calcPercent = (studentId: string): number => {
    const total = days.length;
    if (!total) return 0;
    const present = days.filter(d => {
      const s = getStatus(studentId, d);
      return s === 'present' || s === 'late';
    }).length;
    return Math.round((present / total) * 100);
  };

  return (
    <View style={styles.root}>
      {/* Oy filter */}
      <View style={styles.monthRow}>
        <TouchableOpacity
          onPress={() => setMonth(m => (m === 0 ? 11 : m - 1))}
          style={[styles.monthBtn, { backgroundColor: c.card, borderColor: c.border }]}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={16} color={c.text} />
        </TouchableOpacity>
        <Text style={[styles.monthLabel, { color: c.text }]}>{MONTHS[month]} {year}</Text>
        <TouchableOpacity
          onPress={() => setMonth(m => (m === 11 ? 0 : m + 1))}
          style={[styles.monthBtn, { backgroundColor: c.card, borderColor: c.border }]}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-forward" size={16} color={c.text} />
        </TouchableOpacity>
      </View>

      {/* Jadval */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tableScroll}
        contentContainerStyle={{ paddingBottom: 12 }}
      >
        <View>
          {/* Header */}
          <View style={styles.row}>
            <View style={[styles.nameCell, styles.headerCell, { backgroundColor: c.bg }]}>
              <Text style={[styles.headerText, { color: c.muted }]}>Talaba</Text>
            </View>
            {days.map(d => (
              <View
                key={d}
                style={[
                  styles.dayCell,
                  styles.headerCell,
                  d === now.getDate() && month === now.getMonth()
                    ? { backgroundColor: c.accent + '20' }
                    : { backgroundColor: c.bg },
                ]}
              >
                <Text style={[
                  styles.dayNum,
                  {
                    color: d === now.getDate() && month === now.getMonth() ? c.accent : c.muted,
                    fontWeight: d === now.getDate() && month === now.getMonth() ? '800' : '600',
                  },
                ]}>
                  {d}
                </Text>
              </View>
            ))}
            <View style={[styles.avgCell, styles.headerCell, { backgroundColor: c.bg }]}>
              <Text style={[styles.headerText, { color: c.muted }]}>O'rt.</Text>
            </View>
          </View>

          {/* O'quvchi qatorlari */}
          {MOCK_STUDENTS.map((student, si) => {
            const percent = calcPercent(student.id);
            const percentColor =
              percent >= 80 ? '#10b981' :
              percent >= 60 ? '#f59e0b' : '#ef4444';
            return (
              <View
                key={student.id}
                style={[styles.row, { backgroundColor: si % 2 === 0 ? c.card : c.bg }]}
              >
                <View style={styles.nameCell}>
                  <View style={[styles.miniAvatar, { backgroundColor: c.accent + '20' }]}>
                    <Text style={[styles.miniAvatarText, { color: c.accent }]}>
                      {student.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                    </Text>
                  </View>
                  <Text style={[styles.studentName, { color: c.text }]} numberOfLines={1}>
                    {student.name}
                  </Text>
                </View>
                {days.map(d => (
                  <View key={d} style={styles.dayCell}>
                    <StatusDot status={getStatus(student.id, d)} />
                  </View>
                ))}
                <View style={styles.avgCell}>
                  <View style={[styles.percentBadge, { backgroundColor: percentColor + '20' }]}>
                    <Text style={[styles.percentText, { color: percentColor }]}>{percent}%</Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* Izoh */}
      <View style={styles.legend}>
        {[
          { color: '#10b981', label: 'Keldi' },
          { color: '#f59e0b', label: 'Kech' },
          { color: '#ef4444', label: 'Kelmadi' },
        ].map(item => (
          <View key={item.label} style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: item.color }]} />
            <Text style={[styles.legendText, { color: c.muted }]}>{item.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const CELL_W = 32;
const NAME_W = 140;
const AVG_W  = 56;

const styles = StyleSheet.create({
  root: { flex: 1, paddingTop: 12 },
  monthRow: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', marginBottom: 12,
  },
  monthBtn: {
    width: 34, height: 34, borderRadius: 10, borderWidth: 1,
    alignItems: 'center', justifyContent: 'center',
  },
  monthLabel: { fontSize: 15, fontWeight: '700' },
  tableScroll: { flex: 1 },
  row: { flexDirection: 'row', alignItems: 'center' },
  headerCell: { paddingVertical: 8 },
  nameCell: {
    width: NAME_W, flexDirection: 'row', alignItems: 'center',
    columnGap: 7, paddingHorizontal: 8, paddingVertical: 10,
  },
  dayCell: {
    width: CELL_W, alignItems: 'center', justifyContent: 'center', paddingVertical: 10,
  },
  avgCell: {
    width: AVG_W, alignItems: 'center', justifyContent: 'center', paddingVertical: 10,
  },
  headerText: { fontSize: 11, fontWeight: '700' },
  dayNum: { fontSize: 11 },
  miniAvatar: {
    width: 26, height: 26, borderRadius: 7, alignItems: 'center', justifyContent: 'center',
  },
  miniAvatarText: { fontSize: 9, fontWeight: '800' },
  studentName: { fontSize: 12, fontWeight: '600', flex: 1 },
  dot: { width: 18, height: 18, borderRadius: 9 },
  dotActive: {
    width: 18, height: 18, borderRadius: 9, alignItems: 'center', justifyContent: 'center',
  },
  percentBadge: { paddingHorizontal: 6, paddingVertical: 3, borderRadius: 6 },
  percentText: { fontSize: 11, fontWeight: '800' },
  legend: { flexDirection: 'row', columnGap: 16, paddingVertical: 12 },
  legendItem: { flexDirection: 'row', alignItems: 'center', columnGap: 5 },
  legendDot: { width: 10, height: 10, borderRadius: 5 },
  legendText: { fontSize: 11, fontWeight: '600' },
});