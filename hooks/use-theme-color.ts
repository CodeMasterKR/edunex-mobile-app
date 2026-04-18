import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/colors';

export function useThemeColors() {
  const scheme = useColorScheme();
  return {
    ...Colors[scheme ?? 'light'],
    accent: Colors.accent,
  };
}