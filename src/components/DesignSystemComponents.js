import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme/theme';
import { DESIGN_SYSTEM, COMPONENT_STYLES, LAYOUT_PATTERNS } from '../theme/designSystem';

// Button Components
export const Button = ({ 
  variant = 'primary', 
  size = 'standard', 
  onPress, 
  children, 
  disabled = false,
  style,
  textStyle,
  icon,
  iconPosition = 'left'
}) => {
  const getButtonStyle = () => {
    const baseStyle = COMPONENT_STYLES.button[variant];
    const sizeStyle = size === 'compact' ? COMPONENT_STYLES.button.compact : baseStyle;
    
    return [
      baseStyle,
      disabled && { opacity: 0.6 },
      style,
    ];
  };

  const getTextStyle = () => {
    const baseTextStyle = {
      color: variant === 'secondary' ? theme.colors.primary : theme.colors.white,
      fontSize: size === 'compact' ? 14 : 16,
      fontWeight: size === 'compact' ? '500' : '600',
      textAlign: 'center',
    };
    
    return [baseTextStyle, textStyle];
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        {icon && iconPosition === 'left' && (
          <Ionicons 
            name={icon} 
            size={size === 'compact' ? 16 : 20} 
            color={variant === 'secondary' ? theme.colors.primary : theme.colors.white}
            style={{ marginRight: 8 }}
          />
        )}
        <Text style={getTextStyle()}>{children}</Text>
        {icon && iconPosition === 'right' && (
          <Ionicons 
            name={icon} 
            size={size === 'compact' ? 16 : 20} 
            color={variant === 'secondary' ? theme.colors.primary : theme.colors.white}
            style={{ marginLeft: 8 }}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

// Icon Button Component
export const IconButton = ({ 
  icon, 
  onPress, 
  size = 'md', 
  color = theme.colors.gray[600],
  backgroundColor = theme.colors.gray[100],
  style 
}) => {
  const iconSize = DESIGN_SYSTEM.iconSizes[size];
  
  return (
    <TouchableOpacity
      style={[
        {
          backgroundColor,
          padding: DESIGN_SYSTEM.layout.elementSpacing,
          borderRadius: DESIGN_SYSTEM.borderRadius.round,
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Ionicons name={icon} size={iconSize} color={color} />
    </TouchableOpacity>
  );
};

// Card Component
export const Card = ({ 
  variant = 'standard', 
  children, 
  style,
  onPress,
  header,
  footer 
}) => {
  const cardStyle = [
    COMPONENT_STYLES.card[variant],
    style,
  ];

  const CardContent = () => (
    <View style={cardStyle}>
      {header && (
        <View style={LAYOUT_PATTERNS.card.header}>
          {header}
        </View>
      )}
      <View style={LAYOUT_PATTERNS.card.content}>
        {children}
      </View>
      {footer && (
        <View style={LAYOUT_PATTERNS.card.footer}>
          {footer}
        </View>
      )}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.95}>
        <CardContent />
      </TouchableOpacity>
    );
  }

  return <CardContent />;
};

// Input Component
export const Input = ({ 
  variant = 'standard',
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType,
  autoCapitalize,
  style,
  leftIcon,
  rightIcon,
  onRightIconPress,
  error,
  ...props 
}) => {
  const inputStyle = [
    COMPONENT_STYLES.input[variant],
    error && { borderColor: theme.colors.error },
    style,
  ];

  return (
    <View style={{ position: 'relative' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {leftIcon && (
          <Ionicons 
            name={leftIcon} 
            size={20} 
            color={theme.colors.gray[400]}
            style={{ position: 'absolute', left: 12, zIndex: 1 }}
          />
        )}
        <TextInput
          style={[
            inputStyle,
            leftIcon && { paddingLeft: 40 },
            rightIcon && { paddingRight: 40 },
          ]}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.gray[400]}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          {...props}
        />
        {rightComponent ? (
          <View style={{ position: 'absolute', right: 12, zIndex: 1 }}>
            {rightComponent}
          </View>
        ) : rightIcon && (
          <TouchableOpacity
            onPress={onRightPress}
            style={{ position: 'absolute', right: 12, zIndex: 1 }}
          >
            <Ionicons 
              name={rightIcon} 
              size={20} 
              color={theme.colors.gray[400]}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );
};

// Search Input Component
export const SearchInput = ({ 
  placeholder = 'Search...',
  value,
  onChangeText,
  onFilterPress,
  style,
  ...props 
}) => {
  return (
    <View style={[styles.searchContainer, style]}>
      <View style={COMPONENT_STYLES.input.search}>
        <Ionicons 
          name="search" 
          size={20} 
          color={theme.colors.gray[400]}
          style={{ marginRight: 8 }}
        />
        <TextInput
          style={styles.searchInput}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.gray[500]}
          value={value}
          onChangeText={onChangeText}
          {...props}
        />
        {onFilterPress && (
          <TouchableOpacity onPress={onFilterPress}>
            <Ionicons 
              name="filter" 
              size={20} 
              color={theme.colors.gray[400]}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

// Badge Component
export const Badge = ({ 
  variant = 'primary', 
  children, 
  style,
  textStyle 
}) => {
  const badgeStyle = [
    COMPONENT_STYLES.badge[variant],
    style,
  ];

  const getTextStyle = () => {
    const baseTextStyle = {
      color: variant === 'secondary' ? theme.colors.gray[700] : theme.colors.white,
      fontSize: 12,
      fontWeight: variant === 'secondary' ? '500' : '600',
      textAlign: 'center',
    };
    
    return [baseTextStyle, textStyle];
  };

  return (
    <View style={badgeStyle}>
      <Text style={getTextStyle()}>{children}</Text>
    </View>
  );
};

// Avatar Component
export const Avatar = ({ 
  size = 'medium', 
  source, 
  style,
  showBadge = false,
  badgeColor = theme.colors.success 
}) => {
  const avatarStyle = [
    DESIGN_SYSTEM.avatars[size],
    style,
  ];

  return (
    <View style={{ position: 'relative' }}>
      <Image source={source} style={avatarStyle} />
      {showBadge && (
        <View style={[
          styles.avatarBadge,
          { backgroundColor: badgeColor }
        ]} />
      )}
    </View>
  );
};

// Header Component
export const Header = ({ 
  title, 
  subtitle,
  leftIcon,
  rightIcon,
  rightComponent,
  onLeftPress,
  onRightPress,
  style 
}) => {
  return (
    <View style={[LAYOUT_PATTERNS.header.container, style]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
        {leftIcon && (
          <IconButton
            icon={leftIcon}
            onPress={onLeftPress}
            style={{ marginRight: 12 }}
          />
        )}
        <View style={{ flex: 1 }}>
          <Text style={LAYOUT_PATTERNS.header.title}>{title}</Text>
          {subtitle && (
            <Text style={styles.headerSubtitle}>{subtitle}</Text>
          )}
        </View>
      </View>
      {rightComponent ? (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {rightComponent}
        </View>
      ) : rightIcon && (
        <IconButton
          icon={rightIcon}
          onPress={onRightPress}
        />
      )}
    </View>
  );
};

// Section Header Component
export const SectionHeader = ({ 
  title, 
  subtitle,
  rightAction,
  style 
}) => {
  return (
    <View style={[LAYOUT_PATTERNS.section.header, style]}>
      <View style={{ flex: 1 }}>
        <Text style={LAYOUT_PATTERNS.section.title}>{title}</Text>
        {subtitle && (
          <Text style={LAYOUT_PATTERNS.section.subtitle}>{subtitle}</Text>
        )}
      </View>
      {rightAction && (
        <View>
          {rightAction}
        </View>
      )}
    </View>
  );
};

// Text Components
export const DisplayText = ({ variant = 'medium', children, style }) => (
  <Text style={[COMPONENT_STYLES.text.display[variant], style]}>
    {children}
  </Text>
);

export const HeadlineText = ({ variant = 'medium', children, style }) => (
  <Text style={[COMPONENT_STYLES.text.headline[variant], style]}>
    {children}
  </Text>
);

export const TitleText = ({ variant = 'medium', children, style }) => (
  <Text style={[COMPONENT_STYLES.text.title[variant], style]}>
    {children}
  </Text>
);

export const BodyText = ({ variant = 'medium', children, style }) => (
  <Text style={[COMPONENT_STYLES.text.body[variant], style]}>
    {children}
  </Text>
);

export const LabelText = ({ variant = 'medium', children, style }) => (
  <Text style={[COMPONENT_STYLES.text.label[variant], style]}>
    {children}
  </Text>
);

// Divider Component
export const Divider = ({ style, color = theme.colors.gray[200] }) => (
  <View style={[{ height: 1, backgroundColor: color }, style]} />
);

// Spacer Component
export const Spacer = ({ size = 'md' }) => {
  const spacerSize = DESIGN_SYSTEM.layout[`${size}Spacing`] || DESIGN_SYSTEM.layout.elementSpacing;
  return <View style={{ height: spacerSize }} />;
};

const styles = StyleSheet.create({
  searchContainer: {
    paddingHorizontal: DESIGN_SYSTEM.layout.screenPadding,
    paddingVertical: DESIGN_SYSTEM.layout.elementSpacing,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[200],
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: theme.colors.gray[900],
    marginLeft: 8,
  },
  errorText: {
    color: theme.colors.error,
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: theme.colors.gray[600],
    marginTop: 2,
  },
  avatarBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: theme.colors.white,
  },
}); 