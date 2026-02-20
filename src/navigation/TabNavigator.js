import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, StyleSheet, Platform } from 'react-native';
import { colors } from '../theme/colors';
import { getUnreadCount } from '../services/demoData';

import DashboardScreen from '../screens/DashboardScreen';
import RulesScreen from '../screens/RulesScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ChildDetailScreen from '../screens/ChildDetailScreen';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Dashboard" component={DashboardScreen} />
      <HomeStack.Screen name="ChildDetail" component={ChildDetailScreen} />
    </HomeStack.Navigator>
  );
}

const TAB_ICONS = {
  Home: { focused: 'view-dashboard', unfocused: 'view-dashboard-outline' },
  Rules: { focused: 'shield-check', unfocused: 'shield-check-outline' },
  Alerts: { focused: 'bell', unfocused: 'bell-outline' },
  Profile: { focused: 'account-circle', unfocused: 'account-circle-outline' },
};

export default function TabNavigator() {
  const unreadCount = getUnreadCount();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color }) => {
          const icons = TAB_ICONS[route.name];
          const iconName = focused ? icons.focused : icons.unfocused;
          return (
            <View style={focused ? styles.activeTab : undefined}>
              <MaterialCommunityIcons name={iconName} size={24} color={color} />
            </View>
          );
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
        tabBarItemStyle: styles.tabItem,
      })}
    >
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Rules" component={RulesScreen} />
      <Tab.Screen
        name="Alerts"
        component={NotificationsScreen}
        options={unreadCount > 0 ? { tabBarBadge: unreadCount, tabBarBadgeStyle: styles.tabBadge } : undefined}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 0,
    height: Platform.OS === 'ios' ? 88 : 64,
    paddingTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 8,
  },
  tabLabel: { fontSize: 11, fontWeight: '600', marginTop: 2 },
  tabItem: { paddingVertical: 4 },
  activeTab: { backgroundColor: colors.primary + '12', borderRadius: 12, padding: 6, marginBottom: -2 },
  tabBadge: { backgroundColor: colors.accent2, fontSize: 10, minWidth: 18, height: 18, borderRadius: 9 },
});
