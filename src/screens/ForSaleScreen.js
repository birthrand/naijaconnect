import React, { useState } from 'react';
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
import { ModalSearch } from '../components/SearchComponents';

const { width, height } = Dimensions.get('window');

// Mock data for marketplace listings
const listings = [
  {
    id: '1',
    title: 'iPhone 14 Pro Max - 256GB',
    description: 'Excellent condition, barely used. Comes with original box and accessories.',
    price: '₦850,000',
    originalPrice: '₦1,200,000',
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=200&fit=crop',
    category: 'Electronics',
    location: 'Victoria Island, Lagos',
    seller: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      verified: true,
      rating: 4.9,
    },
    condition: 'Like New',
    views: 156,
    timeLeft: '2d',
    isHot: true,
    isNew: false,
    discount: '29%',
  },
  {
    id: '2',
    title: 'Web Development Services',
    description: 'Professional web development for businesses. React, Node.js, and modern frameworks.',
    price: '₦150,000',
    originalPrice: '₦200,000',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop',
    category: 'Services',
    location: 'Abuja',
    seller: {
      name: 'David Okonkwo',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      verified: true,
      rating: 4.8,
    },
    condition: 'Service',
    views: 89,
    timeLeft: '5d',
    isHot: false,
    isNew: true,
    discount: '25%',
  },
  {
    id: '3',
    title: 'Nike Air Max 270',
    description: 'Authentic Nike shoes, size 42. Perfect for running and casual wear.',
    price: '₦45,000',
    originalPrice: '₦65,000',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=200&fit=crop',
    category: 'Fashion',
    location: 'Ikeja, Lagos',
    seller: {
      name: 'Chioma Adebayo',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      verified: false,
      rating: 4.7,
    },
    condition: 'Good',
    views: 234,
    timeLeft: '1d',
    isHot: true,
    isNew: false,
    discount: '31%',
  },
  {
    id: '4',
    title: 'Graphic Design Package',
    description: 'Complete branding package including logo, business cards, and social media templates.',
    price: '₦75,000',
    originalPrice: '₦120,000',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&h=200&fit=crop',
    category: 'Services',
    location: 'Port Harcourt',
    seller: {
      name: 'Michael Eze',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      verified: true,
      rating: 4.9,
    },
    condition: 'Service',
    views: 67,
    timeLeft: '3d',
    isHot: false,
    isNew: false,
    discount: '38%',
  },
  {
    id: '5',
    title: 'Samsung Galaxy S23',
    description: 'Brand new, sealed box. 128GB storage, perfect for gaming and photography.',
    price: '₦650,000',
    originalPrice: '₦850,000',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop',
    category: 'Electronics',
    location: 'Enugu',
    seller: {
      name: 'Aisha Bello',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
      verified: true,
      rating: 4.8,
    },
    condition: 'New',
    views: 189,
    timeLeft: '4d',
    isHot: true,
    isNew: true,
    discount: '24%',
  },
];

const categories = [
  { id: '1', name: 'All', icon: 'grid' },
  { id: '2', name: 'Electronics', icon: 'phone-portrait' },
  { id: '3', name: 'Fashion', icon: 'shirt' },
  { id: '4', name: 'Services', icon: 'construct' },
  { id: '5', name: 'Home', icon: 'home' },
  { id: '6', name: 'Vehicles', icon: 'car' },
  { id: '7', name: 'Books', icon: 'library' },
];

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

