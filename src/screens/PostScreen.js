import React, { useState, useRef } from 'react';
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
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { theme } from '../theme/theme';
import { DESIGN_SYSTEM, LAYOUT_PATTERNS } from '../theme/designSystem';
import { useSupabase } from '../contexts/SupabaseContext';
import {
  Header,
  Button,
  IconButton,
  HeadlineText,
  TitleText,
  BodyText,
  LabelText,
  Spacer,
  Input,
} from '../components/DesignSystemComponents';

const { width, height } = Dimensions.get('window');

const postTypes = [
  {
    id: 'community',
    title: 'Community Post',
    subtitle: 'Share thoughts & ideas',
    icon: 'chatbubbles',
    gradient: ['#667eea', '#764ba2'],
    color: '#667eea',
  },
  {
    id: 'business',
    title: 'Business Listing',
    subtitle: 'Promote your business',
    icon: 'briefcase',
    gradient: ['#f093fb', '#f5576c'],
    color: '#f093fb',
  },
  {
    id: 'event',
    title: 'Create Event',
    subtitle: 'Organize & share events',
    icon: 'calendar',
    gradient: ['#4facfe', '#00f2fe'],
    color: '#4facfe',
  },
  {
    id: 'listing',
    title: 'Marketplace',
    subtitle: 'Buy & sell items',
    icon: 'pricetag',
    gradient: ['#43e97b', '#38f9d7'],
    color: '#43e97b',
  },
  {
    id: 'job',
    title: 'Job Posting',
    subtitle: 'Hire or find work',
    icon: 'construct',
    gradient: ['#fa709a', '#fee140'],
    color: '#fa709a',
  },
];

