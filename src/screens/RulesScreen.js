import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card } from '../components/Card';
import { colors, spacing, typography, borderRadius } from '../theme/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { demoChildren } from '../services/demoData';

const RuleCard = ({ icon, iconColor, label, value, enabled: initialEnabled }) => {
  const [enabled, setEnabled] = useState(initialEnabled);
  return (
    <Card style={styles.ruleCard}>
      <View style={styles.ruleRow}>
        <View style={[styles.ruleIconWrap, { backgroundColor: iconColor + '18' }]}>
          <MaterialCommunityIcons name={icon} size={22} color={iconColor} />
        </View>
        <View style={styles.ruleInfo}>
          <Text style={styles.ruleLabel}>{label}</Text>
          <Text style={styles.ruleValue}>{value}</Text>
        </View>
        <Switch
          value={!!enabled}
          onValueChange={setEnabled}
          trackColor={{ false: '#E0E0E0', true: colors.primary + '60' }}
          thumbColor={enabled ? colors.primary : '#f4f3f4'}
          accessibilityLabel={`Toggle ${label}`}
          accessibilityHint={`Double tap to ${enabled ? 'disable' : 'enable'} this rule`}
        />
      </View>
    </Card>
  );
};

const PresetButton = ({ icon, label, color }) => (
  <TouchableOpacity
    style={styles.presetButton}
    accessibilityLabel={`Apply ${label} preset`}
    accessibilityRole="button"
  >
    <View style={[styles.presetIconWrap, { backgroundColor: color + '18' }]}>
      <MaterialCommunityIcons name={icon} size={24} color={color} />
    </View>
    <Text style={styles.presetLabel}>{label}</Text>
  </TouchableOpacity>
);

export default function RulesScreen() {
  const [selectedChild, setSelectedChild] = useState(0);
  const insets = useSafeAreaInsets();
  const child = demoChildren[selectedChild] || demoChildren[0];

  if (!child || !child.rules || child.rules.length === 0) return null;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.headerSection}>
        <Text style={styles.screenTitle} accessibilityRole="header">Rules</Text>
        <Text style={styles.screenSubtitle}>Set limits and manage screen time</Text>
      </View>

      <View style={styles.selectorRow} accessibilityRole="tablist">
        {demoChildren.map((c, i) => (
          <TouchableOpacity
            key={c.id}
            style={[styles.selectorPill, selectedChild === i && styles.selectorPillActive]}
            onPress={() => setSelectedChild(i)}
            accessibilityLabel={`Select ${c.name.split(' ')[0]}`}
            accessibilityRole="tab"
            accessibilityState={{ selected: !!(selectedChild === i) }}
          >
            <Text style={styles.selectorAvatar}>{c.avatar}</Text>
            <Text style={[styles.selectorName, selectedChild === i && styles.selectorNameActive]}>{c.name.split(' ')[0]}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionLabel}>TIME LIMITS</Text>
        <RuleCard icon="clock-outline" iconColor={colors.primary} label="Daily Screen Time" value={child.rules[0].value} enabled={child.rules[0].enabled} />
        <RuleCard icon="weather-night" iconColor="#6C63FF" label="Bedtime Schedule" value={child.rules[1].value} enabled={child.rules[1].enabled} />

        <Text style={styles.sectionLabel}>APP CONTROL</Text>
        <RuleCard icon="cancel" iconColor={colors.error} label={child.rules[2].label} value={child.rules[2].value} enabled={child.rules[2].enabled} />

        <Text style={styles.sectionLabel}>CONTENT SAFETY</Text>
        <RuleCard icon="shield-check" iconColor={colors.success} label="Safe Search" value="Enabled for all browsers" enabled={true} />
        <RuleCard icon="download-off" iconColor={colors.warning} label="App Installs" value="Require parent approval" enabled={true} />

        <Text style={styles.sectionLabel}>QUICK PRESETS</Text>
        <View style={styles.presetsRow}>
          <PresetButton icon="book-open-variant" label="Study Time" color={colors.info} />
          <PresetButton icon="moon-waning-crescent" label="Sleep Mode" color="#6C63FF" />
          <PresetButton icon="gamepad-variant" label="Free Time" color={colors.success} />
        </View>

        <View style={{ height: spacing.xxl * 2 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  headerSection: { paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: spacing.sm },
  screenTitle: { ...typography.h1, color: colors.textPrimary },
  screenSubtitle: { ...typography.bodySmall, color: colors.textSecondary, marginTop: 4 },
  selectorRow: { flexDirection: 'row', paddingHorizontal: spacing.lg, gap: spacing.sm, marginBottom: spacing.md },
  selectorPill: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.card, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 24, gap: 8, borderWidth: 2, borderColor: 'transparent' },
  selectorPillActive: { borderColor: colors.primary, backgroundColor: colors.primary + '08' },
  selectorAvatar: { fontSize: 20 },
  selectorName: { fontSize: 14, fontWeight: '600', color: colors.textSecondary },
  selectorNameActive: { color: colors.primary },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: spacing.lg },
  sectionLabel: { ...typography.label, color: colors.textSecondary, marginTop: spacing.lg, marginBottom: spacing.md, letterSpacing: 1 },
  ruleCard: { marginBottom: spacing.sm },
  ruleRow: { flexDirection: 'row', alignItems: 'center' },
  ruleIconWrap: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: spacing.md },
  ruleInfo: { flex: 1 },
  ruleLabel: { fontSize: 15, fontWeight: '600', color: colors.textPrimary, marginBottom: 2 },
  ruleValue: { fontSize: 13, color: colors.textSecondary },
  presetsRow: { flexDirection: 'row', gap: spacing.md },
  presetButton: { flex: 1, alignItems: 'center' },
  presetIconWrap: { width: 56, height: 56, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.sm },
  presetLabel: { fontSize: 12, fontWeight: '600', color: colors.textSecondary },
});
