import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
  Dimensions,
  TextInput,
  Animated,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme/theme';

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
    content: 'Looking for a skilled woodworker to build a minibar. Any recommendations?',
    location: 'Victoria Island, Lagos',
    likes: 12,
    comments: 8,
    shares: 3,
    category: 'Services',
    engagement: 'high',
    trending: true,
  },
  {
    id: '2',
    user: {
      name: 'Adebayo Johnson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      location: 'Abuja',
      time: '2h',
      verified: false,
    },
    content: 'Just finished my mobile app for local businesses. Anyone interested in collaboration? #Tech #NaijaTech',
    likes: 24,
    comments: 15,
    shares: 7,
    category: 'Technology',
    engagement: 'very-high',
    trending: true,
  },
  {
    id: '3',
    user: {
      name: 'Chioma Okechukwu',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      location: 'Enugu',
      time: '4h',
      verified: true,
    },
    content: 'Made Nigerian pepper soup today. Missing home! Who else is cooking traditional dishes this weekend? 🇳🇬',
    likes: 89,
    comments: 23,
    shares: 12,
    category: 'Culture',
    engagement: 'medium',
    trending: false,
  },
];

// Feed categories for horizontal scroll
const feedCategories = [
  { id: '1', name: 'Services', icon: 'construct', color: theme.colors.primary },
  { id: '2', name: 'Requests', icon: 'help-circle', color: theme.colors.secondary },
  { id: '3', name: 'For Sale', icon: 'bag', color: theme.colors.success },
  { id: '4', name: 'Events', icon: 'calendar', color: theme.colors.warmOrange },
  { id: '5', name: 'Jobs', icon: 'briefcase', color: theme.colors.info },
];

// Enhanced Progress Bar with animation
const ProgressBar = ({ progress, color = theme.colors.primary, urgency = 'normal' }) => {
  const animatedWidth = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: progress,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const getUrgencyColor = () => {
    switch (urgency) {
      case 'critical': return '#FF4444';
      case 'high': return '#FF8800';
      case 'medium': return '#FFAA00';
      default: return color;
    }
  };

  return (
    <View style={styles.progressContainer}>
      <View style={[styles.progressBar, { backgroundColor: theme.colors.lightGray }]}>
        <Animated.View 
          style={[
            styles.progressFill, 
            { 
              width: animatedWidth.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%'],
              }),
              backgroundColor: getUrgencyColor() 
            }
          ]} 
        />
      </View>
    </View>
  );
};

// Enhanced Metric Card with visual indicators
const MetricCard = ({ icon, value, label, color = theme.colors.primary, priority = 'normal' }) => {
  const getPriorityStyle = () => {
    switch (priority) {
      case 'high': return { backgroundColor: color + '20', borderColor: color, borderWidth: 2 };
      case 'critical': return { backgroundColor: '#FF444420', borderColor: '#FF4444', borderWidth: 2 };
      default: return { backgroundColor: color + '15' };
    }
  };

  return (
    <View style={styles.metricCard}>
      <View style={[styles.metricIcon, getPriorityStyle()]}>
        <Ionicons name={icon} size={16} color={color} />
      </View>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricLabel}>{label}</Text>
    </View>
  );
};

// Visual Priority Indicator Component
const PriorityIndicator = ({ type, size = 'small' }) => {
  const getIndicatorStyle = () => {
    const baseStyle = {
      width: size === 'small' ? 8 : 12,
      height: size === 'small' ? 8 : 12,
      borderRadius: size === 'small' ? 4 : 6,
    };

    switch (type) {
      case 'trending':
        return { ...baseStyle, backgroundColor: '#FF6B35' };
      case 'urgent':
        return { ...baseStyle, backgroundColor: '#FF4444' };
      case 'popular':
        return { ...baseStyle, backgroundColor: '#4CAF50' };
      case 'verified':
        return { ...baseStyle, backgroundColor: '#2196F3' };
      case 'pinned':
        return { ...baseStyle, backgroundColor: '#FFD700' };
      default:
        return { ...baseStyle, backgroundColor: theme.colors.gray };
    }
  };

  return <View style={getIndicatorStyle()} />;
};

