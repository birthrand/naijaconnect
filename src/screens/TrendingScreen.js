import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
  FlatList,
  Dimensions,
  TextInput,
  Animated,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../theme/theme';
import { DESIGN_SYSTEM, LAYOUT_PATTERNS } from '../theme/designSystem';
import {
  Header,
  Card,
  Button,
  Badge,
  Avatar,
  IconButton,
  HeadlineText,
  TitleText,
  BodyText,
  LabelText,
  Spacer,
  SectionHeader,
} from '../components/DesignSystemComponents';
import { ExpandedSearch } from '../components/SearchComponents';

const { width, height } = Dimensions.get('window');

// Mock data with Nigerian-focused locations
const localDeals = [
  {
    id: '1',
    title: 'Debonair Lagos',
    description: 'Hair consultation, styling & amenities',
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=300&h=200&fit=crop',
    discount: '10% Off',
    rating: 4.9,
    neighbors: 45,
    distance: '2.1 km',
    category: 'Beauty',
    timeLeft: '2d',
    urgency: 'high',
    popularity: 85,
    location: 'Victoria Island, Lagos',
    isPinned: true,
    isVerified: true,
  },
  {
    id: '2',
    title: 'Love Co Abuja',
    description: 'Karaoke, live music & entertainment',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&h=200&fit=crop',
    discount: '15% Off',
    rating: 4.9,
    neighbors: 32,
    distance: '1.5 km',
    category: 'Entertainment',
    timeLeft: '1d',
    urgency: 'critical',
    popularity: 92,
    location: 'Wuse Zone 2, Abuja',
    isPinned: false,
    isVerified: false,
  },
  {
    id: '3',
    title: 'Naija Kitchen Enugu',
    description: 'Authentic Nigerian cuisine & jollof rice',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop',
    discount: '20% Off',
    rating: 4.8,
    neighbors: 67,
    distance: '0.8 km',
    category: 'Food',
    timeLeft: '3d',
    urgency: 'medium',
    popularity: 78,
    location: 'New Haven, Enugu',
    isPinned: false,
    isVerified: true,
  },
];

const communityPosts = [
  {
    id: '1',
    user: {
      name: 'Veronica Margareth',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      location: 'Lagos',
      time: 'Now',
      verified: true,
    },
    content: 'Just discovered this amazing new restaurant in Victoria Island! The jollof rice is absolutely 🔥. Anyone else tried it?',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
    likes: 124,
    comments: 23,
    shares: 8,
    category: 'Food & Dining',
    isHot: true,
    isPinned: false,
  },
  {
    id: '2',
    user: {
      name: 'David Okonkwo',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      location: 'Abuja',
      time: '2h ago',
      verified: false,
    },
    content: 'Looking for a reliable web developer for a startup project. Must be based in Abuja or willing to relocate. DM me if interested!',
    likes: 89,
    comments: 45,
    shares: 12,
    category: 'Professional',
    isHot: false,
    isPinned: true,
  },
  {
    id: '3',
    user: {
      name: 'Aisha Bello',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      location: 'Kano',
      time: '4h ago',
      verified: true,
    },
    content: 'Beautiful sunset in Kano today! The weather has been perfect for evening walks. #KanoLife #Nigeria',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    likes: 256,
    comments: 34,
    shares: 67,
    category: 'Lifestyle',
    isHot: true,
    isPinned: false,
  },
];

const spaces = [
  {
    id: '1',
    title: 'Tech Talk Nigeria',
    host: 'Sarah Johnson',
    participants: 156,
    listeners: 89,
    isLive: true,
    duration: '45m',
    category: 'Technology',
    topic: 'AI in Nigerian Startups',
    speakers: ['Sarah Johnson', 'Emeka Okafor', 'Fatima Hassan'],
  },
  {
    id: '2',
    title: 'Nigerian Fashion Forward',
    host: 'Chioma Adebayo',
    participants: 234,
    listeners: 167,
    isLive: true,
    duration: '1h 20m',
    category: 'Fashion',
    topic: 'Sustainable Fashion in Africa',
    speakers: ['Chioma Adebayo', 'Kemi Ogunlesi'],
  },
  {
    id: '3',
    title: 'Business Insights',
    host: 'Michael Eze',
    participants: 89,
    listeners: 45,
    isLive: false,
    duration: '30m',
    category: 'Business',
    topic: 'Digital Marketing Strategies',
    speakers: ['Michael Eze'],
  },
];

const categories = [
  { id: '1', name: 'All', icon: 'grid' },
  { id: '2', name: 'Food', icon: 'restaurant' },
  { id: '3', name: 'Beauty', icon: 'cut' },
  { id: '4', name: 'Entertainment', icon: 'musical-notes' },
  { id: '5', name: 'Health', icon: 'fitness' },
  { id: '6', name: 'Shopping', icon: 'bag' },
];

