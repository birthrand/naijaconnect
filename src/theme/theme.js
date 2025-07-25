import { DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // Enhanced Nigerian flag colors with better hierarchy
    primary: '#2E7D32', // Nigerian Green - Main brand color
    primaryLight: '#4CAF50', // Lighter green for hover states
    primaryDark: '#1B5E20', // Darker green for pressed states
    
    secondary: '#FFD700', // Nigerian Gold - Accent color
    secondaryLight: '#FFF176', // Lighter gold for subtle highlights
    secondaryDark: '#F57F17', // Darker gold for emphasis
    
    accent: '#D32F2F', // Nigerian Red - Call-to-action & alerts
    accentLight: '#EF5350', // Lighter red for secondary actions
    accentDark: '#B71C1C', // Darker red for critical elements
    
    // Enhanced neutral palette for better hierarchy
    background: '#FAFAFA', // Light gray background
    surface: '#FFFFFF', // White surface
    white: '#FFFFFF',
    black: '#000000',
    lightGray: '#F5F5F5', // Light gray for borders and backgrounds
    
    // Improved gray scale for better typography hierarchy
    gray: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },

    
    // Semantic colors with better contrast
    success: '#4CAF50',
    successLight: '#81C784',
    warning: '#FF9800',
    warningLight: '#FFB74D',
    error: '#F44336',
    errorLight: '#E57373',
    info: '#2196F3',
    infoLight: '#64B5F6',
    
    // Enhanced Nigerian-inspired colors
    earthBrown: '#8D6E63',
    warmOrange: '#FF8A65',
    deepGreen: '#1B5E20',
    lightGold: '#FFF8E1',
    cream: '#FDF5E6',
    
    // New engagement colors for better user interaction
    engagement: {
      like: '#E91E63', // Pink for likes
      share: '#9C27B0', // Purple for shares
      comment: '#2196F3', // Blue for comments
      bookmark: '#FF9800', // Orange for bookmarks
      trending: '#FF5722', // Deep orange for trending
      verified: '#4CAF50', // Green for verified badges
    },
    
    // Gradient colors for modern design
    gradients: {
      primary: ['#2E7D32', '#4CAF50'],
      secondary: ['#FFD700', '#FFF176'],
      accent: ['#D32F2F', '#EF5350'],
      sunset: ['#FF8A65', '#FFD700'],
      ocean: ['#2196F3', '#4CAF50'],
    },
  },
  fonts: {
    // Enhanced typography system with better hierarchy
    display: {
      large: {
        fontFamily: 'System',
        fontSize: 32,
        fontWeight: '700',
        lineHeight: 40,
        letterSpacing: -0.5,
      },
      medium: {
        fontFamily: 'System',
        fontSize: 28,
        fontWeight: '700',
        lineHeight: 36,
        letterSpacing: -0.25,
      },
      small: {
        fontFamily: 'System',
        fontSize: 24,
        fontWeight: '700',
        lineHeight: 32,
        letterSpacing: 0,
      },
    },
    headline: {
      large: {
        fontFamily: 'System',
        fontSize: 22,
        fontWeight: '600',
        lineHeight: 28,
        letterSpacing: 0,
      },
      medium: {
        fontFamily: 'System',
        fontSize: 20,
        fontWeight: '600',
        lineHeight: 26,
        letterSpacing: 0,
      },
      small: {
        fontFamily: 'System',
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 24,
        letterSpacing: 0,
      },
    },
    title: {
      large: {
        fontFamily: 'System',
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 22,
        letterSpacing: 0.15,
      },
      medium: {
        fontFamily: 'System',
        fontSize: 14,
        fontWeight: '600',
        lineHeight: 20,
        letterSpacing: 0.1,
      },
      small: {
        fontFamily: 'System',
        fontSize: 12,
        fontWeight: '600',
        lineHeight: 18,
        letterSpacing: 0.1,
      },
    },
    body: {
      large: {
        fontFamily: 'System',
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 24,
        letterSpacing: 0.5,
      },
      medium: {
        fontFamily: 'System',
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 20,
        letterSpacing: 0.25,
      },
      small: {
        fontFamily: 'System',
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 16,
        letterSpacing: 0.4,
      },
    },
    label: {
      large: {
        fontFamily: 'System',
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 20,
        letterSpacing: 0.1,
      },
      medium: {
        fontFamily: 'System',
        fontSize: 12,
        fontWeight: '500',
        lineHeight: 16,
        letterSpacing: 0.5,
      },
      small: {
        fontFamily: 'System',
        fontSize: 11,
        fontWeight: '500',
        lineHeight: 16,
        letterSpacing: 0.5,
      },
    },
    // Legacy support
    regular: {
      fontFamily: 'System',
      fontWeight: '400',
    },
    medium: {
      fontFamily: 'System',
      fontWeight: '500',
    },
    bold: {
      fontFamily: 'System',
      fontWeight: '700',
    },
    light: {
      fontFamily: 'System',
      fontWeight: '300',
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    round: 50,
  },
  shadows: {
    small: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.15,
      shadowRadius: 6.27,
      elevation: 10,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.2,
      shadowRadius: 10.32,
      elevation: 16,
    },
  },
}; 