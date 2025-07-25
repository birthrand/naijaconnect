import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Modal,
  FlatList,
  Text,
  Dimensions,
  Keyboard,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme/theme';
import { DESIGN_SYSTEM } from '../theme/designSystem';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Compact Header Search Icon (for Network screen)
export const CompactHeaderSearch = ({ onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.compactSearchButton}
      activeOpacity={0.7}
    >
      <Ionicons 
        name="search" 
        size={DESIGN_SYSTEM.iconSizes.md} 
        color={theme.colors.gray[600]} 
      />
    </TouchableOpacity>
  );
};

// Modal Search Experience (for Network screen)
export const ModalSearch = ({ visible, onClose, onSearch }) => {
  const [query, setQuery] = useState('');
  const [recentSearches] = useState([
    'iPhone 12',
    'Jollof Rice',
    'Hair Stylist',
    'Used Laptops',
    'Event Planner',
  ]);
  const searchInputRef = useRef(null);
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 50,
        friction: 8,
      }).start();
      searchInputRef.current?.focus();
    } else {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <Animated.View 
          style={[
            styles.modalContent,
            {
              transform: [{
                translateY: slideAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-300, 0],
                })
              }]
            }
          ]}
        >
          <View style={styles.searchHeader}>
            <View style={styles.searchInputContainer}>
              <Ionicons 
                name="search" 
                size={20} 
                color={theme.colors.gray[400]}
                style={styles.searchIcon}
              />
              <TextInput
                ref={searchInputRef}
                style={styles.searchInput}
                placeholder="Search items, services, sellers..."
                value={query}
                onChangeText={setQuery}
                autoFocus
              />
              {query.length > 0 && (
                <TouchableOpacity 
                  onPress={() => setQuery('')}
                  style={styles.clearButton}
                >
                  <Ionicons 
                    name="close-circle" 
                    size={18} 
                    color={theme.colors.gray[400]}
                  />
                </TouchableOpacity>
              )}
            </View>
            <TouchableOpacity 
              onPress={onClose}
              style={styles.cancelButton}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.searchContent}>
            {query.length === 0 ? (
              <View style={styles.recentSearches}>
                <Text style={styles.sectionTitle}>Recent Searches</Text>
                {recentSearches.map((search, index) => (
                  <TouchableOpacity 
                    key={index}
                    style={styles.recentSearchItem}
                    onPress={() => setQuery(search)}
                  >
                    <Ionicons 
                      name="time-outline" 
                      size={16} 
                      color={theme.colors.gray[400]}
                    />
                    <Text style={styles.recentSearchText}>{search}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <View style={styles.searchSuggestions}>
                {/* Implement search suggestions here */}
              </View>
            )}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

// Persistent Search Bar (for Home screen)
export const PersistentSearchBar = ({ onFocus, style }) => {
  const [isFocused, setIsFocused] = useState(false);
  const expandAnim = useRef(new Animated.Value(0)).current;

  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
    Animated.spring(expandAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 50,
      friction: 8,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.spring(expandAnim, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View 
      style={[
        styles.persistentSearchContainer,
        style,
        {
          transform: [{
            scale: expandAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 1.02],
            })
          }]
        }
      ]}
    >
      <Ionicons 
        name="search" 
        size={18} 
        color={theme.colors.gray[400]}
        style={styles.persistentSearchIcon}
      />
      <TextInput
        style={styles.persistentSearchInput}
        placeholder="Search posts, people, topics..."
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {isFocused && (
        <TouchableOpacity 
          onPress={() => {
            Keyboard.dismiss();
            handleBlur();
          }}
          style={styles.persistentCancelButton}
        >
          <Text style={styles.persistentCancelText}>Cancel</Text>
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

// Expanded Search Experience (for Home screen) - Now an Explore Page
export const ExpandedSearch = ({ visible, onClose }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const filters = ['All', 'People', 'Topics', 'Nearby'];
  
  // Explore categories
  const exploreCategories = [
    { id: '1', name: 'Trending', icon: 'trending-up', color: '#FF6B6B' },
    { id: '2', name: 'Events', icon: 'calendar', color: '#4ECDC4' },
    { id: '3', name: 'Business', icon: 'business', color: '#45B7D1' },
    { id: '4', name: 'Food', icon: 'restaurant', color: '#96CEB4' },
    { id: '5', name: 'Services', icon: 'construct', color: '#FFEAA7' },
    { id: '6', name: 'Jobs', icon: 'briefcase', color: '#DDA0DD' },
    { id: '7', name: 'Deals', icon: 'pricetag', color: '#FF8A65' },
    { id: '8', name: 'Community', icon: 'people', color: '#74B9FF' },
  ];

  // Trending topics
  const trendingTopics = [
    { id: '1', title: 'Lagos Tech Meetup', category: 'Events', participants: 156 },
    { id: '2', title: 'Jollof Rice Recipe', category: 'Food', participants: 89 },
    { id: '3', title: 'Remote Jobs Nigeria', category: 'Jobs', participants: 234 },
    { id: '4', title: 'Abuja Business Network', category: 'Business', participants: 67 },
    { id: '5', title: 'Nigerian Fashion Week', category: 'Events', participants: 123 },
  ];

  // Recent searches
  const recentSearches = [
    'Lagos Tech Meetup',
    'Jollof Rice Recipe',
    'Remote Jobs',
    'Business Network',
    'Fashion Week',
  ];

  // Nearby places
  const nearbyPlaces = [
    { id: '1', name: 'Victoria Island Mall', distance: '0.5 km', type: 'Shopping' },
    { id: '2', name: 'Lagos Business District', distance: '1.2 km', type: 'Business' },
    { id: '3', name: 'Nigerian Restaurant', distance: '0.8 km', type: 'Food' },
    { id: '4', name: 'Tech Hub Lagos', distance: '2.1 km', type: 'Business' },
  ];

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity style={styles.exploreCategoryItem}>
      <View style={[styles.categoryIcon, { backgroundColor: item.color }]}>
        <Ionicons name={item.icon} size={24} color={theme.colors.white} />
      </View>
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderTrendingItem = ({ item }) => (
    <TouchableOpacity style={styles.trendingItem}>
      <View style={styles.trendingContent}>
        <Text style={styles.trendingTitle}>{item.title}</Text>
        <View style={styles.trendingMeta}>
          <View style={styles.trendingCategory}>
            <Text style={styles.trendingCategoryText}>{item.category}</Text>
          </View>
          <View style={styles.trendingParticipants}>
            <Ionicons name="people" size={14} color={theme.colors.gray[500]} />
            <Text style={styles.trendingParticipantsText}>{item.participants}</Text>
          </View>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color={theme.colors.gray[400]} />
    </TouchableOpacity>
  );

  const renderRecentSearch = (search, index) => (
    <TouchableOpacity 
      key={index}
      style={styles.recentSearchItem}
      onPress={() => setSearchQuery(search)}
    >
      <Ionicons name="time-outline" size={16} color={theme.colors.gray[500]} />
      <Text style={styles.recentSearchText}>{search}</Text>
    </TouchableOpacity>
  );

  const renderNearbyItem = ({ item }) => (
    <TouchableOpacity style={styles.nearbyItem}>
      <View style={styles.nearbyContent}>
        <Text style={styles.nearbyName}>{item.name}</Text>
        <View style={styles.nearbyMeta}>
          <Text style={styles.nearbyType}>{item.type}</Text>
          <Text style={styles.nearbyDistance}>{item.distance}</Text>
        </View>
      </View>
      <Ionicons name="location" size={16} color={theme.colors.primary} />
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.exploreContainer}>
        {/* Header */}
        <View style={styles.exploreHeader}>
          <View style={styles.searchInputContainer}>
            <Ionicons 
              name="search" 
              size={20} 
              color={theme.colors.gray[400]}
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.exploreSearchInput}
              placeholder="Search posts, people, topics..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity 
                onPress={() => setSearchQuery('')}
                style={styles.clearButton}
              >
                <Ionicons 
                  name="close-circle" 
                  size={18} 
                  color={theme.colors.gray[400]}
                />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>Cancel</Text>
          </TouchableOpacity>
        </View>

        {/* Filter Tabs */}
        <View style={styles.filterContainer}>
          <FlatList
            horizontal
            data={filters}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.filterButton,
                  activeFilter === item && styles.filterButtonActive
                ]}
                onPress={() => setActiveFilter(item)}
              >
                <Text style={[
                  styles.filterText,
                  activeFilter === item && styles.filterTextActive
                ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.filterList}
          />
        </View>

        <ScrollView style={styles.exploreContent} showsVerticalScrollIndicator={false}>
          {searchQuery.length === 0 ? (
            <>
              {/* Explore Categories */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Explore Categories</Text>
                <FlatList
                  data={exploreCategories}
                  renderItem={renderCategoryItem}
                  keyExtractor={(item) => item.id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.categoriesList}
                />
              </View>

              {/* Trending Topics */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Trending Now</Text>
                {trendingTopics.map((item) => (
                  <View key={item.id}>
                    {renderTrendingItem({ item })}
                  </View>
                ))}
              </View>

              {/* Recent Searches */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Recent Searches</Text>
                {recentSearches.map(renderRecentSearch)}
              </View>

              {/* Nearby Places */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Nearby</Text>
                <FlatList
                  data={nearbyPlaces}
                  renderItem={renderNearbyItem}
                  keyExtractor={(item) => item.id}
                  scrollEnabled={false}
                />
              </View>
            </>
          ) : (
            /* Search Results */
            <View style={styles.searchResults}>
              <Text style={styles.searchResultsTitle}>
                Search results for "{searchQuery}"
              </Text>
              {/* Implement search results here */}
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  // Compact Search Button (Network)
  compactSearchButton: {
    padding: DESIGN_SYSTEM.layout.elementSpacing,
    marginLeft: DESIGN_SYSTEM.layout.elementSpacing,
  },

  // Modal Search (Network)
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalContent: {
    backgroundColor: theme.colors.white,
    borderBottomLeftRadius: DESIGN_SYSTEM.borderRadius.lg,
    borderBottomRightRadius: DESIGN_SYSTEM.borderRadius.lg,
    paddingTop: DESIGN_SYSTEM.layout.screenPadding,
    paddingBottom: DESIGN_SYSTEM.layout.sectionSpacing,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  searchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: DESIGN_SYSTEM.layout.screenPadding,
    marginBottom: DESIGN_SYSTEM.layout.elementSpacing,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.gray[100],
    borderRadius: DESIGN_SYSTEM.borderRadius.round,
    paddingHorizontal: DESIGN_SYSTEM.layout.elementSpacing,
    height: 40,
  },
  searchIcon: {
    marginRight: DESIGN_SYSTEM.layout.elementSpacing,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: theme.colors.gray[900],
  },
  clearButton: {
    padding: 4,
  },
  cancelButton: {
    marginLeft: DESIGN_SYSTEM.layout.elementSpacing,
    padding: DESIGN_SYSTEM.layout.elementSpacing,
  },
  cancelText: {
    color: theme.colors.primary,
    fontSize: 16,
  },
  searchContent: {
    paddingHorizontal: DESIGN_SYSTEM.layout.screenPadding,
  },
  recentSearches: {
    marginTop: DESIGN_SYSTEM.layout.elementSpacing,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.gray[600],
    marginBottom: DESIGN_SYSTEM.layout.elementSpacing,
  },
  recentSearchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: DESIGN_SYSTEM.layout.elementSpacing,
  },
  recentSearchText: {
    fontSize: 16,
    color: theme.colors.gray[900],
    marginLeft: DESIGN_SYSTEM.layout.elementSpacing,
  },

  // Persistent Search Bar (Home)
  persistentSearchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.gray[100],
    borderRadius: DESIGN_SYSTEM.borderRadius.round,
    paddingHorizontal: DESIGN_SYSTEM.layout.elementSpacing,
    height: 36,
    width: SCREEN_WIDTH - 32,
    marginHorizontal: 16,
  },
  persistentSearchIcon: {
    marginRight: DESIGN_SYSTEM.layout.elementSpacing,
  },
  persistentSearchInput: {
    flex: 1,
    fontSize: 14,
    color: theme.colors.gray[900],
  },
  persistentCancelButton: {
    marginLeft: DESIGN_SYSTEM.layout.elementSpacing,
  },
  persistentCancelText: {
    color: theme.colors.primary,
    fontSize: 14,
  },

  // Expanded Search (Home)
  exploreContainer: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  exploreHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: DESIGN_SYSTEM.layout.screenPadding,
    paddingTop: DESIGN_SYSTEM.layout.screenPadding,
    paddingBottom: DESIGN_SYSTEM.layout.elementSpacing,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[100],
  },
  exploreSearchInput: {
    flex: 1,
    fontSize: 16,
    color: theme.colors.gray[900],
    paddingVertical: 0,
  },
  closeButton: {
    padding: DESIGN_SYSTEM.layout.elementSpacing,
  },
  closeText: {
    color: theme.colors.primary,
    fontSize: 16,
  },
  filterContainer: {
    marginBottom: DESIGN_SYSTEM.layout.elementSpacing,
  },
  filterList: {
    paddingHorizontal: DESIGN_SYSTEM.layout.screenPadding,
  },
  filterButton: {
    paddingHorizontal: DESIGN_SYSTEM.layout.elementSpacing * 2,
    paddingVertical: DESIGN_SYSTEM.layout.elementSpacing,
    borderRadius: DESIGN_SYSTEM.borderRadius.round,
    marginRight: DESIGN_SYSTEM.layout.elementSpacing,
    backgroundColor: theme.colors.gray[100],
  },
  filterButtonActive: {
    backgroundColor: theme.colors.primary,
  },
  filterText: {
    fontSize: 14,
    color: theme.colors.gray[600],
  },
  filterTextActive: {
    color: theme.colors.white,
  },
  exploreContent: {
    flex: 1,
  },
  section: {
    paddingHorizontal: DESIGN_SYSTEM.layout.screenPadding,
    marginBottom: DESIGN_SYSTEM.layout.sectionSpacing,
  },
  categoriesList: {
    paddingHorizontal: DESIGN_SYSTEM.layout.elementSpacing,
  },
  exploreCategoryItem: {
    alignItems: 'center',
    marginRight: DESIGN_SYSTEM.layout.elementSpacing,
  },
  categoryIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryName: {
    marginTop: DESIGN_SYSTEM.layout.elementSpacing / 2,
    fontSize: 12,
    color: theme.colors.gray[600],
    textAlign: 'center',
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
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.gray[900],
  },
  trendingMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: DESIGN_SYSTEM.layout.elementSpacing / 2,
  },
  trendingCategory: {
    backgroundColor: theme.colors.gray[200],
    borderRadius: DESIGN_SYSTEM.borderRadius.pill,
    paddingHorizontal: DESIGN_SYSTEM.layout.elementSpacing / 2,
    paddingVertical: DESIGN_SYSTEM.layout.elementSpacing / 4,
  },
  trendingCategoryText: {
    fontSize: 12,
    color: theme.colors.gray[600],
  },
  trendingParticipants: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: DESIGN_SYSTEM.layout.elementSpacing,
  },
  trendingParticipantsText: {
    fontSize: 12,
    color: theme.colors.gray[500],
    marginLeft: DESIGN_SYSTEM.layout.elementSpacing / 2,
  },
  recentSearchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: DESIGN_SYSTEM.layout.elementSpacing,
  },
  nearbyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: DESIGN_SYSTEM.layout.elementSpacing,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[100],
  },
  nearbyContent: {
    flex: 1,
  },
  nearbyName: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.gray[900],
  },
  nearbyMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: DESIGN_SYSTEM.layout.elementSpacing / 2,
  },
  nearbyType: {
    fontSize: 12,
    color: theme.colors.gray[600],
  },
  nearbyDistance: {
    fontSize: 12,
    color: theme.colors.gray[500],
    marginLeft: DESIGN_SYSTEM.layout.elementSpacing,
  },
  searchResults: {
    paddingHorizontal: DESIGN_SYSTEM.layout.screenPadding,
    paddingTop: DESIGN_SYSTEM.layout.elementSpacing,
  },
     searchResultsTitle: {
     fontSize: 20,
     fontWeight: '700',
     color: theme.colors.gray[900],
     marginBottom: DESIGN_SYSTEM.layout.elementSpacing,
   },
   sectionTitle: {
     fontSize: 18,
     fontWeight: '600',
     color: theme.colors.gray[900],
     marginBottom: DESIGN_SYSTEM.layout.elementSpacing,
   },
   recentSearchText: {
     fontSize: 16,
     color: theme.colors.gray[900],
     marginLeft: DESIGN_SYSTEM.layout.elementSpacing,
   },
}); 