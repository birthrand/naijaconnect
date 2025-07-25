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
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
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
        
        {/* Discount Ribbon - Only show significant discounts */}
        {item.discount && item.discount !== '10% Off' && (
          <View style={styles.cornerRibbon}>
            <Text style={styles.ribbonText}>{item.discount}</Text>
          </View>
        )}
        
        {/* Urgency indicator - Only for critical items */}
        {item.urgency === 'critical' && (
          <View style={styles.urgencyIndicator}>
            <Ionicons name="flash" size={12} color="#FF4444" />
          </View>
        )}
      </View>
      
      <View style={styles.dealContent}>
        {/* Simplified header - Title only */}
        <Text style={styles.dealTitle} numberOfLines={1}>{item.title}</Text>
        
        {/* Combined location and category - Single line */}
        <View style={styles.locationRow}>
          <Ionicons name="location" size={12} color={theme.colors.gray} />
          <Text style={styles.locationText}>{item.location}</Text>
          <Text style={styles.categoryText}> • {item.category}</Text>
        </View>
        
        {/* Essential metrics only */}
        <View style={styles.dealMetrics}>
          <View style={styles.metricRow}>
            <View style={styles.metricItem}>
              <Ionicons name="people" size={12} color={theme.colors.gray} />
              <Text style={styles.metricText}>{item.neighbors}</Text>
            </View>
            <View style={styles.metricItem}>
              <Ionicons name="time" size={12} color={theme.colors.gray} />
              <Text style={styles.metricText}>{item.timeLeft}</Text>
            </View>
          </View>
        </View>
        
        {/* Minimal CTA */}
        <TouchableOpacity style={styles.ctaButton}>
          <Text style={styles.ctaText}>Book</Text>
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
            {/* Verified badge - Only show for high-profile users */}
            {item.user.verified && item.engagement === 'very-high' && (
              <View style={styles.verifiedBadge}>
                <Ionicons name="checkmark-circle" size={12} color={theme.colors.primary} />
              </View>
            )}
          </View>
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{item.user.name}</Text>
            {/* Simplified meta - Combined location and time */}
            <View style={styles.userMeta}>
              <Text style={styles.userLocation}>{item.user.location}</Text>
              <Text style={styles.timeSeparator}> • </Text>
              <Text style={styles.userTime}>{item.user.time}</Text>
            </View>
          </View>
        </View>
        {/* Options - Hidden by default, show on long press */}
        <TouchableOpacity style={styles.postOptions}>
          <Ionicons name="ellipsis-horizontal" size={20} color={theme.colors.gray} />
        </TouchableOpacity>
      </View>
      
      {/* Category - Only show if not obvious from content */}
      {item.category && item.category !== 'Services' && (
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryLabel}>{item.category}</Text>
        </View>
      )}
      
      <Text style={styles.postContent}>{item.content}</Text>
      
      {/* Location - Only show if different from user location */}
      {item.location && item.location !== item.user.location && (
        <View style={styles.locationContainer}>
          <Ionicons name="location" size={16} color={theme.colors.primary} />
          <Text style={styles.locationText}>{item.location}</Text>
        </View>
      )}
      
      {/* Simplified actions - Hide counts, show only icons */}
      <View style={styles.postActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="heart-outline" size={20} color={theme.colors.gray} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="chatbubble-outline" size={20} color={theme.colors.gray} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="share-outline" size={20} color={theme.colors.gray} />
        </TouchableOpacity>
        {/* Reply - Only show for high engagement posts */}
        {item.engagement === 'high' && (
          <TouchableOpacity style={styles.replyButton}>
            <Ionicons name="send" size={16} color={theme.colors.primary} />
          </TouchableOpacity>
        )}
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
    <SafeAreaView style={[LAYOUT_PATTERNS.screen.container, { paddingTop: 0 }]}>
      {/* Header */}
      <Header
        title="🇳🇬 NaijaConnect"
        rightComponent={
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => setIsSearchExpanded(true)}
              style={{ marginRight: DESIGN_SYSTEM.layout.elementSpacing }}
            >
              <Ionicons 
                name="search" 
                size={DESIGN_SYSTEM.iconSizes.lg} 
                color={theme.colors.gray[800]} 
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons 
                name="notifications-outline" 
                size={DESIGN_SYSTEM.iconSizes.lg} 
                color={theme.colors.gray[800]} 
              />
            </TouchableOpacity>
          </View>
        }
      />

      {/* Expanded Search */}
      <ExpandedSearch
        visible={isSearchExpanded}
        onClose={() => setIsSearchExpanded(false)}
      />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Local Deals Section */}
        <View style={LAYOUT_PATTERNS.section.container}>
          <SectionHeader title="Local Deals" />
          <FlatList
            data={localDeals}
            renderItem={renderDealCard}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={LAYOUT_PATTERNS.list.container}
          />
        </View>

        {/* Minimalist Filter Tabs - Hidden by default */}
        {selectedFilter !== 'All' && (
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
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Community Feed */}
        <View style={LAYOUT_PATTERNS.section.container}>
          <SectionHeader title="Community" />
          
          {/* Feed Categories - Hidden by default */}
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
    paddingHorizontal: theme.spacing.lg, // 24pt
    paddingVertical: theme.spacing.md, // 16pt
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
    padding: theme.spacing.sm, // 8pt
    marginLeft: theme.spacing.sm, // 8pt
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginBottom: theme.spacing.lg, // 24pt - Sufficient vertical spacing between sections
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg, // 24pt
    marginBottom: theme.spacing.md, // 16pt - Adequate spacing before content
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.black,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: theme.colors.gray,
    marginTop: theme.spacing.xs, // 4pt
  },
  closeButton: {
    padding: theme.spacing.sm, // 8pt
  },
  dealsList: {
    paddingHorizontal: theme.spacing.lg, // 24pt
  },
  dealCard: {
    width: width * 0.8, // Adjust width for horizontal scroll
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    marginRight: theme.spacing.md, // 16pt - Consistent margins between cards
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
    padding: theme.spacing.md, // 16pt - Adequate padding within components
  },
  discountBadge: {
    backgroundColor: theme.colors.accent,
    paddingHorizontal: theme.spacing.sm, // 8pt
    paddingVertical: theme.spacing.xs, // 4pt
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
    padding: theme.spacing.xs, // 4pt
  },
  categoryTag: {
    position: 'absolute',
    top: theme.spacing.sm, // 8pt
    left: theme.spacing.sm, // 8pt
    backgroundColor: theme.colors.primary + '80',
    paddingHorizontal: theme.spacing.sm, // 8pt
    paddingVertical: theme.spacing.xs, // 4pt
    borderRadius: theme.borderRadius.sm,
  },
  categoryText: {
    color: theme.colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  dealContent: {
    padding: theme.spacing.md, // 16pt - Adequate padding within components
  },
  dealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm, // 8pt - Consistent margins between text elements
  },
  dealTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.black,
    marginBottom: theme.spacing.xs, // 4pt - Consistent margins between text elements
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.lightGray,
    paddingHorizontal: theme.spacing.sm, // 8pt
    paddingVertical: theme.spacing.xs, // 4pt
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
    marginBottom: theme.spacing.md, // 16pt - Sufficient vertical spacing
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.sm, // 8pt - Consistent margins between elements
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metricText: {
    fontSize: 11,
    color: theme.colors.gray,
    marginLeft: theme.spacing.xs, // 4pt - Consistent margins between text and icons
  },
  timeContainer: {
    marginTop: theme.spacing.sm, // 8pt - Consistent margins between elements
  },
  timeText: {
    fontSize: 12,
    color: theme.colors.gray,
    marginBottom: theme.spacing.xs, // 4pt - Consistent margins between text elements
  },
  seeMoreButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.lightGray,
    paddingVertical: theme.spacing.sm, // 8pt
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md, // 16pt - Adequate padding within components
  },
  seeMoreText: {
    color: theme.colors.black,
    fontSize: 14,
    fontWeight: '500',
  },
  filterContainer: {
    paddingHorizontal: theme.spacing.lg, // 24pt
    marginBottom: theme.spacing.lg, // 24pt - Sufficient vertical spacing between sections
  },
  filterTab: {
    paddingHorizontal: theme.spacing.lg, // 24pt
    paddingVertical: theme.spacing.sm, // 8pt
    marginRight: theme.spacing.sm, // 8pt - Consistent margins between filter tabs
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
    marginHorizontal: theme.spacing.lg, // 24pt
    marginBottom: theme.spacing.md, // 16pt - Consistent margins between cards
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md, // 16pt - Adequate padding within components
    ...theme.shadows.small,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md, // 16pt - Sufficient vertical spacing
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
    marginRight: theme.spacing.sm, // 8pt - Consistent margins between elements
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.round,
    padding: theme.spacing.xs, // 4pt
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
    marginHorizontal: theme.spacing.xs, // 4pt - Consistent margins between text elements
  },
  userTime: {
    fontSize: 14,
    color: theme.colors.gray,
  },
  postOptions: {
    padding: theme.spacing.sm, // 8pt
  },
  categoryContainer: {
    backgroundColor: theme.colors.lightGray,
    paddingHorizontal: theme.spacing.sm, // 8pt
    paddingVertical: theme.spacing.xs, // 4pt
    borderRadius: theme.borderRadius.sm,
    marginBottom: theme.spacing.md, // 16pt - Sufficient vertical spacing
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
    marginBottom: theme.spacing.md, // 16pt - Sufficient vertical spacing
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md, // 16pt - Sufficient vertical spacing
  },
  locationText: {
    fontSize: 12,
    color: theme.colors.gray,
    marginLeft: theme.spacing.xs, // 4pt - Consistent margins between text and icons
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: theme.colors.lightGray,
    paddingTop: theme.spacing.md, // 16pt - Adequate padding within components
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.sm, // 8pt
  },
  actionText: {
    fontSize: 14,
    color: theme.colors.gray,
    marginLeft: theme.spacing.xs, // 4pt - Consistent margins between text and icons
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
    paddingHorizontal: theme.spacing.lg, // 24pt
    paddingVertical: theme.spacing.md, // 16pt - Adequate padding within components
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.lightGray,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.lightGray,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.sm, // 8pt
    paddingVertical: theme.spacing.xs, // 4pt
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: theme.colors.black,
    marginLeft: theme.spacing.sm, // 8pt - Consistent margins between elements
    paddingVertical: 0,
  },
  filterButton: {
    padding: theme.spacing.xs, // 4pt
  },
  ctaButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.sm, // 8pt
    borderRadius: theme.borderRadius.md,
    marginTop: theme.spacing.md, // 16pt - Sufficient vertical spacing
  },
  ctaText: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: theme.spacing.xs, // 4pt - Consistent margins between text and icons
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm, // 8pt - Consistent margins between elements
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
    bottom: theme.spacing.lg, // 24pt - Sufficient spacing from bottom
    right: theme.spacing.lg, // 24pt - Sufficient spacing from right edge
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
    paddingHorizontal: theme.spacing.sm, // 8pt
    paddingVertical: theme.spacing.xs, // 4pt
    borderRadius: theme.borderRadius.md,
  },
  brandText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginRight: theme.spacing.xs, // 4pt - Consistent margins between text and icons
  },
  replyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.lightGray,
    paddingHorizontal: theme.spacing.sm, // 8pt
    paddingVertical: theme.spacing.xs, // 4pt
    borderRadius: theme.borderRadius.round,
    marginLeft: 'auto',
  },
  replyText: {
    fontSize: 14,
    color: theme.colors.primary,
    fontWeight: '500',
    marginLeft: theme.spacing.xs, // 4pt - Consistent margins between text and icons
  },
  cornerRibbon: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: theme.colors.accent,
    paddingHorizontal: theme.spacing.sm, // 8pt
    paddingVertical: theme.spacing.xs, // 4pt
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
  // Minimalist styles
  statusIndicators: {
    position: 'absolute',
    top: theme.spacing.sm,
    left: theme.spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  pinnedIcon: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: theme.borderRadius.round,
    padding: 4,
  },
  urgencyIndicator: {
    position: 'absolute',
    top: theme.spacing.sm,
    right: theme.spacing.sm,
    backgroundColor: 'rgba(255,68,68,0.8)',
    borderRadius: theme.borderRadius.round,
    padding: 4,
  },
  progressContainer: {
    flex: 1,
    marginLeft: theme.spacing.sm,
  },
}); 