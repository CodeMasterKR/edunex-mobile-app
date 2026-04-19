import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useThemeColors } from '@/hooks/use-theme-color';
import { useState } from 'react';
import { TAB_BOTTOM_OFFSET } from '@/constants/layout';

const LANGUAGES = [
  { code: 'uz', label: 'UZ' },
  { code: 'ru', label: 'RU' },
  { code: 'en', label: 'EN' },
];

type Props = {
  user: {
    name: string;
    role: string;
    subject: string;
    experience: string;
    avatar?: string;
    phone: string;
    birthDate: string;
    address: string;
  };
  onLogout: () => void;
};

export function ProfileScreen({ user, onLogout }: Props) {
  const c = useThemeColors();
  const [lang, setLang] = useState('uz');

  const initials = user.name
    .split(' ')
    .map(w => w[0])
    .join('')
    .slice(0, 2);

  const INFO_ROWS = [
    { icon: 'call-outline',     label: 'Telefon',        value: user.phone },
    { icon: 'calendar-outline', label: "Tug'ilgan sana", value: user.birthDate },
    { icon: 'location-outline', label: 'Manzil',         value: user.address },
    { icon: 'book-outline',     label: 'Fan',            value: user.subject },
  ];

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: c.bg }]} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.list, { paddingBottom: TAB_BOTTOM_OFFSET }]}
      >
        {/* Header */}
        <View style={[styles.headerContainer, { backgroundColor: c.card, borderBottomColor: c.border }]}>
          <Text style={[styles.title, { color: c.text }]}>Profil</Text>
        </View>

        {/* Profile card */}
        <View style={[styles.profileCard, { backgroundColor: c.card }]}>
          <View style={styles.profileRow}>
            {user.avatar ? (
              <Image source={{ uri: user.avatar }} style={styles.avatar} />
            ) : (
              <View style={[styles.avatarFallback, { backgroundColor: c.accent }]}>
                <Text style={styles.avatarText}>{initials}</Text>
              </View>
            )}

            <View style={styles.profileInfo}>
              <Text style={[styles.profileName, { color: c.text }]} numberOfLines={1}>
                {user.name}
              </Text>
              <View style={styles.profileMeta}>
                <Text style={[styles.metaChip, { color: c.muted }]}>{user.role}</Text>
                <View style={[styles.dot, { backgroundColor: c.muted }]} />
                <Text style={[styles.metaChip, { color: c.accent }]}>{user.subject}</Text>
                <View style={[styles.dot, { backgroundColor: c.muted }]} />
                <Text style={[styles.metaChip, { color: c.muted }]}>{user.experience}</Text>
              </View>
            </View>

            <TouchableOpacity style={[styles.editBtn, { backgroundColor: c.bg }]}>
              <Ionicons name="pencil-outline" size={16} color={c.muted} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Ma'lumotlar */}
        <Text style={[styles.sectionTitle, { color: c.muted }]}>MA'LUMOTLAR</Text>
        <View style={[styles.section, { backgroundColor: c.card }]}>
          {INFO_ROWS.map((row, i) => (
            <View key={row.label}>
              <View style={styles.infoRow}>
                <View style={[styles.iconBox, { backgroundColor: c.accent + '18' }]}>
                  <Ionicons name={row.icon as any} size={16} color={c.accent} />
                </View>
                <Text style={[styles.infoLabel, { color: c.text }]}>{row.label}</Text>
                <Text style={[styles.infoValue, { color: c.muted }]} numberOfLines={1}>
                  {row.value}
                </Text>
              </View>
              {i < INFO_ROWS.length - 1 && (
                <View style={[styles.divider, { backgroundColor: c.border }]} />
              )}
            </View>
          ))}
        </View>

        {/* Sozlamalar */}
        <Text style={[styles.sectionTitle, { color: c.muted }]}>SOZLAMALAR</Text>
        <View style={[styles.section, { backgroundColor: c.card }]}>
          <View style={styles.infoRow}>
            <View style={[styles.iconBox, { backgroundColor: c.accent + '18' }]}>
              <Ionicons name="language-outline" size={16} color={c.accent} />
            </View>
            <Text style={[styles.infoLabel, { color: c.text }]}>Til</Text>
            <View style={styles.langBtns}>
              {LANGUAGES.map(l => {
                const active = lang === l.code;
                return (
                  <TouchableOpacity
                    key={l.code}
                    onPress={() => setLang(l.code)}
                    activeOpacity={0.7}
                    style={[
                      styles.langBtn,
                      {
                        backgroundColor: active ? c.accent : c.accent + '15',
                        borderColor: active ? c.accent : 'transparent',
                        borderWidth: 1.5,
                      },
                    ]}
                  >
                    <Text style={[styles.langBtnText, { color: active ? '#fff' : c.accent }]}>
                      {l.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <View style={[styles.divider, { backgroundColor: c.border }]} />

          <TouchableOpacity style={styles.infoRow} onPress={onLogout} activeOpacity={0.7}>
            <View style={[styles.iconBox, { backgroundColor: '#ef444418' }]}>
              <Ionicons name="log-out-outline" size={16} color="#ef4444" />
            </View>
            <Text style={[styles.infoLabel, { color: '#ef4444' }]}>Tizimdan chiqish</Text>
            <Ionicons name="chevron-forward" size={16} color="#ef4444" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  list: {
    paddingHorizontal: 16,
  },

  headerContainer: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },

  profileCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 14,
  },
  avatarFallback: {
    width: 56,
    height: 56,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontSize: 18, fontWeight: '800', color: '#fff' },
  profileInfo: { flex: 1 },
  profileName: { fontSize: 15, fontWeight: '700', marginBottom: 4 },
  profileMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  metaChip: { fontSize: 12, fontWeight: '500' },
  dot: { width: 3, height: 3, borderRadius: 2 },
  editBtn: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
    marginBottom: 6,
    marginTop: 8,
  },
  section: {
    borderRadius: 16,
    paddingHorizontal: 14,
    marginBottom: 10,
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 13,
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoLabel: { flex: 1, fontSize: 14, fontWeight: '500' },
  infoValue: {
    fontSize: 13,
    fontWeight: '500',
    maxWidth: '45%',
    textAlign: 'right',
  },

  divider: { height: 0.5, marginLeft: 44 },

  langBtns: { flexDirection: 'row', gap: 6 },
  langBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  langBtnText: { fontSize: 12, fontWeight: '800' },
});