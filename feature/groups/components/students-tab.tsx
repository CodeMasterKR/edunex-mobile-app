import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { useThemeColors } from '@/hooks/use-theme-color';
import { Student } from '../types';
import { StudentModal } from './student-modal';

export const MOCK_STUDENTS: Student[] = [
  { id: 'ST1853', name: 'Xojiakbar Polatov', phone: '+998977149919', parentPhone: '+998977149919', birthDate: '2012-10-10', balance: 0 },
  { id: 'ST1854', name: 'Aliyev Bobur', phone: '+998 90 111 22 33', parentPhone: '+998 90 999 88 77', birthDate: '2011-05-23', balance: 0 },
  { id: 'ST1855', name: 'Karimova Zulfiya', phone: '+998 91 222 33 44', parentPhone: '+998 91 111 00 99', birthDate: '2012-03-14', balance: 0 },
  { id: 'ST1856', name: 'Toshmatov Sanjar', phone: '+998 93 333 44 55', parentPhone: '+998 93 222 11 00', birthDate: '2011-11-30', balance: 0 },
  { id: 'ST1857', name: 'Rahimova Malika', phone: '+998 94 444 55 66', parentPhone: '+998 94 333 22 11', birthDate: '2012-07-08', balance: 0 },
];

function StudentCard({ student, onPress }: { student: Student; onPress: () => void }) {
  const c = useThemeColors();
  const initials = student.name.split(' ').map(w => w[0]).join('').slice(0, 2);

  return (
    <View style={[styles.card, { backgroundColor: c.card, borderColor: c.border }]}>
      <View style={[styles.avatar, { backgroundColor: c.accent + '15' }]}>
        <Text style={[styles.avatarText, { color: c.accent }]}>{initials}</Text>
      </View>
      <View style={styles.info}>
        <Text style={[styles.name, { color: c.text }]}>{student.name}</Text>
        <View style={styles.row}>
          <Ionicons name="call-outline" size={11} color={c.muted} />
          <Text style={[styles.phone, { color: c.muted }]}>{student.phone}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={[styles.infoBtn, { backgroundColor: c.bg, borderColor: c.border }]}
        activeOpacity={0.7}
        onPress={onPress}
      >
        <Ionicons name="chevron-forward" size={16} color={c.muted} />
      </TouchableOpacity>
    </View>
  );
}

export function StudentsTab() {
  const [selected, setSelected] = useState<Student | null>(null);

  return (
    <>
      <FlatList
        data={MOCK_STUDENTS}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <StudentCard student={item} onPress={() => setSelected(item)} />
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
      <StudentModal
        student={selected}
        visible={!!selected}
        onClose={() => setSelected(null)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  list: { paddingTop: 12, paddingBottom: 120 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    marginBottom: 8,
    columnGap: 12,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontSize: 14, fontWeight: '800' },
  info: { flex: 1, rowGap: 3 },
  name: { fontSize: 14, fontWeight: '700' },
  row: { flexDirection: 'row', alignItems: 'center', columnGap: 4 },
  phone: { fontSize: 11, fontWeight: '500' },
  infoBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});