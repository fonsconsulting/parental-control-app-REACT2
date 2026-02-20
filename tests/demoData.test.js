const {
  formatMinutes,
  getUsagePercentage,
  getStatusColor,
  getStatusLabel,
  getUnreadCount,
  demoChildren,
  demoNotifications,
} = require('../src/services/demoData');

const mockColors = {
  success: '#4CAF50',
  warning: '#FFA726',
  error: '#EF5350',
  textSecondary: '#5A5A5A',
};

describe('formatMinutes', () => {
  test('formats hours and minutes', () => {
    expect(formatMinutes(150)).toBe('2h 30m');
  });
  test('formats whole hours only', () => {
    expect(formatMinutes(120)).toBe('2h');
  });
  test('formats minutes only', () => {
    expect(formatMinutes(45)).toBe('45m');
  });
  test('handles zero', () => {
    expect(formatMinutes(0)).toBe('0m');
  });
  test('handles 60 exactly', () => {
    expect(formatMinutes(60)).toBe('1h');
  });
});

describe('getUsagePercentage', () => {
  test('calculates percentage correctly', () => {
    expect(getUsagePercentage(120, 240)).toBe(50);
  });
  test('caps at 100%', () => {
    expect(getUsagePercentage(300, 240)).toBe(100);
  });
  test('returns 0 for zero limit', () => {
    expect(getUsagePercentage(100, 0)).toBe(0);
  });
  test('returns 0 for null limit', () => {
    expect(getUsagePercentage(100, null)).toBe(0);
  });
  test('handles exact 100%', () => {
    expect(getUsagePercentage(240, 240)).toBe(100);
  });
});

describe('getStatusColor', () => {
  test('returns success for ok', () => {
    expect(getStatusColor('ok', mockColors)).toBe(mockColors.success);
  });
  test('returns warning for warning', () => {
    expect(getStatusColor('warning', mockColors)).toBe(mockColors.warning);
  });
  test('returns error for locked', () => {
    expect(getStatusColor('locked', mockColors)).toBe(mockColors.error);
  });
  test('returns textSecondary for unknown', () => {
    expect(getStatusColor('unknown', mockColors)).toBe(mockColors.textSecondary);
  });
});

describe('getStatusLabel', () => {
  test('returns On Track for ok', () => {
    expect(getStatusLabel('ok')).toBe('On Track');
  });
  test('returns Near Limit for warning', () => {
    expect(getStatusLabel('warning')).toBe('Near Limit');
  });
  test('returns Locked for locked', () => {
    expect(getStatusLabel('locked')).toBe('Locked');
  });
  test('returns Unknown for unrecognised status', () => {
    expect(getStatusLabel('foo')).toBe('Unknown');
  });
});

describe('getUnreadCount', () => {
  test('returns count of unread notifications', () => {
    const unread = demoNotifications.filter(n => !n.read).length;
    expect(getUnreadCount()).toBe(unread);
  });
  test('is a non-negative integer', () => {
    expect(getUnreadCount()).toBeGreaterThanOrEqual(0);
  });
});

describe('demoChildren', () => {
  test('contains at least one child', () => {
    expect(demoChildren.length).toBeGreaterThan(0);
  });
  test('each child has required fields', () => {
    demoChildren.forEach(child => {
      expect(child).toHaveProperty('id');
      expect(child).toHaveProperty('name');
      expect(child).toHaveProperty('avatar');
      expect(child).toHaveProperty('todayUsage');
      expect(child).toHaveProperty('dailyLimit');
      expect(child).toHaveProperty('status');
      expect(child).toHaveProperty('topApps');
      expect(child).toHaveProperty('weeklyUsage');
      expect(child).toHaveProperty('rules');
    });
  });
  test('each child has 7 days of weekly usage', () => {
    demoChildren.forEach(child => {
      expect(child.weeklyUsage).toHaveLength(7);
    });
  });
  test('topApps have name, usage, and icon', () => {
    demoChildren.forEach(child => {
      child.topApps.forEach(app => {
        expect(app).toHaveProperty('name');
        expect(app).toHaveProperty('usage');
        expect(app).toHaveProperty('icon');
      });
    });
  });
  test('dailyLimit is greater than zero', () => {
    demoChildren.forEach(child => {
      expect(child.dailyLimit).toBeGreaterThan(0);
    });
  });
  test('todayUsage is non-negative', () => {
    demoChildren.forEach(child => {
      expect(child.todayUsage).toBeGreaterThanOrEqual(0);
    });
  });
});

describe('demoNotifications', () => {
  test('contains at least one notification', () => {
    expect(demoNotifications.length).toBeGreaterThan(0);
  });
  test('each notification has required fields', () => {
    demoNotifications.forEach(n => {
      expect(n).toHaveProperty('id');
      expect(n).toHaveProperty('type');
      expect(n).toHaveProperty('title');
      expect(n).toHaveProperty('body');
      expect(n).toHaveProperty('time');
      expect(n).toHaveProperty('read');
    });
  });
  test('notification type is one of known types', () => {
    const validTypes = ['warning', 'request', 'success', 'info'];
    demoNotifications.forEach(n => {
      expect(validTypes).toContain(n.type);
    });
  });
});
