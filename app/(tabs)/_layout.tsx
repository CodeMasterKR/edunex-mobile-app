import { Tabs } from 'expo-router';
import { View, StyleSheet, Platform } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemeColors } from '@/hooks/use-theme-color';

type IoniconsName = React.ComponentProps<typeof Ionicons>['name'];

function TabIcon({ name, focused }: { name: IoniconsName; focused: boolean }) {
  const c = useThemeColors();
  return (
    <View style={[styles.iconWrap, { backgroundColor: focused ? c.accent : 'transparent' }]}>
      <Ionicons name={name} size={22} color={focused ? '#FFFFFF' : c.muted} />
    </View>
  );
}

export default function TabLayout() {
  const c = useThemeColors();
  const insets = useSafeAreaInsets();

  const tabs = [
    { name: 'index',    title: 'Bosh sahifa', icon: 'home' as IoniconsName,     iconOutline: 'home-outline' as IoniconsName },
    { name: 'groups',   title: 'Guruhlar',    icon: 'people' as IoniconsName,   iconOutline: 'people-outline' as IoniconsName },
    { name: 'payments', title: "To'lovlar",   icon: 'card' as IoniconsName,     iconOutline: 'card-outline' as IoniconsName },
    { name: 'settings', title: 'Sozlama',     icon: 'settings' as IoniconsName, iconOutline: 'settings-outline' as IoniconsName },
  ];

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: c.accent,
        tabBarInactiveTintColor: c.muted,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
          marginTop: 4,
        },
        tabBarStyle: {
          backgroundColor: c.card,
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: c.border,
          height: 56 + insets.bottom,
          paddingBottom: insets.bottom || 8,
          paddingTop: 8,
          ...Platform.select({
            ios: {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: -2 },
              shadowOpacity: 0.06,
              shadowRadius: 8,
            },
            android: { elevation: 8 },
          }),
        },
        tabBarItemStyle: {
          alignItems: 'center',
          justifyContent: 'center',
        },
      }}
    >
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ focused }) => (
              <TabIcon
                name={focused ? tab.icon : tab.iconOutline}
                focused={focused}
              />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconWrap: {
    width: 40,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});