import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, SafeAreaView,
  Dimensions, StatusBar, Image, FlatList, Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { useSupabase } from '../contexts/SupabaseContext';

const { width, height } = Dimensions.get('window');

export default function MediaViewerScreen({ navigation, route }) {
  const { initialPostIndex, posts } = route.params;
  const { supabase } = useSupabase();
  
  const [currentIndex, setCurrentIndex] = useState(initialPostIndex || 0);
  const [allPosts, setAllPosts] = useState(posts || []);
  const [loading, setLoading] = useState(false);
  const [userProfiles, setUserProfiles] = useState({});
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  
  const flatListRef = useRef(null);
  const mediaFlatListRef = useRef(null);
  const translateY = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    loadUserProfiles();
  }, [allPosts]);

  const loadUserProfiles = async () => {
    try {
      const userIds = [...new Set(allPosts.map(post => post.user_id))];
      const { data, error } = await supabase
        .from('users')
        .select('id, full_name, username, avatar_url')
        .in('id', userIds);

      if (error) throw error;

      const profiles = {};
      data?.forEach(user => {
        profiles[user.id] = user;
      });
      setUserProfiles(profiles);
    } catch (error) {
      console.error('Error loading user profiles:', error);
    }
  };

  const handleSwipeUp = () => {
    // Go to next post
    if (currentIndex < allPosts.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setCurrentMediaIndex(0); // Reset media index for new post
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      // Reached end - close viewer
      navigation.goBack();
    }
  };

  const handleSwipeDown = () => {
    // Go to previous post
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setCurrentMediaIndex(0); // Reset media index for new post
      flatListRef.current?.scrollToIndex({
        index: currentIndex - 1,
        animated: true,
      });
    } else {
      // Reached beginning - close viewer
      navigation.goBack();
    }
  };

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationY: translateY } }],
    { useNativeDriver: true }
  );

  const onHandlerStateChange = (event) => {
    if (event.nativeEvent.state === State.END) {
      const { translationY } = event.nativeEvent;
      
      if (translationY < -100) {
        // Swipe up - next post
        handleSwipeUp();
      } else if (translationY > 100) {
        // Swipe down - previous post
        handleSwipeDown();
      }
      
      // Reset position
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  };

  const renderMediaItem = ({ item, index }) => {
    const post = allPosts[currentIndex];
    const user = userProfiles[post.user_id];
    const hasMultipleImages = post.images && post.images.length > 1;
    const isCurrentPost = index === currentIndex;

    if (!post.images || post.images.length === 0) {
      return null; // Skip posts without media
    }

    return (
      <View style={styles.postContainer}>
        <PanGestureHandler
          onGestureEvent={onGestureEvent}
          onHandlerStateChange={onHandlerStateChange}
          enabled={isCurrentPost}
        >
          <Animated.View
            style={[
              styles.mediaContainer,
              {
                transform: [
                  { translateY: isCurrentPost ? translateY : 0 },
                  { scale: isCurrentPost ? scale : 1 },
                ],
              },
            ]}
          >
            {/* Media FlatList for horizontal scrolling */}
            <FlatList
              ref={mediaFlatListRef}
              data={post.images}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item: imageUrl, index: mediaIndex }) => (
                <Image
                  source={{ uri: imageUrl }}
                  style={styles.mediaImage}
                  resizeMode="cover"
                />
              )}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={(event) => {
                const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
                setCurrentMediaIndex(newIndex);
              }}
            />

            {/* Media Indicators */}
            {hasMultipleImages && (
              <View style={styles.mediaIndicators}>
                {post.images.map((_, index) => (
                  <View
                    key={index}
                    style={[
                      styles.mediaIndicator,
                      currentMediaIndex === index && styles.activeMediaIndicator,
                    ]}
                  />
                ))}
              </View>
            )}

            {/* Gradient Overlay */}
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)']}
              style={styles.gradientOverlay}
            />

            {/* Post Info */}
            <View style={styles.postInfo}>
              <View style={styles.userInfo}>
                <Image
                  source={{
                    uri: user?.avatar_url || `https://ui-avatars.com/api/?name=${user?.full_name || 'User'}&background=667eea&color=ffffff&size=100`
                  }}
                  style={styles.userAvatar}
                />
                <View style={styles.userDetails}>
                  <Text style={styles.userName}>
                    {user?.full_name || 'Anonymous User'}
                  </Text>
                  <Text style={styles.userUsername}>
                    @{user?.username || 'user'}
                  </Text>
                </View>
              </View>

              <View style={styles.postContent}>
                {post.content && (
                  <Text style={styles.postText} numberOfLines={3}>
                    {post.content}
                  </Text>
                )}
                {post.location && (
                  <Text style={styles.postLocation}>
                    📍 {post.location}
                  </Text>
                )}
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="heart-outline" size={28} color="#ffffff" />
                <Text style={styles.actionText}>
                  {post.likes_count || 0}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="chatbubble-outline" size={28} color="#ffffff" />
                <Text style={styles.actionText}>
                  {post.comments_count || 0}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="share-outline" size={28} color="#ffffff" />
                <Text style={styles.actionText}>
                  {post.shares_count || 0}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="bookmark-outline" size={28} color="#ffffff" />
              </TouchableOpacity>
            </View>

            {/* Close Button */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="close" size={24} color="#ffffff" />
            </TouchableOpacity>

            {/* Navigation Indicators */}
            <View style={styles.navigationIndicators}>
              <View style={styles.navIndicator}>
                <Ionicons name="arrow-up" size={16} color="#ffffff" />
                <Text style={styles.navText}>Next post</Text>
              </View>
              <View style={styles.navIndicator}>
                <Ionicons name="arrow-down" size={16} color="#ffffff" />
                <Text style={styles.navText}>Previous post</Text>
              </View>
              {hasMultipleImages && (
                <View style={styles.navIndicator}>
                  <Ionicons name="arrow-back" size={16} color="#ffffff" />
                  <Text style={styles.navText}>Swipe for more</Text>
                </View>
              )}
            </View>
          </Animated.View>
        </PanGestureHandler>
      </View>
    );
  };

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
      setCurrentMediaIndex(0); // Reset media index when changing posts
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <FlatList
        ref={flatListRef}
        data={allPosts.filter(post => post.images && post.images.length > 0)}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        renderItem={renderMediaItem}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        initialScrollIndex={initialPostIndex}
        getItemLayout={(data, index) => ({
          length: height,
          offset: height * index,
          index,
        })}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  postContainer: {
    width,
    height,
  },
  mediaContainer: {
    flex: 1,
    position: 'relative',
  },
  mediaImage: {
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
  },
  postInfo: {
    position: 'absolute',
    bottom: 120,
    left: 20,
    right: 80,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  userAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#667eea',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 2,
  },
  userUsername: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.8,
  },
  postContent: {
    marginBottom: 16,
  },
  postText: {
    fontSize: 16,
    color: '#ffffff',
    lineHeight: 22,
    marginBottom: 8,
  },
  postLocation: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.8,
  },
  actionButtons: {
    position: 'absolute',
    right: 20,
    bottom: 120,
    alignItems: 'center',
  },
  actionButton: {
    alignItems: 'center',
    marginBottom: 20,
  },
  actionText: {
    fontSize: 12,
    color: '#ffffff',
    marginTop: 4,
    fontWeight: '600',
  },
  closeButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  swipeIndicator: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  swipeText: {
    fontSize: 12,
    color: '#ffffff',
    marginBottom: 4,
    textAlign: 'center',
  },
  swipeIcon: {
    marginTop: 2,
  },
  mediaIndicators: {
    position: 'absolute',
    top: 100,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
    zIndex: 10,
  },
  mediaIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 4,
  },
  activeMediaIndicator: {
    backgroundColor: '#ffffff',
  },
  navigationIndicators: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  navIndicator: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 10,
    color: '#ffffff',
    marginTop: 2,
    textAlign: 'center',
  },
}); 