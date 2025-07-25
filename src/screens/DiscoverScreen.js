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

const { width, height } = Dimensions.get('window');

// Mock data for discover screen
const categories = [
  { id: '1', name: 'All', icon: 'grid', count: 1250 },
  { id: '2', name: 'Food', icon: 'restaurant', count: 234 },
  { id: '3', name: 'Beauty', icon: 'cut', count: 156 },
  { id: '4', name: 'Entertainment', icon: 'musical-notes', count: 89 },
  { id: '5', name: 'Health', icon: 'fitness', count: 67 },
  { id: '6', name: 'Shopping', icon: 'bag', count: 445 },
];

const featuredBusinesses = [
  {
    id: '1',
    name: 'Debonair Lagos',
    description: 'Premium hair salon and beauty services',
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=300&h=200&fit=crop',
    rating: 4.9,
    reviews: 156,
    category: 'Beauty',
    verified: true,
    featured: true,
    location: 'Victoria Island, Lagos',
  },
  {
    id: '2',
    name: 'TechHub Nigeria',
    description: 'Coworking space for tech startups',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&h=200&fit=crop',
    rating: 4.8,
    reviews: 89,
    category: 'Business',
    verified: true,
    featured: true,
    location: 'Ikeja, Lagos',
  },
  {
    id: '3',
    name: 'Naija Kitchen',
    description: 'Authentic Nigerian cuisine',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop',
    rating: 4.7,
    reviews: 234,
    category: 'Food',
    verified: false,
    featured: true,
    location: 'Abuja',
  },
];

const upcomingEvents = [
  {
    id: '1',
    title: 'Tech Meetup Lagos',
    description: 'Networking event for tech professionals',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=300&h=200&fit=crop',
    date: 'Dec 15, 2024',
    time: '6:00 PM',
    location: 'Victoria Island, Lagos',
    attendees: 156,
    category: 'Technology',
    verified: true,
    featured: true,
  },
  {
    id: '2',
    title: 'Fashion Week Abuja',
    description: 'Annual fashion showcase and networking',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop',
    date: 'Dec 20, 2024',
    time: '7:00 PM',
    location: 'Wuse Zone 2, Abuja',
    attendees: 89,
    category: 'Fashion',
    verified: true,
    featured: false,
  },
  {
    id: '3',
    title: 'Startup Pitch Night',
    description: 'Pitch your startup to investors',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=200&fit=crop',
    date: 'Dec 25, 2024',
    time: '5:00 PM',
    location: 'Enugu',
    attendees: 67,
    category: 'Business',
    verified: false,
    featured: true,
  },
];

