import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useThemeColors } from '@/hooks/use-theme-color';
import { Student } from '../types';

type Props = {
  student: Student | null;
  visible: boolean;
  onClose: () => void;
};

const INFO_ROWS = [
  { icon: 'call-outline', label: 'Telefon', field: 'phone' },
  { icon: 'people-outline', label: 'Ota-ona', field: 'parentPhone' },
  { icon: 'gift-outline', label: "Tug'ilgan kun", field: 'birthDate' },
] as const;

export function StudentModal({ student, visible, onClose }: Props) {
  const c = useThemeColors();

  if (!student) return null;

  const initials = student.name
    .split(' ')
    .map(w => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      {/* Backdrop */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>

      {/* Modal card */}
      <View style={styles.wrapper} pointerEvents="box-none">
        <View style={[styles.card, { backgroundColor: c.card }]}>

          {/* Yopish tugmasi */}
          <TouchableOpacity
            style={[styles.closeBtn, { backgroundColor: c.bg }]}
            onPress={onClose}
            activeOpacity={0.7}
          >
            <Ionicons name="close" size={16} color={c.muted} />
          </TouchableOpacity>

          {/* Avatar */}
          <View style={[styles.avatarWrap, { backgroundColor: c.accent }]}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>

          {/* Ism */}
          <Text style={[styles.name, { color: c.text }]}>{student.name}</Text>

          {/* ID va status */}
          <View style={styles.badgeRow}>
            <Text style={[styles.idText, { color: c.muted }]}>#{student.id}</Text>
            <View style={[styles.statusBadge, { backgroundColor: '#10b981' + '20' }]}>
              <Text style={[styles.statusText, { color: '#10b981' }]}>Faol</Text>
            </View>
          </View>

          {/* Info qatorlar */}
          <View style={[styles.infoBox, { backgroundColor: c.bg, borderColor: c.border }]}>
            {INFO_ROWS.map((row, i) => {
              const value = (student as any)[row.field] ?? '—';
              const isLast = i === INFO_ROWS.length - 1;
              return (
                <View key={row.field}>
                  <View style={styles.infoRow}>
                    <View style={styles.infoLeft}>
                      <Ionicons name={row.icon as any} size={15} color={c.muted} />
                      <Text style={[styles.infoLabel, { color: c.muted }]}>{row.label}</Text>
                    </View>
                    <Text style={[styles.infoValue, { color: c.text }]}>{value}</Text>
                  </View>
                  {!isLast && <View style={[styles.sep, { backgroundColor: c.border }]} />}
                </View>
              );
            })}
          </View>

          {/* Tugmalar */}
          <View style={styles.btnRow}>
            <TouchableOpacity
              style={[styles.btn, { backgroundColor: c.accent }]}
              activeOpacity={0.8}
            >
              <Ionicons name="person-outline" size={15} color="#fff" />
              <Text style={styles.btnTextWhite}>O'quvchi</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btn, { backgroundColor: c.bg, borderColor: c.border, borderWidth: 1 }]}
              activeOpacity={0.8}
            >
              <Ionicons name="call-outline" size={15} color={c.accent} />
              <Text style={[styles.btnText, { color: c.accent }]}>Ota-ona</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  card: {
    width: '100%',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
  },

  closeBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarWrap: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 26,
    fontWeight: '800',
    color: '#fff',
  },

  name: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.4,
    marginBottom: 6,
  },

  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8,
    marginBottom: 20,
  },
  idText: {
    fontSize: 12,
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },

  infoBox: {
    width: '100%',
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 16,
    overflow: 'hidden',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  infoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8,
  },
  infoLabel: {
    fontSize: 13,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 13,
    fontWeight: '700',
  },
  sep: {
    height: 1,
    marginHorizontal: 14,
  },

  btnRow: {
    flexDirection: 'row',
    width: '100%',
    columnGap: 10,
  },
  btn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 6,
    paddingVertical: 12,
    borderRadius: 12,
  },
  btnTextWhite: {
    fontSize: 13,
    fontWeight: '700',
    color: '#fff',
  },
  btnText: {
    fontSize: 13,
    fontWeight: '700',
  },
});