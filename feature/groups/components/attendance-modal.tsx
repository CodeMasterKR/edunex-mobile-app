  import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Pressable,
    StyleSheet,
  } from 'react-native';
  import { useState, useEffect } from 'react';
  import Ionicons from '@expo/vector-icons/Ionicons';
  import { useThemeColors } from '@/hooks/use-theme-color';
  import { Student, Attendance } from '../types';

  type AttendanceStatus = Attendance['status'];

  const STATUS_CONFIG: { value: AttendanceStatus; label: string; icon: string; color: string }[] = [
    { value: 'present', label: 'Keldi',    icon: 'checkmark-circle', color: '#10b981' },
    { value: 'late',    label: 'Kechikdi', icon: 'time',             color: '#f59e0b' },
    { value: 'absent',  label: 'Kelmadi',  icon: 'close-circle',     color: '#ef4444' },
  ];

  type StudentRow = {
    student: Student;
    status: AttendanceStatus | null;
  };

  type Props = {
    visible: boolean;
    students: Student[];
    date: string; // 'YYYY-MM-DD'
    existing: Attendance[];
    onClose: () => void;
    onSave: (records: { studentId: string; date: string; status: AttendanceStatus }[]) => void;
  };

  export function AttendanceModal({ visible, students, date, existing, onClose, onSave }: Props) {
    const c = useThemeColors();
    const [rows, setRows] = useState<StudentRow[]>([]);

    useEffect(() => {
      if (visible) {
        setRows(
          students.map(s => ({
            student: s,
            status: existing.find(a => a.studentId === s.id)?.status ?? null,
          }))
        );
      }
    }, [visible, students, existing]);

    const setStatus = (studentId: string, status: AttendanceStatus) => {
      setRows(prev =>
        prev.map(r => (r.student.id === studentId ? { ...r, status } : r))
      );
    };

    const markAll = (status: AttendanceStatus) => {
      setRows(prev => prev.map(r => ({ ...r, status })));
    };

    const handleSave = () => {
      const records = rows
        .filter(r => r.status !== null)
        .map(r => ({ studentId: r.student.id, date, status: r.status! }));
      onSave(records);
      onClose();
    };

    const formatDate = (d: string) => {
      const [y, m, day] = d.split('-');
      return `${day}.${m}.${y}`;
    };

    const presentCount = rows.filter(r => r.status === 'present').length;
    const absentCount  = rows.filter(r => r.status === 'absent').length;
    const lateCount    = rows.filter(r => r.status === 'late').length;

    return (
      <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
        <Pressable style={styles.overlay} onPress={onClose}>
          <Pressable style={[styles.sheet, { backgroundColor: c.card }]}>

            {/* Header */}
            <View style={styles.header}>
              <View>
                <Text style={[styles.title, { color: c.text }]}>Davomat</Text>
                <Text style={[styles.subtitle, { color: c.muted }]}>{formatDate(date)}</Text>
              </View>
              <TouchableOpacity
                onPress={onClose}
                style={[styles.closeBtn, { backgroundColor: c.bg }]}
              >
                <Ionicons name="close" size={18} color={c.text} />
              </TouchableOpacity>
            </View>

            {/* Stats */}
            <View style={styles.stats}>
              {[
                { label: 'Keldi',    count: presentCount, color: '#10b981' },
                { label: 'Kechikdi', count: lateCount,    color: '#f59e0b' },
                { label: 'Kelmadi',  count: absentCount,  color: '#ef4444' },
              ].map(s => (
                <View key={s.label} style={[styles.statItem, { backgroundColor: s.color + '15' }]}>
                  <Text style={[styles.statCount, { color: s.color }]}>{s.count}</Text>
                  <Text style={[styles.statLabel, { color: s.color }]}>{s.label}</Text>
                </View>
              ))}
            </View>

            {/* Students list */}
            <ScrollView
              style={styles.list}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ gap: 8, paddingBottom: 8 }}
            >
              {rows.map(({ student, status }) => (
                <View
                  key={student.id}
                  style={[styles.studentRow, { backgroundColor: c.bg }]}
                >
                  {/* Avatar + name */}
                  <View style={[styles.avatar, { backgroundColor: c.accent + '20' }]}>
                    <Text style={[styles.avatarText, { color: c.accent }]}>
                      {student.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                    </Text>
                  </View>
                  <Text style={[styles.studentName, { color: c.text }]} numberOfLines={1}>
                    {student.name}
                  </Text>

                  {/* Status buttons */}
                  <View style={styles.statusBtns}>
                    {STATUS_CONFIG.map(s => {
                      const active = status === s.value;
                      return (
                        <TouchableOpacity
                          key={s.value}
                          onPress={() => setStatus(student.id, s.value)}
                          activeOpacity={0.7}
                          style={[
                            styles.statusBtn,
                            {
                              backgroundColor: active ? s.color : s.color + '15',
                              borderColor: active ? s.color : 'transparent',
                              borderWidth: 1.5,
                            },
                          ]}
                        >
                          <Ionicons
                            name={s.icon as any}
                            size={16}
                            color={active ? '#fff' : s.color}
                          />
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              ))}
            </ScrollView>

            {/* Save */}
            <TouchableOpacity
              style={[styles.saveBtn, { backgroundColor: c.accent }]}
              onPress={handleSave}
              activeOpacity={0.8}
            >
              <Ionicons name="checkmark-circle" size={18} color="#fff" />
              <Text style={styles.saveBtnText}>Saqlash</Text>
            </TouchableOpacity>

          </Pressable>
        </Pressable>
      </Modal>
    );
  }

  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: '#00000066',
      justifyContent: 'flex-end',
    },
    sheet: {
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      padding: 24,
      paddingBottom: 36,
      maxHeight: '90%',
      gap: 14,
    },

    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    title: { fontSize: 17, fontWeight: '800', letterSpacing: -0.3 },
    subtitle: { fontSize: 13, fontWeight: '500', marginTop: 2 },
    closeBtn: {
      width: 32,
      height: 32,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },

    stats: { flexDirection: 'row', gap: 8 },
    statItem: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: 10,
      borderRadius: 12,
      gap: 2,
    },
    statCount: { fontSize: 20, fontWeight: '900' },
    statLabel: { fontSize: 11, fontWeight: '600' },

    markAllRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    markAllLabel: { fontSize: 12, fontWeight: '600' },
    markAllBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 8,
      borderWidth: 1,
    },
    markAllText: { fontSize: 11, fontWeight: '700' },

    list: { flexGrow: 0 },

    studentRow: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderRadius: 12,
      gap: 10,
    },
    avatar: {
      width: 34,
      height: 34,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    avatarText: { fontSize: 11, fontWeight: '800' },
    studentName: { flex: 1, fontSize: 13, fontWeight: '600' },

    statusBtns: { flexDirection: 'row', gap: 6 },
    statusBtn: {
      width: 34,
      height: 34,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },

    saveBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      paddingVertical: 14,
      borderRadius: 14,
      marginTop: 4,
    },
    saveBtnText: { fontSize: 15, fontWeight: '800', color: '#fff' },
  });