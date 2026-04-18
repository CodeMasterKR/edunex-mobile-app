import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { useThemeColors } from '@/hooks/use-theme-color';

export function HomeHeader() {
  const c = useThemeColors();

  return (
    <SafeAreaView style={{ backgroundColor: c.bg }} edges={['top']}>
      <View style={[s.container, { borderBottomColor: c.border }]}>
        {/* Left */}
        <View>
          <Text style={[s.greeting, { color: c.muted }]}>Xayrli kun 👋</Text>
          <Text style={[s.name, { color: c.text }]}>Kamronbek</Text>
        </View>

        {/* Right */}
        <View style={s.rightRow}>
          {/* Login button */}
          <TouchableOpacity
            onPress={() => router.push('/(auth)/login')}
            style={[s.iconBtn, { backgroundColor: c.card, borderColor: c.border }]}
            activeOpacity={0.75}
          >
            <Ionicons name="log-in-outline" size={20} color={c.accent} />
          </TouchableOpacity>

          {/* Notification button */}
          <TouchableOpacity
            style={[s.iconBtn, { backgroundColor: c.card, borderColor: c.border }]}
            activeOpacity={0.75}
          >
            <Ionicons name="notifications-outline" size={20} color={c.text} />
            <View style={[s.badge, { backgroundColor: c.accent }]}>
              <Text style={s.badgeText}>3</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  greeting: {
    fontSize: 13,
    fontWeight: '500',
  },
  name: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.5,
    marginTop: 2,
  },
  rightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconBtn: {
    width: 42,
    height: 42,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },
});