export default function ForSaleScreen({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [layoutMode, setLayoutMode] = useState('grid'); // 'grid' or 'list'
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const renderCategory = ({ item }) => (
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

  const renderListing = ({ item }) => (
    <TouchableOpacity style={[
      styles.listingCard,
      layoutMode === 'list' && styles.listingCardList
    ]}>
      <View style={styles.listingImageContainer}>
        <Image source={{ uri: item.image }} style={styles.listingImage} />
        <View style={styles.discountRibbon}>
          <Text style={styles.discountText}>{item.discount}</Text>
        </View>
        <View style={styles.listingIndicators}>
          {item.isHot && <PriorityIndicator type="hot" />}
          {item.isNew && <PriorityIndicator type="new" />}
        </View>
      </View>

      <View style={styles.listingContent}>
        <View style={styles.listingHeader}>
          <Text style={styles.listingTitle} numberOfLines={2}>{item.title}</Text>
          {item.seller.verified && <PriorityIndicator type="verified" />}
        </View>

        <Text style={styles.listingDescription} numberOfLines={2}>
          {item.description}
        </Text>

        <View style={styles.listingSeller}>
          <Image source={{ uri: item.seller.avatar }} style={styles.sellerAvatar} />
          <View style={styles.sellerInfo}>
            <Text style={styles.sellerName}>{item.seller.name}</Text>
            <View style={styles.sellerRating}>
              <Ionicons name="star" size={12} color="#ffa502" />
              <Text style={styles.ratingText}>{item.seller.rating}</Text>
            </View>
          </View>
        </View>

        <View style={styles.listingMeta}>
          <View style={styles.listingLocation}>
            <Ionicons name="location" size={14} color="#666666" />
            <Text style={styles.locationText}>{item.location}</Text>
          </View>
          <View style={styles.listingViews}>
            <Ionicons name="eye" size={14} color="#666666" />
            <Text style={styles.viewsText}>{item.views}</Text>
          </View>
        </View>

        <View style={styles.listingFooter}>
          <View style={styles.priceContainer}>
            <Text style={styles.currentPrice}>{item.price}</Text>
            <Text style={styles.originalPrice}>{item.originalPrice}</Text>
          </View>
          <TouchableOpacity style={styles.contactButton}>
            <Text style={styles.contactButtonText}>Contact</Text>
          </TouchableOpacity>
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
          <Text style={styles.headerTitle}>SideHustle</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity
              style={styles.headerAction}
              onPress={() => navigation.navigate('Post')}
            >
              <Ionicons name="add-circle" size={24} color="#ffffff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.headerAction}
              onPress={() => setIsSearchVisible(!isSearchVisible)}
            >
              <Ionicons name="search" size={24} color="#ffffff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.headerAction}
              onPress={() => Alert.alert('Notifications', 'Notifications coming soon')}
            >
              <Ionicons name="notifications" size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Modal */}
        {isSearchVisible && (
          <ModalSearch
            visible={isSearchVisible}
            onClose={() => setIsSearchVisible(false)}
          />
        )}

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Categories */}
          <View style={styles.categoriesContainer}>
            <FlatList
              data={categories}
              renderItem={renderCategory}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesList}
            />
          </View>

          {/* Layout Toggle */}
          <View style={styles.layoutToggle}>
            <TouchableOpacity
              style={[styles.toggleButton, layoutMode === 'grid' && styles.toggleButtonActive]}
              onPress={() => setLayoutMode('grid')}
            >
              <Ionicons name="grid" size={20} color={layoutMode === 'grid' ? '#ffffff' : '#666666'} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.toggleButton, layoutMode === 'list' && styles.toggleButtonActive]}
              onPress={() => setLayoutMode('list')}
            >
              <Ionicons name="list" size={20} color={layoutMode === 'list' ? '#ffffff' : '#666666'} />
            </TouchableOpacity>
          </View>

          {/* Listings */}
          <View style={styles.listingsContainer}>
            <FlatList
              data={listings}
              renderItem={renderListing}
              keyExtractor={(item) => item.id}
              numColumns={layoutMode === 'grid' ? 2 : 1}
              key={layoutMode} // Force re-render when layout changes
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
              columnWrapperStyle={layoutMode === 'grid' ? styles.gridRow : null}
            />
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
  layoutToggle: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  toggleButton: {
    backgroundColor: '#2A2A2A',
    padding: 12,
    borderRadius: 8,
    marginLeft: 8,
  },
  toggleButtonActive: {
    backgroundColor: '#667eea',
  },
  listingsContainer: {
    paddingHorizontal: 24,
  },
  gridRow: {
    justifyContent: 'space-between',
  },
  listingCard: {
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    width: (width - 48 - 16) / 2, // Account for padding and gap
  },
  listingCardList: {
    width: '100%',
    flexDirection: 'row',
  },
  listingImageContainer: {
    position: 'relative',
    height: 120,
  },
  listingImage: {
    width: '100%',
    height: '100%',
  },
  discountRibbon: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#ff4757',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  discountText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#ffffff',
  },
  listingIndicators: {
    position: 'absolute',
    top: 8,
    right: 8,
    flexDirection: 'row',
  },
  listingContent: {
    padding: 12,
  },
  listingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  listingTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    flex: 1,
    marginRight: 8,
  },
  listingDescription: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 12,
    lineHeight: 16,
  },
  listingSeller: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sellerAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 8,
  },
  sellerInfo: {
    flex: 1,
  },
  sellerName: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: '500',
  },
  sellerRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  ratingText: {
    fontSize: 10,
    color: '#666666',
    marginLeft: 2,
  },
  listingMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  listingLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 10,
    color: '#666666',
    marginLeft: 2,
  },
  listingViews: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewsText: {
    fontSize: 10,
    color: '#666666',
    marginLeft: 2,
  },
  listingFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    flex: 1,
  },
  currentPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2ed573',
  },
  originalPrice: {
    fontSize: 12,
    color: '#666666',
    textDecorationLine: 'line-through',
  },
  contactButton: {
    backgroundColor: '#667eea',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  contactButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  priorityIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 2,
  },
}); 