import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { useThemeColors } from '@/hooks/use-theme-color';
import { StudentsTab } from '@/feature/groups/components/students-tab';
import { GradesTab } from '@/feature/groups/components/grades-tab';
import { AttendanceTab } from '@/feature/groups/components/attendance-tab';
import { GradeModal } from '@/feature/groups/components/grade-modal';
import { AttendanceModal } from '@/feature/groups/components/attendance-modal';
import { MOCK_STUDENTS } from '@/feature/groups/components/students-tab';
import type { Grade, Attendance } from '@/feature/groups/types';

type Tab = 'students' | 'grades' | 'attendance';

const TABS: { key: Tab; label: string; icon: string }[] = [
  { key: 'students', label: "O'quvchilar", icon: 'people-outline' },
  { key: 'grades', label: 'Baholar', icon: 'star-outline' },
  { key: 'attendance', label: 'Davomat', icon: 'calendar-outline' },
];

function getTodayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export default function GroupDetailScreen() {
  const c = useThemeColors();
  const router = useRouter();
  const { name } = useLocalSearchParams<{ name: string }>();
  const [activeTab, setActiveTab] = useState<Tab>('students');

  const [gradeModalOpen, setGradeModalOpen] = useState(false);
  const [attendanceModalOpen, setAttendanceModalOpen] = useState(false);

  const [grades, setGrades] = useState<Grade[]>([]);
  const [attendances, setAttendances] = useState<Attendance[]>([]);

  const today = getTodayStr();

  const handleSaveGrades = (
    incoming: { studentId: string; date: string; score: number; comment?: string }[]
  ) => {
    setGrades(prev => {
      const updated = [...prev];
      incoming.forEach(g => {
        const idx = updated.findIndex(
          x => x.studentId === g.studentId && x.date === g.date
        );
        const entry: Grade = {
          id: `${g.studentId}-${g.date}-${Date.now()}`,
          studentId: g.studentId,
          date: g.date,
          score: g.score,
          comment: g.comment,
        };
        if (idx !== -1) updated[idx] = entry;
        else updated.push(entry);
      });
      return updated;
    });
  };

  const handleSaveAttendance = (
    records: { studentId: string; date: string; status: Attendance['status'] }[]
  ) => {
    setAttendances(prev => {
      const updated = [...prev];
      records.forEach(r => {
        const idx = updated.findIndex(
          a => a.studentId === r.studentId && a.date === r.date
        );
        const entry: Attendance = {
          id: `${r.studentId}-${r.date}`,
          studentId: r.studentId,
          date: r.date,
          status: r.status,
        };
        if (idx !== -1) updated[idx] = entry;
        else updated.push(entry);
      });
      return updated;
    });
  };

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: c.bg }]} edges={['top']}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={[styles.backBtn, { backgroundColor: c.card, borderColor: c.border }]}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={18} color={c.text} />
        </TouchableOpacity>
        <Text style={[styles.groupName, { color: c.text }]} numberOfLines={1}>
          {name}
        </Text>
      </View>

      {/* Action tugmalar */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: c.accent }]}
          activeOpacity={0.8}
          onPress={() => setAttendanceModalOpen(true)}
        >
          <Ionicons name="calendar-outline" size={15} color="#fff" />
          <Text style={styles.actionBtnTextWhite}>Davomat</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: c.card, borderColor: c.border, borderWidth: 1 }]}
          activeOpacity={0.8}
          onPress={() => setGradeModalOpen(true)}
        >
          <Ionicons name="star-outline" size={15} color={c.accent} />
          <Text style={[styles.actionBtnText, { color: c.accent }]}>Baho qo'shish</Text>
        </TouchableOpacity>
      </View>

      {/* Tab bar */}
      <View style={[styles.tabBar, { borderColor: c.border }]}>
        {TABS.map(tab => {
          const active = activeTab === tab.key;
          return (
            <TouchableOpacity
              key={tab.key}
              style={[
                styles.tabItem,
                { borderBottomColor: active ? c.accent : 'transparent' },
              ]}
              onPress={() => setActiveTab(tab.key)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={tab.icon as any}
                size={14}
                color={active ? c.accent : c.muted}
              />
              <Text style={[styles.tabLabel, { color: active ? c.accent : c.muted }]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Tab content */}
      <View style={styles.content}>
        <View style={[styles.tabContent, activeTab !== 'students' && styles.hidden]}>
          <StudentsTab />
        </View>
        <View style={[styles.tabContent, activeTab !== 'grades' && styles.hidden]}>
          <GradesTab grades={grades} />
        </View>
        <View style={[styles.tabContent, activeTab !== 'attendance' && styles.hidden]}>
          <AttendanceTab attendances={attendances} />
        </View>
      </View>

      {/* Grade Modal */}
      <GradeModal
        visible={gradeModalOpen}
        students={MOCK_STUDENTS}
        date={today}
        onClose={() => setGradeModalOpen(false)}
        onSave={handleSaveGrades}
      />

      {/* Attendance Modal */}
      <AttendanceModal
        visible={attendanceModalOpen}
        students={MOCK_STUDENTS}
        date={today}
        existing={attendances.filter(a => a.date === today)}
        onClose={() => setAttendanceModalOpen(false)}
        onSave={handleSaveAttendance}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 14,
    columnGap: 12,
  },
  backBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  groupName: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.4,
    flex: 1,
  },

  actions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    columnGap: 10,
    marginBottom: 12,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 5,
    paddingVertical: 10,
    borderRadius: 10,
  },
  actionBtnTextWhite: {
    fontSize: 13,
    fontWeight: '700',
    color: '#fff',
  },
  actionBtnText: {
    fontSize: 13,
    fontWeight: '700',
  },

  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    marginHorizontal: 20,
  },
  tabItem: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 5,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 2,
    marginBottom: -1,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '600',
  },

  content: { flex: 1, paddingHorizontal: 20 },
  tabContent: { flex: 1 },
  hidden: { display: 'none' },
});