const ProgressBar = ({ progress, color = '#667eea', urgency = 'normal' }) => {
  const getUrgencyColor = () => {
    switch (urgency) {
      case 'critical': return '#ff4757';
      case 'high': return '#ffa502';
      case 'medium': return '#2ed573';
      default: return color;
    }
  };
  
  return (
    <View style={styles.progressContainer}>
      <View style={styles.progressBar}>
        <Animated.View
          style={[
            styles.progressFill,
            {
              width: `${progress}%`,
              backgroundColor: getUrgencyColor(),
            },
          ]}
        />
      </View>
      <Text style={styles.progressText}>{progress}% claimed</Text>
    </View>
  );
};

const MetricCard = ({ icon, value, label, color = '#667eea', priority = 'normal' }) => {
  const getPriorityStyle = () => {
    switch (priority) {
      case 'high': return { backgroundColor: '#ff4757', color: '#ffffff' };
      case 'medium': return { backgroundColor: '#ffa502', color: '#ffffff' };
      default: return { backgroundColor: '#2A2A2A', color: '#ffffff' };
    }
  };

  return (
    <View style={[styles.metricCard, getPriorityStyle()]}>
      <Ionicons name={icon} size={16} color={getPriorityStyle().color} />
      <Text style={[styles.metricValue, { color: getPriorityStyle().color }]}>{value}</Text>
      <Text style={[styles.metricLabel, { color: getPriorityStyle().color }]}>{label}</Text>
    </View>
  );
};

const PriorityIndicator = ({ type, size = 'small' }) => {
  const getIndicatorStyle = () => {
    switch (type) {
      case 'hot': return { backgroundColor: '#ff4757', icon: 'flame' };
      case 'new': return { backgroundColor: '#2ed573', icon: 'star' };
      case 'verified': return { backgroundColor: '#667eea', icon: 'checkmark-circle' };
      case 'pinned': return { backgroundColor: '#ffa502', icon: 'pin' };
      default: return { backgroundColor: '#2A2A2A', icon: 'information-circle' };
    }
  };

  const style = getIndicatorStyle();
  const iconSize = size === 'large' ? 16 : 12;

  return (
    <View style={[styles.priorityIndicator, { backgroundColor: style.backgroundColor }]}>
      <Ionicons name={style.icon} size={iconSize} color="#ffffff" />
    </View>
  );
};

const EngagementVisualizer = ({ likes, comments, shares }) => {
  const total = likes + comments + shares;
  const likePercentage = total > 0 ? (likes / total) * 100 : 0;
  const commentPercentage = total > 0 ? (comments / total) * 100 : 0;
  const sharePercentage = total > 0 ? (shares / total) * 100 : 0;

  return (
    <View style={styles.engagementContainer}>
      <View style={styles.engagementBar}>
        <View style={[styles.engagementSegment, { width: `${likePercentage}%`, backgroundColor: '#ff4757' }]} />
        <View style={[styles.engagementSegment, { width: `${commentPercentage}%`, backgroundColor: '#667eea' }]} />
        <View style={[styles.engagementSegment, { width: `${sharePercentage}%`, backgroundColor: '#2ed573' }]} />
      </View>
      <View style={styles.engagementStats}>
        <Text style={styles.engagementText}>{likes} likes</Text>
        <Text style={styles.engagementText}>{comments} comments</Text>
        <Text style={styles.engagementText}>{shares} shares</Text>
      </View>
    </View>
  );
};

const SearchBar = ({ activeFilters, onFilterPress }) => (
  <View style={styles.searchContainer}>
    <View style={styles.searchBar}>
      <Ionicons name="search" size={20} color="#666666" style={styles.searchIcon} />
      <TextInput
        style={styles.searchInput}
        placeholder="Search posts, people, topics..."
        placeholderTextColor="#666666"
      />
      <TouchableOpacity onPress={onFilterPress} style={styles.filterButton}>
        <Ionicons name="options" size={20} color="#666666" />
      </TouchableOpacity>
    </View>
    {activeFilters.length > 0 && (
      <View style={styles.filterSummary}>
        <Text style={styles.filterText}>Active filters: {activeFilters.join(', ')}</Text>
        <TouchableOpacity>
          <Text style={styles.clearFiltersText}>Clear</Text>
        </TouchableOpacity>
      </View>
    )}
  </View>
);

