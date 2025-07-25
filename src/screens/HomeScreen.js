import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
  RefreshControl,
  FlatList,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { useSupabase } from '../contexts/SupabaseContext';
import { seedSampleData } from '../utils/seedData';
import ProfileSidebar from '../components/ProfileSidebar';
import { useSwipeGesture } from '../hooks/useSwipeGesture';

export default function HomeScreen({ navigation }) {
  const { user, supabase } = useSupabase();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const { translateX, onGestureEvent, onHandlerStateChange } = useSwipeGesture(() => {
    setIsSidebarVisible(true);
  });

  const loadPosts = async () => {
    try {
      setLoading(true);
      
      // Fetch latest posts with user information
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          users!posts_user_id_fkey (
            id,
            full_name,
            username,
            avatar_url
          )
        `)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      
      setPosts(data || []);
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadPosts();
    setRefreshing(false);
  };

  const handleSeedData = async () => {
    try {
      Alert.alert(
        'Seed Sample Data',
        'This will add sample posts with media to your feed. Continue?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Seed Data',
            onPress: async () => {
              const result = await seedSampleData();
              if (result.success) {
                Alert.alert('Success', 'Sample data added! Pull to refresh to see the new posts.');
                await loadPosts();
              } else {
                Alert.alert('Error', 'Failed to seed sample data.');
              }
            }
          }
        ]
      );
    } catch (error) {
      console.error('Error seeding data:', error);
      Alert.alert('Error', 'Failed to seed sample data.');
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

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
    const postUser = item.users;
    const postTypeColor = getPostTypeColor(item.type);
    const postTypeIcon = getPostTypeIcon(item.type);

    return (
      <View style={styles.postCard}>
        {/* Post Header */}
        <View style={styles.postHeader}>
          <TouchableOpacity 
            style={styles.postUserInfo}
            onPress={() => navigation.navigate('UserProfile', { userId: postUser?.id })}
          >
            <Image 
              source={{ 
                uri: postUser?.avatar_url || `https://ui-avatars.com/api/?name=${postUser?.full_name || 'User'}&background=667eea&color=ffffff&size=100` 
              }} 
              style={styles.postAvatar} 
            />
            <View style={styles.postUserDetails}>
              <Text style={styles.postUserName}>
                {postUser?.full_name || 'Anonymous User'}
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
                  resizeMode="cover"
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
                  <Text style={styles.metadataText}>₦{item.price.toLocaleString()}</Text>
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
      <Ionicons name="newspaper-outline" size={64} color="#666666" />
      <Text style={styles.emptyStateTitle}>No posts yet</Text>
      <Text style={styles.emptyStateSubtitle}>
        Be the first to share something with your community!
      </Text>
      <View style={styles.emptyStateActions}>
        <TouchableOpacity 
          style={styles.createPostButton}
          onPress={() => navigation.navigate('Post')}
        >
          <Text style={styles.createPostButtonText}>Create Your First Post</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.seedDataButton}
          onPress={handleSeedData}
        >
          <Text style={styles.seedDataButtonText}>Add Sample Posts</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#121212', '#1E1E1E']}
        style={styles.background}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity 
              style={styles.profileButton}
              onPress={() => setIsSidebarVisible(true)}
            >
              <Image 
                source={{ 
                  uri: `https://ui-avatars.com/api/?name=${user?.email?.split('@')[0] || 'User'}&background=667eea&color=ffffff&size=100` 
                }} 
                style={styles.profileAvatar} 
              />
            </TouchableOpacity>
          </View>
          
          <View style={styles.headerActions}>
            <TouchableOpacity 
              style={styles.searchButton}
              onPress={() => alert('Search coming soon!')}
            >
              <Ionicons name="search" size={20} color="#ffffff" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.headerAction}
              onPress={() => navigation.navigate('Post')}
            >
              <Ionicons name="add" size={24} color="#667eea" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Posts Feed with Swipe Gesture */}
        <PanGestureHandler
          onGestureEvent={onGestureEvent}
          onHandlerStateChange={onHandlerStateChange}
        >
          <View style={styles.feedContainer}>
            <FlatList
              style={styles.feed}
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
          </View>
        </PanGestureHandler>

        {/* Profile Sidebar */}
        <ProfileSidebar
          isVisible={isSidebarVisible}
          onClose={() => setIsSidebarVisible(false)}
          navigation={navigation}
        />
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 20,
    paddingTop: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  profileButton: {
    marginRight: 16,
  },
  profileAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#667eea',
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.7,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginRight: 12,
  },
  headerAction: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  feedContainer: {
    flex: 1,
  },
  feed: {
    flex: 1,
  },
  postCard: {
    backgroundColor: '#1E1E1E',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    marginBottom: 2,
  },
  postTime: {
    fontSize: 12,
    color: '#ffffff',
    opacity: 0.6,
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
    gap: 4,
    marginBottom: 12,
  },
  postImage: {
    borderRadius: 8,
  },
  singleImage: {
    width: '100%',
    height: 200,
  },
  multipleImage: {
    flex: 1,
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 12,
  },
  metadataItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metadataText: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 4,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
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
    marginLeft: 4,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  emptyStateTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#ffffff',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtitle: {
    fontSize: 16,
    color: '#ffffff',
    opacity: 0.6,
    textAlign: 'center',
    marginBottom: 32,
  },
  emptyStateActions: {
    width: '100%',
  },
  createPostButton: {
    backgroundColor: '#667eea',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  createPostButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  seedDataButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    alignItems: 'center',
  },
  seedDataButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
  },
}); 