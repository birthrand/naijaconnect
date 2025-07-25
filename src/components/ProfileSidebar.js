import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSupabase } from '../contexts/SupabaseContext';

const { width, height } = Dimensions.get('window');

const ProfileSidebar = ({ isVisible, onClose, navigation }) => {
  const { user, signOut } = useSupabase();

  const handleSignOut = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            try {
              await signOut();
              onClose();
            } catch (error) {
              Alert.alert('Error', 'Failed to sign out. Please try again.');
            }
          },
        },
      ]
    );
  };

  const menuItems = [
    {
      id: 'profile',
      title: 'My Profile',
      subtitle: 'View and edit your profile',
      icon: 'person',
      gradient: ['#667eea', '#764ba2'],
      onPress: () => {
        navigation.navigate('UserProfile', { userId: user?.id });
        onClose();
      },
    },
    {
      id: 'edit',
      title: 'Edit Profile',
      subtitle: 'Update your information',
      icon: 'create',
      gradient: ['#f093fb', '#f5576c'],
      onPress: () => {
        navigation.navigate('EditProfile');
        onClose();
      },
    },
    {
      id: 'posts',
      title: 'My Posts',
      subtitle: 'View your shared content',
      icon: 'document-text',
      gradient: ['#4facfe', '#00f2fe'],
      onPress: () => {
        navigation.navigate('UserProfile', { userId: user?.id });
        onClose();
      },
    },
    {
      id: 'saved',
      title: 'Saved Posts',
      subtitle: 'Your bookmarked content',
      icon: 'bookmark',
      gradient: ['#43e97b', '#38f9d7'],
      onPress: () => {
        Alert.alert('Coming Soon', 'Saved posts feature will be available soon!');
      },
    },
    {
      id: 'settings',
      title: 'Settings',
      subtitle: 'App preferences and privacy',
      icon: 'settings',
      gradient: ['#fa709a', '#fee140'],
      onPress: () => {
        Alert.alert('Coming Soon', 'Settings will be available soon!');
      },
    },
    {
      id: 'help',
      title: 'Help & Support',
      subtitle: 'Get help and contact us',
      icon: 'help-circle',
      gradient: ['#a8edea', '#fed6e3'],
      onPress: () => {
        navigation.navigate('HelpSupport');
        onClose();
      },
    },
  ];

  const quickActions = [
    {
      id: 'invite',
      title: 'Invite Friends',
      icon: 'share-social',
      color: '#667eea',
      onPress: () => {
        Alert.alert('Invite Friends', 'Share Jappa with your friends!');
      },
    },
    {
      id: 'feedback',
      title: 'Send Feedback',
      icon: 'chatbubble',
      color: '#4facfe',
      onPress: () => {
        Alert.alert('Feedback', 'We\'d love to hear from you!');
      },
    },
    {
      id: 'rate',
      title: 'Rate App',
      icon: 'star',
      color: '#fa709a',
      onPress: () => {
        Alert.alert('Rate App', 'Rate Jappa on the app store!');
      },
    },
  ];

  if (!isVisible) return null;

  return (
    <View style={styles.overlay}>
      <TouchableOpacity style={styles.backdrop} onPress={onClose} />
      <View style={styles.sidebar}>
        <LinearGradient
          colors={['#121212', '#1E1E1E']}
          style={styles.background}
        >
          <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Ionicons name="close" size={24} color="#ffffff" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Profile</Text>
              <View style={styles.headerSpacer} />
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
              {/* User Profile Section */}
              <View style={styles.profileSection}>
                <LinearGradient
                  colors={['#667eea', '#764ba2']}
                  style={styles.profileGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Image
                    source={{
                      uri: `https://ui-avatars.com/api/?name=${user?.email?.split('@')[0] || 'User'}&background=667eea&color=ffffff&size=200`,
                    }}
                    style={styles.profileAvatar}
                  />
                  <Text style={styles.profileName}>
                    {user?.user_metadata?.full_name || 'User'}
                  </Text>
                  <Text style={styles.profileEmail}>
                    {user?.email}
                  </Text>
                  <View style={styles.profileStats}>
                    <View style={styles.statItem}>
                      <Text style={styles.statNumber}>0</Text>
                      <Text style={styles.statLabel}>Posts</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                      <Text style={styles.statNumber}>0</Text>
                      <Text style={styles.statLabel}>Followers</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                      <Text style={styles.statNumber}>0</Text>
                      <Text style={styles.statLabel}>Following</Text>
                    </View>
                  </View>
                </LinearGradient>
              </View>

              {/* Menu Items */}
              <View style={styles.menuSection}>
                <Text style={styles.sectionTitle}>Menu</Text>
                {menuItems.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={styles.menuItem}
                    onPress={item.onPress}
                  >
                    <LinearGradient
                      colors={item.gradient}
                      style={styles.menuItemGradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                    >
                      <Ionicons name={item.icon} size={24} color="#ffffff" />
                    </LinearGradient>
                    <View style={styles.menuItemContent}>
                      <Text style={styles.menuItemTitle}>{item.title}</Text>
                      <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#666666" />
                  </TouchableOpacity>
                ))}
              </View>

              {/* Quick Actions */}
              <View style={styles.quickActionsSection}>
                <Text style={styles.sectionTitle}>Quick Actions</Text>
                <View style={styles.quickActionsGrid}>
                  {quickActions.map((action) => (
                    <TouchableOpacity
                      key={action.id}
                      style={styles.quickActionItem}
                      onPress={action.onPress}
                    >
                      <View style={[styles.quickActionIcon, { backgroundColor: action.color }]}>
                        <Ionicons name={action.icon} size={20} color="#ffffff" />
                      </View>
                      <Text style={styles.quickActionTitle}>{action.title}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Sign Out Button */}
              <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
                <LinearGradient
                  colors={['#ff4757', '#ff3742']}
                  style={styles.signOutGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Ionicons name="log-out" size={20} color="#ffffff" />
                  <Text style={styles.signOutText}>Sign Out</Text>
                </LinearGradient>
              </TouchableOpacity>

              {/* App Version */}
              <View style={styles.versionSection}>
                <Text style={styles.versionText}>Jappa v1.0.0</Text>
                <Text style={styles.versionSubtext}>Made with ❤️ in Nigeria</Text>
              </View>
            </ScrollView>
          </SafeAreaView>
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width * 0.85,
    height: '100%',
    backgroundColor: '#121212',
    borderTopRightRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000000',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  background: {
    flex: 1,
    borderTopRightRadius: 24,
    borderBottomRightRadius: 24,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 20,
    paddingTop: 16,
  },
  closeButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  profileSection: {
    marginBottom: 32,
  },
  profileGradient: {
    marginHorizontal: 24,
    padding: 24,
    borderRadius: 20,
    alignItems: 'center',
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  profileName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.8,
    marginBottom: 20,
  },
  profileStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
  },
  statLabel: {
    fontSize: 12,
    color: '#ffffff',
    opacity: 0.8,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginHorizontal: 16,
  },
  menuSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 16,
    paddingHorizontal: 24,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    marginBottom: 8,
  },
  menuItemGradient: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  menuItemContent: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    marginBottom: 2,
  },
  menuItemSubtitle: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.6,
  },
  quickActionsSection: {
    marginBottom: 32,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 24,
  },
  quickActionItem: {
    alignItems: 'center',
    flex: 1,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  quickActionTitle: {
    fontSize: 12,
    color: '#ffffff',
    textAlign: 'center',
  },
  signOutButton: {
    marginHorizontal: 24,
    marginBottom: 32,
  },
  signOutGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 20,
  },
  signOutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginLeft: 8,
  },
  versionSection: {
    alignItems: 'center',
    paddingBottom: 32,
  },
  versionText: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.6,
  },
  versionSubtext: {
    fontSize: 12,
    color: '#ffffff',
    opacity: 0.4,
    marginTop: 4,
  },
});

export default ProfileSidebar; 