const trendingTopics = [
  {
    id: '1',
    title: 'Best Nigerian Tech Startups 2024',
    description: 'Discover the most promising startups',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=300&h=200&fit=crop',
    views: 1250,
    category: 'Technology',
    isHot: true,
  },
  {
    id: '2',
    title: 'Traditional Nigerian Recipes',
    description: 'Preserving our culinary heritage',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop',
    views: 890,
    category: 'Food',
    isHot: false,
  },
  {
    id: '3',
    title: 'Remote Work Opportunities',
    description: 'Companies hiring Nigerian talent',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=200&fit=crop',
    views: 1567,
    category: 'Career',
    isHot: true,
  },
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

export default function DiscoverScreen({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

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
        size={20} 
        color={selectedCategory === item.name ? '#ffffff' : '#666666'} 
      />
      <Text style={[
        styles.categoryText,
        selectedCategory === item.name && styles.categoryTextActive,
      ]}>
        {item.name}
      </Text>
      <Text style={[
        styles.categoryCount,
        selectedCategory === item.name && styles.categoryCountActive,
      ]}>
        {item.count}
      </Text>
    </TouchableOpacity>
  );

  const renderBusiness = ({ item }) => (
    <TouchableOpacity style={styles.businessCard}>
      <View style={styles.businessImageContainer}>
        <Image source={{ uri: item.image }} style={styles.businessImage} />
        {item.featured && (
          <View style={styles.featuredBadge}>
            <Text style={styles.featuredText}>Featured</Text>
          </View>
        )}
      </View>
      <View style={styles.businessContent}>
        <View style={styles.businessHeader}>
          <Text style={styles.businessName}>{item.name}</Text>
          {item.verified && <PriorityIndicator type="verified" />}
        </View>
        <Text style={styles.businessDescription}>{item.description}</Text>
        <View style={styles.businessMeta}>
          <View style={styles.businessRating}>
            <Ionicons name="star" size={14} color="#ffa502" />
            <Text style={styles.ratingText}>{item.rating}</Text>
            <Text style={styles.reviewsText}>({item.reviews} reviews)</Text>
          </View>
          <View style={styles.businessLocation}>
            <Ionicons name="location" size={14} color="#666666" />
            <Text style={styles.locationText}>{item.location}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderEvent = ({ item }) => (
    <TouchableOpacity style={styles.eventCard}>
      <View style={styles.eventImageContainer}>
        <Image source={{ uri: item.image }} style={styles.eventImage} />
        {item.featured && (
          <View style={styles.featuredBadge}>
            <Text style={styles.featuredText}>Featured</Text>
          </View>
        )}
      </View>
      <View style={styles.eventContent}>
        <View style={styles.eventHeader}>
          <Text style={styles.eventTitle}>{item.title}</Text>
          {item.verified && <PriorityIndicator type="verified" />}
        </View>
        <Text style={styles.eventDescription}>{item.description}</Text>
        <View style={styles.eventMeta}>
          <View style={styles.eventDateTime}>
            <Ionicons name="calendar" size={14} color="#667eea" />
            <Text style={styles.dateText}>{item.date} • {item.time}</Text>
          </View>
          <View style={styles.eventLocation}>
            <Ionicons name="location" size={14} color="#666666" />
            <Text style={styles.locationText}>{item.location}</Text>
          </View>
          <View style={styles.eventAttendees}>
            <Ionicons name="people" size={14} color="#2ed573" />
            <Text style={styles.attendeesText}>{item.attendees} attending</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderTrendingTopic = ({ item }) => (
    <TouchableOpacity style={styles.topicCard}>
      <View style={styles.topicImageContainer}>
        <Image source={{ uri: item.image }} style={styles.topicImage} />
        {item.isHot && <PriorityIndicator type="hot" />}
      </View>
      <View style={styles.topicContent}>
        <Text style={styles.topicTitle}>{item.title}</Text>
        <Text style={styles.topicDescription}>{item.description}</Text>
        <View style={styles.topicMeta}>
          <View style={styles.topicViews}>
            <Ionicons name="eye" size={14} color="#666666" />
            <Text style={styles.viewsText}>{item.views} views</Text>
          </View>
          <View style={styles.topicCategory}>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
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
          <Text style={styles.headerTitle}>Discover</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity
              style={styles.headerAction}
              onPress={() => navigation.navigate('Post')}
            >
              <Ionicons name="add-circle" size={24} color="#ffffff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.headerAction}
              onPress={() => Alert.alert('Search', 'Search coming soon')}
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

          {/* Featured Businesses */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Featured Businesses</Text>
            <FlatList
              data={featuredBusinesses}
              renderItem={renderBusiness}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.businessesList}
            />
          </View>

          {/* Upcoming Events */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Upcoming Events</Text>
            <FlatList
              data={upcomingEvents}
              renderItem={renderEvent}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.eventsList}
            />
          </View>

          {/* Trending Topics */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Trending Topics</Text>
            <FlatList
              data={trendingTopics}
              renderItem={renderTrendingTopic}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.topicsList}
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
    marginBottom: 32,
  },
  categoriesList: {
    paddingHorizontal: 24,
  },
  categoryItem: {
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 16,
    marginRight: 16,
    minWidth: 100,
  },
  categoryItemActive: {
    backgroundColor: '#667eea',
  },
  categoryText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666666',
    marginTop: 8,
    textAlign: 'center',
  },
  categoryTextActive: {
    color: '#ffffff',
  },
  categoryCount: {
    fontSize: 12,
    color: '#666666',
    marginTop: 4,
  },
  categoryCountActive: {
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
  businessesList: {
    paddingHorizontal: 24,
  },
  businessCard: {
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    marginRight: 16,
    width: 280,
    overflow: 'hidden',
  },
  businessImageContainer: {
    position: 'relative',
    height: 160,
  },
  businessImage: {
    width: '100%',
    height: '100%',
  },
  featuredBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#ffa502',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  featuredText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  businessContent: {
    padding: 16,
  },
  businessHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  businessName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    flex: 1,
    marginRight: 8,
  },
  businessDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 12,
    lineHeight: 20,
  },
  businessMeta: {
    gap: 8,
  },
  businessRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    marginLeft: 4,
  },
  reviewsText: {
    fontSize: 12,
    color: '#666666',
    marginLeft: 4,
  },
  businessLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 12,
    color: '#666666',
    marginLeft: 4,
  },
  eventsList: {
    paddingHorizontal: 24,
  },
  eventCard: {
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    marginRight: 16,
    width: 280,
    overflow: 'hidden',
  },
  eventImageContainer: {
    position: 'relative',
    height: 160,
  },
  eventImage: {
    width: '100%',
    height: '100%',
  },
  eventContent: {
    padding: 16,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    flex: 1,
    marginRight: 8,
  },
  eventDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 12,
    lineHeight: 20,
  },
  eventMeta: {
    gap: 8,
  },
  eventDateTime: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 12,
    color: '#ffffff',
    marginLeft: 4,
  },
  eventLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventAttendees: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attendeesText: {
    fontSize: 12,
    color: '#666666',
    marginLeft: 4,
  },
  topicsList: {
    paddingHorizontal: 24,
  },
  topicCard: {
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    marginRight: 16,
    width: 280,
    overflow: 'hidden',
  },
  topicImageContainer: {
    position: 'relative',
    height: 160,
  },
  topicImage: {
    width: '100%',
    height: '100%',
  },
  topicContent: {
    padding: 16,
  },
  topicTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  topicDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 12,
    lineHeight: 20,
  },
  topicMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topicViews: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewsText: {
    fontSize: 12,
    color: '#666666',
    marginLeft: 4,
  },
  topicCategory: {
    backgroundColor: '#667eea20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  priorityIndicator: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 