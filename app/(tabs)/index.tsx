import { HomeHeader } from '@/feature/home/components/home-header';
import { HomeStats } from '@/feature/home/components/home-stats';
import { HomeTeam } from '@/feature/home/components/home-team';
import { useThemeColors } from '@/hooks/use-theme-color';
import { ScrollView, View } from 'react-native';

export default function HomeScreen() {
  const c = useThemeColors();

  return (
    <View style={{ flex: 1, backgroundColor: c.bg }}>
      <HomeHeader />
      <ScrollView showsVerticalScrollIndicator={false}>
        <HomeStats />
        <HomeTeam />
      </ScrollView>
    </View>
  );
}