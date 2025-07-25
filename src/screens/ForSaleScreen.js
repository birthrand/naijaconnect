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
  'All', 'Electronics', 'Fashion', 'Home', 'Vehicles', 'Services', 'Food'
];

const items = [
  {
    id: '1',
    title: 'iPhone 13 Pro Max',
    price: '₦450,000',
    originalPrice: '₦550,000',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop',
    location: 'Lagos',
    seller: 'Adebayo Tech',
    rating: 4.8,
    condition: 'Used - Like New',
    description: 'Perfect condition iPhone 13 Pro Max, 256GB, Pacific Blue. Comes with original box and accessories.',
  },
  {
    id: '2',
    title: 'Traditional Nigerian Ankara Dress',
    price: '₦25,000',
    originalPrice: '₦35,000',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&h=200&fit=crop',
    location: 'Abuja',
    seller: 'Chioma Fashion',
    rating: 4.9,
    condition: 'New',
    description: 'Beautiful handcrafted Ankara dress, perfect for special occasions. Made with premium fabric.',
  },
  {
    id: '3',
    title: 'Jollof Rice Catering Service',
    price: '₦5,000',
    originalPrice: '₦7,000',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop',
    location: 'Port Harcourt',
    seller: 'Mama\'s Kitchen',
    rating: 4.7,
    condition: 'Service',
    description: 'Authentic Nigerian Jollof rice catering for events. Minimum 50 people. Fresh ingredients.',
  },
  {
    id: '4',
    title: 'Toyota Camry 2018',
    price: '₦8,500,000',
    originalPrice: '₦10,000,000',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=300&h=200&fit=crop',
    location: 'Kano',
    seller: 'AutoMax Nigeria',
    rating: 4.6,
    condition: 'Used',
    description: 'Well-maintained Toyota Camry, automatic transmission, full service history. Great fuel economy.',
  },
];

export default function ForSaleScreen({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemCard}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemContent}>
        <View style={styles.itemHeader}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color={theme.colors.secondary} />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
        
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{item.price}</Text>
          <Text style={styles.originalPrice}>{item.originalPrice}</Text>
        </View>
        
        <Text style={styles.condition}>{item.condition}</Text>
        <Text style={styles.seller}>by {item.seller}</Text>
        <Text style={styles.location}>📍 {item.location}</Text>
        
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
        
        <View style={styles.itemActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="heart-outline" size={20} color={theme.colors.gray} />
            <Text style={styles.actionText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contactButton}>
            <Ionicons name="chatbubble-outline" size={20} color={theme.colors.white} />
            <Text style={styles.contactButtonText}>Contact</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>For Sale</Text>
        <TouchableOpacity 
          style={styles.headerIcon}
          onPress={() => navigation.navigate('Post')}
        >
          <Ionicons name="add" size={24} color={theme.colors.black} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={theme.colors.gray} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search items..."
            placeholderTextColor={theme.colors.gray}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryTab,
                selectedCategory === category && styles.categoryTabActive,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.categoryTextActive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Items List */}
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.itemsList}
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
  categoriesContainer: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.white,
  },
  categoryTab: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    marginRight: theme.spacing.sm,
    borderRadius: theme.borderRadius.round,
    backgroundColor: theme.colors.lightGray,
  },
  categoryTabActive: {
    backgroundColor: theme.colors.primary,
  },
  categoryText: {
    fontSize: 14,
    color: theme.colors.gray,
    fontWeight: '500',
  },
  categoryTextActive: {
    color: theme.colors.white,
  },
  itemsList: {
    padding: theme.spacing.lg,
  },
  itemCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.md,
    overflow: 'hidden',
    ...theme.shadows.medium,
  },
  itemImage: {
    width: '100%',
    height: 200,
  },
  itemContent: {
    padding: theme.spacing.md,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  itemTitle: {
    fontSize: 18,
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
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginRight: theme.spacing.sm,
  },
  originalPrice: {
    fontSize: 16,
    color: theme.colors.gray,
    textDecorationLine: 'line-through',
  },
  condition: {
    fontSize: 14,
    color: theme.colors.success,
    fontWeight: '500',
    marginBottom: theme.spacing.xs,
  },
  seller: {
    fontSize: 14,
    color: theme.colors.gray,
    marginBottom: theme.spacing.xs,
  },
  location: {
    fontSize: 14,
    color: theme.colors.gray,
    marginBottom: theme.spacing.sm,
  },
  description: {
    fontSize: 14,
    color: theme.colors.darkGray,
    lineHeight: 20,
    marginBottom: theme.spacing.md,
  },
  itemActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.lg,
  },
  contactButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.white,
    marginLeft: theme.spacing.xs,
  },
}); 