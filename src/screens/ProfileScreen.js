import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme/theme';

const { width } = Dimensions.get('window');

const mockProfile = {
  name: 'Veronica Margareth',
  username: '@veromarge',
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face',
  bio: 'Product Designer. Building for Africa. Lagos, Nigeria.',
  followers: 1200,
  following: 340,
  posts: 56,
  verified: true,
  location: 'Lagos, Nigeria',
  website: 'veromarge.com',
};

const menuItems = [
  { icon: 'person', label: 'Edit Profile' },
  { icon: 'settings', label: 'Settings' },
  { icon: 'lock-closed', label: 'Privacy' },
  { icon: 'help-circle', label: 'Help & Support' },
  { icon: 'log-out', label: 'Log Out' },
];

export default function ProfileScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#121212', '#1E1E1E']}
        style={styles.background}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Profile</Text>
            <TouchableOpacity style={styles.headerAction} onPress={() => navigation.navigate('Settings')}>
              <Ionicons name="settings" size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>

          {/* Profile Card */}
          <View style={styles.profileCard}>
            <View style={styles.avatarContainer}>
              <Image source={{ uri: mockProfile.avatar }} style={styles.avatar} />
              {mockProfile.verified && (
                <View style={styles.verifiedBadge}>
                  <Ionicons name="checkmark-circle" size={20} color="#43e97b" />
                </View>
              )}
            </View>
            <Text style={styles.name}>{mockProfile.name}</Text>
            <Text style={styles.username}>{mockProfile.username}</Text>
            <Text style={styles.bio}>{mockProfile.bio}</Text>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{mockProfile.posts}</Text>
                <Text style={styles.statLabel}>Posts</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{mockProfile.followers}</Text>
                <Text style={styles.statLabel}>Followers</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{mockProfile.following}</Text>
                <Text style={styles.statLabel}>Following</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>

          {/* Menu */}
          <View style={styles.menuContainer}>
            {menuItems.map((item, idx) => (
              <TouchableOpacity key={item.label} style={styles.menuItem}>
                <Ionicons name={item.icon} size={20} color="#667eea" style={styles.menuIcon} />
                <Text style={styles.menuLabel}>{item.label}</Text>
                <Ionicons name="chevron-forward" size={20} color="#666666" style={styles.menuChevron} />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  background: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 48,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
    paddingTop: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: -0.5,
  },
  headerAction: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  profileCard: {
    backgroundColor: '#232323',
    borderRadius: 20,
    marginHorizontal: 24,
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 16,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 3,
    borderColor: '#667eea',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#121212',
    borderRadius: 12,
    padding: 2,
    borderWidth: 2,
    borderColor: '#232323',
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 2,
  },
  username: {
    fontSize: 16,
    color: '#667eea',
    marginBottom: 8,
  },
  bio: {
    fontSize: 14,
    color: '#cccccc',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    width: '100%',
    paddingHorizontal: 16,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: '#cccccc',
  },
  primaryButton: {
    backgroundColor: '#667eea',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  menuContainer: {
    backgroundColor: '#232323',
    borderRadius: 20,
    marginHorizontal: 24,
    paddingVertical: 8,
    paddingHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#1E1E1E',
  },
  menuIcon: {
    marginRight: 16,
  },
  menuLabel: {
    fontSize: 16,
    color: '#ffffff',
    flex: 1,
  },
  menuChevron: {
    marginLeft: 8,
  },
}); 