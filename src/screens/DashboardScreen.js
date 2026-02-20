import React, { useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Card } from '../components/Card';
import { colors, spacing, typography, borderRadius } from '../theme/colors';
import { demoChildren, formatMinutes, getUsagePercentage, getStatusColor, getStatusLabel, getUnreadCount } from '../services/demoData';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function DashboardScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  const stats = useMemo(() => ({
    totalUsage: demoChildren.reduce((s, c) => s + c.todayUsage, 0),
    onTrack: demoChildren.filter(c => c.status === 'ok').length,
    needsAttention: demoChildren.filter(c => c.status !== 'ok').length,
    unreadCount: getUnreadCount(),
  }), []);

  const renderChildCard = useCallback(({ item: child }) => {
    const usagePercent = getUsagePercentage(child.todayUsage, child.dailyLimit);
    const statusColor = getStatusColor(child.status, colors);
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.navigate('ChildDetail', { child })}
        accessibilityLabel={`${child.name}, ${getStatusLabel(child.status)}, ${formatMinutes(child.todayUsage)} used today`}
        accessibilityRole="button"
        accessibilityHint="Opens detailed screen time view"
      >
        <Card style={styles.childCard}>
          <View style={styles.cardHeader}>
            <View style={styles.childInfo}>
              <Text style={styles.avatar}>{child.avatar}</Text>
              <View style={styles.nameContainer}>
                <Text style={styles.childName}>{child.name}</Text>
                <Text style={styles.childMeta}>{child.age}y  ·  {child.platform}  ·  {child.lastSeen}</Text>
              </View>
            </View>
            <View style={[styles.statusPill, { backgroundColor: statusColor + '18' }]}>
              <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
              <Text style={[styles.statusText, { color: statusColor }]}>{getStatusLabel(child.status)}</Text>
            </View>
          </View>
          <View style={styles.usageSection}>
            <View style={styles.usageHeader}>
              <Text style={styles.usageLabel}>Today</Text>
              <Text style={styles.usageValue}>{formatMinutes(child.todayUsage)} / {formatMinutes(child.dailyLimit)}</Text>
            </View>
            <View style={styles.progressBg}>
              <LinearGradient
                colors={usagePercent > 80 ? [colors.warning, colors.error] : [colors.primary, colors.primaryLight]}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                style={[styles.progressFill, { width: `${usagePercent}%` }]}
              />
            </View>
          </View>
          <View style={styles.topAppsRow}>
            {child.topApps.slice(0, 3).map((app) => (
              <View key={app.name} style={styles.miniApp}>
                <Text style={styles.miniAppIcon}>{app.icon}</Text>
                <Text style={styles.miniAppName}>{app.name}</Text>
                <Text style={styles.miniAppTime}>{app.usage}m</Text>
              </View>
            ))}
          </View>
        </Card>
      </TouchableOpacity>
    );
  }, [navigation]);

  const keyExtractor = useCallback((item) => item.id, []);

  const ListHeader = () => (
    <Text style={styles.sectionTitle}>Your Children</Text>
  );

  const ListFooter = () => (
    <TouchableOpacity
      style={styles.addChildButton}
      accessibilityLabel="Add Child"
      accessibilityRole="button"
    >
      <MaterialCommunityIcons name="plus-circle-outline" size={24} color={colors.primary} />
      <Text style={styles.addChildText}>Add Child</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <LinearGradient colors={[colors.primary, colors.primaryDark]} style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting} accessibilityRole="header">Good {getTimeOfDay()} 👋</Text>
            <Text style={styles.headerSubtext}>Here's today's overview</Text>
          </View>
          <TouchableOpacity
            style={styles.notifBtn}
            onPress={() => navigation.navigate('Alerts')}
            accessibilityLabel={`Notifications, ${stats.unreadCount} unread`}
            accessibilityRole="button"
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <MaterialCommunityIcons name="bell-outline" size={24} color="#fff" />
            {stats.unreadCount > 0 && (
              <View style={styles.badge}><Text style={styles.badgeText}>{stats.unreadCount}</Text></View>
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.quickStats}>
          <QuickStat icon="clock-outline" value={formatMinutes(stats.totalUsage)} label="Total Today" />
          <QuickStat icon="check-circle-outline" value={`${stats.onTrack}`} label="On Track" color={colors.secondary} />
          <QuickStat icon="alert-outline" value={`${stats.needsAttention}`} label="Attention" color={colors.accent2} />
        </View>
      </LinearGradient>

      <FlatList
        data={demoChildren}
        renderItem={renderChildCard}
        keyExtractor={keyExtractor}
        ListHeaderComponent={ListHeader}
        ListFooterComponent={ListFooter}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

function getTimeOfDay() {
  const h = new Date().getHours();
  if (h < 12) return 'morning';
  if (h < 17) return 'afternoon';
  return 'evening';
}

const QuickStat = ({ icon, value, label, color }) => (
  <View style={styles.qsItem} accessibilityLabel={`${label}: ${value}`}>
    <MaterialCommunityIcons name={icon} size={18} color={color || 'rgba(255,255,255,0.8)'} />
    <Text style={styles.qsValue}>{value}</Text>
    <Text style={styles.qsLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { paddingBottom: spacing.lg, paddingHorizontal: spacing.lg },
  headerContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.lg },
  greeting: { ...typography.h2, color: '#fff' },
  headerSubtext: { color: 'rgba(255,255,255,0.7)', fontSize: 14, marginTop: 4 },
  notifBtn: { position: 'relative', padding: 4 },
  badge: { position: 'absolute', top: 0, right: 0, backgroundColor: colors.accent2, borderRadius: 10, width: 18, height: 18, alignItems: 'center', justifyContent: 'center' },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: '700' },
  quickStats: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: borderRadius.md, paddingVertical: spacing.md },
  qsItem: { alignItems: 'center', gap: 4 },
  qsValue: { color: '#fff', fontSize: 20, fontWeight: '700' },
  qsLabel: { color: 'rgba(255,255,255,0.65)', fontSize: 11, fontWeight: '500' },
  listContent: { padding: spacing.lg },
  sectionTitle: { ...typography.h3, marginBottom: spacing.md, color: colors.textPrimary },
  childCard: { marginBottom: spacing.md },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: spacing.md },
  childInfo: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  avatar: { fontSize: 38, marginRight: spacing.md },
  nameContainer: { flex: 1 },
  childName: { fontSize: 17, fontWeight: '600', color: colors.textPrimary },
  childMeta: { fontSize: 13, color: colors.textSecondary, marginTop: 2 },
  statusPill: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 14, gap: 5 },
  statusDot: { width: 7, height: 7, borderRadius: 4 },
  statusText: { fontSize: 12, fontWeight: '600' },
  usageSection: { marginBottom: spacing.md },
  usageHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  usageLabel: { fontSize: 13, color: colors.textSecondary },
  usageValue: { fontSize: 13, color: colors.textPrimary, fontWeight: '600' },
  progressBg: { height: 8, backgroundColor: colors.primary + '12', borderRadius: 8, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 8 },
  topAppsRow: { flexDirection: 'row', gap: spacing.md },
  miniApp: { flex: 1, alignItems: 'center', backgroundColor: colors.background, paddingVertical: 10, borderRadius: borderRadius.sm },
  miniAppIcon: { fontSize: 20, marginBottom: 4 },
  miniAppName: { fontSize: 11, color: colors.textSecondary, fontWeight: '500' },
  miniAppTime: { fontSize: 11, color: colors.primary, fontWeight: '700', marginTop: 2 },
  addChildButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: spacing.lg, borderWidth: 2, borderColor: colors.primary + '40', borderRadius: borderRadius.md, borderStyle: 'dashed', gap: spacing.sm, marginTop: spacing.sm },
  addChildText: { color: colors.primary, fontSize: 15, fontWeight: '600' },
});
