import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Card } from '../components/Card';
import { colors, spacing, typography, borderRadius } from '../theme/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SettingRow = ({ icon, iconColor, label, value, showArrow = true }) => (
  <TouchableOpacity
    style={styles.settingRow}
    activeOpacity={0.6}
    accessibilityLabel={value ? `${label}: ${value}` : label}
    accessibilityRole="button"
    accessibilityHint={`Opens ${label} settings`}
  >
    <View style={[styles.settingIconWrap, { backgroundColor: (iconColor || colors.primary) + '15' }]}>
      <MaterialCommunityIcons name={icon} size={20} color={iconColor || colors.primary} />
    </View>
    <Text style={styles.settingLabel}>{label}</Text>
    {value && <Text style={styles.settingValue}>{value}</Text>}
    {showArrow && <MaterialCommunityIcons name="chevron-right" size={20} color={colors.textSecondary} />}
  </TouchableOpacity>
);

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <LinearGradient colors={[colors.primary, colors.primaryDark]} style={styles.profileHeader}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarLetter}>P</Text>
          </View>
          <Text style={styles.profileName}>Demo Parent</Text>
          <Text style={styles.profileEmail}>parent@demo.com</Text>
          <View style={styles.statRow} accessibilityRole="list">
            <View style={styles.statItem} accessibilityLabel="2 Children">
              <Text style={styles.statNum}>2</Text>
              <Text style={styles.statLabel}>Children</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem} accessibilityLabel="14 Days Active">
              <Text style={styles.statNum}>14</Text>
              <Text style={styles.statLabel}>Days Active</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem} accessibilityLabel="3 Rules Set">
              <Text style={styles.statNum}>3</Text>
              <Text style={styles.statLabel}>Rules Set</Text>
            </View>
          </View>
        </LinearGradient>

        <Text style={styles.sectionLabel}>ACCOUNT</Text>
        <Card style={styles.settingsCard}>
          <SettingRow icon="account-outline" label="Edit Profile" />
          <SettingRow icon="bell-outline" label="Notifications" value="On" />
          <SettingRow icon="shield-lock-outline" label="Privacy" />
        </Card>

        <Text style={styles.sectionLabel}>PREFERENCES</Text>
        <Card style={styles.settingsCard}>
          <SettingRow icon="theme-light-dark" label="Appearance" value="Light" />
          <SettingRow icon="translate" label="Language" value="English" />
          <SettingRow icon="clock-outline" label="Time Zone" value="Auto" />
        </Card>

        <Text style={styles.sectionLabel}>SUPPORT</Text>
        <Card style={styles.settingsCard}>
          <SettingRow icon="help-circle-outline" iconColor={colors.info} label="Help Center" />
          <SettingRow icon="message-text-outline" iconColor={colors.success} label="Contact Support" />
          <SettingRow icon="star-outline" iconColor={colors.accent1} label="Rate the App" />
        </Card>

        <Card style={[styles.settingsCard, { marginTop: spacing.lg }]}>
          <SettingRow icon="logout" iconColor={colors.error} label="Log Out" showArrow={false} />
        </Card>

        <View style={styles.appInfo}>
          <Text style={styles.appVersion}>Parental Control v1.0.0</Text>
          <Text style={styles.appMeta}>Built with React Native + Expo</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scrollContent: { paddingBottom: spacing.xxl * 2 },
  profileHeader: { marginHorizontal: spacing.lg, marginTop: spacing.md, borderRadius: borderRadius.lg, padding: spacing.xl, alignItems: 'center' },
  avatarCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center', marginBottom: spacing.md },
  avatarLetter: { color: '#fff', fontSize: 36, fontWeight: '700' },
  profileName: { ...typography.h2, color: '#fff', marginBottom: 4 },
  profileEmail: { color: 'rgba(255,255,255,0.7)', fontSize: 14, marginBottom: spacing.lg },
  statRow: { flexDirection: 'row', alignItems: 'center' },
  statItem: { alignItems: 'center', paddingHorizontal: spacing.lg },
  statNum: { color: '#fff', fontSize: 22, fontWeight: '700' },
  statLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 2 },
  statDivider: { width: 1, height: 30, backgroundColor: 'rgba(255,255,255,0.2)' },
  sectionLabel: { ...typography.label, color: colors.textSecondary, marginTop: spacing.xl, marginBottom: spacing.sm, paddingHorizontal: spacing.lg, letterSpacing: 1 },
  settingsCard: { marginHorizontal: spacing.lg, paddingVertical: spacing.xs },
  settingRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: spacing.xs, minHeight: 52 },
  settingIconWrap: { width: 44, height: 44, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginRight: spacing.md },
  settingLabel: { flex: 1, fontSize: 15, fontWeight: '500', color: colors.textPrimary },
  settingValue: { fontSize: 14, color: colors.textSecondary, marginRight: spacing.sm },
  appInfo: { alignItems: 'center', paddingVertical: spacing.xl },
  appVersion: { fontSize: 14, fontWeight: '600', color: colors.textSecondary },
  appMeta: { fontSize: 12, color: colors.textSecondary + '99', marginTop: 2 },
});
