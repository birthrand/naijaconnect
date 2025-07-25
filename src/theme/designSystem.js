import { theme } from './theme';

// Design System Constants
export const DESIGN_SYSTEM = {
  // Layout & Spacing
  layout: {
    screenPadding: theme.spacing.lg, // 24pt
    sectionSpacing: theme.spacing.xl, // 32pt
    cardSpacing: theme.spacing.md, // 16pt
    elementSpacing: theme.spacing.sm, // 8pt
    microSpacing: theme.spacing.xs, // 4pt
  },

  // Border Radius System
  borderRadius: {
    none: 0,
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    round: 50,
  },

  // Icon Sizes
  iconSizes: {
    xs: 12,
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32,
    xxl: 48,
  },

  // Shadows
  shadows: {
    small: theme.shadows.small,
    medium: theme.shadows.medium,
    large: theme.shadows.large,
  },

  // Card Dimensions
  cards: {
    standard: {
      padding: theme.spacing.md, // 16pt
      borderRadius: theme.borderRadius.md, // 12pt
      shadow: theme.shadows.small,
    },
    compact: {
      padding: theme.spacing.sm, // 8pt
      borderRadius: theme.borderRadius.sm, // 8pt
      shadow: theme.shadows.small,
    },
    elevated: {
      padding: theme.spacing.md, // 16pt
      borderRadius: theme.borderRadius.md, // 12pt
      shadow: theme.shadows.medium,
    },
  },

  // Button Styles
  buttons: {
    primary: {
      backgroundColor: theme.colors.primary,
      paddingVertical: theme.spacing.sm, // 8pt
      paddingHorizontal: theme.spacing.lg, // 24pt
      borderRadius: theme.borderRadius.md, // 12pt
      textColor: theme.colors.white,
      fontSize: 16,
      fontWeight: '600',
      shadow: theme.shadows.small,
    },
    secondary: {
      backgroundColor: 'transparent',
      paddingVertical: theme.spacing.sm, // 8pt
      paddingHorizontal: theme.spacing.lg, // 24pt
      borderRadius: theme.borderRadius.md, // 12pt
      textColor: theme.colors.primary,
      fontSize: 16,
      fontWeight: '600',
      borderWidth: 2,
      borderColor: theme.colors.primary,
    },
    compact: {
      backgroundColor: theme.colors.primary,
      paddingVertical: theme.spacing.xs, // 4pt
      paddingHorizontal: theme.spacing.md, // 16pt
      borderRadius: theme.borderRadius.sm, // 8pt
      textColor: theme.colors.white,
      fontSize: 14,
      fontWeight: '500',
    },
    icon: {
      backgroundColor: theme.colors.lightGray,
      padding: theme.spacing.sm, // 8pt
      borderRadius: theme.borderRadius.round, // 50pt
      iconSize: 20,
      iconColor: theme.colors.gray[600],
    },
  },

  // Input Styles
  inputs: {
    standard: {
      backgroundColor: theme.colors.white,
      borderWidth: 1,
      borderColor: theme.colors.gray[200],
      borderRadius: theme.borderRadius.sm, // 8pt
      paddingVertical: theme.spacing.sm, // 8pt
      paddingHorizontal: theme.spacing.md, // 16pt
      fontSize: 16,
      color: theme.colors.gray[900],
      placeholderColor: theme.colors.gray[400],
    },
    search: {
      backgroundColor: theme.colors.gray[100],
      borderWidth: 0,
      borderRadius: theme.borderRadius.md, // 12pt
      paddingVertical: theme.spacing.sm, // 8pt
      paddingHorizontal: theme.spacing.md, // 16pt
      fontSize: 16,
      color: theme.colors.gray[900],
      placeholderColor: theme.colors.gray[500],
    },
  },

  // Header Styles
  headers: {
    screen: {
      backgroundColor: theme.colors.white,
      paddingVertical: theme.spacing.md, // 16pt
      paddingHorizontal: theme.spacing.lg, // 24pt
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.gray[200],
      titleFontSize: 24,
      titleFontWeight: '700',
      titleColor: theme.colors.gray[900],
    },
    section: {
      paddingVertical: theme.spacing.md, // 16pt
      paddingHorizontal: theme.spacing.lg, // 24pt
      titleFontSize: 20,
      titleFontWeight: '600',
      titleColor: theme.colors.gray[900],
      subtitleFontSize: 14,
      subtitleColor: theme.colors.gray[600],
    },
  },

  // Navigation Styles
  navigation: {
    tabBar: {
      backgroundColor: theme.colors.white,
      borderTopWidth: 1,
      borderTopColor: theme.colors.gray[200],
      paddingBottom: theme.spacing.sm, // 8pt
      paddingTop: theme.spacing.sm, // 8pt
      height: 70,
      iconSize: 24,
      labelFontSize: 12,
      labelFontWeight: '500',
      activeColor: theme.colors.primary,
      inactiveColor: theme.colors.gray[500],
    },
  },

  // List & Grid Styles
  lists: {
    standard: {
      paddingHorizontal: theme.spacing.lg, // 24pt
      itemSpacing: theme.spacing.md, // 16pt
    },
    compact: {
      paddingHorizontal: theme.spacing.lg, // 24pt
      itemSpacing: theme.spacing.sm, // 8pt
    },
    grid: {
      paddingHorizontal: theme.spacing.lg, // 24pt
      itemSpacing: theme.spacing.md, // 16pt
      numColumns: 2,
    },
  },

  // Badge & Tag Styles
  badges: {
    primary: {
      backgroundColor: theme.colors.primary,
      paddingVertical: theme.spacing.xs, // 4pt
      paddingHorizontal: theme.spacing.sm, // 8pt
      borderRadius: theme.borderRadius.sm, // 8pt
      textColor: theme.colors.white,
      fontSize: 12,
      fontWeight: '600',
    },
    secondary: {
      backgroundColor: theme.colors.gray[100],
      paddingVertical: theme.spacing.xs, // 4pt
      paddingHorizontal: theme.spacing.sm, // 8pt
      borderRadius: theme.borderRadius.sm, // 8pt
      textColor: theme.colors.gray[700],
      fontSize: 12,
      fontWeight: '500',
    },
    accent: {
      backgroundColor: theme.colors.accent,
      paddingVertical: theme.spacing.xs, // 4pt
      paddingHorizontal: theme.spacing.sm, // 8pt
      borderRadius: theme.borderRadius.sm, // 8pt
      textColor: theme.colors.white,
      fontSize: 12,
      fontWeight: '600',
    },
  },

  // Avatar Styles
  avatars: {
    small: {
      width: 32,
      height: 32,
      borderRadius: 16,
    },
    medium: {
      width: 40,
      height: 40,
      borderRadius: 20,
    },
    large: {
      width: 56,
      height: 56,
      borderRadius: 28,
    },
    xlarge: {
      width: 80,
      height: 80,
      borderRadius: 40,
    },
  },

  // Image Styles
  images: {
    card: {
      borderRadius: theme.borderRadius.md, // 12pt
      aspectRatio: 16 / 9,
    },
    avatar: {
      borderRadius: theme.borderRadius.round, // 50pt
    },
    thumbnail: {
      borderRadius: theme.borderRadius.sm, // 8pt
    },
  },

  // Animation Durations
  animations: {
    fast: 150,
    normal: 300,
    slow: 500,
  },

  // Z-Index Scale
  zIndex: {
    base: 0,
    card: 1,
    header: 10,
    modal: 100,
    tooltip: 200,
    overlay: 300,
  },
};

