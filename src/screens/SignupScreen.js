import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { colors, spacing, borderRadius, typography } from '../theme/colors';

export default function SignupScreen({ onSwitch }) {
  const { signUp } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async () => {
    if (!fullName || !email || !password) { setError('Please fill in all fields.'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    setLoading(true);
    setError('');
    const { error } = await signUp(email.trim(), password, fullName.trim());
    if (error) { setError(error.message); }
    else { setSuccess(true); }
    setLoading(false);
  };

  if (success) {
    return (
      <LinearGradient colors={[colors.primary, colors.primaryDark]} style={styles.container}>
        <View style={styles.successContainer}>
          <MaterialCommunityIcons name="check-circle-outline" size={72} color="#fff" />
          <Text style={styles.successTitle}>Check your email</Text>
          <Text style={styles.successBody}>We sent a confirmation link to {email}. Click it to activate your account.</Text>
          <TouchableOpacity onPress={onSwitch} style={styles.btn}>
            <Text style={styles.btnText}>Back to Sign In</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={[colors.primary, colors.primaryDark]} style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.kav}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <View style={styles.logoCircle}>
            <MaterialCommunityIcons name="shield-account" size={40} color={colors.primary} />
          </View>
          <Text style={styles.title}>Create account</Text>
          <Text style={styles.subtitle}>Set up your parent dashboard</Text>

          <View style={styles.form}>
            {error ? (
              <View style={styles.errorBox}>
                <MaterialCommunityIcons name="alert-circle-outline" size={16} color={colors.error} />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            <View style={styles.inputWrap}>
              <MaterialCommunityIcons name="account-outline" size={20} color="rgba(255,255,255,0.6)" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Full name"
                placeholderTextColor="rgba(255,255,255,0.4)"
                value={fullName}
                onChangeText={setFullName}
                autoCapitalize="words"
                accessibilityLabel="Full name"
              />
            </View>

            <View style={styles.inputWrap}>
              <MaterialCommunityIcons name="email-outline" size={20} color="rgba(255,255,255,0.6)" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Email address"
                placeholderTextColor="rgba(255,255,255,0.4)"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                accessibilityLabel="Email address"
              />
            </View>

            <View style={styles.inputWrap}>
              <MaterialCommunityIcons name="lock-outline" size={20} color="rgba(255,255,255,0.6)" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Password (min 6 chars)"
                placeholderTextColor="rgba(255,255,255,0.4)"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                accessibilityLabel="Password"
              />
              <TouchableOpacity onPress={() => setShowPassword(v => !v)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                <MaterialCommunityIcons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color="rgba(255,255,255,0.6)" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.btn, loading && styles.btnDisabled]}
              onPress={handleSignup}
              disabled={loading}
              accessibilityLabel="Create Account"
              accessibilityRole="button"
            >
              {loading
                ? <ActivityIndicator color={colors.primary} />
                : <Text style={styles.btnText}>Create Account</Text>}
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={onSwitch} style={styles.switchRow} accessibilityRole="button">
            <Text style={styles.switchText}>Already have an account? </Text>
            <Text style={styles.switchLink}>Sign in</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  kav: { flex: 1 },
  scroll: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: spacing.xl, paddingVertical: spacing.xxl },
  logoCircle: { width: 72, height: 72, borderRadius: 20, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', marginBottom: spacing.xl, alignSelf: 'flex-start' },
  title: { ...typography.h1, color: '#fff', marginBottom: spacing.xs },
  subtitle: { fontSize: 15, color: 'rgba(255,255,255,0.65)', marginBottom: spacing.xl },
  form: { gap: spacing.md },
  errorBox: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: colors.error + '20', padding: spacing.md, borderRadius: borderRadius.sm },
  errorText: { color: colors.error, fontSize: 13, flex: 1 },
  inputWrap: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: borderRadius.md, paddingHorizontal: spacing.md, height: 52 },
  inputIcon: { marginRight: spacing.sm },
  input: { flex: 1, color: '#fff', fontSize: 15, height: '100%' },
  btn: { backgroundColor: '#fff', paddingVertical: 16, borderRadius: borderRadius.md, alignItems: 'center', marginTop: spacing.sm },
  btnDisabled: { opacity: 0.7 },
  btnText: { color: colors.primary, fontSize: 16, fontWeight: '700' },
  switchRow: { flexDirection: 'row', justifyContent: 'center', marginTop: spacing.xl },
  switchText: { color: 'rgba(255,255,255,0.6)', fontSize: 14 },
  switchLink: { color: '#fff', fontSize: 14, fontWeight: '700' },
  successContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xl, gap: spacing.lg },
  successTitle: { ...typography.h2, color: '#fff', textAlign: 'center' },
  successBody: { fontSize: 15, color: 'rgba(255,255,255,0.7)', textAlign: 'center', lineHeight: 22 },
});
