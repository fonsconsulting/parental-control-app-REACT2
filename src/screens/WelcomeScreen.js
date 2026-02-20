import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, borderRadius } from '../theme/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function WelcomeScreen({ onGetStarted }) {
  return (
    <LinearGradient colors={[colors.primary, colors.primaryDark]} style={styles.container}>
      <View style={[styles.circle, styles.circle1]} />
      <View style={[styles.circle, styles.circle2]} />
      <View style={[styles.circle, styles.circle3]} />

      <View style={styles.content}>
        <View style={styles.logoCircle} accessibilityLabel="Parental Control logo">
          <MaterialCommunityIcons name="shield-account" size={48} color={colors.primary} />
        </View>

        <Text style={styles.title} accessibilityRole="header">Parental{'\n'}Control</Text>
        <Text style={styles.subtitle}>Keep your children safe online.{'\n'}Monitor screen time, set rules, stay informed.</Text>

        <View style={styles.pillRow} accessibilityRole="list">
          <FeaturePill icon="clock-outline" label="Screen Time" />
          <FeaturePill icon="shield-check-outline" label="Safe Rules" />
          <FeaturePill icon="bell-outline" label="Alerts" />
        </View>
      </View>

      <View style={styles.ctaSection}>
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={onGetStarted}
          activeOpacity={0.85}
          accessibilityLabel="Get Started"
          accessibilityRole="button"
          accessibilityHint="Opens the main dashboard"
        >
          <Text style={styles.primaryBtnText}>Get Started</Text>
          <MaterialCommunityIcons name="arrow-right" size={20} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.footerText}>v1.0  ·  No account needed for demo</Text>
      </View>
    </LinearGradient>
  );
}

const FeaturePill = ({ icon, label }) => (
  <View style={styles.pill} accessibilityLabel={label} accessibilityRole="text">
    <MaterialCommunityIcons name={icon} size={16} color="rgba(255,255,255,0.9)" />
    <Text style={styles.pillText}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'space-between' },
  circle: { position: 'absolute', borderRadius: 999, backgroundColor: 'rgba(255,255,255,0.04)' },
  circle1: { width: 300, height: 300, top: -80, right: -60 },
  circle2: { width: 200, height: 200, top: SCREEN_HEIGHT * 0.3, left: -80 },
  circle3: { width: 150, height: 150, bottom: 100, right: -40 },
  content: { flex: 1, justifyContent: 'center', paddingHorizontal: spacing.xl },
  logoCircle: { width: 88, height: 88, borderRadius: 24, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', marginBottom: spacing.xl },
  title: { fontSize: 42, fontWeight: '800', color: '#fff', lineHeight: 48, marginBottom: spacing.md },
  subtitle: { fontSize: 16, color: 'rgba(255,255,255,0.7)', lineHeight: 24, marginBottom: spacing.xl },
  pillRow: { flexDirection: 'row', gap: spacing.sm },
  pill: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(255,255,255,0.12)', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20 },
  pillText: { color: 'rgba(255,255,255,0.9)', fontSize: 13, fontWeight: '500' },
  ctaSection: { paddingHorizontal: spacing.xl, paddingBottom: spacing.xxl },
  primaryBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', paddingVertical: 18, borderRadius: borderRadius.md, gap: 8 },
  primaryBtnText: { color: colors.primary, fontSize: 17, fontWeight: '700' },
  footerText: { color: 'rgba(255,255,255,0.45)', fontSize: 12, textAlign: 'center', marginTop: spacing.md },
});
