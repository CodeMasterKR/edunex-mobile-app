// app/(auth)/login.tsx
import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useThemeColors } from '@/hooks/use-theme-color';
import { StatusBar } from 'expo-status-bar';

// ✅ Matnlar alohida konstantada (i18n uchun tayyor)
const TEXT = {
  brandName: 'EDUNEX',
  cardTitle: 'Kirish',
  cardSub: "Davom etish uchun ma'lumotlaringizni kiriting",
  phonePlaceholder: '+998 90 123 45 67',
  phoneLabel: 'Telefon raqam',
  passwordLabel: 'Parol',
  passwordPlaceholder: '••••••••',
  forgotPassword: 'Parolni unutdingizmi?',
  loginBtn: 'Kirish',
};

function validatePhone(phone: string): string | null {
  const cleaned = phone.replace(/\s/g, '');
  if (!cleaned) return "Telefon raqam kiritilmagan";
  if (!/^\+998\d{9}$/.test(cleaned)) return "Noto'g'ri format. Misol: +998901234567";
  return null;
}

function validatePassword(password: string): string | null {
  if (!password) return "Parol kiritilmagan";
  if (password.length < 6) return "Parol kamida 6 ta belgidan iborat bo'lishi kerak";
  return null;
}

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '');
  if (!digits) return '';
  if (!digits.startsWith('998')) {
    const trimmed = digits.slice(0, 12);
    let result = '+998';
    if (trimmed.length > 3) result += ' ' + trimmed.slice(3, 5);
    if (trimmed.length > 5) result += ' ' + trimmed.slice(5, 8);
    if (trimmed.length > 8) result += ' ' + trimmed.slice(8, 10);
    if (trimmed.length > 10) result += ' ' + trimmed.slice(10, 12);
    return result;
  }
  return '+' + digits.slice(0, 12);
}