// Engagement Visualizer Component
const EngagementVisualizer = ({ likes, comments, shares }) => {
  const total = likes + comments + shares;
  const likePercentage = (likes / total) * 100;
  const commentPercentage = (comments / total) * 100;
  const sharePercentage = (shares / total) * 100;

  return (
    <View style={styles.engagementVisualizer}>
      <View style={[styles.engagementBar, { width: `${likePercentage}%`, backgroundColor: '#FF6B6B' }]} />
      <View style={[styles.engagementBar, { width: `${commentPercentage}%`, backgroundColor: '#4ECDC4' }]} />
      <View style={[styles.engagementBar, { width: `${sharePercentage}%`, backgroundColor: '#45B7D1' }]} />
    </View>
  );
};

// Enhanced Search Bar Component
const SearchBar = ({ activeFilters, onFilterPress }) => (
  <View style={styles.searchContainer}>
    <View style={styles.searchBar}>
      <Ionicons name="search" size={20} color={theme.colors.gray} />
      <TextInput
        style={styles.searchInput}
        placeholder="Search deals, posts, people..."
        placeholderTextColor={theme.colors.gray}
      />
      <TouchableOpacity style={styles.micButton}>
        <Ionicons name="mic" size={20} color={theme.colors.primary} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.filterButton} onPress={onFilterPress}>
        <Ionicons name="options" size={20} color={theme.colors.primary} />
      </TouchableOpacity>
    </View>
    {activeFilters.length > 0 && (
      <View style={styles.filterSummary}>
        <Text style={styles.filterSummaryText}>
          {activeFilters.join(' · ')}
        </Text>
        <TouchableOpacity>
          <Ionicons name="close-circle" size={16} color={theme.colors.gray} />
        </TouchableOpacity>
      </View>
    )}
  </View>
);

// Enhanced FAB with tooltip
const FloatingActionButton = ({ onPress, onLongPress }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleLongPress = () => {
    setShowTooltip(true);
    onLongPress?.();
    setTimeout(() => setShowTooltip(false), 2000);
  };

  return (
    <View style={styles.fabContainer}>
      {showTooltip && (
        <View style={styles.tooltip}>
          <Text style={styles.tooltipText}>Create Post</Text>
        </View>
      )}
      <TouchableOpacity 
        style={styles.fab}
        onPress={onPress}
        onLongPress={handleLongPress}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={24} color={theme.colors.white} />
      </TouchableOpacity>
    </View>
  );
};

