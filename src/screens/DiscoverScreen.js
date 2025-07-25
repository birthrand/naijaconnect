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
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme/theme';

// Mock data
const categories = [
  { id: '1', name: 'Restaurants', icon: 'restaurant', color: theme.colors.primary },
  { id: '2', name: 'Events', icon: 'calendar', color: theme.colors.secondary },
  { id: '3', name: 'Businesses', icon: 'briefcase', color: theme.colors.accent },
  { id: '4', name: 'Groups', icon: 'people', color: theme.colors.info },
  { id: '5', name: 'Culture', icon: 'flag', color: theme.colors.warmOrange },
  { id: '6', name: 'Jobs', icon: 'briefcase', color: theme.colors.success },
];

const featuredBusinesses = [
  {
    id: '1',
    name: 'Naija Kitchen Express',
    category: 'Restaurant',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop',
    rating: 4.8,
    reviews: 156,
    distance: '0.5 mi',
    description: 'Authentic Nigerian cuisine in the heart of the city',
  },
  {
    id: '2',
    name: 'Yoruba Cultural Center',
    category: 'Culture',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&h=200&fit=crop',
    rating: 4.9,
    reviews: 89,
    distance: '1.2 mi',
    description: 'Preserving and promoting Yoruba culture and traditions',
  },
  {
    id: '3',
    name: 'Tech Naija Hub',
    category: 'Business',
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=300&h=200&fit=crop',
    rating: 4.7,
    reviews: 234,
    distance: '2.1 mi',
    description: 'Innovation hub for Nigerian tech entrepreneurs',
  },
];

const upcomingEvents = [
  {
    id: '1',
    title: 'Nigerian Independence Day Celebration',
    date: 'Oct 1, 2024',
    time: '6:00 PM',
    location: 'Central Park, NYC',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&h=200&fit=crop',
    attendees: 450,
  },
  {
    id: '2',
    title: 'Naija Tech Meetup',
    date: 'Oct 15, 2024',
    time: '7:00 PM',
    location: 'Brooklyn Tech Hub',
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=300&h=200&fit=crop',
    attendees: 120,
  },
  {
    id: '3',
    title: 'Traditional Nigerian Cooking Class',
    date: 'Oct 22, 2024',
    time: '2:00 PM',
    location: 'Naija Kitchen',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop',
    attendees: 25,
  },
];

