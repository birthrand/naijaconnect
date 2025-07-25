import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme/theme';
import { DESIGN_SYSTEM, LAYOUT_PATTERNS } from '../theme/designSystem';
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

// Mock data for community discussions
const communityTopics = [
  {
    id: '1',
    title: 'What\'s your favorite Nigerian dish and why?',
    author: {
      name: 'Chioma Okechukwu',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      verified: true,
    },
    category: 'Food & Culture',
    upvotes: 127,
    comments: 89,
    timeAgo: '2h ago',
    isHot: true,
    isPinned: false,
    tags: ['food', 'culture', 'discussion'],
    preview: 'I\'ve been thinking about this lately. For me, it\'s definitely jollof rice with plantains. The combination of flavors is just...',
  },
  {
    id: '2',
    title: 'Tech startups in Lagos: What challenges are you facing?',
    author: {
      name: 'Adebayo Tech',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      verified: true,
    },
    category: 'Business & Tech',
    upvotes: 234,
    comments: 156,
    timeAgo: '4h ago',
    isHot: true,
    isPinned: true,
    tags: ['startup', 'tech', 'lagos'],
    preview: 'Fellow entrepreneurs, let\'s discuss the real challenges of building tech startups in Lagos. From funding to infrastructure...',
  },
  {
    id: '3',
    title: 'Traditional vs Modern parenting: What works for Nigerian families?',
    author: {
      name: 'Fatima Hassan',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      verified: false,
    },
    category: 'Family & Lifestyle',
    upvotes: 89,
    comments: 67,
    timeAgo: '6h ago',
    isHot: false,
    isPinned: false,
    tags: ['parenting', 'family', 'lifestyle'],
    preview: 'As a mother of two, I\'m curious about how other Nigerian families balance traditional values with modern parenting approaches...',
  },
  {
    id: '4',
    title: 'Best places to visit in Nigeria that tourists don\'t know about',
    author: {
      name: 'Travel Naija',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      verified: true,
    },
    category: 'Travel & Tourism',
    upvotes: 156,
    comments: 98,
    timeAgo: '8h ago',
    isHot: false,
    isPinned: false,
    tags: ['travel', 'tourism', 'hidden-gems'],
    preview: 'Let\'s share those hidden gems that make Nigeria special. I\'ll start with the Obudu Cattle Ranch in Cross River...',
  },
  {
    id: '5',
    title: 'Remote work opportunities for Nigerians: Companies hiring globally',
    author: {
      name: 'Remote Worker NG',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      verified: false,
    },
    category: 'Career & Jobs',
    upvotes: 312,
    comments: 203,
    timeAgo: '12h ago',
    isHot: true,
    isPinned: false,
    tags: ['remote-work', 'jobs', 'career'],
    preview: 'I\'ve been working remotely for 3 years now. Here are some companies that actively hire Nigerians for remote positions...',
  },
  {
    id: '6',
    title: 'Nigerian music evolution: From traditional to Afrobeats',
    author: {
      name: 'Music Historian',
      avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop&crop=face',
      verified: true,
    },
    category: 'Arts & Entertainment',
    upvotes: 178,
    comments: 134,
    timeAgo: '1d ago',
    isHot: false,
    isPinned: false,
    tags: ['music', 'afrobeats', 'culture'],
    preview: 'The journey of Nigerian music is fascinating. From traditional folk music to the global phenomenon of Afrobeats...',
  },
];

const categories = [
  { id: 'all', name: 'All', icon: 'grid', active: true },
  { id: 'tech', name: 'Tech', icon: 'laptop', active: false },
  { id: 'culture', name: 'Culture', icon: 'flag', active: false },
  { id: 'business', name: 'Business', icon: 'briefcase', active: false },
  { id: 'lifestyle', name: 'Lifestyle', icon: 'heart', active: false },
  { id: 'travel', name: 'Travel', icon: 'airplane', active: false },
];

