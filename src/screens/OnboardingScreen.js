import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme/theme';

const { width, height } = Dimensions.get('window');

const onboardingData = [
  {
    id: 1,
    title: 'Connect with Nigerians Worldwide',
    subtitle: 'Join a vibrant community of Nigerians at home and in the diaspora',
    icon: 'people',
    color: theme.colors.primary,
  },
  {
    id: 2,
    title: 'Professional Networking',
    subtitle: 'Find opportunities, share skills, and grow your career',
    icon: 'briefcase',
    color: theme.colors.secondary,
  },
  {
    id: 3,
    title: 'Cultural Celebration',
    subtitle: 'Share your culture, language, and traditions with pride',
    icon: 'flag',
    color: theme.colors.accent,
  },
];

export default function OnboardingScreen({ navigation }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.navigate('Login');
    }
  };

  const handleSkip = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[theme.colors.primary, theme.colors.deepGreen]}
        style={styles.gradient}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>🇳🇬 NaijaConnect</Text>
          <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(event) => {
            const index = Math.round(event.nativeEvent.contentOffset.x / width);
            setCurrentIndex(index);
          }}
          style={styles.scrollView}
        >
          {onboardingData.map((item, index) => (
            <View key={item.id} style={styles.slide}>
              <View style={styles.iconContainer}>
                <View style={[styles.iconBackground, { backgroundColor: item.color }]}>
                  <Ionicons name={item.icon} size={80} color={theme.colors.white} />
                </View>
              </View>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.subtitle}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Pagination */}
        <View style={styles.pagination}>
          {onboardingData.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                index === currentIndex && styles.paginationDotActive,
              ]}
            />
          ))}
        </View>

        {/* Bottom Buttons */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>
              {currentIndex === onboardingData.length - 1 ? 'Get Started' : 'Next'}
            </Text>
            <Ionicons
              name={currentIndex === onboardingData.length - 1 ? 'arrow-forward' : 'chevron-forward'}
              size={20}
              color={theme.colors.white}
            />
          </TouchableOpacity>

          <View style={styles.authButtons}>
            <TouchableOpacity
              style={styles.authButton}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.authButtonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.authButton, styles.registerButton]}
              onPress={() => navigation.navigate('Register')}
            >
              <Text style={[styles.authButtonText, styles.registerButtonText]}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.md,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.white,
  },
  skipButton: {
    padding: theme.spacing.sm,
  },
  skipText: {
    color: theme.colors.white,
    fontSize: 16,
    opacity: 0.8,
  },
  scrollView: {
    flex: 1,
  },
  slide: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
  iconContainer: {
    marginBottom: theme.spacing.xxl,
  },
  iconBackground: {
    width: 160,
    height: 160,
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.large,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.white,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  subtitle: {
    fontSize: 18,
    color: theme.colors.white,
    textAlign: 'center',
    opacity: 0.9,
    lineHeight: 26,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.spacing.lg,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.white,
    opacity: 0.4,
    marginHorizontal: 4,
  },
  paginationDotActive: {
    opacity: 1,
    width: 24,
  },
  bottomContainer: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
  nextButton: {
    backgroundColor: theme.colors.secondary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.lg,
    ...theme.shadows.medium,
  },
  nextButtonText: {
    color: theme.colors.black,
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: theme.spacing.sm,
  },
  authButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  authButton: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 2,
    borderColor: theme.colors.white,
    marginHorizontal: theme.spacing.sm,
  },
  registerButton: {
    backgroundColor: theme.colors.white,
  },
  authButtonText: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  registerButtonText: {
    color: theme.colors.primary,
  },
}); 