export default function LoginScreen() {
  const c = useThemeColors();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState<'phone' | 'password' | null>(null);
  const [loading, setLoading] = useState(false); 

  const [errors, setErrors] = useState<{ phone?: string; password?: string }>({});

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhone(value);
    setPhone(formatted);
    if (errors.phone) setErrors(prev => ({ ...prev, phone: undefined }));
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (errors.password) setErrors(prev => ({ ...prev, password: undefined }));
  };

  const handleLogin = async () => {
    const phoneError = validatePhone(phone);
    const passwordError = validatePassword(password);

    if (phoneError || passwordError) {
      setErrors({ phone: phoneError ?? undefined, password: passwordError ?? undefined });
      return;
    }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); 
    } catch (error: any) {
      Alert.alert(
        'Xatolik',
        error?.message ?? "Kirish amalga oshmadi. Qayta urinib ko'ring.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    Alert.alert('Ogohlantirish!', 'Parolni tiklash uchun administratsiyaga murojaat qiling!');
  };

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: c.bg }]}>
      <StatusBar style="auto" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Logo / Brand */}
          <View style={styles.brandWrap}>
            <View style={[styles.logoCircle, { backgroundColor: c.accent + '20', borderColor: c.accent + '40' }]}>
              <Ionicons name="school-outline" size={36} color={c.accent} />
            </View>
            <Text style={[styles.brandName, { color: c.text }]}>{TEXT.brandName}</Text>
          </View>

          {/* Card */}
          <View style={[styles.card, { backgroundColor: c.card, borderColor: c.border }]}>
            <Text style={[styles.cardTitle, { color: c.text }]}>{TEXT.cardTitle}</Text>
            <Text style={[styles.cardSub, { color: c.muted }]}>{TEXT.cardSub}</Text>

            {/* Phone input */}
            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: c.muted }]}>{TEXT.phoneLabel}</Text>
              <View
                style={[
                  styles.inputWrap,
                  {
                    backgroundColor: c.bg,
                    borderColor: errors.phone
                      ? '#ef4444'
                      : focusedInput === 'phone'
                      ? c.accent
                      : c.border,
                  },
                ]}
              >
                <Ionicons
                  name="call-outline"
                  size={18}
                  color={errors.phone ? '#ef4444' : focusedInput === 'phone' ? c.accent : c.muted}
                />
                <TextInput
                  style={[styles.input, { color: c.text }]}
                  placeholder={TEXT.phonePlaceholder}
                  placeholderTextColor={c.muted}
                  keyboardType="phone-pad"
                  value={phone}
                  onChangeText={handlePhoneChange}
                  onFocus={() => setFocusedInput('phone')}
                  onBlur={() => setFocusedInput(null)}
                  // ✅ Accessibility
                  accessibilityLabel="Telefon raqam maydoni"
                  accessibilityHint="Telefon raqamingizni kiriting"
                  editable={!loading}
                />
              </View>
              {/* ✅ Error message */}
              {errors.phone && (
                <Text style={styles.errorText}>{errors.phone}</Text>
              )}
            </View>

            {/* Password input */}
            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: c.muted }]}>{TEXT.passwordLabel}</Text>
              <View
                style={[
                  styles.inputWrap,
                  {
                    backgroundColor: c.bg,
                    borderColor: errors.password
                      ? '#ef4444'
                      : focusedInput === 'password'
                      ? c.accent
                      : c.border,
                  },
                ]}
              >
                <Ionicons
                  name="lock-closed-outline"
                  size={18}
                  color={errors.password ? '#ef4444' : focusedInput === 'password' ? c.accent : c.muted}
                />
                <TextInput
                  style={[styles.input, { color: c.text }]}
                  placeholder={TEXT.passwordPlaceholder}
                  placeholderTextColor={c.muted}
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={handlePasswordChange}
                  onFocus={() => setFocusedInput('password')}
                  onBlur={() => setFocusedInput(null)}
                  accessibilityLabel="Parol maydoni"
                  accessibilityHint="Parolingizni kiriting"
                  editable={!loading}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(p => !p)}
                  accessibilityLabel={showPassword ? 'Parolni yashirish' : 'Parolni ko\'rsatish'}
                >
                  <Ionicons
                    name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                    size={18}
                    color={c.muted}
                  />
                </TouchableOpacity>
              </View>
              {errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
            </View>

            {/* Forgot password */}
            <TouchableOpacity
              style={styles.forgot}
              activeOpacity={0.7}
              onPress={handleForgotPassword} // ✅ Handler bog'landi
              accessibilityLabel="Parolni unutdim"
            >
              <Text style={[styles.forgotText, { color: c.accent }]}>
                {TEXT.forgotPassword}
              </Text>
            </TouchableOpacity>

            {/* Login button */}
            <TouchableOpacity
              style={[styles.btn, { backgroundColor: c.accent, opacity: loading ? 0.7 : 1 }]}
              activeOpacity={0.85}
              onPress={handleLogin}
              disabled={loading} // ✅ Loading paytida disabled
              accessibilityLabel="Kirish tugmasi"
              accessibilityRole="button"
            >
              {loading ? (
                <ActivityIndicator color="#fff" size="small" /> // ✅ Spinner
              ) : (
                <>
                  <Text style={styles.btnText}>{TEXT.loginBtn}</Text>
                  <Ionicons name="arrow-forward" size={18} color="#fff" />
                </>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({ // ✅ 's' o'rniga 'styles'
  root: { flex: 1 },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 32,
    justifyContent: 'center',
  },

  brandWrap: {
    alignItems: 'center',
    marginBottom: 32,
    rowGap: 8, 
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 24,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  brandName: {
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  brandSub: {
    fontSize: 13,
    fontWeight: '500',
  },

  card: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 24,
    rowGap: 16,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  cardSub: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 18,
    marginTop: -8,
  },

  inputGroup: { rowGap: 7 },
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 13,
    columnGap: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
  },

  // ✅ Yangi: error text style
  errorText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#ef4444',
    marginTop: 2,
  },

  forgot: {
    alignSelf: 'flex-end',
    marginTop: -4,
  },
  forgotText: {
    fontSize: 12,
    fontWeight: '600',
  },

  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 8,
    paddingVertical: 15,
    borderRadius: 12,
    marginTop: 4,
    minHeight: 52, // ✅ Spinner paytida balandlik o'zgarmaydi
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.2,
  },

  footer: {
    textAlign: 'center',
    fontSize: 11,
    marginTop: 32,
  },
});