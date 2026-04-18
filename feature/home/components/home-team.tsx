// features/home/components/home-team.tsx
import { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useThemeColors } from '@/hooks/use-theme-color';

const CARD_WIDTH = 140;
const CARD_GAP = 12;
const STEP = CARD_WIDTH + CARD_GAP;

type Teacher = {
  id: string;
  name: string;
  subject: string;
  phone: string;
  avatar: string | null;
};

const TEACHERS: Teacher[] = [
  { id: '1', name: 'Sarvinoz Aliyeva', subject: 'Matematika',  phone: '+998 90 123 45 67', avatar: null },
  { id: '2', name: 'Sardor Jalolov',   subject: 'Fizika',      phone: '+998 91 234 56 78', avatar: null },
  { id: '3', name: 'Nodira Karimova',  subject: 'Ingliz tili', phone: '+998 93 345 67 89', avatar: null },
  { id: '4', name: 'Bobur Toshmatov',  subject: 'Kimyo',       phone: '+998 94 456 78 90', avatar: null },
  { id: '5', name: 'Zulfiya Rahimova', subject: 'Biologiya',   phone: '+998 97 567 89 01', avatar: null },
  { id: '6', name: 'Jasur Umarov',     subject: 'Tarix',       phone: '+998 99 678 90 12', avatar: null },
];

// 3x takrorlash — chap, o'rta, o'ng
const REPEATED = [...TEACHERS, ...TEACHERS, ...TEACHERS];
const TOTAL = TEACHERS.length;
const CENTER_OFFSET = TOTAL * STEP;

function TeacherCard({ teacher, accent }: { teacher: Teacher; accent: string }) {
  const c = useThemeColors();

  return (
    <View style={[s.card, { backgroundColor: c.card, borderColor: c.border }]}>
      <View style={[s.avatar, { backgroundColor: accent + '25', borderColor: accent + '60' }]}>
        {teacher.avatar ? (
          <Image source={{ uri: teacher.avatar }} style={s.avatarImg} />
        ) : (
          <Text style={[s.avatarText, { color: accent }]}>
            {teacher.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </Text>
        )}
      </View>

      <Text style={[s.name, { color: c.text }]} numberOfLines={2}>
        {teacher.name}
      </Text>

      <View style={s.row}>
        <Ionicons name="book-outline" size={11} color={c.muted} />
        <Text style={[s.subject, { color: c.muted }]} numberOfLines={1}>
          {teacher.subject}
        </Text>
      </View>

      <View style={[s.phonePill, { backgroundColor: accent + '15' }]}>
        <Ionicons name="call-outline" size={11} color={accent} />
        <Text style={[s.phone, { color: accent }]} numberOfLines={1}>
          {teacher.phone}
        </Text>
      </View>
    </View>
  );
}

export function HomeTeam() {
  const c = useThemeColors();
  const scrollRef = useRef<ScrollView>(null);
  const offsetRef = useRef(CENTER_OFFSET);
  const isDragging = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // O'rtadan boshlash
  useEffect(() => {
    scrollRef.current?.scrollTo({ x: CENTER_OFFSET, animated: false });
  }, []);

  // Auto scroll
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (isDragging.current) return;

      offsetRef.current += 0.5;

      // Chekkaga yetsa — o'rtaga qaytish (seamless)
      if (offsetRef.current >= CENTER_OFFSET * 2) {
        offsetRef.current = CENTER_OFFSET;
        scrollRef.current?.scrollTo({ x: CENTER_OFFSET, animated: false });
        return;
      }
      if (offsetRef.current <= 0) {
        offsetRef.current = CENTER_OFFSET;
        scrollRef.current?.scrollTo({ x: CENTER_OFFSET, animated: false });
        return;
      }

      scrollRef.current?.scrollTo({ x: offsetRef.current, animated: false });
    }, 16);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    offsetRef.current = e.nativeEvent.contentOffset.x;
  };

  return (
    <View style={s.wrapper}>
      <View style={s.header}>
        <Ionicons name="briefcase-outline" size={15} color={c.accent} />
        <Text style={[s.title, { color: c.text }]}>Bizning Jamoa</Text>
      </View>

      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={onScroll}
        onScrollBeginDrag={() => { isDragging.current = true; }}
        onScrollEndDrag={() => { isDragging.current = false; }}
        onMomentumScrollEnd={() => { isDragging.current = false; }}
        contentContainerStyle={s.list}
      >
        {REPEATED.map((teacher, index) => (
          <TeacherCard
            key={`${teacher.id}-${index}`}
            teacher={teacher}
            accent={c.accent}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  wrapper: {
    marginTop: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingHorizontal: 16,
    marginBottom: 14,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
  },
  list: {
    paddingHorizontal: 16,
    gap: CARD_GAP,
  },
  card: {
    width: CARD_WIDTH,
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
    gap: 8,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 4,
  },
  avatarImg: {
    width: 52,
    height: 52,
    borderRadius: 26,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '800',
  },
  name: {
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 18,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    justifyContent: 'center',
  },
  subject: {
    fontSize: 11,
    fontWeight: '500',
  },
  phonePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 5,
    justifyContent: 'center',
  },
  phone: {
    fontSize: 10,
    fontWeight: '600',
  },
});