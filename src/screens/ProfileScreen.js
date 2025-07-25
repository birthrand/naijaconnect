import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme/theme';
import { DESIGN_SYSTEM, LAYOUT_PATTERNS } from '../theme/designSystem';
import {
  Header,
  SearchInput,
  Card,
  Button,
  Badge,
  IconButton,
  HeadlineText,
  TitleText,
  BodyText,
  LabelText,
  Spacer,
  Avatar,
} from '../components/DesignSystemComponents';

const profileStats = [
  { label: 'Posts', value: '24' },
  { label: 'Followers', value: '156' },
  { label: 'Following', value: '89' },
];

const profileMenuItems = [
  {
    id: '1',
    title: 'Edit Profile',
    icon: 'person-outline',
    color: theme.colors.primary,
  },
  {
    id: '2',
    title: 'My Posts',
    icon: 'document-text-outline',
    color: theme.colors.secondary,
  },
  {
    id: '3',
    title: 'Saved Items',
    icon: 'bookmark-outline',
    color: theme.colors.accent,
  },
  {
    id: '4',
    title: 'My Events',
    icon: 'calendar-outline',
    color: theme.colors.info,
  },
  {
    id: '5',
    title: 'Business Directory',
    icon: 'business-outline',
    color: theme.colors.warmOrange,
  },
  {
    id: '6',
    title: 'Job Board',
    icon: 'briefcase-outline',
    color: theme.colors.success,
  },
  {
    id: '7',
    title: 'Groups',
    icon: 'people-outline',
    color: theme.colors.earthBrown,
  },
  {
    id: '8',
    title: 'Settings',
    icon: 'settings-outline',
    color: theme.colors.gray,
  },
];

export default function ProfileScreen({ navigation }) {
  return (
    <SafeAreaView style={[LAYOUT_PATTERNS.screen.container, { paddingTop: 0 }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face' }}
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.editImageButton}>
              <Ionicons name="camera" size={16} color={theme.colors.white} />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.userName}>Adebayo Johnson</Text>
          <Text style={styles.userLocation}>📍 Lagos, Nigeria</Text>
          <Text style={styles.userBio}>
            Software Engineer | Tech Enthusiast | Proud Nigerian 🇳🇬
          </Text>
          
          <View style={styles.statsContainer}>
            {profileStats.map((stat, index) => (
              <View key={index} style={styles.statItem}>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
          
          <TouchableOpacity style={styles.editProfileButton}>
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickActionButton}>
            <Ionicons name="add-circle" size={24} color={theme.colors.primary} />
            <Text style={styles.quickActionText}>New Post</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionButton}>
            <Ionicons name="calendar" size={24} color={theme.colors.secondary} />
            <Text style={styles.quickActionText}>Create Event</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionButton}>
            <Ionicons name="business" size={24} color={theme.colors.accent} />
            <Text style={styles.quickActionText}>Add Business</Text>
          </TouchableOpacity>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {profileMenuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={() => {
                if (item.title === 'Settings') {
                  navigation.navigate('Settings');
                } else if (item.title === 'Business Directory') {
                  navigation.navigate('BusinessDirectory');
                } else if (item.title === 'Job Board') {
                  navigation.navigate('JobBoard');
                } else if (item.title === 'Groups') {
                  navigation.navigate('Groups');
                }
              }}
            >
              <View style={styles.menuItemLeft}>
                <View style={[styles.menuIcon, { backgroundColor: item.color }]}>
                  <Ionicons name={item.icon} size={20} color={theme.colors.white} />
                </View>
                <Text style={styles.menuItemTitle}>{item.title}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={theme.colors.gray} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Cultural Section */}
        <View style={styles.culturalSection}>
          <Text style={styles.sectionTitle}>Cultural Identity</Text>
          <View style={styles.culturalInfo}>
            <View style={styles.culturalItem}>
              <Text style={styles.culturalLabel}>Tribe</Text>
              <Text style={styles.culturalValue}>Yoruba</Text>
            </View>
            <View style={styles.culturalItem}>
              <Text style={styles.culturalLabel}>Language</Text>
              <Text style={styles.culturalValue}>Yoruba, English</Text>
            </View>
            <View style={styles.culturalItem}>
              <Text style={styles.culturalLabel}>State of Origin</Text>
              <Text style={styles.culturalValue}>Oyo State</Text>
            </View>
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={20} color={theme.colors.accent} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xl,
    backgroundColor: theme.colors.white,
    marginBottom: theme.spacing.md,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: theme.spacing.md,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: theme.colors.primary,
  },
  editImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: theme.colors.primary,
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: theme.colors.white,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.black,
    marginBottom: theme.spacing.xs,
  },
  userLocation: {
    fontSize: 16,
    color: theme.colors.gray,
    marginBottom: theme.spacing.sm,
  },
  userBio: {
    fontSize: 16,
    color: theme.colors.darkGray,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
    lineHeight: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: theme.spacing.xl,
    marginBottom: theme.spacing.lg,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.black,
  },
  statLabel: {
    fontSize: 14,
    color: theme.colors.gray,
    marginTop: theme.spacing.xs,
  },
  editProfileButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
  },
  editProfileText: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: theme.colors.white,
    paddingVertical: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  quickActionButton: {
    alignItems: 'center',
  },
  quickActionText: {
    fontSize: 12,
    color: theme.colors.gray,
    marginTop: theme.spacing.xs,
  },
  menuContainer: {
    backgroundColor: theme.colors.white,
    marginBottom: theme.spacing.md,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.lightGray,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  menuItemTitle: {
    fontSize: 16,
    color: theme.colors.black,
    fontWeight: '500',
  },
  culturalSection: {
    backgroundColor: theme.colors.white,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.black,
    marginBottom: theme.spacing.md,
  },
  culturalInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  culturalItem: {
    flex: 1,
    alignItems: 'center',
  },
  culturalLabel: {
    fontSize: 14,
    color: theme.colors.gray,
    marginBottom: theme.spacing.xs,
  },
  culturalValue: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.colors.black,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.white,
    paddingVertical: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
  logoutText: {
    fontSize: 16,
    color: theme.colors.accent,
    fontWeight: '500',
    marginLeft: theme.spacing.sm,
  },
}); 