import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Card } from '../components/Card';
import { colors, spacing, typography, borderRadius } from '../theme/colors';
import { formatMinutes, getUsagePercentage, getStatusColor, getStatusLabel } from '../services/demoData';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const BAR_MAX_HEIGHT = 120;

export default function ChildDetailScreen({ route, navigation }) {
  const child = route?.params?.child;
  const insets = useSafeAreaInsets();

  const usagePercent = useMemo(() => child ? getUsagePercentage(child.todayUsage, child.dailyLimit) : 0, [child]);
  const maxWeekly = useMemo(() => child ? Math.max(...child.weeklyUsage.map(d => d.minutes)) : 1, [child]);
  const statusColor = child ? getStatusColor(child.status, colors) : colors.textSecondary;

  const todayIndex = useMemo(() => {
    const jsDay = new Date().getDay();
    return jsDay === 0 ? 6 : jsDay - 1;
  }, []);

  if (!child) {
    return (
      <View style={styles.errorContainer} accessibilityRole="alert">
        <Text style={styles.errorText}>Child data not available.</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} accessibilityLabel="Go back" accessibilityRole="button">
          <Text style={styles.errorLink}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient colors={[colors.primary, colors.primaryDark]} style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }} accessibilityLabel="Go back" accessibilityRole="button">
            <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{child.name}</Text>
          <TouchableOpacity hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }} accessibilityLabel="Settings" accessibilityRole="button">
            <MaterialCommunityIcons name="cog-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.profileSection}>
          <Text style={styles.bigAvatar}>{child.avatar}</Text>
          <Text style={styles.profileName}>{child.name}</Text>
          <Text style={styles.profileMeta}>{child.deviceName}  ·  {child.lastSeen}</Text>
          <View style={[styles.statusPill, { backgroundColor: statusColor + '30' }]}>
            <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
            <Text style={[styles.statusPillText, { color: statusColor }]}>{getStatusLabel(child.status)}</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Card style={styles.usageCard}>
          <Text style={styles.cardLabel}>TODAY'S SCREEN TIME</Text>
          <View style={styles.usageRow}>
            <Text style={styles.bigStat} accessibilityLabel={`${formatMinutes(child.todayUsage)} used`}>{formatMinutes(child.todayUsage)}</Text>
            <Text style={styles.limitText}>of {formatMinutes(child.dailyLimit)} limit</Text>
          </View>
          <View style={styles.progressBg}>
            <LinearGradient
              colors={usagePercent > 80 ? [colors.warning, colors.error] : [colors.primary, colors.primaryLight]}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              style={[styles.progressFill, { width: `${usagePercent}%` }]}
            />
          </View>
          <Text style={styles.percentLabel}>{Math.round(usagePercent)}% used</Text>
        </Card>

        <Card style={styles.chartCard}>
          <Text style={styles.cardLabel}>THIS WEEK</Text>
          <View style={styles.barChart}>
            {child.weeklyUsage.map((day, i) => {
              const barH = maxWeekly > 0 ? (day.minutes / maxWeekly) * BAR_MAX_HEIGHT : 0;
              const isToday = i === todayIndex;
              return (
                <View key={day.day} style={styles.barColumn} accessibilityLabel={`${day.day}: ${formatMinutes(day.minutes)}`}>
                  <Text style={styles.barValue}>{formatMinutes(day.minutes)}</Text>
                  <View style={[styles.barTrack, { height: BAR_MAX_HEIGHT }]}>
                    <LinearGradient
                      colors={isToday ? [colors.primary, colors.primaryLight] : [colors.primary + '60', colors.primary + '30']}
                      style={[styles.bar, { height: barH }]}
                    />
                  </View>
                  <Text style={[styles.barLabel, isToday && styles.barLabelToday]}>{day.day}</Text>
                </View>
              );
            })}
          </View>
        </Card>

        <Card style={styles.appsCard}>
          <Text style={styles.cardLabel}>TOP APPS TODAY</Text>
          {child.topApps.map((app) => {
            const appPercent = child.todayUsage > 0 ? (app.usage / child.todayUsage) * 100 : 0;
            return (
              <View key={app.name} style={styles.appRow} accessibilityLabel={`${app.name}: ${app.usage} minutes`}>
                <Text style={styles.appIcon}>{app.icon}</Text>
                <View style={styles.appInfo}>
                  <View style={styles.appNameRow}>
                    <Text style={styles.appName}>{app.name}</Text>
                    <Text style={styles.appTime}>{app.usage}m</Text>
                  </View>
                  <View style={styles.appBarBg}>
                    <View style={[styles.appBarFill, { width: `${appPercent}%` }]} />
                  </View>
                </View>
              </View>
            );
          })}
        </Card>

        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.actionButton} accessibilityLabel="Lock device now" accessibilityRole="button" accessibilityHint="Immediately locks the child's device">
            <LinearGradient colors={[colors.error, '#D32F2F']} style={styles.actionGradient}>
              <MaterialCommunityIcons name="lock" size={22} color="#fff" />
              <Text style={styles.actionText}>Lock Now</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} accessibilityLabel="Add 30 minutes" accessibilityRole="button" accessibilityHint="Extends the daily limit by 30 minutes">
            <LinearGradient colors={[colors.success, '#388E3C']} style={styles.actionGradient}>
              <MaterialCommunityIcons name="clock-plus-outline" size={22} color="#fff" />
              <Text style={styles.actionText}>+30 min</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={{ height: spacing.xl }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  errorContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xl },
  errorText: { ...typography.body, color: colors.textSecondary, marginBottom: spacing.md },
  errorLink: { color: colors.primary, fontSize: 16, fontWeight: '600' },
  header: { paddingBottom: spacing.lg, paddingHorizontal: spacing.lg },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.lg },
  headerTitle: { color: '#fff', fontSize: 17, fontWeight: '600' },
  profileSection: { alignItems: 'center' },
  bigAvatar: { fontSize: 64, marginBottom: spacing.sm },
  profileName: { ...typography.h2, color: '#fff', marginBottom: 4 },
  profileMeta: { color: 'rgba(255,255,255,0.7)', fontSize: 14, marginBottom: spacing.md },
  statusPill: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20 },
  statusDot: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
  statusPillText: { fontSize: 13, fontWeight: '600' },
  scroll: { flex: 1 },
  scrollContent: { padding: spacing.lg },
  usageCard: { marginBottom: spacing.md },
  cardLabel: { ...typography.label, color: colors.textSecondary, textTransform: 'uppercase', marginBottom: spacing.md, letterSpacing: 1 },
  usageRow: { flexDirection: 'row', alignItems: 'baseline', marginBottom: spacing.md },
  bigStat: { ...typography.stat, color: colors.primary, marginRight: spacing.sm },
  limitText: { ...typography.bodySmall, color: colors.textSecondary },
  progressBg: { height: 10, backgroundColor: colors.primary + '15', borderRadius: 10, overflow: 'hidden', marginBottom: spacing.xs },
  progressFill: { height: '100%', borderRadius: 10 },
  percentLabel: { ...typography.label, color: colors.textSecondary, textAlign: 'right' },
  chartCard: { marginBottom: spacing.md },
  barChart: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: spacing.sm },
  barColumn: { alignItems: 'center', flex: 1 },
  barValue: { fontSize: 10, color: colors.textSecondary, marginBottom: 4 },
  barTrack: { width: 24, justifyContent: 'flex-end', borderRadius: 12, overflow: 'hidden', backgroundColor: colors.primary + '08' },
  bar: { width: '100%', borderRadius: 12 },
  barLabel: { fontSize: 12, color: colors.textSecondary, marginTop: 6, fontWeight: '500' },
  barLabelToday: { color: colors.primary, fontWeight: '700' },
  appsCard: { marginBottom: spacing.lg },
  appRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  appIcon: { fontSize: 28, marginRight: spacing.md },
  appInfo: { flex: 1 },
  appNameRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  appName: { fontSize: 15, fontWeight: '500', color: colors.textPrimary },
  appTime: { fontSize: 14, fontWeight: '600', color: colors.textSecondary },
  appBarBg: { height: 6, backgroundColor: colors.primary + '12', borderRadius: 3, overflow: 'hidden' },
  appBarFill: { height: '100%', backgroundColor: colors.primary, borderRadius: 3 },
  actionsRow: { flexDirection: 'row', gap: spacing.md },
  actionButton: { flex: 1 },
  actionGradient: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 14, borderRadius: borderRadius.md, gap: 8 },
  actionText: { color: '#fff', fontWeight: '600', fontSize: 15 },
});
