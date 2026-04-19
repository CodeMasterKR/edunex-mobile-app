import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { useThemeColors } from '@/hooks/use-theme-color';
import { Group } from '../types';

export function GroupCard({ group }: { group: Group }) {
  const c = useThemeColors();
  const router = useRouter();

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: c.card, borderColor: c.border }]}
      activeOpacity={0.75}
      onPress={() =>
        router.push({
          pathname: '/group-detail',
          params: {
            id: group.id,
            name: group.name,
            subject: group.subject,
            teacherName: group.teacherName,
            schedule: group.schedule,
          },
        })
      }
    >
      <View style={styles.inner}>
        <View style={styles.left}>
          <View style={[styles.iconWrap, { backgroundColor: c.accent + '12' }]}>
            <Ionicons name="people-outline" size={20} color={c.accent} />
          </View>

          <View style={styles.info}>
            <Text style={[styles.name, { color: c.text }]} numberOfLines={1}>
              {group.name}
            </Text>
            <Text style={[styles.subject, { color: c.accent }]} numberOfLines={1}>
              {group.subject}
            </Text>
            <View style={styles.meta}>
              <Ionicons name="person-outline" size={11} color={c.muted} />
              <Text style={[styles.metaText, { color: c.muted }]}>{group.teacherName}</Text>
            </View>
          </View>
        </View>

        <View style={styles.right}>
          <View style={[styles.countBadge, { backgroundColor: c.bg }]}>
            <Text style={[styles.countNum, { color: c.text }]}>{group.studentCount}</Text>
            <Text style={[styles.countLabel, { color: c.muted }]}>o'quvchi</Text>
          </View>
          <View style={styles.scheduleWrap}>
            <Ionicons name="time-outline" size={11} color={c.muted} />
            <Text style={[styles.schedule, { color: c.muted }]}>{group.schedule}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 10,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    columnGap: 12,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 12,
    flex: 1,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
    rowGap: 3,
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  subject: {
    fontSize: 12,
    fontWeight: '600',
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 4,
    marginTop: 1,
  },
  metaText: {
    fontSize: 11,
    fontWeight: '500',
  },
  right: {
    alignItems: 'flex-end',
    rowGap: 6,
  },
  countBadge: {
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  countNum: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  countLabel: {
    fontSize: 9,
    fontWeight: '600',
  },
  scheduleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 3,
  },
  schedule: {
    fontSize: 10,
    fontWeight: '500',
  },
});