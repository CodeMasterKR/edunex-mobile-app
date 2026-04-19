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
import { Grade } from '../types';

const MONTHS = [
  'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun',
  'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr',
];

type DayType = 'odd' | 'even';
const DAY_TYPE: DayType = 'odd';

const MOCK_GRADES: Grade[] = [
  { id: '1',  studentId: 'ST1853', date: '2026-04-01', score: 5 },
  { id: '2',  studentId: 'ST1853', date: '2026-04-03', score: 4 },
  { id: '3',  studentId: 'ST1853', date: '2026-04-05', score: 5 },
  { id: '4',  studentId: 'ST1853', date: '2026-04-07', score: 3 },
  { id: '5',  studentId: 'ST1853', date: '2026-04-09', score: 5 },
  { id: '6',  studentId: 'ST1853', date: '2026-04-11', score: 4 },
  { id: '7',  studentId: 'ST1853', date: '2026-04-13', score: 5 },
  { id: '8',  studentId: 'ST1853', date: '2026-04-15', score: 4 },
  { id: '9',  studentId: 'ST1853', date: '2026-04-17', score: 5 },
  { id: '10', studentId: 'ST1854', date: '2026-04-01', score: 3 },
  { id: '11', studentId: 'ST1854', date: '2026-04-03', score: 4 },
  { id: '12', studentId: 'ST1854', date: '2026-04-05', score: 3 },
  { id: '13', studentId: 'ST1854', date: '2026-04-07', score: 5 },
  { id: '14', studentId: 'ST1854', date: '2026-04-09', score: 4 },
  { id: '15', studentId: 'ST1854', date: '2026-04-11', score: 2 },
  { id: '16', studentId: 'ST1854', date: '2026-04-13', score: 4 },
  { id: '17', studentId: 'ST1854', date: '2026-04-15', score: 3 },
  { id: '18', studentId: 'ST1854', date: '2026-04-17', score: 4 },
  { id: '19', studentId: 'ST1855', date: '2026-04-01', score: 4 },
  { id: '20', studentId: 'ST1855', date: '2026-04-03', score: 5 },
  { id: '21', studentId: 'ST1855', date: '2026-04-05', score: 4 },
  { id: '22', studentId: 'ST1855', date: '2026-04-07', score: 4 },
  { id: '23', studentId: 'ST1855', date: '2026-04-09', score: 3 },
  { id: '24', studentId: 'ST1855', date: '2026-04-11', score: 5 },
  { id: '25', studentId: 'ST1855', date: '2026-04-13', score: 2 },
  { id: '26', studentId: 'ST1855', date: '2026-04-15', score: 4 },
  { id: '27', studentId: 'ST1855', date: '2026-04-17', score: 5 },
  { id: '28', studentId: 'ST1856', date: '2026-04-01', score: 5 },
  { id: '29', studentId: 'ST1856', date: '2026-04-03', score: 5 },
  { id: '30', studentId: 'ST1856', date: '2026-04-05', score: 4 },
  { id: '31', studentId: 'ST1856', date: '2026-04-07', score: 5 },
  { id: '32', studentId: 'ST1856', date: '2026-04-09', score: 3 },
  { id: '33', studentId: 'ST1856', date: '2026-04-11', score: 4 },
  { id: '34', studentId: 'ST1856', date: '2026-04-13', score: 5 },
  { id: '35', studentId: 'ST1856', date: '2026-04-15', score: 4 },
  { id: '36', studentId: 'ST1856', date: '2026-04-17', score: 5 },
  { id: '37', studentId: 'ST1857', date: '2026-04-01', score: 2 },
  { id: '38', studentId: 'ST1857', date: '2026-04-03', score: 3 },
  { id: '39', studentId: 'ST1857', date: '2026-04-05', score: 4 },
  { id: '40', studentId: 'ST1857', date: '2026-04-07', score: 3 },
  { id: '41', studentId: 'ST1857', date: '2026-04-09', score: 5 },
  { id: '42', studentId: 'ST1857', date: '2026-04-11', score: 3 },
  { id: '43', studentId: 'ST1857', date: '2026-04-13', score: 4 },
  { id: '44', studentId: 'ST1857', date: '2026-04-15', score: 2 },
  { id: '45', studentId: 'ST1857', date: '2026-04-17', score: 3 },
];