// Common Component Styles
export const COMPONENT_STYLES = {
  // Card Components
  card: {
    standard: {
      backgroundColor: theme.colors.white,
      padding: DESIGN_SYSTEM.cards.standard.padding,
      borderRadius: DESIGN_SYSTEM.cards.standard.borderRadius,
      ...DESIGN_SYSTEM.cards.standard.shadow,
    },
    compact: {
      backgroundColor: theme.colors.white,
      padding: DESIGN_SYSTEM.cards.compact.padding,
      borderRadius: DESIGN_SYSTEM.cards.compact.borderRadius,
      ...DESIGN_SYSTEM.cards.compact.shadow,
    },
    elevated: {
      backgroundColor: theme.colors.white,
      padding: DESIGN_SYSTEM.cards.elevated.padding,
      borderRadius: DESIGN_SYSTEM.cards.elevated.borderRadius,
      ...DESIGN_SYSTEM.cards.elevated.shadow,
    },
  },

  // Button Components
  button: {
    primary: {
      backgroundColor: DESIGN_SYSTEM.buttons.primary.backgroundColor,
      paddingVertical: DESIGN_SYSTEM.buttons.primary.paddingVertical,
      paddingHorizontal: DESIGN_SYSTEM.buttons.primary.paddingHorizontal,
      borderRadius: DESIGN_SYSTEM.buttons.primary.borderRadius,
      shadowColor: DESIGN_SYSTEM.buttons.primary.shadow.shadowColor,
      shadowOffset: DESIGN_SYSTEM.buttons.primary.shadow.shadowOffset,
      shadowOpacity: DESIGN_SYSTEM.buttons.primary.shadow.shadowOpacity,
      shadowRadius: DESIGN_SYSTEM.buttons.primary.shadow.shadowRadius,
      elevation: DESIGN_SYSTEM.buttons.primary.shadow.elevation,
    },
    secondary: {
      backgroundColor: DESIGN_SYSTEM.buttons.secondary.backgroundColor,
      paddingVertical: DESIGN_SYSTEM.buttons.secondary.paddingVertical,
      paddingHorizontal: DESIGN_SYSTEM.buttons.secondary.paddingHorizontal,
      borderRadius: DESIGN_SYSTEM.buttons.secondary.borderRadius,
      borderWidth: DESIGN_SYSTEM.buttons.secondary.borderWidth,
      borderColor: DESIGN_SYSTEM.buttons.secondary.borderColor,
    },
    compact: {
      backgroundColor: DESIGN_SYSTEM.buttons.compact.backgroundColor,
      paddingVertical: DESIGN_SYSTEM.buttons.compact.paddingVertical,
      paddingHorizontal: DESIGN_SYSTEM.buttons.compact.paddingHorizontal,
      borderRadius: DESIGN_SYSTEM.buttons.compact.borderRadius,
    },
    icon: {
      backgroundColor: DESIGN_SYSTEM.buttons.icon.backgroundColor,
      padding: DESIGN_SYSTEM.buttons.icon.padding,
      borderRadius: DESIGN_SYSTEM.buttons.icon.borderRadius,
    },
  },

  // Text Styles
  text: {
    display: {
      large: { ...theme.fonts.display.large },
      medium: { ...theme.fonts.display.medium },
      small: { ...theme.fonts.display.small },
    },
    headline: {
      large: { ...theme.fonts.headline.large },
      medium: { ...theme.fonts.headline.medium },
      small: { ...theme.fonts.headline.small },
    },
    title: {
      large: { ...theme.fonts.title.large },
      medium: { ...theme.fonts.title.medium },
      small: { ...theme.fonts.title.small },
    },
    body: {
      large: { ...theme.fonts.body.large },
      medium: { ...theme.fonts.body.medium },
      small: { ...theme.fonts.body.small },
    },
    label: {
      large: { ...theme.fonts.label.large },
      medium: { ...theme.fonts.label.medium },
      small: { ...theme.fonts.label.small },
    },
  },

  // Input Components
  input: {
    standard: {
      backgroundColor: DESIGN_SYSTEM.inputs.standard.backgroundColor,
      borderWidth: DESIGN_SYSTEM.inputs.standard.borderWidth,
      borderColor: DESIGN_SYSTEM.inputs.standard.borderColor,
      borderRadius: DESIGN_SYSTEM.inputs.standard.borderRadius,
      paddingVertical: DESIGN_SYSTEM.inputs.standard.paddingVertical,
      paddingHorizontal: DESIGN_SYSTEM.inputs.standard.paddingHorizontal,
    },
    search: {
      backgroundColor: DESIGN_SYSTEM.inputs.search.backgroundColor,
      borderWidth: DESIGN_SYSTEM.inputs.search.borderWidth,
      borderRadius: DESIGN_SYSTEM.inputs.search.borderRadius,
      paddingVertical: DESIGN_SYSTEM.inputs.search.paddingVertical,
      paddingHorizontal: DESIGN_SYSTEM.inputs.search.paddingHorizontal,
    },
  },

  // Badge Components
  badge: {
    primary: {
      backgroundColor: DESIGN_SYSTEM.badges.primary.backgroundColor,
      paddingVertical: DESIGN_SYSTEM.badges.primary.paddingVertical,
      paddingHorizontal: DESIGN_SYSTEM.badges.primary.paddingHorizontal,
      borderRadius: DESIGN_SYSTEM.badges.primary.borderRadius,
    },
    secondary: {
      backgroundColor: DESIGN_SYSTEM.badges.secondary.backgroundColor,
      paddingVertical: DESIGN_SYSTEM.badges.secondary.paddingVertical,
      paddingHorizontal: DESIGN_SYSTEM.badges.secondary.paddingHorizontal,
      borderRadius: DESIGN_SYSTEM.badges.secondary.borderRadius,
    },
    accent: {
      backgroundColor: DESIGN_SYSTEM.badges.accent.backgroundColor,
      paddingVertical: DESIGN_SYSTEM.badges.accent.paddingVertical,
      paddingHorizontal: DESIGN_SYSTEM.badges.accent.paddingHorizontal,
      borderRadius: DESIGN_SYSTEM.badges.accent.borderRadius,
    },
  },
};