export default function DiscoverScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryCard,
        selectedCategory === item.id && styles.categoryCardActive,
      ]}
      onPress={() => setSelectedCategory(selectedCategory === item.id ? null : item.id)}
    >
      <View style={[styles.categoryIcon, { backgroundColor: item.color }]}>
        <Ionicons name={item.icon} size={24} color={theme.colors.white} />
      </View>
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderBusiness = ({ item }) => (
    <TouchableOpacity style={styles.businessCard}>
      <Image source={{ uri: item.image }} style={styles.businessImage} />
      <View style={styles.businessContent}>
        <View style={styles.businessHeader}>
          <Text style={styles.businessName}>{item.name}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color={theme.colors.secondary} />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
        <Text style={styles.businessCategory}>{item.category}</Text>
        <Text style={styles.businessDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.businessStats}>
          <Text style={styles.reviewsText}>{item.reviews} reviews</Text>
          <Text style={styles.distanceText}>{item.distance}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderEvent = ({ item }) => (
    <TouchableOpacity style={styles.eventCard}>
      <Image source={{ uri: item.image }} style={styles.eventImage} />
      <View style={styles.eventContent}>
        <Text style={styles.eventTitle}>{item.title}</Text>
        <View style={styles.eventDetails}>
          <View style={styles.eventDetail}>
            <Ionicons name="calendar" size={16} color={theme.colors.gray} />
            <Text style={styles.eventDetailText}>{item.date} at {item.time}</Text>
          </View>
          <View style={styles.eventDetail}>
            <Ionicons name="location" size={16} color={theme.colors.gray} />
            <Text style={styles.eventDetailText}>{item.location}</Text>
          </View>
          <View style={styles.eventDetail}>
            <Ionicons name="people" size={16} color={theme.colors.gray} />
            <Text style={styles.eventDetailText}>{item.attendees} attending</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.attendButton}>
          <Text style={styles.attendButtonText}>Attend</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Discover</Text>
        <TouchableOpacity style={styles.headerIcon}>
          <Ionicons name="filter" size={24} color={theme.colors.black} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={theme.colors.gray} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search businesses, events, or people..."
            placeholderTextColor={theme.colors.gray}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
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
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Businesses</Text>
            <TouchableOpacity onPress={() => navigation.navigate('BusinessDirectory')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          {featuredBusinesses.map((business) => (
            <View key={business.id} style={styles.businessCard}>
              <Image source={{ uri: business.image }} style={styles.businessImage} />
              <View style={styles.businessContent}>
                <View style={styles.businessHeader}>
                  <Text style={styles.businessName}>{business.name}</Text>
                  <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={16} color={theme.colors.secondary} />
                    <Text style={styles.ratingText}>{business.rating}</Text>
                  </View>
                </View>
                <Text style={styles.businessCategory}>{business.category}</Text>
                <Text style={styles.businessDescription} numberOfLines={2}>
                  {business.description}
                </Text>
                <View style={styles.businessStats}>
                  <Text style={styles.reviewsText}>{business.reviews} reviews</Text>
                  <Text style={styles.distanceText}>{business.distance}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Upcoming Events */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Events</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Events')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          {upcomingEvents.map((event) => (
            <View key={event.id} style={styles.eventCard}>
              <Image source={{ uri: event.image }} style={styles.eventImage} />
              <View style={styles.eventContent}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <View style={styles.eventDetails}>
                  <View style={styles.eventDetail}>
                    <Ionicons name="calendar" size={16} color={theme.colors.gray} />
                    <Text style={styles.eventDetailText}>{event.date} at {event.time}</Text>
                  </View>
                  <View style={styles.eventDetail}>
                    <Ionicons name="location" size={16} color={theme.colors.gray} />
                    <Text style={styles.eventDetailText}>{event.location}</Text>
                  </View>
                  <View style={styles.eventDetail}>
                    <Ionicons name="people" size={16} color={theme.colors.gray} />
                    <Text style={styles.eventDetailText}>{event.attendees} attending</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.attendButton}>
                  <Text style={styles.attendButtonText}>Attend</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
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
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.black,
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
  seeAllText: {
    fontSize: 16,
    color: theme.colors.primary,
    fontWeight: '500',
  },
  categoriesList: {
    paddingHorizontal: theme.spacing.lg,
  },
  categoryCard: {
    alignItems: 'center',
    marginRight: theme.spacing.lg,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    minWidth: 80,
    ...theme.shadows.small,
  },
  categoryCardActive: {
    backgroundColor: theme.colors.primary,
  },
  categoryIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.sm,
  },
  categoryName: {
    fontSize: 12,
    fontWeight: '500',
    color: theme.colors.black,
    textAlign: 'center',
  },
  businessCard: {
    flexDirection: 'row',
    backgroundColor: theme.colors.white,
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    ...theme.shadows.small,
  },
  businessImage: {
    width: 100,
    height: 100,
  },
  businessContent: {
    flex: 1,
    padding: theme.spacing.md,
  },
  businessHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  businessName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.black,
    flex: 1,
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
  businessCategory: {
    fontSize: 14,
    color: theme.colors.primary,
    fontWeight: '500',
    marginBottom: theme.spacing.xs,
  },
  businessDescription: {
    fontSize: 14,
    color: theme.colors.gray,
    lineHeight: 20,
    marginBottom: theme.spacing.sm,
  },
  businessStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  reviewsText: {
    fontSize: 12,
    color: theme.colors.gray,
  },
  distanceText: {
    fontSize: 12,
    color: theme.colors.gray,
  },
  eventCard: {
    backgroundColor: theme.colors.white,
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    ...theme.shadows.small,
  },
  eventImage: {
    width: '100%',
    height: 150,
  },
  eventContent: {
    padding: theme.spacing.md,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.black,
    marginBottom: theme.spacing.sm,
  },
  eventDetails: {
    marginBottom: theme.spacing.md,
  },
  eventDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  eventDetailText: {
    fontSize: 14,
    color: theme.colors.gray,
    marginLeft: theme.spacing.sm,
  },
  attendButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
  },
  attendButtonText: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 