type Props = {
  grades: Grade[];
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

function scoreColor(score: number | null): string {
  if (!score) return '';
  if (score === 5) return '#10b981';
  if (score === 4) return '#6366f1';
  if (score === 3) return '#f59e0b';
  return '#ef4444';
}

function ScoreCell({ score }: { score: number | null }) {
  const c = useThemeColors();
  if (!score) return <View style={[styles.emptyDot, { backgroundColor: c.border }]} />;
  const color = scoreColor(score);
  return (
    <View style={[styles.scoreBadge, { backgroundColor: color + '20' }]}>
      <Text style={[styles.scoreNum, { color }]}>{score}</Text>
    </View>
  );
}

export function GradesTab({ grades }: Props) {
  const c = useThemeColors();
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth());
  const [year] = useState(now.getFullYear());

  const days = getClassDays(year, month, DAY_TYPE);

  // Mock + tashqaridan kelgan grades merge — yangi yozuv ustunlik qiladi
  const allGrades = [...MOCK_GRADES];
  grades.forEach(g => {
    const idx = allGrades.findIndex(
      x => x.studentId === g.studentId && x.date === g.date
    );
    if (idx !== -1) allGrades[idx] = g;
    else allGrades.push(g);
  });

  const getScore = (studentId: string, day: number): number | null => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return allGrades.find(g => g.studentId === studentId && g.date === dateStr)?.score ?? null;
  };

  const calcAvg = (studentId: string): number => {
    const scores = days
      .map(d => getScore(studentId, d))
      .filter((s): s is number => s !== null);
    if (!scores.length) return 0;
    return Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 10) / 10;
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
            const avg = calcAvg(student.id);
            const avgColor = scoreColor(Math.round(avg));
            return (
              <View key={student.id} style={[styles.row, { backgroundColor: si % 2 === 0 ? c.card : c.bg }]}>
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
                    <ScoreCell score={getScore(student.id, d)} />
                  </View>
                ))}
                <View style={styles.avgCell}>
                  {avg > 0 ? (
                    <View style={[styles.avgBadge, { backgroundColor: avgColor + '20' }]}>
                      <Text style={[styles.avgText, { color: avgColor }]}>{avg}</Text>
                    </View>
                  ) : (
                    <Text style={[styles.avgText, { color: c.muted }]}>—</Text>
                  )}
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* Izoh */}
      <View style={styles.legend}>
        {[
          { color: '#10b981', label: "A'lo (5)" },
          { color: '#6366f1', label: 'Yaxshi (4)' },
          { color: '#f59e0b', label: 'Qoniqarli (3)' },
          { color: '#ef4444', label: 'Qoniqarsiz (2)' },
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
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
  emptyDot: { width: 18, height: 18, borderRadius: 9 },
  scoreBadge: {
    width: 24, height: 24, borderRadius: 7, alignItems: 'center', justifyContent: 'center',
  },
  scoreNum: { fontSize: 12, fontWeight: '800' },
  avgBadge: { paddingHorizontal: 6, paddingVertical: 3, borderRadius: 6 },
  avgText: { fontSize: 12, fontWeight: '800' },
  legend: {
    flexDirection: 'row', flexWrap: 'wrap', rowGap: 6, columnGap: 12, paddingVertical: 12,
  },
  legendItem: { flexDirection: 'row', alignItems: 'center', columnGap: 5 },
  legendDot: { width: 10, height: 10, borderRadius: 5 },
  legendText: { fontSize: 11, fontWeight: '600' },
});