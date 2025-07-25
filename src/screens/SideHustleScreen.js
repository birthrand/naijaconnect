import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

// Mock data for SideHustle
const sideHustles = [
  {
    id: '1',
    title: 'Freelance Web Developer',
    company: 'Tech Solutions Ltd',
    location: 'Lagos, Nigeria',
    salary: '₦150,000 - ₦300,000',
    type: 'Remote',
    posted: '2 hours ago',
    description: 'Looking for a skilled web developer to join our team. Must be proficient in React, Node.js, and have experience with modern web technologies.',
    requirements: ['React', 'Node.js', 'JavaScript', '3+ years experience'],
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop',
  },
  {
    id: '2',
    title: 'Content Creator',
    company: 'Digital Media Agency',
    location: 'Abuja, Nigeria',
    salary: '₦80,000 - ₦150,000',
    type: 'Part-time',
    posted: '1 day ago',
    description: 'We need creative content creators for social media platforms. Experience with video editing and graphic design is a plus.',
    requirements: ['Content Creation', 'Social Media', 'Video Editing', 'Creative Mindset'],
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&h=300&fit=crop',
  },
  {
    id: '3',
    title: 'Virtual Assistant',
    company: 'Startup Inc',
    location: 'Remote',
    salary: '₦60,000 - ₦120,000',
    type: 'Full-time',
    posted: '3 days ago',
    description: 'Support our growing startup with administrative tasks, customer service, and project coordination.',
    requirements: ['Communication', 'Organization', 'Customer Service', 'Tech-savvy'],
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=300&fit=crop',
  },
  {
    id: '4',
    title: 'Graphic Designer',
    company: 'Creative Studio',
    location: 'Port Harcourt, Nigeria',
    salary: '₦100,000 - ₦200,000',
    type: 'Contract',
    posted: '1 week ago',
    description: 'Join our creative team to design stunning visuals for brands and marketing campaigns.',
    requirements: ['Adobe Creative Suite', 'Design Principles', 'Portfolio', '2+ years experience'],
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=300&fit=crop',
  },
];

const categories = [
  { id: '1', name: 'All', icon: 'grid' },
  { id: '2', name: 'Tech', icon: 'laptop' },
  { id: '3', name: 'Creative', icon: 'brush' },
  { id: '4', name: 'Marketing', icon: 'megaphone' },
  { id: '5', name: 'Admin', icon: 'briefcase' },
  { id: '6', name: 'Remote', icon: 'home' },
];

export default function SideHustleScreen({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const renderCategoryItem = ({ item }) => (
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

  const renderSideHustleCard = ({ item }) => (
    <TouchableOpacity style={styles.sideHustleCard}>
      <View style={styles.cardHeader}>
        <Image source={{ uri: item.image }} style={styles.cardImage} />
        <View style={styles.cardBadge}>
          <Text style={styles.badgeText}>{item.type}</Text>
        </View>
      </View>
      
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardCompany}>{item.company}</Text>
        
        <View style={styles.cardDetails}>
          <View style={styles.detailItem}>
            <Ionicons name="location" size={14} color="#666666" />
            <Text style={styles.detailText}>{item.location}</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="cash" size={14} color="#666666" />
            <Text style={styles.detailText}>{item.salary}</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="time" size={14} color="#666666" />
            <Text style={styles.detailText}>{item.posted}</Text>
          </View>
        </View>
        
        <Text style={styles.cardDescription} numberOfLines={2}>
          {item.description}
        </Text>
        
        <View style={styles.requirementsContainer}>
          {item.requirements.slice(0, 3).map((req, index) => (
            <View key={index} style={styles.requirementTag}>
              <Text style={styles.requirementText}>{req}</Text>
            </View>
          ))}
          {item.requirements.length > 3 && (
            <View style={styles.requirementTag}>
              <Text style={styles.requirementText}>+{item.requirements.length - 3} more</Text>
            </View>
          )}
        </View>
      </View>
      
      <View style={styles.cardActions}>
        <TouchableOpacity style={styles.applyButton}>
          <Text style={styles.applyButtonText}>Apply Now</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton}>
          <Ionicons name="bookmark-outline" size={20} color="#667eea" />
        </TouchableOpacity>
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
          <Text style={styles.headerSubtitle}>Find your next opportunity</Text>
          
          <View style={styles.headerActions}>
            <TouchableOpacity 
              style={styles.headerAction}
              onPress={() => alert('Search coming soon!')}
            >
              <Ionicons name="search" size={20} color="#ffffff" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.headerAction}
              onPress={() => navigation.navigate('Post')}
            >
              <Ionicons name="add" size={24} color="#667eea" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Categories */}
        <View style={styles.categoriesContainer}>
          <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        </View>

        {/* SideHustles */}
        <FlatList
          style={styles.content}
          data={sideHustles}
          renderItem={renderSideHustleCard}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        />
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
    paddingHorizontal: 24,
    paddingVertical: 20,
    paddingTop: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#ffffff',
    opacity: 0.7,
    marginTop: 4,
  },
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
    gap: 12,
  },
  headerAction: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
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
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  sideHustleCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#333333',
  },
  cardHeader: {
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: 160,
  },
  cardBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#667eea',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  cardCompany: {
    fontSize: 14,
    color: '#667eea',
    marginBottom: 12,
  },
  cardDetails: {
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  detailText: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 6,
  },
  cardDescription: {
    fontSize: 14,
    color: '#ffffff',
    lineHeight: 20,
    marginBottom: 12,
  },
  requirementsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  requirementTag: {
    backgroundColor: '#2A2A2A',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  requirementText: {
    fontSize: 12,
    color: '#ffffff',
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  applyButton: {
    backgroundColor: '#667eea',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
    flex: 1,
    marginRight: 12,
  },
  applyButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  saveButton: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
}); 