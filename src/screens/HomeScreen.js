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

// Sample data for events
const sampleEvents = [
  {
    id: 'event-1',
    type: 'event',
    title: 'Lagos Tech Meetup 2024',
    description: 'Join us for the biggest tech gathering in Lagos',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=200&fit=crop',
    date: '2024-02-15',
    time: '6:00 PM',
    location: 'Victoria Island, Lagos',
    attendees: 234,
    price: 'Free',
  },
  {
    id: 'event-2',
    type: 'event',
    title: 'Abuja Business Summit',
    description: 'Network with top business leaders in Abuja',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=200&fit=crop',
    date: '2024-02-20',
    time: '9:00 AM',
    location: 'Wuse Zone 2, Abuja',
    attendees: 156,
    price: '₦5,000',
  },
  {
    id: 'event-3',
    type: 'event',
    title: 'Lagos Fashion Week',
    description: 'The most stylish event of the year is back!',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=200&fit=crop',
    date: '2024-02-25',
    time: '7:00 PM',
    location: 'Eko Hotel, Lagos',
    attendees: 450,
    price: '₦15,000',
  },
  {
    id: 'event-4',
    type: 'event',
    title: 'Nigerian Food Festival',
    description: 'Celebrate the best of Nigerian cuisine',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=200&fit=crop',
    date: '2024-02-28',
    time: '12:00 PM',
    location: 'Terra Kulture, Lagos',
    attendees: 320,
    price: '₦3,000',
  },
];

