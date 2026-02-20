import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { colors, borderRadius, spacing } from '../theme/colors';

export const Button = ({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  style,
  ...props
}) => {
  const isOutline = variant === 'outline';
  const buttonStyle = isOutline ? styles.outlineButton : styles.primaryButton;
  const textStyle = isOutline ? styles.outlineText : styles.primaryText;

  return (
    <TouchableOpacity
      style={[buttonStyle, disabled && styles.disabled, style]}
      onPress={onPress}
      disabled={disabled || loading}
      accessibilityLabel={title}
      accessibilityRole="button"
      accessibilityState={{ disabled: !!(disabled || loading) }}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={isOutline ? colors.primary : colors.textOnPurple} />
      ) : (
        <Text style={textStyle}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  primaryButton: { backgroundColor: colors.primary, paddingVertical: spacing.md, paddingHorizontal: spacing.xl, borderRadius: borderRadius.md, alignItems: 'center', justifyContent: 'center', minHeight: 50 },
  outlineButton: { backgroundColor: 'transparent', paddingVertical: spacing.md, paddingHorizontal: spacing.xl, borderRadius: borderRadius.md, borderWidth: 2, borderColor: colors.primary, alignItems: 'center', justifyContent: 'center', minHeight: 50 },
  primaryText: { color: colors.textOnPurple, fontSize: 16, fontWeight: '600' },
  outlineText: { color: colors.primary, fontSize: 16, fontWeight: '600' },
  disabled: { opacity: 0.5 },
});
