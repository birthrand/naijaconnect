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

// Mock data for marketplace listings
const marketplaceListings = [
  {
    id: '1',
    title: 'Fairly Used iPhone 12',
    description: 'Excellent condition, 128GB, comes with original box and charger',
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=200&fit=crop',
    price: '₦250,000',
    originalPrice: '₦300,000',
    discount: '17% Off',
    condition: 'Used',
    category: 'Phones',
    location: 'Surulere, Lagos',
    distance: '2.5 km',
    views: 42,
    timeLeft: '2d',
    seller: {
      name: 'Adebayo Tech',
      verified: true,
      rating: 4.8,
    },
    isHot: true,
    isNew: false,
  },
  {
    id: '2',
    title: 'Fresh Jollof Rice Catering',
    description: 'Authentic Nigerian jollof rice for events and parties',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop',
    price: '₦5,000',
    originalPrice: '₦6,000',
    discount: '17% Off',
    condition: 'New',
    category: 'Food',
    location: 'Victoria Island, Lagos',
    distance: '1.2 km',
    views: 28,
    timeLeft: '1d',
    seller: {
      name: 'Naija Kitchen Pro',
      verified: true,
      rating: 4.9,
    },
    isHot: false,
    isNew: true,
  },
  {
    id: '3',
    title: 'Professional Hair Styling',
    description: 'Experienced hairstylist for weddings and special occasions',
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=300&h=200&fit=crop',
    price: '₦15,000',
    originalPrice: '₦20,000',
    discount: '25% Off',
    condition: 'Service',
    category: 'Services',
    location: 'Wuse Zone 2, Abuja',
    distance: '0.8 km',
    views: 35,
    timeLeft: '3d',
    seller: {
      name: 'Glamour Studio',
      verified: false,
      rating: 4.7,
    },
    isHot: true,
    isNew: false,
  },
  {
    id: '4',
    title: 'Software Developer Needed',
    description: 'Looking for React Native developer for mobile app project',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=200&fit=crop',
    price: '₦150,000',
    originalPrice: '₦180,000',
    discount: '17% Off',
    condition: 'Job',
    category: 'Jobs',
    location: 'New Haven, Enugu',
    distance: '1.5 km',
    views: 67,
    timeLeft: '5d',
    seller: {
      name: 'TechStart Nigeria',
      verified: true,
      rating: 4.6,
    },
    isHot: false,
    isNew: true,
  },
  {
    id: '5',
    title: 'Brand New Samsung TV 55"',
    description: '4K Smart TV, still sealed in box, warranty included',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=300&h=200&fit=crop',
    price: '₦450,000',
    originalPrice: '₦500,000',
    discount: '10% Off',
    condition: 'New',
    category: 'Electronics',
    location: 'Port Harcourt',
    distance: '3.2 km',
    views: 89,
    timeLeft: '1d',
    seller: {
      name: 'Electronics Hub',
      verified: true,
      rating: 4.9,
    },
    isHot: true,
    isNew: true,
  },
];

// Category and location filters
const filterTabs = [
  { id: '1', name: 'All', type: 'category' },
  { id: '2', name: 'Phones', type: 'category' },
  { id: '3', name: 'Food', type: 'category' },
  { id: '4', name: 'Services', type: 'category' },
  { id: '5', name: 'Jobs', type: 'category' },
  { id: '6', name: 'Electronics', type: 'category' },
  { id: '7', name: 'Lagos', type: 'location' },
  { id: '8', name: 'Abuja', type: 'location' },
  { id: '9', name: 'Enugu', type: 'location' },
  { id: '10', name: 'Port Harcourt', type: 'location' },
];