export default function PostScreen({ navigation }) {
  const { user, supabase } = useSupabase();
  const [selectedType, setSelectedType] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // Form data
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    location: '',
    price: '',
    date: '',
    time: '',
    category: '',
    images: [],
  });

  const scrollViewRef = useRef(null);

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImagePick = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled) {
        const newImages = result.assets.map(asset => asset.uri);
        updateFormData('images', [...formData.images, ...newImages]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const removeImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    updateFormData('images', newImages);
  };

  const uploadImages = async (images) => {
    if (images.length === 0) return [];
    
    const uploadedUrls = [];
    for (const imageUri of images) {
      try {
        const fileName = `posts/${user.id}/${Date.now()}_${Math.random().toString(36).substring(7)}.jpg`;
        const { data, error } = await supabase.storage
          .from('post-images')
          .upload(fileName, {
            uri: imageUri,
            type: 'image/jpeg',
            name: fileName,
          });

        if (error) throw error;

        const { data: { publicUrl } } = supabase.storage
          .from('post-images')
          .getPublicUrl(fileName);

        uploadedUrls.push(publicUrl);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
    return uploadedUrls;
  };

  const handlePost = async () => {
    if (!selectedType) {
      Alert.alert('Error', 'Please select a post type');
      return;
    }

    if (!formData.content.trim()) {
      Alert.alert('Error', 'Please add some content to your post');
      return;
    }

    setLoading(true);

    try {
      // Upload images first
      const imageUrls = await uploadImages(formData.images);

      // Create post data
      const postData = {
        user_id: user.id,
        type: selectedType,
        title: formData.title,
        content: formData.content,
        location: formData.location,
        price: formData.price ? parseFloat(formData.price) : null,
        event_date: formData.date && formData.time ? `${formData.date} ${formData.time}` : null,
        category: formData.category,
        images: imageUrls,
        created_at: new Date().toISOString(),
      };

      // Insert into database
      const { data, error } = await supabase
        .from('posts')
        .insert([postData])
        .select()
        .single();

      if (error) throw error;

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
    } catch (error) {
      console.error('Error creating post:', error);
      Alert.alert('Error', 'Failed to create post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderPostType = (type) => (
    <TouchableOpacity
      key={type.id}
      style={styles.postTypeCard}
      onPress={() => {
        setSelectedType(type.id);
        setCurrentStep(2);
      }}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={type.gradient}
        style={styles.postTypeIcon}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Ionicons name={type.icon} size={32} color="#ffffff" />
      </LinearGradient>
      <View style={styles.postTypeContent}>
        <Text style={styles.postTypeTitle}>{type.title}</Text>
        <Text style={styles.postTypeSubtitle}>{type.subtitle}</Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color="#ffffff" opacity={0.6} />
    </TouchableOpacity>
  );

  const renderFormFields = () => {
    const fields = [];

    // Common fields
    if (selectedType !== 'community') {
      fields.push(
        <View key="title" style={styles.inputContainer}>
          <Text style={styles.inputLabel}>
            {selectedType === 'business' ? 'Business Name' :
             selectedType === 'event' ? 'Event Title' :
             selectedType === 'listing' ? 'Item Title' :
             'Job Title'}
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter title..."
            placeholderTextColor="#666666"
            value={formData.title}
            onChangeText={(text) => updateFormData('title', text)}
          />
        </View>
      );
    }

    // Type-specific fields
    switch (selectedType) {
      case 'business':
        fields.push(
          <View key="location" style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Location</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter business location..."
              placeholderTextColor="#666666"
              value={formData.location}
              onChangeText={(text) => updateFormData('location', text)}
            />
          </View>
        );
        break;
      case 'event':
        fields.push(
          <>
            <View key="location" style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Event Location</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter event location..."
                placeholderTextColor="#666666"
                value={formData.location}
                onChangeText={(text) => updateFormData('location', text)}
              />
            </View>
            <View key="datetime" style={styles.row}>
              <View style={[styles.inputContainer, styles.halfWidth]}>
                <Text style={styles.inputLabel}>Date</Text>
                <TextInput
                  style={styles.input}
                  placeholder="MM/DD/YYYY"
                  placeholderTextColor="#666666"
                  value={formData.date}
                  onChangeText={(text) => updateFormData('date', text)}
                />
              </View>
              <View style={[styles.inputContainer, styles.halfWidth]}>
                <Text style={styles.inputLabel}>Time</Text>
                <TextInput
                  style={styles.input}
                  placeholder="HH:MM AM/PM"
                  placeholderTextColor="#666666"
                  value={formData.time}
                  onChangeText={(text) => updateFormData('time', text)}
                />
              </View>
            </View>
          </>
        );
        break;
      case 'listing':
        fields.push(
          <>
            <View key="price" style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Price</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter price..."
                placeholderTextColor="#666666"
                value={formData.price}
                onChangeText={(text) => updateFormData('price', text)}
                keyboardType="numeric"
              />
            </View>
            <View key="location" style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Location</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter pickup/delivery location..."
                placeholderTextColor="#666666"
                value={formData.location}
                onChangeText={(text) => updateFormData('location', text)}
              />
            </View>
          </>
        );
        break;
    }

    return fields;
  };

  const renderStep1 = () => (
    <View style={styles.stepContainer}>
      <View style={styles.headerSection}>
        <Text style={styles.stepTitle}>What would you like to share?</Text>
        <Text style={styles.stepSubtitle}>Choose the type of content you want to create</Text>
      </View>
      
      <View style={styles.postTypesContainer}>
        {postTypes.map(renderPostType)}
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContainer}>
      <View style={styles.headerSection}>
        <Text style={styles.stepTitle}>Create Your {postTypes.find(t => t.id === selectedType)?.title}</Text>
        <Text style={styles.stepSubtitle}>Add details to make your post engaging</Text>
      </View>

      <View style={styles.formContainer}>
        {renderFormFields()}

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>
            {selectedType === 'community' ? 'What\'s on your mind?' : 'Description'}
          </Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Share your thoughts, details, or description..."
            placeholderTextColor="#666666"
            value={formData.content}
            onChangeText={(text) => updateFormData('content', text)}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />
        </View>

        {/* Media Upload */}
        <View style={styles.mediaSection}>
          <Text style={styles.sectionTitle}>Add Media</Text>
          <TouchableOpacity style={styles.mediaButton} onPress={handleImagePick}>
            <Ionicons name="camera" size={24} color="#667eea" />
            <Text style={styles.mediaButtonText}>Add Photos</Text>
          </TouchableOpacity>
          
          {formData.images.length > 0 && (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imagePreviewContainer}>
              {formData.images.map((image, index) => (
                <View key={index} style={styles.imagePreview}>
                  <Image source={{ uri: image }} style={styles.previewImage} />
                  <TouchableOpacity
                    style={styles.removeImageButton}
                    onPress={() => removeImage(index)}
                  >
                    <Ionicons name="close-circle" size={20} color="#ffffff" />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          )}
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#121212', '#1E1E1E']}
        style={styles.background}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => {
              if (currentStep === 1) {
                navigation.goBack();
              } else {
                setCurrentStep(1);
                setSelectedType(null);
              }
            }}
          >
            <Ionicons name="arrow-back" size={24} color="#ffffff" />
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>
            {currentStep === 1 ? 'Create Post' : 'Post Details'}
          </Text>
          
          {currentStep === 2 && (
            <TouchableOpacity
              style={[styles.headerButton, styles.postButton]}
              onPress={handlePost}
              disabled={loading}
            >
              <Text style={styles.postButtonText}>
                {loading ? 'Posting...' : 'Post'}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${(currentStep / 2) * 100}%` }]} />
          </View>
          <Text style={styles.progressText}>Step {currentStep} of 2</Text>
        </View>

        {/* Content */}
        <KeyboardAvoidingView
          style={styles.contentContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView
            ref={scrollViewRef}
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
          >
            {currentStep === 1 ? renderStep1() : renderStep2()}
          </ScrollView>
        </KeyboardAvoidingView>
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
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  headerButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
  },
  postButton: {
    backgroundColor: '#667eea',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  postButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  progressContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#333333',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#667eea',
    borderRadius: 2,
  },
  progressText: {
    color: '#ffffff',
    fontSize: 14,
    opacity: 0.7,
  },
  contentContainer: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  stepContainer: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  headerSection: {
    marginBottom: 32,
  },
  stepTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
  },
  stepSubtitle: {
    fontSize: 16,
    color: '#ffffff',
    opacity: 0.7,
    textAlign: 'center',
    lineHeight: 24,
  },
  postTypesContainer: {
    gap: 16,
  },
  postTypeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#333333',
  },
  postTypeIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  postTypeContent: {
    flex: 1,
  },
  postTypeTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  postTypeSubtitle: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.7,
  },
  formContainer: {
    gap: 20,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#ffffff',
    borderWidth: 1,
    borderColor: '#333333',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  mediaSection: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 16,
  },
  mediaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333333',
    borderStyle: 'dashed',
  },
  mediaButtonText: {
    color: '#667eea',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 12,
  },
  imagePreviewContainer: {
    marginTop: 16,
  },
  imagePreview: {
    marginRight: 12,
    position: 'relative',
  },
  previewImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  removeImageButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#ff4444',
    borderRadius: 10,
  },
}); 