export default function HomeScreen({ navigation }) {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filters = ['All', 'Lagos', 'Abuja', 'Enugu', 'Port Harcourt', 'Kano', 'Ibadan'];

  const handleFilterPress = () => {
    Alert.alert(
      'Filter Options',
      'Choose your filters',
      [
        { text: 'Lagos', onPress: () => setActiveFilters(['Deals in Lagos']) },
        { text: 'Beauty', onPress: () => setActiveFilters(['Beauty']) },
        { text: 'Food', onPress: () => setActiveFilters(['Food']) },
        { text: 'Clear All', onPress: () => setActiveFilters([]), style: 'destructive' },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const renderDealCard = ({ item }) => (
    <View style={styles.dealCard}>
      <View style={styles.dealImageContainer}>
        <Image source={{ uri: item.image }} style={styles.dealImage} />
        
        {/* Corner Ribbon for Discount */}
        <View style={styles.cornerRibbon}>
          <Text style={styles.ribbonText}>{item.discount}</Text>
        </View>
        
        {/* Pinned Badge */}
        {item.isPinned && (
          <View style={styles.pinnedBadge}>
            <Ionicons name="pin" size={12} color={theme.colors.white} />
            <Text style={styles.pinnedText}>Pinned</Text>
          </View>
        )}
        
        {/* Bookmark Icon */}
        <TouchableOpacity style={styles.bookmarkIcon}>
          <Ionicons name="bookmark-outline" size={18} color={theme.colors.white} />
        </TouchableOpacity>
        
        {/* Category Tag */}
        <View style={styles.categoryTag}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
        
        {/* Visual Priority Indicators */}
        <View style={styles.priorityIndicators}>
          {item.urgency === 'critical' && <PriorityIndicator type="urgent" />}
          {item.popularity > 80 && <PriorityIndicator type="popular" />}
          {item.isPinned && <PriorityIndicator type="pinned" />}
          {item.isVerified && <PriorityIndicator type="verified" />}
        </View>
      </View>
      
      <View style={styles.dealContent}>
        <View style={styles.dealHeader}>
          <Text style={styles.dealTitle} numberOfLines={1}>{item.title}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color={theme.colors.secondary} />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
        
        {/* Location with icon */}
        <View style={styles.locationRow}>
          <Ionicons name="location" size={14} color={theme.colors.gray} />
          <Text style={styles.locationText}>{item.location}</Text>
        </View>
        
        <Text style={styles.dealDescription} numberOfLines={2}>
          {item.description}
        </Text>
        
        <View style={styles.dealMetrics}>
          <View style={styles.metricRow}>
            <View style={styles.metricItem}>
              <Ionicons name="people" size={14} color={theme.colors.gray} />
              <Text style={styles.metricText}>{item.neighbors}</Text>
            </View>
            <View style={styles.metricItem}>
              <Ionicons name="location" size={14} color={theme.colors.gray} />
              <Text style={styles.metricText}>{item.distance}</Text>
            </View>
          </View>
          
          <View style={styles.timeContainer}>
            <View style={styles.timeHeader}>
              <Text style={styles.timeText}>{item.timeLeft}</Text>
              {item.urgency === 'critical' && (
                <Ionicons name="flash" size={12} color="#FF4444" />
              )}
            </View>
            <ProgressBar progress={item.popularity} urgency={item.urgency} />
          </View>
        </View>
        
        {/* Enhanced CTA Button */}
        <TouchableOpacity style={styles.ctaButton}>
          <Text style={styles.ctaText}>Book Now</Text>
          <Ionicons name="arrow-forward" size={16} color={theme.colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderPost = ({ item }) => (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <View style={styles.userInfo}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: item.user.avatar }} style={styles.userAvatar} />
            {item.user.verified && (
              <View style={styles.verifiedBadge}>
                <Ionicons name="checkmark-circle" size={12} color={theme.colors.primary} />
              </View>
            )}
          </View>
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{item.user.name}</Text>
            <View style={styles.userMeta}>
              <Ionicons name="location" size={12} color={theme.colors.gray} />
              <Text style={styles.userLocation}>{item.user.location}</Text>
              <Text style={styles.timeSeparator}>•</Text>
              <Ionicons name="time" size={12} color={theme.colors.gray} />
              <Text style={styles.userTime}>{item.user.time}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.postOptions}>
          <Ionicons name="ellipsis-horizontal" size={20} color={theme.colors.gray} />
        </TouchableOpacity>
      </View>
      
      {/* Visual Priority Indicators */}
      <View style={styles.postPriorityIndicators}>
        {item.trending && <PriorityIndicator type="trending" />}
        {item.engagement === 'very-high' && <PriorityIndicator type="popular" />}
        {item.user.verified && <PriorityIndicator type="verified" />}
      </View>
      
      {item.category && (
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryLabel}>{item.category}</Text>
        </View>
      )}
      
      <Text style={styles.postContent}>{item.content}</Text>
      
      {item.location && (
        <View style={styles.locationContainer}>
          <Ionicons name="location" size={16} color={theme.colors.primary} />
          <Text style={styles.locationText}>{item.location}</Text>
        </View>
      )}
      
      {/* Visual Engagement Display */}
      <View style={styles.engagementContainer}>
        <EngagementVisualizer likes={item.likes} comments={item.comments} shares={item.shares} />
      </View>
      
      <View style={styles.postActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="heart-outline" size={20} color={theme.colors.gray} />
          <Text style={styles.actionText}>{item.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="chatbubble-outline" size={20} color={theme.colors.gray} />
          <Text style={styles.actionText}>{item.comments}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="share-outline" size={20} color={theme.colors.gray} />
          <Text style={styles.actionText}>{item.shares}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.replyButton}>
          <Ionicons name="send" size={16} color={theme.colors.primary} />
          <Text style={styles.replyText}>Reply</Text>
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
        size={20} 
        color={selectedCategory === item.name ? theme.colors.white : item.color} 
      />
      <Text style={[
        styles.categoryItemText,
        selectedCategory === item.name && styles.categoryItemTextActive,
      ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Enhanced Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.greeting}>Good Morning!</Text>
          <TouchableOpacity style={styles.brandContainer}>
            <Text style={styles.brandText}>🇳🇬 NaijaConnect</Text>
            <Ionicons name="chevron-down" size={16} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="notifications-outline" size={24} color={theme.colors.black} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.headerIcon}
            onPress={() => navigation.navigate('Messages')}
          >
            <Ionicons name="chatbubble-outline" size={24} color={theme.colors.black} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Enhanced Search Bar */}
      <SearchBar activeFilters={activeFilters} onFilterPress={handleFilterPress} />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Local Deals Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Local Deals</Text>
              <Text style={styles.sectionSubtitle}>Save with neighbors</Text>
            </View>
            <TouchableOpacity style={styles.closeButton}>
              <Ionicons name="close" size={20} color={theme.colors.gray} />
            </TouchableOpacity>
          </View>
          <FlatList
            data={localDeals}
            renderItem={renderDealCard}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.dealsList}
          />
        </View>

        {/* Enhanced Filter Tabs */}
        <View style={styles.filterContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterTab,
                  selectedFilter === filter && styles.filterTabActive,
                ]}
                onPress={() => setSelectedFilter(filter)}
              >
                <Text
                  style={[
                    styles.filterText,
                    selectedFilter === filter && styles.filterTextActive,
                  ]}
                >
                  {filter}
                </Text>
                {selectedFilter === filter && (
                  <View style={styles.activeIndicator} />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Community Feed with Categories */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Community Feed</Text>
              <Text style={styles.sectionSubtitle}>Connect worldwide</Text>
            </View>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>See all</Text>
              <Ionicons name="arrow-forward" size={16} color={theme.colors.primary} />
            </TouchableOpacity>
          </View>
          
          {/* Feed Categories */}
          <View style={styles.categoriesContainer}>
            <FlatList
              data={feedCategories}
              renderItem={renderCategoryItem}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesList}
            />
          </View>
          
          {/* Preview Posts */}
          {communityPosts.slice(0, 2).map((post) => (
            <View key={post.id} style={styles.postCard}>
              <View style={styles.postHeader}>
                <View style={styles.userInfo}>
                  <View style={styles.avatarContainer}>
                    <Image source={{ uri: post.user.avatar }} style={styles.userAvatar} />
                    {post.user.verified && (
                      <View style={styles.verifiedBadge}>
                        <Ionicons name="checkmark-circle" size={12} color={theme.colors.primary} />
                      </View>
                    )}
                  </View>
                  <View style={styles.userDetails}>
                    <Text style={styles.userName}>{post.user.name}</Text>
                    <View style={styles.userMeta}>
                      <Ionicons name="location" size={12} color={theme.colors.gray} />
                      <Text style={styles.userLocation}>{post.user.location}</Text>
                      <Text style={styles.timeSeparator}>•</Text>
                      <Ionicons name="time" size={12} color={theme.colors.gray} />
                      <Text style={styles.userTime}>{post.user.time}</Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity style={styles.postOptions}>
                  <Ionicons name="ellipsis-horizontal" size={20} color={theme.colors.gray} />
                </TouchableOpacity>
              </View>
              
              {/* Visual Priority Indicators */}
              <View style={styles.postPriorityIndicators}>
                {post.trending && <PriorityIndicator type="trending" />}
                {post.engagement === 'very-high' && <PriorityIndicator type="popular" />}
                {post.user.verified && <PriorityIndicator type="verified" />}
              </View>
              
              {post.category && (
                <View style={styles.categoryContainer}>
                  <Text style={styles.categoryLabel}>{post.category}</Text>
                </View>
              )}
              
              <Text style={styles.postContent}>{post.content}</Text>
              
              {post.location && (
                <View style={styles.locationContainer}>
                  <Ionicons name="location" size={16} color={theme.colors.primary} />
                  <Text style={styles.locationText}>{post.location}</Text>
                </View>
              )}
              
              {/* Visual Engagement Display */}
              <View style={styles.engagementContainer}>
                <EngagementVisualizer likes={post.likes} comments={post.comments} shares={post.shares} />
              </View>
              
              <View style={styles.postActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="heart-outline" size={20} color={theme.colors.gray} />
                  <Text style={styles.actionText}>{post.likes}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="chatbubble-outline" size={20} color={theme.colors.gray} />
                  <Text style={styles.actionText}>{post.comments}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="share-outline" size={20} color={theme.colors.gray} />
                  <Text style={styles.actionText}>{post.shares}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.replyButton}>
                  <Ionicons name="send" size={16} color={theme.colors.primary} />
                  <Text style={styles.replyText}>Reply</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Enhanced Floating Action Button */}
      <FloatingActionButton 
        onPress={() => navigation.navigate('Post')}
        onLongPress={() => Alert.alert('Create Post', 'Choose what to create')}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.lightGray,
  },
  headerLeft: {
    flex: 1,
  },
  greeting: {
    fontSize: 16,
    color: theme.colors.gray,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.black,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    padding: theme.spacing.sm,
    marginLeft: theme.spacing.sm,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginBottom: theme.spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.black,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: theme.colors.gray,
    marginTop: theme.spacing.xs,
  },
  closeButton: {
    padding: theme.spacing.sm,
  },
  dealsList: {
    paddingHorizontal: theme.spacing.lg,
  },
  dealCard: {
    width: width * 0.8, // Adjust width for horizontal scroll
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    marginRight: theme.spacing.md,
    ...theme.shadows.medium,
  },
  dealImageContainer: {
    position: 'relative',
    height: 180, // Fixed height for image container
  },
  dealImage: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: theme.borderRadius.lg,
    borderTopRightRadius: theme.borderRadius.lg,
  },
  dealOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderTopLeftRadius: theme.borderRadius.lg,
    borderTopRightRadius: theme.borderRadius.lg,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    padding: theme.spacing.md,
  },
  discountBadge: {
    backgroundColor: theme.colors.accent,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  discountText: {
    color: theme.colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  bookmarkIcon: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.round,
    padding: theme.spacing.xs,
  },
  categoryTag: {
    position: 'absolute',
    top: theme.spacing.sm,
    left: theme.spacing.sm,
    backgroundColor: theme.colors.primary + '80',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  categoryText: {
    color: theme.colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  dealContent: {
    padding: theme.spacing.md,
  },
  dealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  dealTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.black,
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.lightGray,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.round,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.black,
    marginLeft: 2,
  },
  dealDescription: {
    fontSize: 14,
    color: theme.colors.gray,
    marginBottom: theme.spacing.sm,
    lineHeight: 20,
  },
  dealMetrics: {
    marginBottom: theme.spacing.md,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.sm,
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metricText: {
    fontSize: 12,
    color: theme.colors.gray,
    marginLeft: theme.spacing.xs,
  },
  timeContainer: {
    marginTop: theme.spacing.sm,
  },
  timeText: {
    fontSize: 12,
    color: theme.colors.gray,
    marginBottom: theme.spacing.xs,
  },
  seeMoreButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.lightGray,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
  },
  seeMoreText: {
    color: theme.colors.black,
    fontSize: 14,
    fontWeight: '500',
  },
  filterContainer: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  filterTab: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    marginRight: theme.spacing.sm,
    borderRadius: theme.borderRadius.round,
    backgroundColor: theme.colors.lightGray,
  },
  filterTabActive: {
    backgroundColor: theme.colors.primary,
  },
  filterText: {
    fontSize: 14,
    color: theme.colors.gray,
    fontWeight: '500',
  },
  filterTextActive: {
    color: theme.colors.white,
  },
  postCard: {
    backgroundColor: theme.colors.white,
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    ...theme.shadows.small,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    position: 'relative',
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: theme.spacing.sm,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.round,
    padding: theme.spacing.xs,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.black,
  },
  userMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userLocation: {
    fontSize: 14,
    color: theme.colors.gray,
  },
  timeSeparator: {
    marginHorizontal: theme.spacing.xs,
  },
  userTime: {
    fontSize: 14,
    color: theme.colors.gray,
  },
  postOptions: {
    padding: theme.spacing.sm,
  },
  categoryContainer: {
    backgroundColor: theme.colors.lightGray,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
    marginBottom: theme.spacing.md,
  },
  categoryLabel: {
    fontSize: 12,
    color: theme.colors.primary,
    fontWeight: '500',
  },
  postContent: {
    fontSize: 16,
    color: theme.colors.black,
    lineHeight: 24,
    marginBottom: theme.spacing.md,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  locationText: {
    fontSize: 14,
    color: theme.colors.primary,
    marginLeft: theme.spacing.xs,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: theme.colors.lightGray,
    paddingTop: theme.spacing.md,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.sm,
  },
  actionText: {
    fontSize: 14,
    color: theme.colors.gray,
    marginLeft: theme.spacing.xs,
  },
  progressContainer: {
    width: '100%',
    height: 8,
    backgroundColor: theme.colors.lightGray,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  metricCard: {
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  metricIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.black,
  },
  metricLabel: {
    fontSize: 12,
    color: theme.colors.gray,
  },
  priorityIndicators: {
    position: 'absolute',
    top: theme.spacing.sm,
    right: theme.spacing.sm,
    flexDirection: 'row',
  },
  postPriorityIndicators: {
    position: 'absolute',
    top: theme.spacing.sm,
    right: theme.spacing.sm,
    flexDirection: 'row',
  },
  engagementVisualizer: {
    flexDirection: 'row',
    height: 8,
    backgroundColor: theme.colors.lightGray,
    borderRadius: 4,
    marginTop: theme.spacing.sm,
    overflow: 'hidden',
  },
  engagementBar: {
    height: '100%',
    borderRadius: 4,
  },
  timeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  engagementContainer: {
    marginBottom: theme.spacing.md,
  },
  priorityIndicators: {
    position: 'absolute',
    top: theme.spacing.sm,
    right: theme.spacing.sm,
    flexDirection: 'row',
    gap: theme.spacing.xs,
  },
  postPriorityIndicators: {
    flexDirection: 'row',
    gap: theme.spacing.xs,
    marginBottom: theme.spacing.sm,
  },
  engagementVisualizer: {
    flexDirection: 'row',
    height: 8,
    backgroundColor: theme.colors.lightGray,
    borderRadius: 4,
    marginTop: theme.spacing.sm,
    overflow: 'hidden',
  },
  engagementBar: {
    height: '100%',
    borderRadius: 4,
  },
  searchContainer: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.lightGray,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.lightGray,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: theme.colors.black,
    marginLeft: theme.spacing.sm,
    paddingVertical: 0,
  },
  filterButton: {
    padding: theme.spacing.xs,
  },
  ctaButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    marginTop: theme.spacing.md,
  },
  ctaText: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: theme.spacing.xs,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: theme.colors.white,
    borderRadius: 1,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.lg,
    right: theme.spacing.lg,
    backgroundColor: theme.colors.primary,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.large,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.lightGray,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.md,
  },
  brandText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginRight: theme.spacing.xs,
  },
  replyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.lightGray,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.round,
    marginLeft: 'auto',
  },
  replyText: {
    fontSize: 14,
    color: theme.colors.primary,
    fontWeight: '500',
    marginLeft: theme.spacing.xs,
  },
  cornerRibbon: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: theme.colors.accent,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderTopLeftRadius: theme.borderRadius.md,
    borderBottomRightRadius: theme.borderRadius.md,
  },
  ribbonText: {
    color: theme.colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  pinnedBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderTopRightRadius: theme.borderRadius.md,
    borderBottomLeftRadius: theme.borderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pinnedText: {
    color: theme.colors.white,
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: theme.spacing.xs,
  },
  fabContainer: {
    position: 'relative',
  },
  tooltip: {
    position: 'absolute',
    bottom: 60, // Adjust as needed
    right: 10, // Adjust as needed
    backgroundColor: theme.colors.black,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.md,
    zIndex: 10,
  },
  tooltipText: {
    color: theme.colors.white,
    fontSize: 12,
  },
  categoriesContainer: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  categoriesList: {
    paddingVertical: theme.spacing.sm,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.round,
    marginRight: theme.spacing.sm,
  },
  categoryItemActive: {
    backgroundColor: theme.colors.primary,
  },
  categoryItemText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: theme.spacing.sm,
  },
  categoryItemTextActive: {
    color: theme.colors.white,
  },
  micButton: {
    padding: theme.spacing.xs,
  },
  filterSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.lightGray,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
    marginTop: theme.spacing.xs,
  },
  filterSummaryText: {
    fontSize: 12,
    color: theme.colors.gray,
    flex: 1,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.lightGray,
  },
  seeAllText: {
    fontSize: 14,
    color: theme.colors.primary,
    fontWeight: '500',
    marginRight: theme.spacing.xs,
  },
}); 