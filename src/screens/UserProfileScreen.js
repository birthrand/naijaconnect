import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  FlatList,
  RefreshControl,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSupabase } from '../contexts/SupabaseContext';

export default function UserProfileScreen({ navigation, route }) {
  const { user: currentUser, supabase } = useSupabase();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('posts');

  const userId = route.params?.userId || currentUser?.id;
  const isOwnProfile = userId === currentUser?.id;

  const loadProfile = async () => {
    try {
      setLoading(true);
      
      // Fetch user profile
      const { data: profileData, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (profileError) throw profileError;
      setProfile(profileData);

      // Fetch user posts
      const { data: postsData, error: postsError } = await supabase
        .from('posts')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (postsError) throw postsError;
      setPosts(postsData || []);
    } catch (error) {
      console.error('Error loading profile:', error);
      Alert.alert('Error', 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadProfile();
    setRefreshing(false);
  };

  useEffect(() => {
    loadProfile();
  }, [userId]);

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const postDate = new Date(dateString);
    const diffInMinutes = Math.floor((now - postDate) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return postDate.toLocaleDateString();
  };

  const getPostTypeIcon = (type) => {
    switch (type) {
      case 'community': return 'chatbubbles';
      case 'business': return 'briefcase';
      case 'event': return 'calendar';
      case 'listing': return 'pricetag';
      case 'job': return 'construct';
      default: return 'document-text';
    }
  };

  const getPostTypeColor = (type) => {
    switch (type) {
      case 'community': return '#667eea';
      case 'business': return '#f093fb';
      case 'event': return '#4facfe';
      case 'listing': return '#43e97b';
      case 'job': return '#fa709a';
      default: return '#667eea';
    }
  };

  const renderPost = ({ item }) => {
    const postTypeColor = getPostTypeColor(item.type);
    const postTypeIcon = getPostTypeIcon(item.type);

    return (
      <View style={styles.postCard}>
        {/* Post Header */}
        <View style={styles.postHeader}>
          <TouchableOpacity 
            style={styles.postUserInfo}
            onPress={() => navigation.navigate('UserProfile', { userId: item.user_id })}
          >
            <Image 
              source={{ 
                uri: profile?.avatar_url || `https://ui-avatars.com/api/?name=${profile?.full_name || 'User'}&background=667eea&color=ffffff&size=100` 
              }} 
              style={styles.postAvatar} 
            />
            <View style={styles.postUserDetails}>
              <Text style={styles.postUserName}>
                {profile?.full_name || 'Anonymous User'}
              </Text>
              <Text style={styles.postTime}>
                {formatTimeAgo(item.created_at)}
              </Text>
            </View>
          </TouchableOpacity>
          
          <View style={styles.postTypeBadge}>
            <Ionicons name={postTypeIcon} size={16} color={postTypeColor} />
            <Text style={[styles.postTypeText, { color: postTypeColor }]}>
              {item.type}
            </Text>
          </View>
        </View>

        {/* Post Content */}
        <View style={styles.postContent}>
          {item.title && (
            <Text style={styles.postTitle}>{item.title}</Text>
          )}
          <Text style={styles.postText}>{item.content}</Text>
          
          {/* Post Images */}
          {item.images && item.images.length > 0 && (
            <View style={styles.postImages}>
              {item.images.slice(0, 3).map((image, index) => (
                <Image 
                  key={index} 
                  source={{ uri: image }} 
                  style={[
                    styles.postImage, 
                    item.images.length === 1 ? styles.singleImage : styles.multipleImage
                  ]} 
                />
              ))}
              {item.images.length > 3 && (
                <View style={styles.moreImagesOverlay}>
                  <Text style={styles.moreImagesText}>+{item.images.length - 3}</Text>
                </View>
              )}
            </View>
          )}

          {/* Post Metadata */}
          {(item.location || item.price || item.event_date) && (
            <View style={styles.postMetadata}>
              {item.location && (
                <View style={styles.metadataItem}>
                  <Ionicons name="location" size={14} color="#666666" />
                  <Text style={styles.metadataText}>{item.location}</Text>
                </View>
              )}
              {item.price && (
                <View style={styles.metadataItem}>
                  <Ionicons name="pricetag" size={14} color="#666666" />
                  <Text style={styles.metadataText}>₦{item.price}</Text>
                </View>
              )}
              {item.event_date && (
                <View style={styles.metadataItem}>
                  <Ionicons name="calendar" size={14} color="#666666" />
                  <Text style={styles.metadataText}>
                    {new Date(item.event_date).toLocaleDateString()}
                  </Text>
                </View>
              )}
            </View>
          )}
        </View>

        {/* Post Actions */}
        <View style={styles.postActions}>
          <TouchableOpacity style={styles.postAction}>
            <Ionicons name="heart-outline" size={20} color="#666666" />
            <Text style={styles.actionText}>
              {item.likes_count || 0}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.postAction}>
            <Ionicons name="chatbubble-outline" size={20} color="#666666" />
            <Text style={styles.actionText}>
              {item.comments_count || 0}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.postAction}>
            <Ionicons name="share-outline" size={20} color="#666666" />
            <Text style={styles.actionText}>
              {item.shares_count || 0}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons name="document-text-outline" size={64} color="#666666" />
      <Text style={styles.emptyStateTitle}>No posts yet</Text>
      <Text style={styles.emptyStateSubtitle}>
        {isOwnProfile 
          ? "You haven't shared anything yet. Create your first post!"
          : "This user hasn't shared anything yet."
        }
      </Text>
      {isOwnProfile && (
        <TouchableOpacity 
          style={styles.createPostButton}
          onPress={() => navigation.navigate('Post')}
        >
          <Text style={styles.createPostButtonText}>Create Your First Post</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient colors={['#121212', '#1E1E1E']} style={styles.background}>
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading profile...</Text>
          </View>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#121212', '#1E1E1E']}
        style={styles.background}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#ffffff" />
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>
            {isOwnProfile ? 'My Profile' : 'Profile'}
          </Text>
          
          <View style={styles.headerActions}>
            {isOwnProfile && (
              <TouchableOpacity 
                style={styles.headerAction}
                onPress={() => navigation.navigate('EditProfile')}
              >
                <Ionicons name="settings-outline" size={24} color="#667eea" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Profile Info */}
        <View style={styles.profileSection}>
          <Image 
            source={{ 
              uri: profile?.avatar_url || `https://ui-avatars.com/api/?name=${profile?.full_name || 'User'}&background=667eea&color=ffffff&size=200` 
            }} 
            style={styles.profileAvatar} 
          />
          
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>
              {profile?.full_name || 'Anonymous User'}
            </Text>
            <Text style={styles.profileUsername}>
              @{profile?.username || 'user'}
            </Text>
            {profile?.bio && (
              <Text style={styles.profileBio}>{profile.bio}</Text>
            )}
            {profile?.location && (
              <View style={styles.profileLocation}>
                <Ionicons name="location" size={16} color="#666666" />
                <Text style={styles.locationText}>{profile.location}</Text>
              </View>
            )}
          </View>

          {/* Profile Stats */}
          <View style={styles.profileStats}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{posts.length}</Text>
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
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'posts' && styles.activeTab]}
            onPress={() => setActiveTab('posts')}
          >
            <Ionicons 
              name="document-text" 
              size={20} 
              color={activeTab === 'posts' ? '#667eea' : '#666666'} 
            />
            <Text style={[styles.tabText, activeTab === 'posts' && styles.activeTabText]}>
              Posts
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'about' && styles.activeTab]}
            onPress={() => setActiveTab('about')}
          >
            <Ionicons 
              name="information-circle" 
              size={20} 
              color={activeTab === 'about' ? '#667eea' : '#666666'} 
            />
            <Text style={[styles.tabText, activeTab === 'about' && styles.activeTabText]}>
              About
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        {activeTab === 'posts' ? (
          <FlatList
            style={styles.content}
            data={posts}
            renderItem={renderPost}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor="#667eea"
                colors={['#667eea']}
              />
            }
            ListEmptyComponent={renderEmptyState}
            contentContainerStyle={posts.length === 0 ? styles.emptyContainer : null}
          />
        ) : (
          <View style={styles.aboutSection}>
            <View style={styles.aboutCard}>
              <Text style={styles.aboutTitle}>About</Text>
              <Text style={styles.aboutText}>
                {profile?.bio || 'No bio available.'}
              </Text>
              
              {profile?.website && (
                <View style={styles.aboutItem}>
                  <Ionicons name="globe" size={16} color="#667eea" />
                  <Text style={styles.aboutItemText}>{profile.website}</Text>
                </View>
              )}
              
              <View style={styles.aboutItem}>
                <Ionicons name="calendar" size={16} color="#667eea" />
                <Text style={styles.aboutItemText}>
                  Joined {profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : 'Recently'}
                </Text>
              </View>
            </View>
          </View>
        )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#ffffff',
    opacity: 0.7,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
    paddingTop: 16,
  },
  backButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerAction: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  profileSection: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  profileAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 16,
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: 24,
  },
  profileName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  profileUsername: {
    fontSize: 16,
    color: '#ffffff',
    opacity: 0.7,
    marginBottom: 8,
  },
  profileBio: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 12,
  },
  profileLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 4,
  },
  profileStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666666',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#333333',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginHorizontal: 4,
    borderRadius: 12,
    backgroundColor: '#1E1E1E',
  },
  activeTab: {
    backgroundColor: '#667eea',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666666',
    marginLeft: 8,
  },
  activeTabText: {
    color: '#ffffff',
  },
  content: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    alignItems: 'center',
    paddingHorizontal: 48,
    paddingVertical: 64,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtitle: {
    fontSize: 16,
    color: '#ffffff',
    opacity: 0.7,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  createPostButton: {
    backgroundColor: '#667eea',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
  },
  createPostButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  aboutSection: {
    flex: 1,
    paddingHorizontal: 24,
  },
  aboutCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 20,
  },
  aboutTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 16,
  },
  aboutText: {
    fontSize: 16,
    color: '#ffffff',
    lineHeight: 24,
    marginBottom: 20,
  },
  aboutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  aboutItemText: {
    fontSize: 16,
    color: '#ffffff',
    marginLeft: 12,
  },
  postCard: {
    backgroundColor: '#1E1E1E',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#333333',
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  postUserInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  postAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  postUserDetails: {
    flex: 1,
  },
  postUserName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  postTime: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.6,
    marginTop: 2,
  },
  postTypeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  postTypeText: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
    textTransform: 'capitalize',
  },
  postContent: {
    marginBottom: 16,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  postText: {
    fontSize: 16,
    color: '#ffffff',
    lineHeight: 24,
    marginBottom: 12,
  },
  postImages: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 4,
  },
  postImage: {
    borderRadius: 8,
  },
  singleImage: {
    width: '100%',
    height: 200,
  },
  multipleImage: {
    width: '32%',
    height: 100,
  },
  moreImagesOverlay: {
    position: 'absolute',
    right: 4,
    bottom: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  moreImagesText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  postMetadata: {
    marginTop: 8,
  },
  metadataItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  metadataText: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 6,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#333333',
    paddingTop: 12,
  },
  postAction: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  actionText: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 6,
  },
}); 