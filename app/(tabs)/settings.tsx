import { ProfileScreen } from "@/feature/settings/components/settings";
import { View } from "react-native";

export default function SettingsScreen() {
  return (
    <View style={{ flex: 1 }}>
      <ProfileScreen
        user={{
          name: "Abdulla Abdusalom",
          role: "O'qituvchi",
          subject: "Dasturlash",
          experience: "3 yil",
          phone: "+998993261107",
          birthDate: "2007-11-11",
          address: "Toshkent",
        }}
        onLogout={() => {
          // logout logic
        }}
      />
    </View>
  );
}