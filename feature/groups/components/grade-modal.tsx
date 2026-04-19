import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Pressable,
  FlatList,
  StyleSheet,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { useState, useEffect, useCallback } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useThemeColors } from '@/hooks/use-theme-color';
import { Student } from '../types';

const getBand = (score: number) => {
  if (score >= 86) return { label: "A'lo",      color: '#10b981' };
  if (score >= 71) return { label: 'Yaxshi',    color: '#6366f1' };
  if (score >= 56) return { label: 'Qoniqarli', color: '#f59e0b' };
  return             { label: 'Qoniqarsiz', color: '#ef4444' };
};

type StudentGrade = {
  student: Student;
  score: number | null;
  comment: string;
};

type Props = {
  visible: boolean;
  students: Student[];
  date: string;
  onClose: () => void;
  onSave: (grades: { studentId: string; date: string; score: number; comment?: string }[]) => void;
};

export function GradeModal({ visible, students, date, onClose, onSave }: Props) {
  const c = useThemeColors();
  const [rows, setRows] = useState<StudentGrade[]>([]);

  useEffect(() => {
    if (visible) {
      setRows(students.map(s => ({ student: s, score: null, comment: '' })));
    }
  }, [visible, students]);

  const setScore = useCallback((studentId: string, score: number) => {
    const band = getBand(score);
    setRows(prev =>
      prev.map(r =>
        r.student.id === studentId ? { ...r, score, comment: band.label } : r
      )
    );
  }, []);

  const clearScore = useCallback((studentId: string) => {
    setRows(prev =>
      prev.map(r =>
        r.student.id === studentId ? { ...r, score: null, comment: '' } : r
      )
    );
  }, []);

  const filledCount = rows.filter(r => r.score !== null).length;

  const handleSave = () => {
    const grades = rows
      .filter(r => r.score !== null)
      .map(r => ({
        studentId: r.student.id,
        date,
        score: r.score!,
        comment: r.comment.trim() || undefined,
      }));
    onSave(grades);
    onClose();
  };

  const formatDate = (d: string) => {
    const [y, m, day] = d.split('-');
    return `${day}.${m}.${y}`;
  };

  const renderItem = useCallback(
    ({ item }: { item: StudentGrade }) => {
      const { student, score } = item;
      const band = score !== null ? getBand(score) : null;
      const initials = student.name
        .split(' ')
        .map((w: string) => w[0])
        .join('')
        .slice(0, 2);

      return (
        <View
          style={[
            styles.studentCard,
            {
              backgroundColor: c.bg,
              borderLeftWidth: 3,
              borderLeftColor: band ? band.color : c.border,
            },
          ]}
        >
          {/* Top row */}
          <View style={styles.topRow}>
            <View
              style={[
                styles.avatar,
                { backgroundColor: band ? band.color + '20' : c.accent + '20' },
              ]}
            >
              <Text style={[styles.avatarText, { color: band ? band.color : c.accent }]}>
                {initials}
              </Text>
            </View>

            <Text style={[styles.studentName, { color: c.text }]} numberOfLines={1}>
              {student.name}
            </Text>

            {score !== null ? (
              <TouchableOpacity
                onPress={() => clearScore(student.id)}
                style={[styles.scoreBadge, { backgroundColor: band!.color }]}
                activeOpacity={0.8}
              >
                <Text style={styles.scoreBadgeText}>{score}</Text>
                <Ionicons name="close" size={10} color="#fff" />
              </TouchableOpacity>
            ) : (
              <View style={[styles.scoreBadgeEmpty, { borderColor: c.border }]}>
                <Text style={[styles.scoreBadgeEmptyText, { color: c.muted }]}>—</Text>
              </View>
            )}
          </View>

          {/* Slider */}
          <View style={styles.sliderRow}>
            <Text style={[styles.sliderMin, { color: c.muted }]}>0</Text>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={100}
              step={1}
              value={score ?? 0}
              minimumTrackTintColor={band?.color ?? c.muted}
              maximumTrackTintColor={c.border}
              thumbTintColor={band?.color ?? c.muted}
              onValueChange={v => setScore(student.id, v)}
            />
            <Text style={[styles.sliderMax, { color: c.muted }]}>100</Text>
          </View>

          {band && (
            <Text style={[styles.bandLabel, { color: band.color }]}>
              {band.label} • {score} ball
            </Text>
          )}
        </View>
      );
    },
    [c, setScore, clearScore]
  );

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={[styles.sheet, { backgroundColor: c.card }]}>

          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={[styles.title, { color: c.text }]}>Baho qo'yish</Text>
              <Text style={[styles.subtitle, { color: c.muted }]}>
                {formatDate(date)} • {filledCount}/{rows.length} baholandi
              </Text>
            </View>
            <TouchableOpacity
              onPress={onClose}
              style={[styles.closeBtn, { backgroundColor: c.bg }]}
            >
              <Ionicons name="close" size={18} color={c.text} />
            </TouchableOpacity>
          </View>

          {/* List */}
          <FlatList
            data={rows}
            keyExtractor={item => item.student.id}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            style={styles.list}
            contentContainerStyle={{ gap: 10, paddingBottom: 8 }}
            removeClippedSubviews={true}
            initialNumToRender={8}
            maxToRenderPerBatch={8}
            windowSize={5}
          />

          {/* Save */}
          <TouchableOpacity
            style={[
              styles.saveBtn,
              { backgroundColor: filledCount > 0 ? c.accent : c.accent + '50' },
            ]}
            onPress={handleSave}
            activeOpacity={0.8}
            disabled={filledCount === 0}
          >
            <Ionicons name="checkmark-circle" size={18} color="#fff" />
            <Text style={styles.saveBtnText}>
              {filledCount > 0 ? `${filledCount} ta bahoni saqlash` : 'Baho tanlanmagan'}
            </Text>
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
    height: '90%',
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

  list: { flex: 1 },

  studentCard: {
    borderRadius: 12,
    padding: 12,
    gap: 6,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  avatarText: { fontSize: 11, fontWeight: '800' },
  studentName: { flex: 1, fontSize: 13, fontWeight: '600' },

  scoreBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  scoreBadgeText: { fontSize: 13, fontWeight: '800', color: '#fff' },

  scoreBadgeEmpty: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1.5,
  },
  scoreBadgeEmptyText: { fontSize: 13, fontWeight: '600' },

  sliderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sliderMin: { fontSize: 11, fontWeight: '600', width: 14, textAlign: 'center' },
  sliderMax: { fontSize: 11, fontWeight: '600', width: 24, textAlign: 'center' },
  slider: { flex: 1, height: 36 },

  bandLabel: { fontSize: 11, fontWeight: '700', marginTop: 2 },

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