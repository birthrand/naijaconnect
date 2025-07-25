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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme/theme';

// Mock data
const localDeals = [
  {
    id: '1',
    title: 'Debonair New York',
    description: 'Consultation, Hair Wash, Professional Styling Tips and Techniques, and Complimentary Amenities.',
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=300&h=200&fit=crop',
    discount: '10% Off',
    rating: 4.9,
    neighbors: 45,
    distance: '4.9 mi',
  },
  {
    id: '2',
    title: 'Love Co',
    description: 'Special Be Karaoke, Live Music, and Entertainment.',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&h=200&fit=crop',
    discount: '15% Off',
    rating: 4.9,
    neighbors: 32,
    distance: '2.1 mi',
  },
  {
    id: '3',
    title: 'Naija Kitchen',
    description: 'Authentic Nigerian Cuisine, Jollof Rice, Pounded Yam, and More.',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop',
    discount: '20% Off',
    rating: 4.8,
    neighbors: 67,
    distance: '1.5 mi',
  },
];

const communityPosts = [
  {
    id: '1',
    user: {
      name: 'Veronica Margareth',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      location: 'The Bronx',
      time: 'Now',
    },
    content: 'Hello! Does anyone have a recommendation for a skilled woodworker? I\'m looking to create a minibar for my house. Thanks!',
    location: '910 Grand Concourse, Bronx, NY 10451',
    likes: 12,
    comments: 8,
    shares: 3,
  },
  {
    id: '2',
    user: {
      name: 'Adebayo Johnson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      location: 'Lagos',
      time: '2 hours ago',
    },
    content: 'Just finished my latest tech project! Building a mobile app for local businesses. Anyone interested in collaboration? #Tech #NaijaTech',
    likes: 24,
    comments: 15,
    shares: 7,
  },
  {
    id: '3',
    user: {
      name: 'Chioma Okechukwu',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      location: 'Toronto',
      time: '4 hours ago',
    },
    content: 'Missing home so much! Made some authentic Nigerian pepper soup today. The aroma brought back so many memories. Who else is cooking traditional dishes this weekend? 🇳🇬',
    likes: 89,
    comments: 23,
    shares: 12,
  },
];

export default function HomeScreen({ navigation }) {
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filters = ['All', 'Lagos', 'Abuja', 'Enugu', 'Diaspora'];

  const renderDealCard = ({ item }) => (
    <View style={styles.dealCard}>
      <View style={styles.dealImageContainer}>
        <Image source={{ uri: item.image }} style={styles.dealImage} />
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>{item.discount}</Text>
        </View>
        <TouchableOpacity style={styles.bookmarkIcon}>
          <Ionicons name="bookmark-outline" size={20} color={theme.colors.gray} />
        </TouchableOpacity>
      </View>
      <View style={styles.dealContent}>
        <View style={styles.dealHeader}>
          <Text style={styles.dealTitle}>{item.title}</Text>
        </View>
        <Text style={styles.dealDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.dealStats}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color={theme.colors.secondary} />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
          <Text style={styles.neighborsText}>{item.neighbors} Neighbors Save</Text>
          <Text style={styles.distanceText}>{item.distance}</Text>
        </View>
        <TouchableOpacity style={styles.seeMoreButton}>
          <Text style={styles.seeMoreText}>See More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderPost = ({ item }) => (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <View style={styles.userInfo}>
          <Image source={{ uri: item.user.avatar }} style={styles.userAvatar} />
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{item.user.name}</Text>
            <Text style={styles.userLocation}>{item.user.location} • {item.user.time}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.postOptions}>
          <Ionicons name="ellipsis-vertical" size={20} color={theme.colors.gray} />
        </TouchableOpacity>
      </View>
      
      <Text style={styles.postContent}>{item.content}</Text>
      
      {item.location && (
        <View style={styles.locationContainer}>
          <Ionicons name="location" size={16} color={theme.colors.primary} />
          <Text style={styles.locationText}>{item.location}</Text>
        </View>
      )}
      
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
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.greeting}>Good Morning!</Text>
          <Text style={styles.userName}>🇳🇬 Welcome to NaijaConnect</Text>
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

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Local Deals Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Local Deals</Text>
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

        {/* Filter Tabs */}
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

        {/* Community Posts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Community Feed</Text>
          {communityPosts.map((post) => (
            <View key={post.id} style={styles.postCard}>
              <View style={styles.postHeader}>
                <View style={styles.userInfo}>
                  <Image source={{ uri: post.user.avatar }} style={styles.userAvatar} />
                  <View style={styles.userDetails}>
                    <Text style={styles.userName}>{post.user.name}</Text>
                    <Text style={styles.userLocation}>{post.user.location} • {post.user.time}</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.postOptions}>
                  <Ionicons name="ellipsis-vertical" size={20} color={theme.colors.gray} />
                </TouchableOpacity>
              </View>
              
              <Text style={styles.postContent}>{post.content}</Text>
              
              {post.location && (
                <View style={styles.locationContainer}>
                  <Ionicons name="location" size={16} color={theme.colors.primary} />
                  <Text style={styles.locationText}>{post.location}</Text>
                </View>
              )}
              
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
  headerLeft: {
    flex: 1,
  },
  greeting: {
    fontSize: 16,
    color: theme.colors.gray,
  },
  userName: {
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
  closeButton: {
    padding: theme.spacing.sm,
  },
  dealsList: {
    paddingHorizontal: theme.spacing.lg,
  },
  dealCard: {
    width: 280,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    marginRight: theme.spacing.md,
    ...theme.shadows.medium,
  },
  dealImageContainer: {
    position: 'relative',
  },
  dealImage: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: theme.borderRadius.lg,
    borderTopRightRadius: theme.borderRadius.lg,
  },
  discountBadge: {
    position: 'absolute',
    top: theme.spacing.sm,
    right: theme.spacing.sm,
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
    position: 'absolute',
    top: theme.spacing.sm,
    left: theme.spacing.sm,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.round,
    padding: theme.spacing.xs,
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
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.black,
    flex: 1,
  },
  dealDescription: {
    fontSize: 14,
    color: theme.colors.gray,
    marginBottom: theme.spacing.sm,
    lineHeight: 20,
  },
  dealStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: theme.spacing.sm,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.black,
    marginLeft: 2,
  },
  neighborsText: {
    fontSize: 12,
    color: theme.colors.gray,
    marginRight: theme.spacing.sm,
  },
  distanceText: {
    fontSize: 12,
    color: theme.colors.gray,
  },
  seeMoreButton: {
    backgroundColor: theme.colors.lightGray,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
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
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: theme.spacing.sm,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.black,
  },
  userLocation: {
    fontSize: 14,
    color: theme.colors.gray,
  },
  postOptions: {
    padding: theme.spacing.sm,
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
}); 