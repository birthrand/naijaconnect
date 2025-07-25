import { supabase } from './supabase';

// Real-time subscription management
export class RealtimeManager {
  constructor() {
    this.subscriptions = new Map();
  }

  // Subscribe to new posts
  subscribeToPosts(callback) {
    const subscription = supabase
      .channel('posts')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'posts' },
        (payload) => {
          console.log('New post:', payload.new);
          callback(payload.new);
        }
      )
      .on('postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'posts' },
        (payload) => {
          console.log('Post updated:', payload.new);
          callback(payload.new, 'UPDATE');
        }
      )
      .on('postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'posts' },
        (payload) => {
          console.log('Post deleted:', payload.old);
          callback(payload.old, 'DELETE');
        }
      )
      .subscribe();

    this.subscriptions.set('posts', subscription);
    return subscription;
  }

  // Subscribe to new comments
  subscribeToComments(callback) {
    const subscription = supabase
      .channel('comments')
      .on('postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'comments' },
        (payload) => {
          console.log('New comment:', payload.new);
          callback(payload.new);
        }
      )
      .subscribe();

    this.subscriptions.set('comments', subscription);
    return subscription;
  }

  // Subscribe to likes
  subscribeToLikes(callback) {
    const subscription = supabase
      .channel('likes')
      .on('postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'likes' },
        (payload) => {
          console.log('New like:', payload.new);
          callback(payload.new);
        }
      )
      .on('postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'likes' },
        (payload) => {
          console.log('Like removed:', payload.old);
          callback(payload.old, 'DELETE');
        }
      )
      .subscribe();

    this.subscriptions.set('likes', subscription);
    return subscription;
  }

  // Subscribe to messages for a specific chat
  subscribeToMessages(chatId, callback) {
    const channelName = `messages:${chatId}`;
    const subscription = supabase
      .channel(channelName)
      .on('postgres_changes',
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'messages',
          filter: `chat_id=eq.${chatId}`
        },
        (payload) => {
          console.log('New message:', payload.new);
          callback(payload.new);
        }
      )
      .subscribe();

    this.subscriptions.set(channelName, subscription);
    return subscription;
  }

  // Subscribe to notifications for a specific user
  subscribeToNotifications(userId, callback) {
    const channelName = `notifications:${userId}`;
    const subscription = supabase
      .channel(channelName)
      .on('postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userId}`
        },
        (payload) => {
          console.log('New notification:', payload.new);
          callback(payload.new);
        }
      )
      .subscribe();

    this.subscriptions.set(channelName, subscription);
    return subscription;
  }

  // Subscribe to spaces (live audio rooms)
  subscribeToSpaces(callback) {
    const subscription = supabase
      .channel('spaces')
      .on('postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'spaces' },
        (payload) => {
          console.log('New space:', payload.new);
          callback(payload.new);
        }
      )
      .on('postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'spaces' },
        (payload) => {
          console.log('Space updated:', payload.new);
          callback(payload.new, 'UPDATE');
        }
      )
      .subscribe();

    this.subscriptions.set('spaces', subscription);
    return subscription;
  }

  // Subscribe to topics (community discussions)
  subscribeToTopics(callback) {
    const subscription = supabase
      .channel('topics')
      .on('postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'topics' },
        (payload) => {
          console.log('New topic:', payload.new);
          callback(payload.new);
        }
      )
      .subscribe();

    this.subscriptions.set('topics', subscription);
    return subscription;
  }

  // Subscribe to listings (marketplace)
  subscribeToListings(callback) {
    const subscription = supabase
      .channel('listings')
      .on('postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'listings' },
        (payload) => {
          console.log('New listing:', payload.new);
          callback(payload.new);
        }
      )
      .on('postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'listings' },
        (payload) => {
          console.log('Listing updated:', payload.new);
          callback(payload.new, 'UPDATE');
        }
      )
      .subscribe();

    this.subscriptions.set('listings', subscription);
    return subscription;
  }

  // Subscribe to deals
  subscribeToDeals(callback) {
    const subscription = supabase
      .channel('deals')
      .on('postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'deals' },
        (payload) => {
          console.log('New deal:', payload.new);
          callback(payload.new);
        }
      )
      .subscribe();

    this.subscriptions.set('deals', subscription);
    return subscription;
  }

  // Unsubscribe from a specific channel
  unsubscribe(channelName) {
    const subscription = this.subscriptions.get(channelName);
    if (subscription) {
      subscription.unsubscribe();
      this.subscriptions.delete(channelName);
      console.log(`Unsubscribed from ${channelName}`);
    }
  }

  // Unsubscribe from all channels
  unsubscribeAll() {
    this.subscriptions.forEach((subscription, channelName) => {
      subscription.unsubscribe();
      console.log(`Unsubscribed from ${channelName}`);
    });
    this.subscriptions.clear();
  }

  // Get subscription status
  getSubscriptionStatus(channelName) {
    const subscription = this.subscriptions.get(channelName);
    return subscription ? subscription.subscribe() : null;
  }
}

// Create a singleton instance
export const realtimeManager = new RealtimeManager();

// React hook for real-time subscriptions
export const useRealtime = () => {
  return {
    subscribeToPosts: (callback) => realtimeManager.subscribeToPosts(callback),
    subscribeToComments: (callback) => realtimeManager.subscribeToComments(callback),
    subscribeToLikes: (callback) => realtimeManager.subscribeToLikes(callback),
    subscribeToMessages: (chatId, callback) => realtimeManager.subscribeToMessages(chatId, callback),
    subscribeToNotifications: (userId, callback) => realtimeManager.subscribeToNotifications(userId, callback),
    subscribeToSpaces: (callback) => realtimeManager.subscribeToSpaces(callback),
    subscribeToTopics: (callback) => realtimeManager.subscribeToTopics(callback),
    subscribeToListings: (callback) => realtimeManager.subscribeToListings(callback),
    subscribeToDeals: (callback) => realtimeManager.subscribeToDeals(callback),
    unsubscribe: (channelName) => realtimeManager.unsubscribe(channelName),
    unsubscribeAll: () => realtimeManager.unsubscribeAll(),
  };
};

export default realtimeManager; 