export default function HomeScreen({ navigation }) {
  const { user, supabase } = useSupabase();
  const [posts, setPosts] = useState([]);
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('posts'); // 'posts', 'spaces', 'events'

  const { translateX, onGestureEvent, onHandlerStateChange } = useSwipeGesture(() => {
    setIsSidebarVisible(true);
  });

  const loadPosts = async () => {
    try {
      setLoading(true);
      
      // Fetch latest posts with user information
      const { data: postsData, error: postsError } = await supabase
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

      if (postsError) throw postsError;
      
      // Fetch spaces with host information
      const { data: spacesData, error: spacesError } = await supabase
        .from('spaces')
        .select(`
          *,
          users!spaces_host_id_fkey (
            id,
            full_name,
            username,
            avatar_url
          )
        `)
        .order('created_at', { ascending: false })
        .limit(10);

      if (spacesError) throw spacesError;
      
      setPosts(postsData || []);
      setSpaces(spacesData || []);
    } catch (error) {
      console.error('Error loading data:', error);
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

  const handleMediaTap = (post, postIndex) => {
    if (post.images && post.images.length > 0) {
      // Get all posts with media for the current tab
      let mediaPosts = [];
      switch (activeTab) {
        case 'posts':
          mediaPosts = posts.filter(p => p.images && p.images.length > 0);
          break;
        case 'spaces':
          mediaPosts = spaces.filter(s => s.images && s.images.length > 0);
          break;
        case 'events':
          mediaPosts = sampleEvents.filter(e => e.images && e.images.length > 0);
          break;
        default:
          mediaPosts = posts.filter(p => p.images && p.images.length > 0);
      }
      
      // Find the index of the tapped post in the media posts array
      const mediaPostIndex = mediaPosts.findIndex(p => p.id === post.id);
      
      if (mediaPostIndex !== -1) {
        navigation.navigate('MediaViewer', {
          posts: mediaPosts,
          initialPostIndex: mediaPostIndex,
        });
      }
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

  const renderPost = ({ item, index }) => {
    const postUser = item.users;
    const postTypeColor = getPostTypeColor(item.type);
    const postTypeIcon = getPostTypeIcon(item.type);

    return (
      <View style={styles.postCard}>
        {/* Post Header */}
        <View style={styles.postHeader}>
          <View style={styles.postUserInfo}>
            <Image 
              source={{ 
                uri: postUser?.avatar_url || `https://ui-avatars.com/api/?name=${postUser?.full_name || 'User'}&background=667eea&color=ffffff&size=100` 
              }} 
              style={styles.postAvatar} 
            />
            <View style={styles.postUserDetails}>
              <View style={styles.postUserName}>
                <Text style={styles.postUserNameText}>
                  {postUser?.full_name || 'Anonymous User'}
                </Text>
              </View>
              <Text style={styles.postLocation}>
                {item.location || 'Lagos'} • {formatTimeAgo(item.created_at)}
              </Text>
            </View>
          </View>
          <View style={styles.postActions}>
            <View style={styles.postTypeBadge}>
              <Ionicons name={postTypeIcon} size={16} color={postTypeColor} />
              <Text style={[styles.postTypeText, { color: postTypeColor }]}>
                {item.type}
              </Text>
            </View>
          </View>
        </View>

        {/* Post Content */}
        <Text style={styles.postContent}>
          {item.title && (
            <Text style={styles.postTitle}>{item.title}{'\n'}</Text>
          )}
          {item.content}
        </Text>
        
        {/* Post Images */}
        {item.images && item.images.length > 0 && (
          <TouchableOpacity
            style={styles.postImages}
            onPress={() => handleMediaTap(item, index)}
            activeOpacity={0.9}
          >
            {item.images.slice(0, 3).map((image, index) => (
              <Image
                key={index}
                source={{ uri: image }}
                style={[
                  styles.postImage,
                  item.images.length === 1 ? styles.singleImage : styles.multipleImage,
                ]}
                resizeMode="cover"
              />
            ))}
            {item.images.length > 3 && (
              <View style={[styles.multipleImage, styles.moreImagesOverlay]}>
                <Text style={styles.moreImagesText}>+{item.images.length - 3}</Text>
              </View>
            )}
          </TouchableOpacity>
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

        {/* Post Actions */}
        <View style={styles.postActions}>
          <TouchableOpacity style={styles.postAction}>
            <Ionicons name="heart-outline" size={20} color="#666666" />
            <Text style={styles.postActionText}>
              {item.likes_count || 0}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.postAction}>
            <Ionicons name="chatbubble-outline" size={20} color="#666666" />
            <Text style={styles.postActionText}>
              {item.comments_count || 0}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.postAction}>
            <Ionicons name="share-outline" size={20} color="#666666" />
            <Text style={styles.postActionText}>
              {item.shares_count || 0}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderSpaceCard = ({ item }) => (
    <View style={styles.spaceCard}>
      <TouchableOpacity
        onPress={() => handleMediaTap(item, 0)}
        activeOpacity={0.9}
      >
        <Image source={{ uri: item.cover_image || 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=200&fit=crop' }} style={styles.spaceImage} />
      </TouchableOpacity>
      <View style={styles.spaceContent}>
        <View style={styles.spaceHeader}>
          <View style={styles.spaceInfo}>
            <Text style={styles.spaceTitle}>{item.title}</Text>
            <Text style={styles.spaceDescription}>{item.description}</Text>
          </View>
          {item.is_live && (
            <View style={styles.liveIndicator}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>LIVE</Text>
            </View>
          )}
        </View>
        
        <View style={styles.spaceStats}>
          <View style={styles.spaceStat}>
            <Ionicons name="people" size={14} color="#667eea" />
            <Text style={styles.spaceStatText}>{item.participant_count || 0} participants</Text>
          </View>
          <TouchableOpacity style={styles.joinSpaceButton}>
            <Text style={styles.joinSpaceButtonText}>Join Space</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderEventCard = ({ item }) => (
    <View style={styles.eventCard}>
      <TouchableOpacity
        onPress={() => handleMediaTap(item, 0)}
        activeOpacity={0.9}
      >
        <Image source={{ uri: item.image }} style={styles.eventImage} />
      </TouchableOpacity>
      <View style={styles.eventContent}>
        <Text style={styles.eventTitle}>{item.title}</Text>
        <Text style={styles.eventDescription}>{item.description}</Text>
        
        <View style={styles.eventDetails}>
          <View style={styles.eventDetail}>
            <Ionicons name="calendar" size={14} color="#667eea" />
            <Text style={styles.eventDetailText}>
              {new Date(item.date).toLocaleDateString()} at {item.time}
            </Text>
          </View>
          <View style={styles.eventDetail}>
            <Ionicons name="location" size={14} color="#667eea" />
            <Text style={styles.eventDetailText}>{item.location}</Text>
          </View>
          <View style={styles.eventDetail}>
            <Ionicons name="people" size={14} color="#667eea" />
            <Text style={styles.eventDetailText}>{item.attendees} attending</Text>
          </View>
        </View>
        
        <View style={styles.eventFooter}>
          <Text style={styles.eventPrice}>{item.price}</Text>
          <TouchableOpacity style={styles.eventButton}>
            <Text style={styles.eventButtonText}>Join Event</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderTopicCard = ({ item }) => (
    <View style={styles.topicCard}>
      <View style={styles.topicHeader}>
        <View style={styles.topicInfo}>
          <Text style={styles.topicTitle}>{item.title}</Text>
          <Text style={styles.topicDescription}>{item.description}</Text>
        </View>
        {item.isHot && (
          <View style={styles.hotIndicator}>
            <Ionicons name="flame" size={16} color="#ff4757" />
            <Text style={styles.hotText}>HOT</Text>
          </View>
        )}
      </View>
      
      <View style={styles.topicStats}>
        <View style={styles.topicStat}>
          <Ionicons name="people" size={14} color="#667eea" />
          <Text style={styles.topicStatText}>{item.participants} participants</Text>
        </View>
        <TouchableOpacity style={styles.joinTopicButton}>
          <Text style={styles.joinTopicButtonText}>Join Discussion</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons name="newspaper-outline" size={64} color="#667eea" />
      <Text style={styles.emptyStateTitle}>No Posts Yet</Text>
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

  const renderTabNavigation = () => (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'posts' && styles.activeTab]}
        onPress={() => setActiveTab('posts')}
      >
        <Text style={[styles.tabText, activeTab === 'posts' && styles.activeTabText]}>
          Posts
        </Text>
        {activeTab === 'posts' && <View style={styles.tabIndicator} />}
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.tab, activeTab === 'spaces' && styles.activeTab]}
        onPress={() => setActiveTab('spaces')}
      >
        <Text style={[styles.tabText, activeTab === 'spaces' && styles.activeTabText]}>
          Spaces
        </Text>
        {activeTab === 'spaces' && <View style={styles.tabIndicator} />}
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.tab, activeTab === 'events' && styles.activeTab]}
        onPress={() => setActiveTab('events')}
      >
        <Text style={[styles.tabText, activeTab === 'events' && styles.activeTabText]}>
          Events
        </Text>
        {activeTab === 'events' && <View style={styles.tabIndicator} />}
      </TouchableOpacity>
    </View>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'posts':
        return (
          <FlatList
            data={posts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderPost}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor="#667eea"
                colors={["#667eea"]}
              />
            }
            ListEmptyComponent={renderEmptyState}
          />
        );
      case 'spaces':
        return (
          <FlatList
            data={spaces}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderSpaceCard}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor="#667eea"
                colors={["#667eea"]}
              />
            }
            ListEmptyComponent={renderEmptyState}
          />
        );
      case 'events':
        return (
          <FlatList
            data={sampleEvents}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderEventCard}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor="#667eea"
                colors={["#667eea"]}
              />
            }
            ListEmptyComponent={renderEmptyState}
          />
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#121212', '#1E1E1E']}
        style={styles.background}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => setIsSidebarVisible(true)}
          >
            <Image
              source={{
                uri: user?.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${user?.user_metadata?.full_name || 'User'}&background=667eea&color=ffffff&size=100`
              }}
              style={styles.profileAvatar}
            />
          </TouchableOpacity>
          
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>Jappa</Text>
          </View>
          
          <TouchableOpacity
            style={styles.postButton}
            onPress={() => navigation.navigate('Post')}
          >
            <Ionicons name="add" size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>

        {/* Tab Navigation */}
        {renderTabNavigation()}

        {/* Content */}
        <View style={styles.content}>
          {renderContent()}
        </View>

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
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 24,
    marginBottom: 16,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  postUserNameText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginRight: 8,
  },
  postLocation: {
    fontSize: 14,
    color: '#666666',
  },
  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
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
    fontSize: 16,
    color: '#ffffff',
    lineHeight: 24,
    marginBottom: 12,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
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
  postAction: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  postActionText: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 6,
  },
  spaceCard: {
    backgroundColor: '#2A2A2A',
    marginHorizontal: 24,
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  spaceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  spaceInfo: {
    flex: 1,
  },
  spaceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  spaceDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  spaceImage: {
    width: '100%',
    height: 160,
    borderRadius: 8,
  },
  spaceContent: {
    padding: 16,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff4757',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#ffffff',
    marginRight: 4,
  },
  liveText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  spaceStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  spaceStat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceStatText: {
    fontSize: 12,
    color: '#666666',
    marginLeft: 4,
  },
  joinSpaceButton: {
    backgroundColor: '#667eea',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  joinSpaceButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  eventCard: {
    backgroundColor: '#2A2A2A',
    marginHorizontal: 24,
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  eventImage: {
    width: '100%',
    height: 160,
  },
  eventContent: {
    padding: 16,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  eventDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 12,
    lineHeight: 20,
  },
  eventDetails: {
    marginBottom: 16,
  },
  eventDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  eventDetailText: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 8,
  },
  eventFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eventPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#43e97b',
  },
  eventButton: {
    backgroundColor: '#667eea',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  eventButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  topicCard: {
    backgroundColor: '#2A2A2A',
    marginHorizontal: 24,
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
  },
  topicHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  topicInfo: {
    flex: 1,
  },
  topicTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  topicDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  hotIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 71, 87, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  hotText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ff4757',
    marginLeft: 4,
  },
  topicStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topicStat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topicStatText: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 4,
  },
  joinTopicButton: {
    backgroundColor: '#667eea',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  joinTopicButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
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
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    marginHorizontal: 24,
    marginBottom: 16,
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    position: 'relative',
  },
  activeTab: {
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
  },
  activeTabText: {
    color: '#667eea',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 4,
    left: '50%',
    marginLeft: -8,
    width: 16,
    height: 2,
    backgroundColor: '#667eea',
    borderRadius: 1,
  },
  content: {
    flex: 1,
  },
  listContainer: {
    paddingBottom: 100,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  postButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
}); 