// Layout Patterns
export const LAYOUT_PATTERNS = {
  // Screen Layout
  screen: {
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      flex: 1,
      paddingHorizontal: DESIGN_SYSTEM.layout.screenPadding,
    },
    scrollContent: {
      paddingBottom: DESIGN_SYSTEM.layout.sectionSpacing,
    },
  },

  // Header Layout
  header: {
    container: {
      backgroundColor: DESIGN_SYSTEM.headers.screen.backgroundColor,
      paddingVertical: DESIGN_SYSTEM.headers.screen.paddingVertical,
      paddingHorizontal: DESIGN_SYSTEM.headers.screen.paddingHorizontal,
      borderBottomWidth: DESIGN_SYSTEM.headers.screen.borderBottomWidth,
      borderBottomColor: DESIGN_SYSTEM.headers.screen.borderBottomColor,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: {
      fontSize: DESIGN_SYSTEM.headers.screen.titleFontSize,
      fontWeight: DESIGN_SYSTEM.headers.screen.titleFontWeight,
      color: DESIGN_SYSTEM.headers.screen.titleColor,
    },
  },

  // Section Layout
  section: {
    container: {
      marginBottom: DESIGN_SYSTEM.layout.sectionSpacing,
    },
    header: {
      paddingVertical: DESIGN_SYSTEM.headers.section.paddingVertical,
      paddingHorizontal: DESIGN_SYSTEM.headers.section.paddingHorizontal,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: {
      fontSize: DESIGN_SYSTEM.headers.section.titleFontSize,
      fontWeight: DESIGN_SYSTEM.headers.section.titleFontWeight,
      color: DESIGN_SYSTEM.headers.section.titleColor,
    },
    subtitle: {
      fontSize: DESIGN_SYSTEM.headers.section.subtitleFontSize,
      color: DESIGN_SYSTEM.headers.section.subtitleColor,
      marginTop: DESIGN_SYSTEM.layout.microSpacing,
    },
  },

  // Card Layout
  card: {
    container: {
      backgroundColor: theme.colors.white,
      borderRadius: DESIGN_SYSTEM.cards.standard.borderRadius,
      padding: DESIGN_SYSTEM.cards.standard.padding,
      marginBottom: DESIGN_SYSTEM.layout.cardSpacing,
      ...DESIGN_SYSTEM.cards.standard.shadow,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: DESIGN_SYSTEM.layout.elementSpacing,
    },
    content: {
      marginBottom: DESIGN_SYSTEM.layout.elementSpacing,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: DESIGN_SYSTEM.layout.elementSpacing,
      paddingTop: DESIGN_SYSTEM.layout.elementSpacing,
      borderTopWidth: 1,
      borderTopColor: theme.colors.gray[200],
    },
  },

  // List Layout
  list: {
    container: {
      paddingHorizontal: DESIGN_SYSTEM.lists.standard.paddingHorizontal,
    },
    item: {
      marginBottom: DESIGN_SYSTEM.lists.standard.itemSpacing,
    },
  },

  // Grid Layout
  grid: {
    container: {
      paddingHorizontal: DESIGN_SYSTEM.lists.grid.paddingHorizontal,
    },
    item: {
      marginBottom: DESIGN_SYSTEM.lists.grid.itemSpacing,
    },
  },
};

export default DESIGN_SYSTEM; 