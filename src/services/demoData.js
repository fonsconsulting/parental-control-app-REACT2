export const demoChildren = [
  {
    id: '1',
    name: 'Alex Chen',
    age: 12,
    platform: 'Android',
    avatar: '👦',
    todayUsage: 150,
    dailyLimit: 240,
    status: 'ok',
    deviceName: 'Samsung Galaxy A54',
    lastSeen: '2 min ago',
    topApps: [
      { name: 'TikTok', usage: 45, icon: '📱', category: 'Social' },
      { name: 'YouTube', usage: 37, icon: '🎮', category: 'Entertainment' },
      { name: 'Instagram', usage: 28, icon: '📷', category: 'Social' },
      { name: 'Chrome', usage: 18, icon: '🌐', category: 'Browser' },
      { name: 'Spotify', usage: 12, icon: '🎵', category: 'Music' },
      { name: 'WhatsApp', usage: 10, icon: '💬', category: 'Communication' },
    ],
    weeklyUsage: [
      { day: 'Mon', minutes: 180 },
      { day: 'Tue', minutes: 210 },
      { day: 'Wed', minutes: 195 },
      { day: 'Thu', minutes: 150 },
      { day: 'Fri', minutes: 240 },
      { day: 'Sat', minutes: 280 },
      { day: 'Sun', minutes: 150 },
    ],
    rules: [
      { id: 'r1', type: 'daily_limit', label: 'Daily Limit', value: '4 hours', enabled: true },
      { id: 'r2', type: 'bedtime', label: 'Bedtime', value: '9:00 PM – 7:00 AM', enabled: true },
      { id: 'r3', type: 'app_block', label: 'Block TikTok', value: 'During school hours', enabled: false },
    ],
  },
  {
    id: '2',
    name: 'Emma Chen',
    age: 9,
    platform: 'iOS',
    avatar: '👧',
    todayUsage: 165,
    dailyLimit: 180,
    status: 'warning',
    deviceName: 'iPhone 15',
    lastSeen: 'Now',
    topApps: [
      { name: 'Roblox', usage: 52, icon: '🎮', category: 'Games' },
      { name: 'YouTube Kids', usage: 45, icon: '📺', category: 'Entertainment' },
      { name: 'Messages', usage: 28, icon: '💬', category: 'Communication' },
      { name: 'Safari', usage: 20, icon: '🌐', category: 'Browser' },
      { name: 'Photos', usage: 12, icon: '📸', category: 'Utilities' },
      { name: 'FaceTime', usage: 8, icon: '📞', category: 'Communication' },
    ],
    weeklyUsage: [
      { day: 'Mon', minutes: 160 },
      { day: 'Tue', minutes: 175 },
      { day: 'Wed', minutes: 190 },
      { day: 'Thu', minutes: 140 },
      { day: 'Fri', minutes: 200 },
      { day: 'Sat', minutes: 220 },
      { day: 'Sun', minutes: 165 },
    ],
    rules: [
      { id: 'r1', type: 'daily_limit', label: 'Daily Limit', value: '3 hours', enabled: true },
      { id: 'r2', type: 'bedtime', label: 'Bedtime', value: '8:30 PM – 7:30 AM', enabled: true },
      { id: 'r3', type: 'app_block', label: 'Block Roblox', value: 'Weekdays only', enabled: true },
    ],
  },
];

export const demoNotifications = [
  { id: 'n1', type: 'warning', title: 'Emma reached 90% of limit', body: '2h 45m of 3h used', time: '2 min ago', read: false },
  { id: 'n2', type: 'request', title: 'Alex requests more time', body: 'Wants 30 more minutes', time: '15 min ago', read: false },
  { id: 'n3', type: 'success', title: 'Alex stayed within limit', body: 'Great day yesterday!', time: 'Yesterday', read: true },
  { id: 'n4', type: 'info', title: 'Weekly report ready', body: 'Tap to view usage summary', time: 'Yesterday', read: true },
];

export const formatMinutes = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours > 0 && mins > 0) return `${hours}h ${mins}m`;
  if (hours > 0) return `${hours}h`;
  return `${mins}m`;
};

export const getUsagePercentage = (usage, limit) => {
  if (!limit || limit <= 0) return 0;
  return Math.min((usage / limit) * 100, 100);
};

export const getStatusColor = (status, c) => {
  switch (status) {
    case 'ok': return c.success;
    case 'warning': return c.warning;
    case 'locked': return c.error;
    default: return c.textSecondary;
  }
};

export const getStatusLabel = (status) => {
  switch (status) {
    case 'ok': return 'On Track';
    case 'warning': return 'Near Limit';
    case 'locked': return 'Locked';
    default: return 'Unknown';
  }
};

export const getUnreadCount = () =>
  demoNotifications.filter(n => !n.read).length;
