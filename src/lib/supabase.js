import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@env';

// Validate environment variables
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Database table names
export const TABLES = {
  USERS: 'users',
  POSTS: 'posts',
  COMMENTS: 'comments',
  LIKES: 'likes',
  SPACES: 'spaces',
  TOPICS: 'topics',
  DEALS: 'deals',
  LISTINGS: 'listings',
  CATEGORIES: 'categories',
  USER_PROFILES: 'user_profiles',
  FOLLOWERS: 'followers',
  NOTIFICATIONS: 'notifications',
  MESSAGES: 'messages',
  CHATS: 'chats',
};

// Helper functions for common operations
export const supabaseHelpers = {
  // User operations
  async createUser(userData) {
    const { data, error } = await supabase
      .from(TABLES.USERS)
      .insert([userData])
      .select();
    
    return { data, error };
  },

  async getUserById(userId) {
    const { data, error } = await supabase
      .from(TABLES.USERS)
      .select('*')
      .eq('id', userId)
      .single();
    
    return { data, error };
  },

  async updateUser(userId, updates) {
    const { data, error } = await supabase
      .from(TABLES.USERS)
      .update(updates)
      .eq('id', userId)
      .select();
    
    return { data, error };
  },

  // Post operations
  async createPost(postData) {
    const { data, error } = await supabase
      .from(TABLES.POSTS)
      .insert([postData])
      .select();
    
    return { data, error };
  },

  async getPosts(limit = 20, offset = 0) {
    const { data, error } = await supabase
      .from(TABLES.POSTS)
      .select(`
        *,
        user:users(*),
        comments:comments(count),
        likes:likes(count)
      `)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);
    
    return { data, error };
  },

  async getPostsByCategory(category, limit = 20, offset = 0) {
    const { data, error } = await supabase
      .from(TABLES.POSTS)
      .select(`
        *,
        user:users(*),
        comments:comments(count),
        likes:likes(count)
      `)
      .eq('category', category)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);
    
    return { data, error };
  },

  // Comment operations
  async createComment(commentData) {
    const { data, error } = await supabase
      .from(TABLES.COMMENTS)
      .insert([commentData])
      .select();
    
    return { data, error };
  },

  async getCommentsByPost(postId) {
    const { data, error } = await supabase
      .from(TABLES.COMMENTS)
      .select(`
        *,
        user:users(*)
      `)
      .eq('post_id', postId)
      .order('created_at', { ascending: true });
    
    return { data, error };
  },

  // Like operations
  async toggleLike(userId, postId) {
    // Check if like exists
    const { data: existingLike } = await supabase
      .from(TABLES.LIKES)
      .select('*')
      .eq('user_id', userId)
      .eq('post_id', postId)
      .single();

    if (existingLike) {
      // Remove like
      const { error } = await supabase
        .from(TABLES.LIKES)
        .delete()
        .eq('id', existingLike.id);
      
      return { data: null, error, action: 'unliked' };
    } else {
      // Add like
      const { data, error } = await supabase
        .from(TABLES.LIKES)
        .insert([{ user_id: userId, post_id: postId }])
        .select();
      
      return { data, error, action: 'liked' };
    }
  },

  // Space operations
  async createSpace(spaceData) {
    const { data, error } = await supabase
      .from(TABLES.SPACES)
      .insert([spaceData])
      .select();
    
    return { data, error };
  },

  async getSpaces(limit = 10) {
    const { data, error } = await supabase
      .from(TABLES.SPACES)
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);
    
    return { data, error };
  },

  // Topic operations
  async createTopic(topicData) {
    const { data, error } = await supabase
      .from(TABLES.TOPICS)
      .insert([topicData])
      .select();
    
    return { data, error };
  },

  async getTopics(limit = 20, offset = 0) {
    const { data, error } = await supabase
      .from(TABLES.TOPICS)
      .select(`
        *,
        user:users(*),
        comments:comments(count),
        likes:likes(count)
      `)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);
    
    return { data, error };
  },

  // Deal operations
  async createDeal(dealData) {
    const { data, error } = await supabase
      .from(TABLES.DEALS)
      .insert([dealData])
      .select();
    
    return { data, error };
  },

  async getDeals(limit = 10) {
    const { data, error } = await supabase
      .from(TABLES.DEALS)
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);
    
    return { data, error };
  },

  // Listing operations
  async createListing(listingData) {
    const { data, error } = await supabase
      .from(TABLES.LISTINGS)
      .insert([listingData])
      .select();
    
    return { data, error };
  },

  async getListings(category = null, limit = 20, offset = 0) {
    let query = supabase
      .from(TABLES.LISTINGS)
      .select(`
        *,
        seller:users(*)
      `)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;
    return { data, error };
  },

  // Category operations
  async getCategories() {
    const { data, error } = await supabase
      .from(TABLES.CATEGORIES)
      .select('*')
      .order('name', { ascending: true });
    
    return { data, error };
  },

  // Follower operations
  async followUser(followerId, followingId) {
    const { data, error } = await supabase
      .from(TABLES.FOLLOWERS)
      .insert([{ follower_id: followerId, following_id: followingId }])
      .select();
    
    return { data, error };
  },

  async unfollowUser(followerId, followingId) {
    const { error } = await supabase
      .from(TABLES.FOLLOWERS)
      .delete()
      .eq('follower_id', followerId)
      .eq('following_id', followingId);
    
    return { error };
  },

  async getFollowers(userId) {
    const { data, error } = await supabase
      .from(TABLES.FOLLOWERS)
      .select(`
        follower:users!follower_id(*)
      `)
      .eq('following_id', userId);
    
    return { data, error };
  },

  async getFollowing(userId) {
    const { data, error } = await supabase
      .from(TABLES.FOLLOWERS)
      .select(`
        following:users!following_id(*)
      `)
      .eq('follower_id', userId);
    
    return { data, error };
  },

  // Message operations
  async createMessage(messageData) {
    const { data, error } = await supabase
      .from(TABLES.MESSAGES)
      .insert([messageData])
      .select();
    
    return { data, error };
  },

  async getMessages(chatId, limit = 50) {
    const { data, error } = await supabase
      .from(TABLES.MESSAGES)
      .select(`
        *,
        sender:users(*)
      `)
      .eq('chat_id', chatId)
      .order('created_at', { ascending: false })
      .limit(limit);
    
    return { data, error };
  },

  // Chat operations
  async createChat(chatData) {
    const { data, error } = await supabase
      .from(TABLES.CHATS)
      .insert([chatData])
      .select();
    
    return { data, error };
  },

  async getUserChats(userId) {
    const { data, error } = await supabase
      .from(TABLES.CHATS)
      .select(`
        *,
        participants:users(*),
        last_message:messages(*)
      `)
      .or(`participant1_id.eq.${userId},participant2_id.eq.${userId}`)
      .order('updated_at', { ascending: false });
    
    return { data, error };
  },
};

export default supabase;
