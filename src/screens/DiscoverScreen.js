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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme/theme';
import { DESIGN_SYSTEM, LAYOUT_PATTERNS, COMPONENT_STYLES } from '../theme/designSystem';
import {
  Header,
  Card,
  Button,
  Badge,
  IconButton,
  HeadlineText,
  TitleText,
  BodyText,
  LabelText,
  Spacer,
  SectionHeader,
  Avatar,
} from '../components/DesignSystemComponents';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Enhanced mock data
const discoverCategories = [
  { 
    id: '1', 
    name: 'Restaurants', 
    icon: 'restaurant', 
    color: '#FF6B6B',
    count: 45,
    description: 'Authentic Nigerian cuisine'
  },
  { 
    id: '2', 
    name: 'Events', 
    icon: 'calendar', 
    color: '#4ECDC4',
    count: 23,
    description: 'Upcoming celebrations'
  },
  { 
    id: '3', 
    name: 'Businesses', 
    icon: 'business', 
    color: '#45B7D1',
    count: 67,
    description: 'Local entrepreneurs'
  },
  { 
    id: '4', 
    name: 'Groups', 
    icon: 'people', 
    color: '#96CEB4',
    count: 34,
    description: 'Community groups'
  },
  { 
    id: '5', 
    name: 'Culture', 
    icon: 'flag', 
    color: '#FFEAA7',
    count: 28,
    description: 'Heritage & traditions'
  },
  { 
    id: '6', 
    name: 'Jobs', 
    icon: 'briefcase', 
    color: '#DDA0DD',
    count: 89,
    description: 'Career opportunities'
  },
];

const featuredBusinesses = [
  {
    id: '1',
    name: 'Naija Kitchen Express',
    category: 'Restaurant',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop',
    rating: 4.8,
    reviews: 156,
    distance: '0.5 km',
    description: 'Authentic Nigerian cuisine in the heart of the city',
    verified: true,
    featured: true,
  },
  {
    id: '2',
    name: 'Yoruba Cultural Center',
    category: 'Culture',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&h=200&fit=crop',
    rating: 4.9,
    reviews: 89,
    distance: '1.2 km',
    description: 'Preserving and promoting Yoruba culture and traditions',
    verified: true,
    featured: true,
  },
  {
    id: '3',
    name: 'Tech Naija Hub',
    category: 'Business',
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=300&h=200&fit=crop',
    rating: 4.7,
    reviews: 234,
    distance: '2.1 km',
    description: 'Innovation hub for Nigerian tech entrepreneurs',
    verified: true,
    featured: true,
  },
];

const upcomingEvents = [
  {
    id: '1',
    title: 'Nigerian Independence Day Celebration',
    date: 'Oct 1, 2024',
    time: '6:00 PM',
    location: 'Central Park, Lagos',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&h=200&fit=crop',
    attendees: 450,
    category: 'Culture',
    featured: true,
  },
  {
    id: '2',
    title: 'Naija Tech Meetup',
    date: 'Oct 15, 2024',
    time: '7:00 PM',
    location: 'Victoria Island Tech Hub',
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=300&h=200&fit=crop',
    attendees: 120,
    category: 'Business',
    featured: true,
  },
  {
    id: '3',
    title: 'Traditional Nigerian Cooking Class',
    date: 'Oct 22, 2024',
    time: '2:00 PM',
    location: 'Naija Kitchen',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop',
    attendees: 25,
    category: 'Food',
    featured: true,
  },
];

const trendingTopics = [
  { id: '1', title: 'Jollof Rice Festival', participants: 234, category: 'Food' },
  { id: '2', title: 'Nigerian Fashion Week', participants: 189, category: 'Culture' },
  { id: '3', title: 'Tech Startup Pitch', participants: 67, category: 'Business' },
  { id: '4', title: 'Traditional Dance Workshop', participants: 45, category: 'Culture' },
];