export default function TrendingScreen({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);

  const handleFilterPress = () => {
    Alert.alert(
      'Filter Options',
      'Choose your filter:',
      [
        { text: 'Most Recent', onPress: () => setActiveFilters(['Most Recent']) },
        { text: 'Most Popular', onPress: () => setActiveFilters(['Most Popular']) },
        { text: 'Nearby', onPress: () => setActiveFilters(['Nearby']) },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const renderDealCard = ({ item }) => (
    <TouchableOpacity style={styles.dealCard}>
      <View style={styles.dealImageContainer}>
        <Image source={{ uri: item.image }} style={styles.dealImage} />
        {item.isPinned && <PriorityIndicator type="pinned" />}
        <View style={styles.discountRibbon}>
          <Text style={styles.discountText}>{item.discount}</Text>
        </View>
      </View>
      <View style={styles.dealContent}>
        <View style={styles.dealHeader}>
          <Text style={styles.dealTitle}>{item.title}</Text>
          {item.isVerified && <PriorityIndicator type="verified" />}
        </View>
        <Text style={styles.dealDescription}>{item.description}</Text>
        <View style={styles.dealStats}>
          <View style={styles.dealStat}>
            <Ionicons name="star" size={14} color="#ffa502" />
            <Text style={styles.dealStatText}>{item.rating}</Text>
          </View>
          <View style={styles.dealStat}>
            <Ionicons name="people" size={14} color="#667eea" />
            <Text style={styles.dealStatText}>{item.neighbors} neighbors</Text>
          </View>
          <View style={styles.dealStat}>
            <Ionicons name="location" size={14} color="#2ed573" />
            <Text style={styles.dealStatText}>{item.distance}</Text>
          </View>
        </View>
        <ProgressBar progress={item.popularity} urgency={item.urgency} />
        <View style={styles.dealFooter}>
          <Text style={styles.timeLeft}>{item.timeLeft} left</Text>
          <TouchableOpacity style={styles.claimButton}>
            <Text style={styles.claimButtonText}>Claim Deal</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderPost = ({ item }) => (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <View style={styles.postUserInfo}>
          <Image source={{ uri: item.user.avatar }} style={styles.postAvatar} />
          <View style={styles.postUserDetails}>
            <View style={styles.postUserName}>
              <Text style={styles.postUserNameText}>{item.user.name}</Text>
              {item.user.verified && <PriorityIndicator type="verified" />}
            </View>
            <Text style={styles.postLocation}>{item.user.location} • {item.user.time}</Text>
          </View>
        </View>
        <View style={styles.postActions}>
          {item.isHot && <PriorityIndicator type="hot" />}
          {item.isPinned && <PriorityIndicator type="pinned" />}
        </View>
      </View>
      
      <Text style={styles.postContent}>{item.content}</Text>
      
      {item.image && (
        <Image source={{ uri: item.image }} style={styles.postImage} />
      )}
      
      <View style={styles.postCategory}>
        <Text style={styles.postCategoryText}>{item.category}</Text>
      </View>
      
      <EngagementVisualizer likes={item.likes} comments={item.comments} shares={item.shares} />
      
      <View style={styles.postActions}>
        <TouchableOpacity style={styles.postAction}>
          <Ionicons name="heart-outline" size={20} color="#666666" />
          <Text style={styles.postActionText}>Like</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.postAction}>
          <Ionicons name="chatbubble-outline" size={20} color="#666666" />
          <Text style={styles.postActionText}>Comment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.postAction}>
          <Ionicons name="share-outline" size={20} color="#666666" />
          <Text style={styles.postActionText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategory === item.name && styles.categoryItemActive,
      ]}
      onPress={() => setSelectedCategory(item.name)}
    >
      <Ionicons 
        name={item.icon} 
        size={16} 
        color={selectedCategory === item.name ? '#ffffff' : '#666666'} 
      />
      <Text style={[
        styles.categoryText,
        selectedCategory === item.name && styles.categoryTextActive,
      ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderSpaceCard = ({ item }) => (
    <TouchableOpacity style={styles.spaceCard}>
      <View style={styles.spaceHeader}>
        <View style={styles.spaceInfo}>
          <Text style={styles.spaceTitle}>{item.title}</Text>
          <Text style={styles.spaceHost}>Hosted by {item.host}</Text>
        </View>
        {item.isLive && (
          <View style={styles.liveIndicator}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>LIVE</Text>
          </View>
        )}
      </View>
      <Text style={styles.spaceTopic}>{item.topic}</Text>
      <View style={styles.spaceStats}>
        <View style={styles.spaceStat}>
          <Ionicons name="people" size={14} color="#667eea" />
          <Text style={styles.spaceStatText}>{item.participants} participants</Text>
        </View>
        <View style={styles.spaceStat}>
          <Ionicons name="time" size={14} color="#ffa502" />
          <Text style={styles.spaceStatText}>{item.duration}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#121212', '#1E1E1E']}
        style={styles.background}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Trending</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity 
              style={styles.searchButton}
              onPress={() => setIsSearchExpanded(!isSearchExpanded)}
            >
              <Ionicons name="search" size={20} color="#ffffff" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.headerAction}
              onPress={() => navigation.navigate('Post')}
            >
              <Ionicons name="add-circle" size={24} color="#ffffff" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.headerAction}
              onPress={() => Alert.alert('Notifications', 'Notifications coming soon')}
            >
              <Ionicons name="notifications" size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        {isSearchExpanded && (
          <SearchBar activeFilters={activeFilters} onFilterPress={handleFilterPress} />
        )}

        <FlatList
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          data={[
            { type: 'categories', data: categories },
            { type: 'spaces', data: spaces, title: 'Trending Spaces' },
            { type: 'posts', data: communityPosts, title: 'Topics' },
            { type: 'deals', data: localDeals, title: 'Local Deals' },
          ]}
          keyExtractor={(item, index) => `${item.type}-${index}`}
          renderItem={({ item }) => {
            switch (item.type) {
              case 'categories':
                return (
                  <View style={styles.categoriesContainer}>
                    <FlatList
                      data={item.data}
                      renderItem={renderCategoryItem}
                      keyExtractor={(category) => category.id}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={styles.categoriesList}
                    />
                  </View>
                );
              case 'spaces':
                return (
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{item.title}</Text>
                    <FlatList
                      data={item.data}
                      renderItem={renderSpaceCard}
                      keyExtractor={(space) => space.id}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={styles.spacesList}
                    />
                  </View>
                );
              case 'posts':
                return (
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{item.title}</Text>
                    {item.data.map((post) => (
                      <View key={post.id}>
                        {renderPost({ item: post })}
                      </View>
                    ))}
                  </View>
                );
              case 'deals':
                return (
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{item.title}</Text>
                    <FlatList
                      data={item.data}
                      renderItem={renderDealCard}
                      keyExtractor={(deal) => deal.id}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={styles.dealsList}
                    />
                  </View>
                );
              default:
                return null;
            }
          }}
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
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerAction: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  searchButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  searchContainer: {
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#ffffff',
  },
  filterButton: {
    marginLeft: 12,
  },
  filterSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingHorizontal: 8,
  },
  filterText: {
    fontSize: 14,
    color: '#666666',
  },
  clearFiltersText: {
    fontSize: 14,
    color: '#667eea',
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  categoriesContainer: {
    marginBottom: 24,
  },
  categoriesList: {
    paddingHorizontal: 24,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
  },
  categoryItemActive: {
    backgroundColor: '#667eea',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666666',
    marginLeft: 8,
  },
  categoryTextActive: {
    color: '#ffffff',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 16,
    paddingHorizontal: 24,
  },
  spacesList: {
    paddingHorizontal: 24,
  },
  spaceCard: {
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    padding: 16,
    marginRight: 16,
    width: 280,
  },
  spaceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
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
  spaceHost: {
    fontSize: 14,
    color: '#666666',
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
  spaceTopic: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 12,
  },
  spaceStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  postContent: {
    fontSize: 16,
    color: '#ffffff',
    lineHeight: 24,
    marginBottom: 12,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  postCategory: {
    alignSelf: 'flex-start',
    backgroundColor: '#667eea',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 12,
  },
  postCategoryText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#ffffff',
  },
  engagementContainer: {
    marginBottom: 12,
  },
  engagementBar: {
    height: 4,
    backgroundColor: '#404040',
    borderRadius: 2,
    marginBottom: 8,
    flexDirection: 'row',
  },
  engagementSegment: {
    height: '100%',
  },
  engagementStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  engagementText: {
    fontSize: 12,
    color: '#666666',
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
  dealsList: {
    paddingHorizontal: 24,
  },
  dealCard: {
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    marginRight: 16,
    width: 280,
    overflow: 'hidden',
  },
  dealImageContainer: {
    position: 'relative',
  },
  dealImage: {
    width: '100%',
    height: 160,
  },
  discountRibbon: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#ff4757',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  discountText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  dealContent: {
    padding: 16,
  },
  dealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  dealTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    flex: 1,
  },
  dealDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 12,
  },
  dealStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  dealStat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dealStatText: {
    fontSize: 12,
    color: '#666666',
    marginLeft: 4,
  },
  progressContainer: {
    marginBottom: 12,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#404040',
    borderRadius: 2,
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: '#666666',
  },
  dealFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeLeft: {
    fontSize: 12,
    color: '#ffa502',
    fontWeight: '500',
  },
  claimButton: {
    backgroundColor: '#667eea',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  claimButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  priorityIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  metricCard: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '700',
    marginVertical: 4,
  },
  metricLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
}); 