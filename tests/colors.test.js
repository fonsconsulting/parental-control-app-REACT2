const { colors, spacing, borderRadius, typography, STATUS } = require('../src/theme/colors');

describe('colors', () => {
  test('primary is deep purple', () => {
    expect(colors.primary).toBe('#5B4BA0');
  });
  test('primaryDark is darker purple', () => {
    expect(colors.primaryDark).toBe('#432F7C');
  });
  test('secondary is mint green', () => {
    expect(colors.secondary).toBe('#A8E6CF');
  });
  test('background is light grey', () => {
    expect(colors.background).toBe('#F8F9FA');
  });
  test('card is white', () => {
    expect(colors.card).toBe('#FFFFFF');
  });
  test('all required color keys exist', () => {
    const required = ['primary', 'primaryDark', 'primaryLight', 'secondary', 'accent1', 'accent2', 'background', 'card', 'textPrimary', 'textSecondary', 'success', 'warning', 'error', 'info'];
    required.forEach(key => expect(colors).toHaveProperty(key));
  });
  test('color values are valid hex strings', () => {
    Object.values(colors).forEach(v => {
      expect(v).toMatch(/^#[0-9A-Fa-f]{6}$/);
    });
  });
});

describe('spacing', () => {
  test('xs is smallest', () => {
    expect(spacing.xs).toBeLessThan(spacing.sm);
  });
  test('xxl is largest', () => {
    expect(spacing.xxl).toBeGreaterThan(spacing.xl);
  });
  test('md is 16', () => {
    expect(spacing.md).toBe(16);
  });
  test('all values are positive numbers', () => {
    Object.values(spacing).forEach(v => {
      expect(typeof v).toBe('number');
      expect(v).toBeGreaterThan(0);
    });
  });
});

describe('borderRadius', () => {
  test('sm < md < lg < xl', () => {
    expect(borderRadius.sm).toBeLessThan(borderRadius.md);
    expect(borderRadius.md).toBeLessThan(borderRadius.lg);
    expect(borderRadius.lg).toBeLessThan(borderRadius.xl);
  });
  test('all values are positive', () => {
    Object.values(borderRadius).forEach(v => expect(v).toBeGreaterThan(0));
  });
});

describe('typography', () => {
  test('h1 has fontSize and fontWeight', () => {
    expect(typography.h1).toHaveProperty('fontSize');
    expect(typography.h1).toHaveProperty('fontWeight');
  });
  test('h1 fontSize > h2 fontSize', () => {
    expect(typography.h1.fontSize).toBeGreaterThan(typography.h2.fontSize);
  });
  test('h2 fontSize > h3 fontSize', () => {
    expect(typography.h2.fontSize).toBeGreaterThan(typography.h3.fontSize);
  });
  test('all styles have lineHeight', () => {
    ['h1', 'h2', 'h3', 'body', 'bodySmall'].forEach(key => {
      expect(typography[key]).toHaveProperty('lineHeight');
    });
  });
});

describe('STATUS', () => {
  test('has OK, WARNING, LOCKED', () => {
    expect(STATUS.OK).toBe('ok');
    expect(STATUS.WARNING).toBe('warning');
    expect(STATUS.LOCKED).toBe('locked');
  });
});