export default function DiscoverScreen({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const renderCategory = ({ item }) => (
    <TouchableOpacity 
      style={styles.categoryCard}
      onPress={() => setSelectedCategory(item.name)}
    >
      <View style={[styles.categoryIcon, { backgroundColor: item.color }]}>
        <Ionicons name={item.icon} size={24} color={theme.colors.white} />
      </View>
      <View style={styles.categoryContent}>
        <TitleText variant="small" style={styles.categoryName}>
          {item.name}
        </TitleText>
        <BodyText variant="small" style={styles.categoryCount}>
          {item.count} places
        </BodyText>
        <BodyText variant="small" style={styles.categoryDescription}>
          {item.description}
        </BodyText>
      </View>
    </TouchableOpacity>
  );

  const renderBusiness = ({ item }) => (
    <Card variant="standard" style={styles.businessCard}>
      <View style={styles.businessImageContainer}>
        <Image source={{ uri: item.image }} style={styles.businessImage} />
        {item.featured && (
          <View style={styles.featuredBadge}>
            <Badge variant="primary">Featured</Badge>
          </View>
        )}
        {item.verified && (
          <View style={styles.verifiedBadge}>
            <Ionicons name="checkmark-circle" size={16} color={theme.colors.primary} />
          </View>
        )}
      </View>
      <View style={styles.businessContent}>
        <View style={styles.businessHeader}>
          <TitleText variant="medium" style={styles.businessName}>
            {item.name}
          </TitleText>
          <View style={styles.businessRating}>
            <Ionicons name="star" size={14} color={theme.colors.secondary} />
            <BodyText variant="small" style={styles.ratingText}>
              {item.rating} ({item.reviews})
            </BodyText>
          </View>
        </View>
        <BodyText variant="small" style={styles.businessCategory}>
          {item.category}
        </BodyText>
        <BodyText variant="small" style={styles.businessDescription}>
          {item.description}
        </BodyText>
        <View style={styles.businessMeta}>
          <View style={styles.metaItem}>
            <Ionicons name="location" size={12} color={theme.colors.gray[500]} />
            <BodyText variant="small" style={styles.metaText}>
              {item.distance}
            </BodyText>
          </View>
        </View>
      </View>
    </Card>
  );

  const renderEvent = ({ item }) => (
    <Card variant="standard" style={styles.eventCard}>
      <View style={styles.eventImageContainer}>
        <Image source={{ uri: item.image }} style={styles.eventImage} />
        {item.featured && (
          <View style={styles.featuredBadge}>
            <Badge variant="primary">Featured</Badge>
          </View>
        )}
      </View>
      <View style={styles.eventContent}>
        <View style={styles.eventHeader}>
          <TitleText variant="medium" style={styles.eventTitle}>
            {item.title}
          </TitleText>
          <Badge variant="secondary" style={styles.eventCategory}>
            {item.category}
          </Badge>
        </View>
        <View style={styles.eventMeta}>
          <View style={styles.metaItem}>
            <Ionicons name="calendar" size={12} color={theme.colors.gray[500]} />
            <BodyText variant="small" style={styles.metaText}>
              {item.date} • {item.time}
            </BodyText>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="location" size={12} color={theme.colors.gray[500]} />
            <BodyText variant="small" style={styles.metaText}>
              {item.location}
            </BodyText>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="people" size={12} color={theme.colors.gray[500]} />
            <BodyText variant="small" style={styles.metaText}>
              {item.attendees} attending
            </BodyText>
          </View>
        </View>
      </View>
    </Card>
  );

  const renderTrendingTopic = ({ item }) => (
    <TouchableOpacity style={styles.trendingItem}>
      <View style={styles.trendingContent}>
        <TitleText variant="small" style={styles.trendingTitle}>
          {item.title}
        </TitleText>
        <View style={styles.trendingMeta}>
          <Badge variant="secondary" style={styles.trendingCategory}>
            {item.category}
          </Badge>
          <View style={styles.trendingParticipants}>
            <Ionicons name="people" size={12} color={theme.colors.gray[500]} />
            <BodyText variant="small" style={styles.participantsText}>
              {item.participants}
            </BodyText>
          </View>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={16} color={theme.colors.gray[400]} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[LAYOUT_PATTERNS.screen.container, { paddingTop: 0 }]}>
      <Header
        title="Discover"
        subtitle="Explore Nigerian culture & community"
        rightComponent={
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Post')}
              style={{ marginRight: DESIGN_SYSTEM.layout.elementSpacing }}
            >
              <Ionicons 
                name="add-circle" 
                size={DESIGN_SYSTEM.iconSizes.lg} 
                color={theme.colors.gray[800]} 
              />
            </TouchableOpacity>
            <TouchableOpacity
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

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Categories Grid */}
        <View style={LAYOUT_PATTERNS.section.container}>
          <SectionHeader title="Explore Categories" />
          <FlatList
            data={discoverCategories}
            renderItem={renderCategory}
            keyExtractor={(item) => item.id}
            numColumns={2}
            scrollEnabled={false}
            contentContainerStyle={LAYOUT_PATTERNS.grid.container}
          />
        </View>

        {/* Featured Businesses */}
        <View style={LAYOUT_PATTERNS.section.container}>
          <SectionHeader 
            title="Featured Businesses" 
            rightAction={
              <TouchableOpacity>
                <BodyText variant="small" style={styles.seeAllText}>
                  See all
                </BodyText>
              </TouchableOpacity>
            }
          />
          <FlatList
            data={featuredBusinesses}
            renderItem={renderBusiness}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={LAYOUT_PATTERNS.list.container}
          />
        </View>

        {/* Upcoming Events */}
        <View style={LAYOUT_PATTERNS.section.container}>
          <SectionHeader 
            title="Upcoming Events" 
            rightAction={
              <TouchableOpacity>
                <BodyText variant="small" style={styles.seeAllText}>
                  See all
                </BodyText>
              </TouchableOpacity>
            }
          />
          <FlatList
            data={upcomingEvents}
            renderItem={renderEvent}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={LAYOUT_PATTERNS.list.container}
          />
        </View>

        {/* Trending Topics */}
        <View style={LAYOUT_PATTERNS.section.container}>
          <SectionHeader title="Trending Topics" />
          <FlatList
            data={trendingTopics}
            renderItem={renderTrendingTopic}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            contentContainerStyle={LAYOUT_PATTERNS.list.container}
          />
        </View>

        <Spacer size="xl" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  categoryCard: {
    flex: 1,
    backgroundColor: theme.colors.white,
    borderRadius: DESIGN_SYSTEM.borderRadius.lg,
    padding: DESIGN_SYSTEM.layout.elementSpacing,
    margin: DESIGN_SYSTEM.layout.elementSpacing / 2,
    alignItems: 'center',
    ...DESIGN_SYSTEM.shadows.small,
  },
  categoryIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: DESIGN_SYSTEM.layout.elementSpacing,
  },
  categoryContent: {
    alignItems: 'center',
  },
  categoryName: {
    textAlign: 'center',
  },
  categoryCount: {
    marginTop: DESIGN_SYSTEM.layout.elementSpacing / 2,
  },
  categoryDescription: {
    textAlign: 'center',
    marginTop: DESIGN_SYSTEM.layout.elementSpacing / 2,
  },
  businessCard: {
    width: SCREEN_WIDTH * 0.8,
    marginRight: DESIGN_SYSTEM.layout.elementSpacing,
  },
  businessImageContainer: {
    position: 'relative',
    width: '100%',
    height: 120,
  },
  businessImage: {
    width: '100%',
    height: '100%',
    borderRadius: DESIGN_SYSTEM.borderRadius.md,
  },
  featuredBadge: {
    position: 'absolute',
    top: DESIGN_SYSTEM.layout.elementSpacing / 2,
    right: DESIGN_SYSTEM.layout.elementSpacing / 2,
    zIndex: 1,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: DESIGN_SYSTEM.layout.elementSpacing / 2,
    left: DESIGN_SYSTEM.layout.elementSpacing / 2,
    backgroundColor: theme.colors.white,
    borderRadius: DESIGN_SYSTEM.borderRadius.sm,
    padding: DESIGN_SYSTEM.layout.elementSpacing / 4,
    zIndex: 1,
  },
  businessContent: {
    padding: DESIGN_SYSTEM.layout.elementSpacing,
  },
  businessHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: DESIGN_SYSTEM.layout.elementSpacing / 2,
  },
  businessName: {
    flex: 1,
    marginRight: DESIGN_SYSTEM.layout.elementSpacing,
  },
  businessRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: DESIGN_SYSTEM.layout.elementSpacing / 2,
  },
  businessCategory: {
    marginBottom: DESIGN_SYSTEM.layout.elementSpacing / 2,
  },
  businessDescription: {
    marginBottom: DESIGN_SYSTEM.layout.elementSpacing,
  },
  businessMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    marginLeft: DESIGN_SYSTEM.layout.elementSpacing / 2,
  },
  eventCard: {
    width: SCREEN_WIDTH * 0.8,
    marginRight: DESIGN_SYSTEM.layout.elementSpacing,
  },
  eventImageContainer: {
    position: 'relative',
    width: '100%',
    height: 150,
  },
  eventImage: {
    width: '100%',
    height: '100%',
    borderRadius: DESIGN_SYSTEM.borderRadius.md,
  },
  eventContent: {
    padding: DESIGN_SYSTEM.layout.elementSpacing,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: DESIGN_SYSTEM.layout.elementSpacing,
  },
  eventTitle: {
    flex: 1,
    marginRight: DESIGN_SYSTEM.layout.elementSpacing,
  },
  eventCategory: {
    alignSelf: 'flex-start',
  },
  eventMeta: {
    gap: DESIGN_SYSTEM.layout.elementSpacing / 2,
  },
  trendingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: DESIGN_SYSTEM.layout.elementSpacing,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[100],
  },
  trendingContent: {
    flex: 1,
  },
  trendingTitle: {
    marginBottom: DESIGN_SYSTEM.layout.elementSpacing / 2,
  },
  trendingMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trendingCategory: {
    marginRight: DESIGN_SYSTEM.layout.elementSpacing,
  },
  trendingParticipants: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  participantsText: {
    marginLeft: DESIGN_SYSTEM.layout.elementSpacing / 2,
  },
  seeAllText: {
    color: theme.colors.primary,
  },
}); 