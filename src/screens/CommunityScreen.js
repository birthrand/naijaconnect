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

// Mock data for community topics
const communityTopics = [
  {
    id: '1',
    title: 'Best Nigerian Tech Startups to Watch in 2024',
    author: 'Sarah Johnson',
    category: 'Technology',
    upvotes: 156,
    comments: 23,
    timeAgo: '2h ago',
    isHot: true,
    isPinned: false,
    tags: ['#Tech', '#Startups', '#Nigeria'],
    preview: 'Discussing the most promising tech startups emerging from Nigeria this year...',
  },
  {
    id: '2',
    title: 'Traditional Nigerian Recipes That Need to Be Preserved',
    author: 'Chioma Adebayo',
    category: 'Food & Culture',
    upvotes: 89,
    comments: 45,
    timeAgo: '4h ago',
    isHot: false,
    isPinned: true,
    tags: ['#Food', '#Culture', '#Traditional'],
    preview: 'Let\'s share and preserve our traditional recipes before they\'re lost...',
  },
  {
    id: '3',
    title: 'Remote Work Opportunities for Nigerian Developers',
    author: 'David Okonkwo',
    category: 'Professional',
    upvotes: 234,
    comments: 67,
    timeAgo: '6h ago',
    isHot: true,
    isPinned: false,
    tags: ['#RemoteWork', '#Developers', '#Jobs'],
    preview: 'Compiling a list of companies hiring remote developers from Nigeria...',
  },
  {
    id: '4',
    title: 'Nollywood Movies That Deserve International Recognition',
    author: 'Aisha Bello',
    category: 'Entertainment',
    upvotes: 123,
    comments: 34,
    timeAgo: '8h ago',
    isHot: false,
    isPinned: false,
    tags: ['#Nollywood', '#Movies', '#Entertainment'],
    preview: 'Which Nigerian movies do you think should get more global attention?',
  },
  {
    id: '5',
    title: 'Sustainable Business Ideas for Nigerian Entrepreneurs',
    author: 'Michael Eze',
    category: 'Business',
    upvotes: 178,
    comments: 56,
    timeAgo: '12h ago',
    isHot: true,
    isPinned: false,
    tags: ['#Business', '#Entrepreneurship', '#Sustainability'],
    preview: 'Exploring eco-friendly business opportunities in Nigeria...',
  },
];

const categories = [
  { id: '1', name: 'All', icon: 'grid' },
  { id: '2', name: 'Technology', icon: 'laptop' },
  { id: '3', name: 'Business', icon: 'briefcase' },
  { id: '4', name: 'Food & Culture', icon: 'restaurant' },
  { id: '5', name: 'Entertainment', icon: 'musical-notes' },
  { id: '6', name: 'Professional', icon: 'people' },
  { id: '7', name: 'Lifestyle', icon: 'heart' },
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

export default function CommunityScreen({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('hot');

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

  const renderTopic = ({ item }) => (
    <TouchableOpacity style={styles.topicCard}>
      <View style={styles.topicHeader}>
        <View style={styles.topicMeta}>
          <View style={styles.topicIndicators}>
            {item.isHot && <PriorityIndicator type="hot" />}
            {item.isPinned && <PriorityIndicator type="pinned" />}
          </View>
          <Text style={styles.topicCategory}>{item.category}</Text>
        </View>
        <Text style={styles.topicTitle}>{item.title}</Text>
        <Text style={styles.topicPreview}>{item.preview}</Text>
      </View>

      <View style={styles.topicFooter}>
        <View style={styles.topicAuthor}>
          <Text style={styles.authorText}>by {item.author}</Text>
          <Text style={styles.timeText}>{item.timeAgo}</Text>
        </View>

        <View style={styles.topicStats}>
          <View style={styles.statItem}>
            <Ionicons name="arrow-up" size={16} color="#2ed573" />
            <Text style={styles.statText}>{item.upvotes}</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="chatbubble-outline" size={16} color="#667eea" />
            <Text style={styles.statText}>{item.comments}</Text>
          </View>
        </View>
      </View>

      <View style={styles.topicTags}>
        {item.tags.map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
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
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Community</Text>
            <Text style={styles.headerSubtitle}>Join the conversation</Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity
              style={styles.headerAction}
              onPress={() => Alert.alert('Search', 'Search coming soon')}
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

          {/* Sort Options */}
          <View style={styles.sortContainer}>
            <TouchableOpacity
              style={[styles.sortButton, sortBy === 'hot' && styles.sortButtonActive]}
              onPress={() => setSortBy('hot')}
            >
              <Ionicons name="flame" size={16} color={sortBy === 'hot' ? '#ffffff' : '#666666'} />
              <Text style={[styles.sortText, sortBy === 'hot' && styles.sortTextActive]}>Hot</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.sortButton, sortBy === 'new' && styles.sortButtonActive]}
              onPress={() => setSortBy('new')}
            >
              <Ionicons name="time" size={16} color={sortBy === 'new' ? '#ffffff' : '#666666'} />
              <Text style={[styles.sortText, sortBy === 'new' && styles.sortTextActive]}>New</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.sortButton, sortBy === 'top' && styles.sortButtonActive]}
              onPress={() => setSortBy('top')}
            >
              <Ionicons name="trending-up" size={16} color={sortBy === 'top' ? '#ffffff' : '#666666'} />
              <Text style={[styles.sortText, sortBy === 'top' && styles.sortTextActive]}>Top</Text>
            </TouchableOpacity>
          </View>

          {/* Topics */}
          <View style={styles.topicsContainer}>
            <FlatList
              data={communityTopics}
              renderItem={renderTopic}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
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
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
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
  sortContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
  },
  sortButtonActive: {
    backgroundColor: '#667eea',
  },
  sortText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666666',
    marginLeft: 6,
  },
  sortTextActive: {
    color: '#ffffff',
  },
  topicsContainer: {
    paddingHorizontal: 24,
  },
  topicCard: {
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  topicHeader: {
    marginBottom: 16,
  },
  topicMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  topicIndicators: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topicCategory: {
    fontSize: 12,
    fontWeight: '500',
    color: '#667eea',
    backgroundColor: '#667eea20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  topicTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    lineHeight: 24,
    marginBottom: 8,
  },
  topicPreview: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  topicFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  topicAuthor: {
    flex: 1,
  },
  authorText: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '500',
  },
  timeText: {
    fontSize: 12,
    color: '#666666',
    marginTop: 2,
  },
  topicStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  statText: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 4,
  },
  topicTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#404040',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 12,
    color: '#ffffff',
  },
  priorityIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 4,
  },
}); 