export default function CommunityScreen({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('hot'); // hot, new, top

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategory === item.id && styles.categoryItemActive,
      ]}
      onPress={() => setSelectedCategory(item.id)}
    >
      <Ionicons
        name={item.icon}
        size={DESIGN_SYSTEM.iconSizes.sm}
        color={selectedCategory === item.id ? theme.colors.white : theme.colors.gray[600]}
      />
      <LabelText
        variant="small"
        style={[
          styles.categoryText,
          selectedCategory === item.id && styles.categoryTextActive,
        ]}
      >
        {item.name}
      </LabelText>
    </TouchableOpacity>
  );

  const renderTopic = ({ item }) => (
    <Card variant="standard" style={styles.topicCard}>
      <View style={styles.topicHeader}>
        <View style={styles.authorInfo}>
          <Avatar size="small" source={{ uri: item.author.avatar }} />
          <View style={styles.authorDetails}>
            <View style={styles.authorRow}>
              <BodyText variant="small" style={styles.authorName}>
                {item.author.name}
              </BodyText>
                          {item.author.verified && (
              <Ionicons name="checkmark-circle" size={DESIGN_SYSTEM.iconSizes.xs} color={theme.colors.primary} />
            )}
            </View>
            <LabelText variant="small" style={styles.timeAgo}>
              {item.timeAgo} • {item.category}
            </LabelText>
          </View>
        </View>
        {item.isPinned && (
          <View style={styles.pinnedBadge}>
            <Ionicons name="pin" size={DESIGN_SYSTEM.iconSizes.xs} color={theme.colors.white} />
          </View>
        )}
      </View>

      <View style={styles.topicContent}>
        <TitleText variant="medium" style={styles.topicTitle}>
          {item.title}
        </TitleText>
        <BodyText variant="small" style={styles.topicPreview} numberOfLines={2}>
          {item.preview}
        </BodyText>
        
        <View style={styles.topicTags}>
          {item.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="secondary" style={styles.tag}>
              {tag}
            </Badge>
          ))}
        </View>
      </View>

      <View style={styles.topicFooter}>
        <View style={styles.engagementStats}>
          <TouchableOpacity style={styles.statItem}>
            <Ionicons name="arrow-up" size={DESIGN_SYSTEM.iconSizes.sm} color={theme.colors.gray[600]} />
            <LabelText variant="small" style={styles.statText}>
              {item.upvotes}
            </LabelText>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.statItem}>
            <Ionicons name="chatbubble-outline" size={DESIGN_SYSTEM.iconSizes.sm} color={theme.colors.gray[600]} />
            <LabelText variant="small" style={styles.statText}>
              {item.comments}
            </LabelText>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.statItem}>
            <Ionicons name="share-outline" size={DESIGN_SYSTEM.iconSizes.sm} color={theme.colors.gray[600]} />
            <LabelText variant="small" style={styles.statText}>
              Share
            </LabelText>
          </TouchableOpacity>
        </View>

        {item.isHot && (
          <View style={styles.hotIndicator}>
            <Ionicons name="flame" size={DESIGN_SYSTEM.iconSizes.xs} color={theme.colors.accent} />
            <LabelText variant="small" style={styles.hotText}>
              Hot
            </LabelText>
          </View>
        )}
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={[LAYOUT_PATTERNS.screen.container, { paddingTop: 0 }]}>
      <Header
        title="Community"
        subtitle="Join the conversation"
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
        {/* Categories Filter */}
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
          <View style={styles.sortButtons}>
            <TouchableOpacity
              style={[
                styles.sortButton,
                sortBy === 'hot' && styles.sortButtonActive,
              ]}
              onPress={() => setSortBy('hot')}
            >
              <LabelText
                variant="small"
                style={[
                  styles.sortButtonText,
                  sortBy === 'hot' && styles.sortButtonTextActive,
                ]}
              >
                Hot
              </LabelText>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.sortButton,
                sortBy === 'new' && styles.sortButtonActive,
              ]}
              onPress={() => setSortBy('new')}
            >
              <LabelText
                variant="small"
                style={[
                  styles.sortButtonText,
                  sortBy === 'new' && styles.sortButtonTextActive,
                ]}
              >
                New
              </LabelText>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.sortButton,
                sortBy === 'top' && styles.sortButtonActive,
              ]}
              onPress={() => setSortBy('top')}
            >
              <LabelText
                variant="small"
                style={[
                  styles.sortButtonText,
                  sortBy === 'top' && styles.sortButtonTextActive,
                ]}
              >
                Top
              </LabelText>
            </TouchableOpacity>
          </View>
        </View>

        {/* Topics List */}
        <View style={LAYOUT_PATTERNS.section.container}>
          <FlatList
            data={communityTopics}
            renderItem={renderTopic}
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
  categoriesContainer: {
    paddingVertical: DESIGN_SYSTEM.layout.elementSpacing,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[200],
  },
  categoriesList: {
    paddingHorizontal: DESIGN_SYSTEM.layout.screenPadding,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: DESIGN_SYSTEM.layout.elementSpacing,
    paddingVertical: DESIGN_SYSTEM.layout.elementSpacing / 2,
    borderRadius: DESIGN_SYSTEM.borderRadius.round,
    marginRight: DESIGN_SYSTEM.layout.elementSpacing,
    backgroundColor: theme.colors.gray[100],
  },
  categoryItemActive: {
    backgroundColor: theme.colors.primary,
  },
  categoryText: {
    marginLeft: DESIGN_SYSTEM.layout.elementSpacing / 2,
    color: theme.colors.gray[600],
  },
  categoryTextActive: {
    color: theme.colors.white,
  },
  sortContainer: {
    paddingVertical: DESIGN_SYSTEM.layout.elementSpacing,
    paddingHorizontal: DESIGN_SYSTEM.layout.screenPadding,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[200],
  },
  sortButtons: {
    flexDirection: 'row',
    backgroundColor: theme.colors.gray[100],
    borderRadius: DESIGN_SYSTEM.borderRadius.md,
    padding: DESIGN_SYSTEM.layout.elementSpacing / 4,
  },
  sortButton: {
    flex: 1,
    paddingVertical: DESIGN_SYSTEM.layout.elementSpacing / 2,
    alignItems: 'center',
    borderRadius: DESIGN_SYSTEM.borderRadius.sm,
  },
  sortButtonActive: {
    backgroundColor: theme.colors.white,
    ...DESIGN_SYSTEM.shadows.small,
  },
  sortButtonText: {
    color: theme.colors.gray[600],
  },
  sortButtonTextActive: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
  topicCard: {
    marginBottom: DESIGN_SYSTEM.layout.elementSpacing,
  },
  topicHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: DESIGN_SYSTEM.layout.elementSpacing,
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  authorDetails: {
    marginLeft: DESIGN_SYSTEM.layout.elementSpacing,
    flex: 1,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorName: {
    fontWeight: '600',
    marginRight: DESIGN_SYSTEM.layout.elementSpacing / 2,
  },
  timeAgo: {
    color: theme.colors.gray[500],
  },
  pinnedBadge: {
    backgroundColor: theme.colors.accent,
    borderRadius: DESIGN_SYSTEM.borderRadius.round,
    padding: DESIGN_SYSTEM.layout.elementSpacing / 4,
  },
  topicContent: {
    marginBottom: DESIGN_SYSTEM.layout.elementSpacing,
  },
  topicTitle: {
    marginBottom: DESIGN_SYSTEM.layout.elementSpacing / 2,
    lineHeight: 22,
  },
  topicPreview: {
    color: theme.colors.gray[600],
    lineHeight: 18,
    marginBottom: DESIGN_SYSTEM.layout.elementSpacing,
  },
  topicTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: DESIGN_SYSTEM.layout.elementSpacing / 2,
  },
  tag: {
    marginRight: DESIGN_SYSTEM.layout.elementSpacing / 2,
  },
  topicFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: DESIGN_SYSTEM.layout.elementSpacing,
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray[100],
  },
  engagementStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: DESIGN_SYSTEM.layout.elementSpacing * 1.5,
  },
  statText: {
    marginLeft: DESIGN_SYSTEM.layout.elementSpacing / 2,
    color: theme.colors.gray[600],
  },
  hotIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.accent + '20',
    paddingHorizontal: DESIGN_SYSTEM.layout.elementSpacing / 2,
    paddingVertical: DESIGN_SYSTEM.layout.elementSpacing / 4,
    borderRadius: DESIGN_SYSTEM.borderRadius.sm,
  },
  hotText: {
    color: theme.colors.accent,
    marginLeft: DESIGN_SYSTEM.layout.elementSpacing / 4,
    fontWeight: '600',
  },

}); 