// Enhanced Search Bar Component
const SearchBar = ({ activeFilters, onFilterPress }) => (
  <View style={styles.searchContainer}>
    <View style={styles.searchBar}>
      <Ionicons name="search" size={20} color={theme.colors.gray} />
      <TextInput
        style={styles.searchInput}
        placeholder="Search items, services, sellers..."
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
          <Text style={styles.tooltipText}>Post Item/Service</Text>
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

// Status Badge Component
const StatusBadge = ({ type, text }) => {
  const getBadgeStyle = () => {
    switch (type) {
      case 'hot':
        return { backgroundColor: '#FF4444', color: theme.colors.white };
      case 'new':
        return { backgroundColor: '#4CAF50', color: theme.colors.white };
      case 'used':
        return { backgroundColor: '#FF9800', color: theme.colors.white };
      case 'service':
        return { backgroundColor: '#2196F3', color: theme.colors.white };
      case 'job':
        return { backgroundColor: '#9C27B0', color: theme.colors.white };
      default:
        return { backgroundColor: theme.colors.gray, color: theme.colors.white };
    }
  };

  const badgeStyle = getBadgeStyle();

  return (
    <View style={[styles.statusBadge, { backgroundColor: badgeStyle.backgroundColor }]}>
      <Text style={[styles.statusText, { color: badgeStyle.color }]}>{text}</Text>
    </View>
  );
};

export default function ForSaleScreen({ navigation }) {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [layoutMode, setLayoutMode] = useState('list'); // 'list' or 'grid'

  const handleFilterPress = () => {
    Alert.alert(
      'Filter Options',
      'Choose your filters',
      [
        { text: 'Phones', onPress: () => setActiveFilters(['Phones']) },
        { text: 'Food', onPress: () => setActiveFilters(['Food']) },
        { text: 'Services', onPress: () => setActiveFilters(['Services']) },
        { text: 'Lagos', onPress: () => setActiveFilters(['Lagos']) },
        { text: 'Clear All', onPress: () => setActiveFilters([]), style: 'destructive' },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const renderListingCard = ({ item }) => (
    <View style={[
      styles.listingCard,
      layoutMode === 'grid' && styles.listingCardGrid
    ]}>
      <View style={[
        styles.listingImageContainer,
        layoutMode === 'grid' && styles.listingImageContainerGrid
      ]}>
        <Image source={{ uri: item.image }} style={styles.listingImage} />
        
        {/* Status Badges */}
        <View style={[
          styles.badgeContainer,
          layoutMode === 'grid' && styles.badgeContainerGrid
        ]}>
          {item.isHot && <StatusBadge type="hot" text="🔥 Hot" />}
          {item.isNew && <StatusBadge type="new" text="🆕 New" />}
          <StatusBadge type={item.condition.toLowerCase()} text={item.condition} />
        </View>
        
        {/* Discount Badge */}
        {item.discount && (
          <View style={[
            styles.discountBadge,
            layoutMode === 'grid' && styles.discountBadgeGrid
          ]}>
            <Text style={styles.discountText}>{item.discount}</Text>
          </View>
        )}
        
        {/* Bookmark Icon */}
        <TouchableOpacity style={[
          styles.bookmarkIcon,
          layoutMode === 'grid' && styles.bookmarkIconGrid
        ]}>
          <Ionicons name="bookmark-outline" size={18} color={theme.colors.white} />
        </TouchableOpacity>
      </View>
      
      <View style={[
        styles.listingContent,
        layoutMode === 'grid' && styles.listingContentGrid
      ]}>
        <View style={[
          styles.listingHeader,
          layoutMode === 'grid' && styles.listingHeaderGrid
        ]}>
          <Text style={[
            styles.listingTitle,
            layoutMode === 'grid' && styles.listingTitleGrid
          ]} numberOfLines={layoutMode === 'grid' ? 1 : 1}>
            {item.title}
          </Text>
          {layoutMode === 'list' && (
            <View style={styles.sellerInfo}>
              <Text style={styles.sellerName}>{item.seller.name}</Text>
              {item.seller.verified && (
                <Ionicons name="checkmark-circle" size={14} color={theme.colors.primary} />
              )}
            </View>
          )}
        </View>
        
        {layoutMode === 'list' && (
          <Text style={styles.listingDescription} numberOfLines={2}>
            {item.description}
          </Text>
        )}
        
        {/* Location with icon */}
        <View style={[
          styles.locationRow,
          layoutMode === 'grid' && styles.locationRowGrid
        ]}>
          <Ionicons name="location" size={14} color={theme.colors.gray} />
          <Text style={[
            styles.locationText,
            layoutMode === 'grid' && styles.locationTextGrid
          ]}>{item.location}</Text>
          {layoutMode === 'list' && (
            <Text style={styles.distanceText}> · {item.distance}</Text>
          )}
        </View>
        
        {/* Price Section */}
        <View style={[
          styles.priceSection,
          layoutMode === 'grid' && styles.priceSectionGrid
        ]}>
          <View style={styles.priceContainer}>
            <Text style={[
              styles.price,
              layoutMode === 'grid' && styles.priceGrid
            ]}>{item.price}</Text>
            {item.originalPrice && layoutMode === 'list' && (
              <Text style={styles.originalPrice}>{item.originalPrice}</Text>
            )}
          </View>
          {layoutMode === 'list' && (
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={14} color={theme.colors.secondary} />
              <Text style={styles.ratingText}>{item.seller.rating}</Text>
            </View>
          )}
        </View>
        
        {/* Stats Row - Only in list mode */}
        {layoutMode === 'list' && (
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Ionicons name="eye" size={14} color={theme.colors.gray} />
              <Text style={styles.statText}>{item.views} views</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="time" size={14} color={theme.colors.gray} />
              <Text style={styles.statText}>{item.timeLeft} left</Text>
            </View>
          </View>
        )}
        
        {/* CTA Buttons */}
        <View style={[
          styles.ctaContainer,
          layoutMode === 'grid' && styles.ctaContainerGrid
        ]}>
          <TouchableOpacity style={[
            styles.primaryCta,
            layoutMode === 'grid' && styles.primaryCtaGrid
          ]}>
            <Text style={[
              styles.primaryCtaText,
              layoutMode === 'grid' && styles.primaryCtaTextGrid
            ]}>
              {item.condition === 'Job' ? 'Apply Now' : 'Buy Now'}
            </Text>
            {layoutMode === 'list' && (
              <Ionicons name="arrow-forward" size={16} color={theme.colors.white} />
            )}
          </TouchableOpacity>
          {layoutMode === 'list' && (
            <TouchableOpacity style={styles.secondaryCta}>
              <Ionicons name="chatbubble-outline" size={16} color={theme.colors.primary} />
              <Text style={styles.secondaryCtaText}>Message</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );

  const renderFilterTab = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.filterTab,
        selectedFilter === item.name && styles.filterTabActive,
      ]}
      onPress={() => setSelectedFilter(item.name)}
    >
      <Text
        style={[
          styles.filterText,
          selectedFilter === item.name && styles.filterTextActive,
        ]}
      >
        {item.name}
      </Text>
      {selectedFilter === item.name && (
        <View style={styles.activeIndicator} />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Network</Text>
          <Text style={styles.headerSubtitle}>Buy, sell & discover trusted deals</Text>
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

      {/* Search Bar */}
      <SearchBar activeFilters={activeFilters} onFilterPress={handleFilterPress} />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Filter Tabs */}
        <View style={styles.filterContainer}>
          <FlatList
            data={filterTabs}
            renderItem={renderFilterTab}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterTabsList}
          />
        </View>

        {/* Layout Toggle */}
        <View style={styles.layoutToggleContainer}>
          <Text style={styles.layoutToggleLabel}>View:</Text>
          <TouchableOpacity
            style={[
              styles.layoutToggleButton,
              layoutMode === 'list' && styles.layoutToggleButtonActive
            ]}
            onPress={() => setLayoutMode('list')}
          >
            <Ionicons 
              name="list" 
              size={20} 
              color={layoutMode === 'list' ? theme.colors.white : theme.colors.gray} 
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.layoutToggleButton,
              layoutMode === 'grid' && styles.layoutToggleButtonActive
            ]}
            onPress={() => setLayoutMode('grid')}
          >
            <Ionicons 
              name="grid" 
              size={20} 
              color={layoutMode === 'grid' ? theme.colors.white : theme.colors.gray} 
            />
          </TouchableOpacity>
        </View>

        {/* Listings */}
        <View style={styles.listingsContainer}>
          <FlatList
            key={layoutMode} // Force re-render when layout changes
            data={marketplaceListings}
            renderItem={renderListingCard}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              styles.listingsList,
              layoutMode === 'grid' && styles.listingsListGrid
            ]}
            scrollEnabled={false}
            numColumns={layoutMode === 'grid' ? 2 : 1}
            columnWrapperStyle={layoutMode === 'grid' ? styles.gridRow : undefined}
          />
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <FloatingActionButton 
        onPress={() => navigation.navigate('Post')}
        onLongPress={() => Alert.alert('Post Item/Service', 'Choose what to post')}
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
  headerRight: {
    flexDirection: 'row',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.black,
  },
  headerSubtitle: {
    fontSize: 14,
    color: theme.colors.gray,
    marginTop: theme.spacing.xs,
  },
  headerIcon: {
    padding: theme.spacing.sm,
  },
  searchContainer: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.white,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.lightGray,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  searchInput: {
    flex: 1,
    marginLeft: theme.spacing.sm,
    fontSize: 16,
    color: theme.colors.black,
  },
  micButton: {
    padding: theme.spacing.sm,
  },
  filterButton: {
    padding: theme.spacing.sm,
  },
  filterSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.lightGray,
    borderRadius: theme.borderRadius.md,
    marginTop: theme.spacing.sm,
  },
  filterSummaryText: {
    fontSize: 14,
    color: theme.colors.gray,
  },
  filterTabsList: {
    paddingHorizontal: theme.spacing.sm,
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
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.sm,
  },
  scrollView: {
    flex: 1,
  },
  filterContainer: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.white,
  },
  layoutToggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.lightGray,
  },
  layoutToggleLabel: {
    fontSize: 14,
    color: theme.colors.gray,
    marginRight: theme.spacing.sm,
  },
  layoutToggleButton: {
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.lightGray,
    marginRight: theme.spacing.xs,
  },
  layoutToggleButtonActive: {
    backgroundColor: theme.colors.primary,
  },
  listingsContainer: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },
  listingsList: {
    // No padding here, as it's handled by listingsContainer
  },
  listingsListGrid: {
    paddingHorizontal: theme.spacing.sm,
  },
  gridRow: {
    justifyContent: 'space-between',
  },
  listingCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.md,
    overflow: 'hidden',
    ...theme.shadows.medium,
  },
  listingCardGrid: {
    width: (width - theme.spacing.lg * 2 - theme.spacing.sm) / 2,
    marginBottom: theme.spacing.sm,
  },
  listingImageContainer: {
    position: 'relative',
    width: '100%',
    height: 200,
  },
  listingImageContainerGrid: {
    height: 150,
  },
  listingImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  badgeContainer: {
    position: 'absolute',
    top: theme.spacing.sm,
    left: theme.spacing.sm,
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: theme.borderRadius.round,
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: theme.spacing.xs,
  },
  badgeContainerGrid: {
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: 2,
  },
  statusBadge: {
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.round,
    marginRight: theme.spacing.xs,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  discountBadge: {
    position: 'absolute',
    top: theme.spacing.sm,
    right: theme.spacing.sm,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.round,
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: theme.spacing.xs,
  },
  discountBadgeGrid: {
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: 2,
  },
  discountText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: theme.colors.white,
  },
  bookmarkIcon: {
    position: 'absolute',
    bottom: theme.spacing.sm,
    right: theme.spacing.sm,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: theme.borderRadius.round,
    padding: theme.spacing.xs,
  },
  bookmarkIconGrid: {
    padding: theme.spacing.xs,
  },
  listingContent: {
    padding: theme.spacing.md,
  },
  listingContentGrid: {
    padding: theme.spacing.sm,
  },
  listingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  listingHeaderGrid: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.xs,
  },
  listingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.black,
    flex: 1,
  },
  listingTitleGrid: {
    fontSize: 16,
    flex: undefined,
    marginBottom: theme.spacing.xs,
  },
  sellerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sellerName: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.black,
    marginRight: theme.spacing.xs,
  },
  listingDescription: {
    fontSize: 14,
    color: theme.colors.darkGray,
    lineHeight: 20,
    marginBottom: theme.spacing.sm,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  locationRowGrid: {
    marginBottom: theme.spacing.xs,
  },
  locationText: {
    fontSize: 14,
    color: theme.colors.gray,
    marginLeft: theme.spacing.xs,
  },
  locationTextGrid: {
    fontSize: 12,
  },
  distanceText: {
    fontSize: 14,
    color: theme.colors.gray,
    marginLeft: theme.spacing.xs,
  },
  priceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  priceSectionGrid: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.xs,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  priceGrid: {
    fontSize: 18,
  },
  originalPrice: {
    fontSize: 14,
    color: theme.colors.gray,
    textDecorationLine: 'line-through',
    marginLeft: theme.spacing.xs,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.black,
    marginLeft: 2,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.sm,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 14,
    color: theme.colors.gray,
    marginLeft: theme.spacing.xs,
  },
  ctaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing.sm,
  },
  ctaContainerGrid: {
    flexDirection: 'column',
    marginTop: theme.spacing.xs,
  },
  primaryCta: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.lg,
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  primaryCtaGrid: {
    flex: undefined,
    marginRight: 0,
    marginBottom: theme.spacing.xs,
  },
  primaryCtaText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.white,
    marginRight: theme.spacing.xs,
  },
  primaryCtaTextGrid: {
    fontSize: 14,
  },
  secondaryCta: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.lightGray,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.lg,
  },
  secondaryCtaText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginLeft: theme.spacing.xs,
  },
  fabContainer: {
    position: 'absolute',
    bottom: theme.spacing.lg,
    right: theme.spacing.lg,
    zIndex: 10,
  },
  fab: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.large,
  },
  tooltip: {
    position: 'absolute',
    bottom: 50,
    right: 0,
    backgroundColor: theme.colors.black,
    color: theme.colors.white,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
    zIndex: 1,
  },
  tooltipText: {
    fontSize: 12,
    color: theme.colors.white,
  },
}); 