import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  Alert,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme/theme';

const postTypes = [
  {
    id: 'community',
    title: 'Community Post',
    subtitle: 'Share with your community',
    icon: 'people',
    color: theme.colors.primary,
  },
  {
    id: 'business',
    title: 'Business Listing',
    subtitle: 'Promote your business',
    icon: 'briefcase',
    color: theme.colors.secondary,
  },
  {
    id: 'event',
    title: 'Event',
    subtitle: 'Create or share an event',
    icon: 'calendar',
    color: theme.colors.accent,
  },
  {
    id: 'job',
    title: 'Job Posting',
    subtitle: 'Hire or find work',
    icon: 'briefcase',
    color: theme.colors.info,
  },
  {
    id: 'sale',
    title: 'For Sale',
    subtitle: 'Sell items or services',
    icon: 'pricetag',
    color: theme.colors.warmOrange,
  },
];

export default function PostScreen({ navigation }) {
  const [selectedType, setSelectedType] = useState(null);
  const [postContent, setPostContent] = useState('');
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handlePost = () => {
    if (!selectedType) {
      Alert.alert('Error', 'Please select a post type');
      return;
    }

    if (!postContent.trim()) {
      Alert.alert('Error', 'Please add some content to your post');
      return;
    }

    // Simulate posting
    Alert.alert(
      'Success',
      'Your post has been shared with the community!',
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Home'),
        },
      ]
    );
  };

  const renderPostType = (type) => (
    <TouchableOpacity
      key={type.id}
      style={[
        styles.postTypeCard,
        selectedType === type.id && styles.postTypeCardActive,
      ]}
      onPress={() => setSelectedType(type.id)}
    >
      <View style={[styles.postTypeIcon, { backgroundColor: type.color }]}>
        <Ionicons name={type.icon} size={24} color={theme.colors.white} />
      </View>
      <View style={styles.postTypeContent}>
        <Text style={styles.postTypeTitle}>{type.title}</Text>
        <Text style={styles.postTypeSubtitle}>{type.subtitle}</Text>
      </View>
      {selectedType === type.id && (
        <Ionicons name="checkmark-circle" size={24} color={theme.colors.primary} />
      )}
    </TouchableOpacity>
  );

  const renderFormFields = () => {
    switch (selectedType) {
      case 'business':
        return (
          <>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Business Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter business name"
                value={title}
                onChangeText={setTitle}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Location</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter business location"
                value={location}
                onChangeText={setLocation}
              />
            </View>
          </>
        );
      case 'event':
        return (
          <>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Event Title</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter event title"
                value={title}
                onChangeText={setTitle}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Location</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter event location"
                value={location}
                onChangeText={setLocation}
              />
            </View>
            <View style={styles.row}>
              <View style={[styles.inputContainer, styles.halfWidth]}>
                <Text style={styles.inputLabel}>Date</Text>
                <TextInput
                  style={styles.input}
                  placeholder="MM/DD/YYYY"
                  value={date}
                  onChangeText={setDate}
                />
              </View>
              <View style={[styles.inputContainer, styles.halfWidth]}>
                <Text style={styles.inputLabel}>Time</Text>
                <TextInput
                  style={styles.input}
                  placeholder="HH:MM AM/PM"
                  value={time}
                  onChangeText={setTime}
                />
              </View>
            </View>
          </>
        );
      case 'sale':
        return (
          <>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Item/Service Title</Text>
              <TextInput
                style={styles.input}
                placeholder="What are you selling?"
                value={title}
                onChangeText={setTitle}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Price</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter price"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Location</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter pickup/delivery location"
                value={location}
                onChangeText={setLocation}
              />
            </View>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={24} color={theme.colors.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Post</Text>
        <TouchableOpacity onPress={handlePost}>
          <Text style={styles.postButton}>Post</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Post Type Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What would you like to share?</Text>
          {postTypes.map(renderPostType)}
        </View>

        {/* Form Fields */}
        {selectedType && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Post Details</Text>
            
            {renderFormFields()}

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Share your thoughts, details, or description..."
                value={postContent}
                onChangeText={setPostContent}
                multiline
                numberOfLines={6}
                textAlignVertical="top"
              />
            </View>

            {/* Media Options */}
            <View style={styles.mediaOptions}>
              <TouchableOpacity style={styles.mediaOption}>
                <Ionicons name="camera" size={24} color={theme.colors.primary} />
                <Text style={styles.mediaOptionText}>Photo</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.mediaOption}>
                <Ionicons name="videocam" size={24} color={theme.colors.primary} />
                <Text style={styles.mediaOptionText}>Video</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.mediaOption}>
                <Ionicons name="location" size={24} color={theme.colors.primary} />
                <Text style={styles.mediaOptionText}>Location</Text>
              </TouchableOpacity>
            </View>

            {/* Privacy Settings */}
            <View style={styles.privacyContainer}>
              <Text style={styles.privacyTitle}>Who can see this post?</Text>
              <View style={styles.privacyOptions}>
                <TouchableOpacity style={[styles.privacyOption, styles.privacyOptionActive]}>
                  <Ionicons name="people" size={20} color={theme.colors.primary} />
                  <Text style={styles.privacyOptionText}>Community</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.privacyOption}>
                  <Ionicons name="globe" size={20} color={theme.colors.gray} />
                  <Text style={styles.privacyOptionText}>Public</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
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
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.black,
  },
  postButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.black,
    marginBottom: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
  },
  postTypeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 2,
    borderColor: 'transparent',
    ...theme.shadows.small,
  },
  postTypeCardActive: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.lightGold,
  },
  postTypeIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  postTypeContent: {
    flex: 1,
  },
  postTypeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.black,
    marginBottom: theme.spacing.xs,
  },
  postTypeSubtitle: {
    fontSize: 14,
    color: theme.colors.gray,
  },
  inputContainer: {
    marginBottom: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.colors.black,
    marginBottom: theme.spacing.sm,
  },
  input: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    fontSize: 16,
    color: theme.colors.black,
    borderWidth: 1,
    borderColor: theme.colors.lightGray,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
  },
  halfWidth: {
    width: '48%',
  },
  mediaOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  mediaOption: {
    alignItems: 'center',
    padding: theme.spacing.md,
  },
  mediaOptionText: {
    fontSize: 14,
    color: theme.colors.gray,
    marginTop: theme.spacing.xs,
  },
  privacyContainer: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  privacyTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.colors.black,
    marginBottom: theme.spacing.sm,
  },
  privacyOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  privacyOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.lightGray,
    flex: 1,
    marginHorizontal: theme.spacing.sm,
    justifyContent: 'center',
  },
  privacyOptionActive: {
    backgroundColor: theme.colors.lightGold,
  },
  privacyOptionText: {
    fontSize: 14,
    color: theme.colors.black,
    marginLeft: theme.spacing.xs,
  },
}); 