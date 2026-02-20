import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card } from '../components/Card';
import { colors, spacing, typography, borderRadius } from '../theme/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { demoNotifications } from '../services/demoData';

const TYPE_CONFIG = {
  warning: { icon: 'alert-circle', color: colors.warning, bg: colors.warning + '15' },
  request: { icon: 'hand-wave', color: colors.primary, bg: colors.primary + '15' },
  success: { icon: 'check-circle', color: colors.success, bg: colors.success + '15' },
  info: { icon: 'information', color: colors.info, bg: colors.info + '15' },
};

export default function NotificationsScreen() {
  const insets = useSafeAreaInsets();
  const [notifications, setNotifications] = useState(demoNotifications);
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));

  const renderItem = ({ item }) => {
    const config = TYPE_CONFIG[item.type] || TYPE_CONFIG.info;
    return (
      <Card style={[styles.notifCard, !item.read && styles.unreadCard]}>
        <View style={styles.notifRow}>
          <View style={[styles.iconWrap, { backgroundColor: config.bg }]}>
            <MaterialCommunityIcons name={config.icon} size={22} color={config.color} />
          </View>
          <View style={styles.notifContent}>
            <Text style={[styles.notifTitle, !item.read && styles.unreadTitle]}>{item.title}</Text>
            <Text style={styles.notifBody}>{item.body}</Text>
            <Text style={styles.notifTime}>{item.time}</Text>
          </View>
          {!item.read && <View style={styles.unreadDot} />}
        </View>
        {item.type === 'request' && (
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={[styles.actionBtn, styles.approveBtn]}
              accessibilityLabel="Approve request"
              accessibilityRole="button"
              accessibilityHint="Grants the extra time requested"
            >
              <Text style={styles.approveBtnText}>Approve</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionBtn, styles.denyBtn]}
              accessibilityLabel="Deny request"
              accessibilityRole="button"
              accessibilityHint="Denies the extra time requested"
            >
              <Text style={styles.denyBtnText}>Deny</Text>
            </TouchableOpacity>
          </View>
        )}
      </Card>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.headerSection}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.screenTitle} accessibilityRole="header">Notifications</Text>
            <Text style={styles.screenSubtitle}>{unreadCount} unread</Text>
          </View>
          {unreadCount > 0 && (
            <TouchableOpacity
              onPress={markAllRead}
              accessibilityLabel="Mark all notifications as read"
              accessibilityRole="button"
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Text style={styles.markReadText}>Mark all read</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState} accessibilityLabel="No notifications">
            <MaterialCommunityIcons name="bell-check" size={48} color={colors.textSecondary} />
            <Text style={styles.emptyText}>All caught up!</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  headerSection: { paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: spacing.md },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  screenTitle: { ...typography.h1, color: colors.textPrimary },
  screenSubtitle: { ...typography.bodySmall, color: colors.textSecondary, marginTop: 4 },
  markReadText: { color: colors.primary, fontSize: 14, fontWeight: '600', marginTop: 8 },
  listContent: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl * 2 },
  notifCard: { marginBottom: spacing.sm },
  unreadCard: { borderLeftWidth: 3, borderLeftColor: colors.primary },
  notifRow: { flexDirection: 'row', alignItems: 'flex-start' },
  iconWrap: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: spacing.md },
  notifContent: { flex: 1 },
  notifTitle: { fontSize: 15, fontWeight: '500', color: colors.textPrimary, marginBottom: 2 },
  unreadTitle: { fontWeight: '700' },
  notifBody: { fontSize: 14, color: colors.textSecondary, marginBottom: 4 },
  notifTime: { fontSize: 12, color: colors.textSecondary + 'AA' },
  unreadDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.primary, marginTop: 6 },
  actionRow: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md },
  actionBtn: { flex: 1, paddingVertical: 10, borderRadius: borderRadius.sm, alignItems: 'center', minHeight: 44 },
  approveBtn: { backgroundColor: colors.success + '15' },
  approveBtnText: { color: colors.success, fontWeight: '600', fontSize: 14 },
  denyBtn: { backgroundColor: colors.error + '15' },
  denyBtnText: { color: colors.error, fontWeight: '600', fontSize: 14 },
  emptyState: { alignItems: 'center', paddingTop: 80 },
  emptyText: { ...typography.body, color: colors.textSecondary, marginTop: spacing.md },
});
