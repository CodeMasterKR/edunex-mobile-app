import { HomeHeader } from '@/feature/home/components/home-header';
import { useThemeColors } from '@/hooks/use-theme-color';
import { View } from 'react-native';

export default function HomeScreen() {
  const c = useThemeColors();

  return (
    <View style={{ flex: 1, backgroundColor: c.bg }}>
      <HomeHeader />
    </View>
  );
}