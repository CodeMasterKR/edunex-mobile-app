// features/home/components/home-stats.tsx
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useThemeColors } from '@/hooks/use-theme-color';

type IoniconsName = React.ComponentProps<typeof Ionicons>['name'];

type Stat = {
  id: string;
  label: string;
  value: string;
  icon: IoniconsName;
  color: string;
};

const STATS: Stat[] = [
  {
    id: '1',
    label: "Faol o'quvchilar",
    value: '24',
    icon: 'people-outline',
    color: '#069494',
  },
  {
    id: '2',
    label: 'Faol guruhlar',
    value: '9',
    icon: 'layers-outline',
    color: '#3B82F6',
  },
  {
    id: '3',
    label: 'Davomat',
    value: '95%',
    icon: 'calendar-outline',
    color: '#8B5CF6',
  },
  {
    id: '4',
    label: "O'rtacha baho",
    value: '82%',
    icon: 'star-outline',
    color: '#F59E0B',
  },
];

function StatCard({ label, value, icon, color }: Omit<Stat, 'id'>) {
  const c = useThemeColors();

  return (
    <View style={[s.card, { backgroundColor: c.card, borderColor: c.border }]}>
      <View style={[s.iconWrap, { backgroundColor: color + '20' }]}>
        <Ionicons name={icon} size={18} color={color} />
      </View>
      <Text style={[s.label, { color: c.muted }]}>{label}</Text>
      <Text style={[s.value, { color }]}>{value}</Text>
    </View>
  );
}

export function HomeStats() {
  return (
    <View style={s.grid}>
      {STATS.map((stat) => (
        <StatCard key={stat.id} {...stat} />
      ))}
    </View>
  );
}

const s = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    paddingHorizontal: 16,
    marginTop: 16,
  },
  card: {
    width: '47.5%',
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    gap: 8,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
  },
  value: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
});