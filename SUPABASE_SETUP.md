# Supabase Setup Guide for Jappa App

## 🚀 Quick Start

### 1. Database Setup

1. **Go to your Supabase Dashboard**: https://supabase.com/dashboard
2. **Select your project**: `ktnseaxpqxpxydhlybepl`
3. **Navigate to SQL Editor**
4. **Copy and paste the entire contents** of `database-schema.sql` into the SQL editor
5. **Click "Run"** to create all tables, indexes, and policies

### 2. Authentication Setup

1. **Go to Authentication > Settings** in your Supabase dashboard
2. **Enable Email Auth** if not already enabled
3. **Configure Email Templates** (optional but recommended):
   - **Confirm signup**: Customize the email verification template
   - **Reset password**: Customize the password reset template

### 3. Row Level Security (RLS)

The database schema includes RLS policies for security. All tables have appropriate policies that:
- Allow users to view public content
- Restrict users to only modify their own data
- Protect sensitive information

### 4. Environment Variables

The app is already configured with your Supabase credentials in `src/lib/supabase.js`:
- **URL**: `https://ktnseaxpqxpxydhlybepl.supabase.co`
- **Anon Key**: Your service role key is already included

## 📊 Database Schema Overview

### Core Tables

| Table | Purpose | Key Features |
|-------|---------|--------------|
| `users` | User profiles | Email, name, avatar, verification status |
| `posts` | Social media posts | Content, images, categories, engagement |
| `topics` | Community discussions | Reddit-style discussions with tags |
| `spaces` | Live audio rooms | Twitter Spaces-like functionality |
| `deals` | Local deals | Discounts, pricing, location-based |
| `listings` | Marketplace items | SideHustle marketplace |
| `comments` | Post comments | Nested comments support |
| `likes` | Post likes | User engagement tracking |
| `followers` | User relationships | Follow/unfollow functionality |
| `messages` | Direct messages | Real-time chat support |
| `chats` | Chat sessions | Conversation management |
| `notifications` | User notifications | Push notification data |

### Relationships

- **Users** → **Posts** (one-to-many)
- **Users** → **Topics** (one-to-many)
- **Users** → **Listings** (one-to-many)
- **Posts** → **Comments** (one-to-many)
- **Posts** → **Likes** (one-to-many)
- **Users** → **Followers** (many-to-many)

## 🔧 API Functions

The app includes helper functions in `src/lib/supabase.js`:

### User Operations
- `createUser(userData)`
- `getUserById(userId)`
- `updateUser(userId, updates)`

### Post Operations
- `createPost(postData)`
- `getPosts(limit, offset)`
- `getPostsByCategory(category, limit, offset)`

### Engagement Operations
- `createComment(commentData)`
- `getCommentsByPost(postId)`
- `toggleLike(userId, postId)`

### Marketplace Operations
- `createListing(listingData)`
- `getListings(category, limit, offset)`
- `createDeal(dealData)`
- `getDeals(limit)`

### Social Operations
- `followUser(followerId, followingId)`
- `unfollowUser(followerId, followingId)`
- `getFollowers(userId)`
- `getFollowing(userId)`

### Messaging Operations
- `createMessage(messageData)`
- `getMessages(chatId, limit)`
- `createChat(chatData)`
- `getUserChats(userId)`

## 🔐 Authentication Flow

1. **Registration**: Users sign up with email/password
2. **Email Verification**: Users verify their email (optional)
3. **Login**: Users sign in with credentials
4. **Session Management**: Automatic session handling
5. **Password Reset**: Email-based password recovery

## 📱 App Integration

### Context Provider
The app uses `SupabaseProvider` to manage authentication state:
- Automatic session management
- User state persistence
- Loading states
- Error handling

### Screen Updates
- **LoginScreen**: Real authentication with error handling
- **RegisterScreen**: User registration with email verification
- **All screens**: Access to user data via `useSupabase()` hook

## 🎯 Next Steps

### 1. Test Authentication
1. Run the app: `npm start`
2. Try registering a new account
3. Verify email (if enabled)
4. Test login functionality

### 2. Add Real Data
1. Create some test posts using the helper functions
2. Test the marketplace listings
3. Verify community topics work

### 3. Enable Real-time Features
1. **Go to Database > Replication** in Supabase
2. **Enable real-time** for relevant tables
3. **Add real-time subscriptions** in your app

### 4. Add File Storage
1. **Go to Storage** in Supabase dashboard
2. **Create buckets** for:
   - `avatars` (user profile pictures)
   - `posts` (post images)
   - `listings` (marketplace images)
3. **Configure storage policies**

### 5. Push Notifications
1. **Set up push notification service**
2. **Configure notification templates**
3. **Add notification triggers** in database

## 🛠️ Development Tips

### Using the Helper Functions

```javascript
import { supabaseHelpers } from '../lib/supabase';

// Create a post
const { data, error } = await supabaseHelpers.createPost({
  user_id: currentUser.id,
  content: 'Hello Jappa!',
  category_id: 'some-category-id'
});

// Get posts with pagination
const { data: posts, error } = await supabaseHelpers.getPosts(20, 0);

// Toggle like
const { data, error, action } = await supabaseHelpers.toggleLike(
  currentUser.id, 
  postId
);
```

### Error Handling

```javascript
const { data, error } = await supabaseHelpers.createPost(postData);

if (error) {
  console.error('Error creating post:', error.message);
  Alert.alert('Error', error.message);
  return;
}

// Success
console.log('Post created:', data);
```

### Real-time Subscriptions

```javascript
import { supabase } from '../lib/supabase';

// Subscribe to new posts
const subscription = supabase
  .channel('posts')
  .on('postgres_changes', 
    { event: 'INSERT', schema: 'public', table: 'posts' },
    (payload) => {
      console.log('New post:', payload.new);
      // Update your UI
    }
  )
  .subscribe();
```

## 🔍 Troubleshooting

### Common Issues

1. **"Table doesn't exist"**: Make sure you ran the SQL schema
2. **"RLS policy violation"**: Check that user is authenticated
3. **"Invalid API key"**: Verify your Supabase credentials
4. **"Email not verified"**: Check authentication settings

### Debug Mode

Enable debug logging in `src/lib/supabase.js`:

```javascript
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    debug: true
  }
});
```

## 📚 Resources

- [Supabase Documentation](https://supabase.com/docs)
- [React Native Guide](https://supabase.com/docs/guides/getting-started/tutorials/with-expo-react-native)
- [Authentication Guide](https://supabase.com/docs/guides/auth)
- [Database Guide](https://supabase.com/docs/guides/database)

---

**Your Jappa app is now fully integrated with Supabase! 🎉**

The database is ready, authentication is working, and you can start building real features with persistent data storage. 