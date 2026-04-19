import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useThemeColors } from '@/hooks/use-theme-color';
import { GroupPayment } from '../types';

interface Props {
  item: GroupPayment;
}

function formatAmount(amount: number): string {
  const abs = Math.abs(amount).toLocaleString('uz-UZ');
  return amount >= 0 ? `+${abs}` : `-${abs}`;
}

export function PaymentsGroupCard({ item }: Props) {
  const c = useThemeColors();
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={[styles.card, { backgroundColor: c.card, borderColor: c.border }]}>
      {/* Main row */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => setExpanded(!expanded)}
        style={styles.row}
      >
        <View style={[styles.iconBox, { backgroundColor: c.bg }]}>
          <Ionicons name="layers-outline" size={18} color={c.muted} />
        </View>

        <View style={styles.info}>
          <Text style={[styles.name, { color: c.text }]}>
            {item.name} {item.time} {item.code ? `(${item.code})` : ''}
          </Text>
          <Text style={[styles.students, { color: c.muted }]}>
            {item.studentCount} ta o'quvchi
          </Text>
        </View>

        <View style={styles.right}>
          <Text style={[styles.debt, { color: '#f87171' }]}>
            {formatAmount(-item.debt)}
          </Text>
          <Text style={[styles.income, { color: '#4ade80' }]}>
            {formatAmount(item.income)}
          </Text>
        </View>

        <Ionicons
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={16}
          color={c.muted}
          style={styles.chevron}
        />
      </TouchableOpacity>

      {/* Students list */}
      {expanded && item.students && item.students.length > 0 && (
        <View style={[styles.studentsList, { borderTopColor: c.border }]}>
          {item.students.map((student) => (
            <View
              key={student.id}
              style={[styles.studentRow, { borderBottomColor: c.border }]}
            >
              {/* Status icon */}
              <View
                style={[
                  styles.statusIcon,
                  {
                    borderColor: student.amount >= 0 ? '#4ade80' : '#f87171',
                    backgroundColor: student.amount >= 0 ? '#0d3320' : '#3a0d0d',
                  },
                ]}
              >
                <Ionicons
                  name={student.amount >= 0 ? 'checkmark' : 'alert-circle-outline'}
                  size={12}
                  color={student.amount >= 0 ? '#4ade80' : '#f87171'}
                />
              </View>

              <Text style={[styles.studentName, { color: c.text }]}>
                {student.name}
              </Text>

              <Text
                style={[
                  styles.studentAmount,
                  { color: student.amount >= 0 ? '#4ade80' : '#f87171' },
                ]}
              >
                {formatAmount(student.amount)}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 10,
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 13,
    fontWeight: '600',
  },
  students: {
    fontSize: 11,
    marginTop: 2,
  },
  right: {
    alignItems: 'flex-end',
    gap: 2,
  },
  debt: {
    fontSize: 12,
    fontWeight: '600',
  },
  income: {
    fontSize: 12,
    fontWeight: '600',
  },
  chevron: {
    marginLeft: 4,
  },
  studentsList: {
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  studentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  statusIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  studentName: {
    flex: 1,
    fontSize: 13,
    fontWeight: '500',
  },
  studentAmount: {
    fontSize: 13,
    fontWeight: '600',
  },
});