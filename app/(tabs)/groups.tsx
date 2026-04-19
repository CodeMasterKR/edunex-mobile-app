import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useThemeColors } from '@/hooks/use-theme-color';
import { GroupCard } from '@/feature/groups/components/group-card';
import { Group } from '@/feature/groups/types';

type FilterKey = 'all' | 'active' | 'inactive';

const FILTER_OPTIONS: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'Barchasi' },
  { key: 'active', label: 'Faol' },
  { key: 'inactive', label: 'Nofaol' },
];

const MOCK_GROUPS: Group[] = [
  { id: '1', name: 'Matematika A1', subject: 'Matematika', teacherName: 'Karimov Jasur', studentCount: 12, schedule: 'Du, Ch, Ju 14:00', color: '', isActive: true },
  { id: '2', name: 'Ingliz tili B2', subject: 'Ingliz tili', teacherName: 'Rahimova Dilnoza', studentCount: 8, schedule: 'Se, Pa, Sh 16:00', color: '', isActive: false },
  { id: '3', name: 'Fizika A2', subject: 'Fizika', teacherName: 'Toshmatov Sardor', studentCount: 15, schedule: 'Du, Ch 10:00', color: '', isActive: true },
  { id: '4', name: 'Rus tili A1', subject: 'Rus tili', teacherName: 'Ivanova Marina', studentCount: 10, schedule: 'Se, Ju 15:00', color: '', isActive: false },
];

export default function GroupsScreen() {
  const c = useThemeColors();
  const [filter, setFilter] = useState<FilterKey>('active'); // ✅ default faol

  const filtered = MOCK_GROUPS.filter(g => {
    if (filter === 'active') return g.isActive;
    if (filter === 'inactive') return !g.isActive;
    return true;
  });

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: c.bg }]} edges={['top']}>
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <GroupCard group={item} />
          </View>
        )}
        ListHeaderComponent={
          <View style={[styles.headerContainer, { backgroundColor: c.card, borderBottomColor: c.border }]}>
            <View style={styles.topRow}>
              <Text style={[styles.title, { color: c.text }]}>Guruhlar</Text>
              <View style={styles.filterRow}>
                {FILTER_OPTIONS.map(opt => (
                  <TouchableOpacity
                    key={opt.key}
                    onPress={() => setFilter(opt.key)}
                    style={[
                      styles.filterBtn,
                      {
                        backgroundColor: filter === opt.key ? c.accent : c.bg,
                        borderColor: filter === opt.key ? c.accent : c.border,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.filterText,
                        { color: filter === opt.key ? '#fff' : c.muted },
                      ]}
                    >
                      {opt.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        }
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  headerContainer: {
    marginHorizontal: -16, // list paddingni bekor qiladi
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 12,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  filterRow: {
    flexDirection: 'row',
    gap: 6,
  },
  filterBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
  },
  filterText: {
    fontSize: 12,
    fontWeight: '600',
  },
  cardWrapper: {
    marginBottom: 0, // ✅ cardlar orasida masofa, to'liq yoyilmaydi
  },
});