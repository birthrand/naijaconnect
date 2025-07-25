import { supabaseHelpers, supabase } from '../lib/supabase';
import { useSupabase } from '../contexts/SupabaseContext';

// Sample data for seeding the database
export const sampleData = {
  // Sample posts for different categories
  posts: [
    {
      title: 'Building a Successful Tech Startup in Nigeria',
      content: 'Starting a tech company in Nigeria comes with unique challenges and opportunities. Here are the key lessons I learned: 1) Local market understanding is crucial 2) Build for mobile-first users 3) Focus on solving real problems 4) Network with other entrepreneurs. The Nigerian tech ecosystem is growing rapidly!',
      category: 'Technology',
      is_pinned: false,
      is_hot: true,
      is_featured: true,
    },
    {
      title: 'Nigerian Fashion Week Highlights',
      content: 'Just attended Nigerian Fashion Week and the creativity was incredible! Our designers are pushing boundaries and creating unique pieces that blend traditional and modern styles. The future of Nigerian fashion is bright!',
      category: 'Fashion',
      is_pinned: false,
      is_hot: false,
      is_featured: false,
    },
    {
      title: 'Healthy Nigerian Breakfast Ideas',
      content: 'Start your day right with these nutritious Nigerian breakfast options: 1) Oatmeal with plantains 2) Akara with pap 3) Yam and egg sauce 4) Smoothie bowls with local fruits. Healthy eating doesn\'t mean giving up our delicious food!',
      category: 'Food',
      is_pinned: false,
      is_hot: true,
      is_featured: false,
    },
  ],

  // Sample topics for community discussions
  topics: [
    {
      title: 'Remote Work Culture in Nigeria',
      content: 'How has remote work changed the Nigerian work culture? Are companies adapting well? What challenges are you facing with remote work?',
      category: 'Business',
      tags: ['remote-work', 'culture', 'workplace'],
      is_pinned: false,
      is_hot: true,
    },
    {
      title: 'Nigerian Tech Talent Development',
      content: 'We need to invest more in developing local tech talent. What programs or initiatives are working well? How can we improve tech education?',
      category: 'Education',
      tags: ['tech', 'education', 'talent'],
      is_pinned: true,
      is_hot: false,
    },
  ],

  // Sample listings for marketplace
  listings: [
    {
      title: 'Professional Photography Services',
      description: 'Professional photography for events, portraits, and business needs. High-quality equipment and experienced photographer.',
      price: 50000.00,
      category: 'Business',
      location: 'Lagos, Nigeria',
      is_negotiable: true,
      is_featured: true,
      is_hot: false,
      is_new: true,
      condition: 'Service',
    },
    {
      title: 'Handmade Jewelry Collection',
      description: 'Beautiful handmade jewelry using traditional Nigerian beads and modern designs. Perfect gifts for special occasions.',
      price: 15000.00,
      category: 'Fashion',
      location: 'Abuja, Nigeria',
      is_negotiable: false,
      is_featured: false,
      is_hot: true,
      is_new: true,
      condition: 'New',
    },
  ],

  // Sample deals
  deals: [
    {
      title: 'Restaurant Week Special',
      description: '50% off at participating restaurants across Lagos. Valid for lunch and dinner. Limited time offer!',
      original_price: 10000.00,
      discounted_price: 5000.00,
      discount_percentage: 50,
      location: 'Lagos, Nigeria',
      is_verified: true,
      is_featured: true,
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    },
    {
      title: 'Tech Gadgets Sale',
      description: 'Up to 30% off on laptops, phones, and accessories. Premium brands, excellent condition.',
      original_price: 800000.00,
      discounted_price: 560000.00,
      discount_percentage: 30,
      location: 'Abuja, Nigeria',
      is_verified: false,
      is_featured: false,
      expires_at: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    },
  ],
};

// Function to seed data (use this in development)
export const seedDatabase = async (currentUser) => {
  if (!currentUser) {
    console.error('User must be authenticated to seed data');
    return;
  }

  try {
    console.log('Starting database seeding...');

    // Get categories for reference
    const { data: categories, error: categoriesError } = await supabaseHelpers.getCategories();
    if (categoriesError) throw categoriesError;

    const categoryMap = {};
    categories.forEach(cat => {
      categoryMap[cat.name] = cat.id;
    });

    // Seed posts
    for (const postData of sampleData.posts) {
      const { data, error } = await supabaseHelpers.createPost({
        user_id: currentUser.id,
        title: postData.title,
        content: postData.content,
        category_id: categoryMap[postData.category],
        is_pinned: postData.is_pinned,
        is_hot: postData.is_hot,
        is_featured: postData.is_featured,
      });

      if (error) {
        console.error('Error creating post:', error);
      } else {
        console.log('Created post:', data[0].title);
      }
    }

    // Seed topics
    for (const topicData of sampleData.topics) {
      const { data, error } = await supabaseHelpers.createTopic({
        user_id: currentUser.id,
        title: topicData.title,
        content: topicData.content,
        category_id: categoryMap[topicData.category],
        tags: topicData.tags,
        is_pinned: topicData.is_pinned,
        is_hot: topicData.is_hot,
      });

      if (error) {
        console.error('Error creating topic:', error);
      } else {
        console.log('Created topic:', data[0].title);
      }
    }

    // Seed listings
    for (const listingData of sampleData.listings) {
      const { data, error } = await supabaseHelpers.createListing({
        seller_id: currentUser.id,
        title: listingData.title,
        description: listingData.description,
        price: listingData.price,
        category_id: categoryMap[listingData.category],
        location: listingData.location,
        is_negotiable: listingData.is_negotiable,
        is_featured: listingData.is_featured,
        is_hot: listingData.is_hot,
        is_new: listingData.is_new,
        condition: listingData.condition,
      });

      if (error) {
        console.error('Error creating listing:', error);
      } else {
        console.log('Created listing:', data[0].title);
      }
    }

    // Seed deals
    for (const dealData of sampleData.deals) {
      const { data, error } = await supabaseHelpers.createDeal({
        user_id: currentUser.id,
        title: dealData.title,
        description: dealData.description,
        original_price: dealData.original_price,
        discounted_price: dealData.discounted_price,
        discount_percentage: dealData.discount_percentage,
        location: dealData.location,
        is_verified: dealData.is_verified,
        is_featured: dealData.is_featured,
        expires_at: dealData.expires_at,
      });

      if (error) {
        console.error('Error creating deal:', error);
      } else {
        console.log('Created deal:', data[0].title);
      }
    }

    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

// Function to clear all user data (use with caution)
export const clearUserData = async (currentUser) => {
  if (!currentUser) {
    console.error('User must be authenticated to clear data');
    return;
  }

  try {
    console.log('Clearing user data...');

    // Delete user's posts
    const { error: postsError } = await supabase
      .from('posts')
      .delete()
      .eq('user_id', currentUser.id);

    if (postsError) console.error('Error deleting posts:', postsError);

    // Delete user's topics
    const { error: topicsError } = await supabase
      .from('topics')
      .delete()
      .eq('user_id', currentUser.id);

    if (topicsError) console.error('Error deleting topics:', topicsError);

    // Delete user's listings
    const { error: listingsError } = await supabase
      .from('listings')
      .delete()
      .eq('seller_id', currentUser.id);

    if (listingsError) console.error('Error deleting listings:', listingsError);

    // Delete user's deals
    const { error: dealsError } = await supabase
      .from('deals')
      .delete()
      .eq('user_id', currentUser.id);

    if (dealsError) console.error('Error deleting deals:', dealsError);

    console.log('User data cleared successfully!');
  } catch (error) {
    console.error('Error clearing user data:', error);
  }
};

// Hook for using seed functions in components
export const useSeedData = () => {
  const { user } = useSupabase();

  return {
    seedDatabase: () => seedDatabase(user),
    clearUserData: () => clearUserData(user),
    sampleData,
  };
};

// Sample posts with media
const samplePosts = [
  // Posts with both text and media
  {
    type: 'community',
    title: null,
    content: 'Just discovered this amazing new restaurant in Victoria Island! The jollof rice is absolutely 🔥. Anyone else tried it?',
    location: 'Victoria Island, Lagos',
    price: null,
    event_date: null,
    category: 'Food & Dining',
    images: [
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop'
    ],
  },
  {
    type: 'community',
    title: null,
    content: 'Lagos traffic today is something else! 😅 At least I got to enjoy this beautiful sunset from the bridge.',
    location: 'Third Mainland Bridge, Lagos',
    price: null,
    event_date: null,
    category: 'Lifestyle',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop'
    ],
  },
  {
    type: 'community',
    title: null,
    content: 'Finally finished my coding bootcamp! 🎉 Here\'s a screenshot of my final project. What do you think?',
    location: 'Lagos, Nigeria',
    price: null,
    event_date: null,
    category: 'Technology',
    images: [
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1555066931-489689fd1ca8?w=800&h=600&fit=crop'
    ],
  },
  
  // Posts with media only (no text)
  {
    type: 'community',
    title: null,
    content: null,
    location: 'Lekki, Lagos',
    price: null,
    event_date: null,
    category: 'Photography',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop'
    ],
  },
  {
    type: 'community',
    title: null,
    content: null,
    location: 'Victoria Island, Lagos',
    price: null,
    event_date: null,
    category: 'Art',
    images: [
      'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop'
    ],
  },
  {
    type: 'community',
    title: null,
    content: null,
    location: 'Ikeja, Lagos',
    price: null,
    event_date: null,
    category: 'Food',
    images: [
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop'
    ],
  },
  
  // Posts with text only (no media)
  {
    type: 'community',
    title: null,
    content: 'Anyone know a good mechanic in Ikeja? My car is making weird noises and I need someone reliable. Recommendations please! 🙏',
    location: 'Ikeja, Lagos',
    price: null,
    event_date: null,
    category: 'Services',
    images: [],
  },
  {
    type: 'community',
    title: null,
    content: 'Just finished reading "The Psychology of Money" by Morgan Housel. Highly recommend for anyone interested in personal finance! The insights on wealth building are eye-opening. What finance books have you read recently?',
    location: 'Lagos, Nigeria',
    price: null,
    event_date: null,
    category: 'Books & Learning',
    images: [],
  },
  {
    type: 'community',
    title: null,
    content: 'Lagos weather is so unpredictable! One minute it\'s sunny, next minute it\'s pouring rain. 🌦️ How do you guys plan your day around this weather?',
    location: 'Lagos, Nigeria',
    price: null,
    event_date: null,
    category: 'Lifestyle',
    images: [],
  },
  {
    type: 'community',
    title: null,
    content: 'Looking for a good gym in Victoria Island. Preferably one with good trainers and reasonable prices. Any suggestions? 💪',
    location: 'Victoria Island, Lagos',
    price: null,
    event_date: null,
    category: 'Fitness',
    images: [],
  },
  
  // Event posts with media
  {
    type: 'event',
    title: 'Lagos Tech Meetup 2024',
    content: 'Join us for the biggest tech gathering in Lagos! Network with developers, entrepreneurs, and tech enthusiasts. Free entry with registration.',
    location: 'Victoria Island, Lagos',
    price: 'Free',
    event_date: '2024-02-15',
    category: 'Technology',
    images: [
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=600&fit=crop'
    ],
  },
  {
    type: 'event',
    title: 'Lagos Fashion Week',
    content: 'The most stylish event of the year is back! Showcasing the best of Nigerian fashion and international designers.',
    location: 'Eko Hotel, Lagos',
    price: '₦15,000',
    event_date: '2024-02-25',
    category: 'Fashion',
    images: [
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop'
    ],
  },
  
  // Deal posts with media
  {
    type: 'deal',
    title: 'iPhone 14 Pro - Great Condition',
    content: 'Selling my iPhone 14 Pro, 256GB, Space Black. Perfect condition, comes with original box and accessories. Reason for selling: upgraded to 15 Pro.',
    location: 'Lekki, Lagos',
    price: '₦450,000',
    event_date: null,
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=600&fit=crop'
    ],
  },
  {
    type: 'deal',
    title: 'MacBook Air M2 - Like New',
    content: 'MacBook Air M2, 8GB RAM, 256GB SSD. Only 6 months old, still under warranty. Perfect for work and study.',
    location: 'Ikeja, Lagos',
    price: '₦850,000',
    event_date: null,
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop'
    ],
  },
  
  // More community posts with variety
  {
    type: 'community',
    title: null,
    content: 'Just got my first job as a software developer! 🎉 After months of learning and applying, finally landed a role at a startup. To everyone still job hunting - keep pushing, your breakthrough is coming! 💪',
    location: 'Lagos, Nigeria',
    price: null,
    event_date: null,
    category: 'Career',
    images: [],
  },
  {
    type: 'community',
    title: null,
    content: 'This view from my balcony this morning was just perfect. Sometimes you need to stop and appreciate the little moments. ☀️',
    location: 'Lekki, Lagos',
    price: null,
    event_date: null,
    category: 'Photography',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop'
    ],
  },
  {
    type: 'community',
    title: null,
    content: 'Best pizza in Lagos? I\'m on a mission to find it! 🍕 So far, I\'ve tried Domino\'s, Pizza Hut, and a few local spots. Any hidden gems I should know about?',
    location: 'Lagos, Nigeria',
    price: null,
    event_date: null,
    category: 'Food & Dining',
    images: [],
  },
  {
    type: 'community',
    title: null,
    content: 'Just finished this painting! Took me 3 weeks but I\'m really happy with how it turned out. Art is therapy. 🎨',
    location: 'Victoria Island, Lagos',
    price: null,
    event_date: null,
    category: 'Art',
    images: [
      'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop'
    ],
  },
];

// Sample users for the posts
const sampleUsers = [
  {
    id: 'sample-user-1',
    full_name: 'Veronica Margareth',
    username: 'veronica_m',
    email: 'veronica@example.com',
    bio: 'Food lover and travel enthusiast. Always exploring new restaurants and sharing amazing finds!',
    location: 'Lagos, Nigeria',
    avatar_url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face',
  },
  {
    id: 'sample-user-2',
    full_name: 'David Okonkwo',
    username: 'david_ok',
    email: 'david@example.com',
    bio: 'Software developer and tech enthusiast. Building the future one line of code at a time.',
    location: 'Lagos, Nigeria',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
  },
  {
    id: 'sample-user-3',
    full_name: 'Aisha Bello',
    username: 'aisha_b',
    email: 'aisha@example.com',
    bio: 'Photographer and art lover. Capturing life\'s beautiful moments through my lens.',
    location: 'Lagos, Nigeria',
    avatar_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
  },
  {
    id: 'sample-user-4',
    full_name: 'Emeka Nwosu',
    username: 'emeka_n',
    email: 'emeka@example.com',
    bio: 'Fitness trainer and wellness coach. Helping people achieve their health goals.',
    location: 'Lagos, Nigeria',
    avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
  },
  {
    id: 'sample-user-5',
    full_name: 'Fatima Hassan',
    username: 'fatima_h',
    email: 'fatima@example.com',
    bio: 'Artist and creative designer. Expressing emotions through colors and shapes.',
    location: 'Lagos, Nigeria',
    avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face',
  },
  {
    id: 'sample-user-6',
    full_name: 'Kemi Adebayo',
    username: 'kemi_a',
    email: 'kemi@example.com',
    bio: 'Business consultant and entrepreneur. Sharing insights on building successful businesses.',
    location: 'Lagos, Nigeria',
    avatar_url: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop&crop=face',
  },
];

export const seedSampleData = async () => {
  try {
    console.log('🌱 Seeding sample data...');

    // First, create sample users
    for (const user of sampleUsers) {
      const { error: userError } = await supabase
        .from('users')
        .upsert([user], { onConflict: 'id' });
      
      if (userError) {
        console.error('Error creating user:', userError);
      }
    }

    // Then create sample posts
    for (let i = 0; i < samplePosts.length; i++) {
      const post = samplePosts[i];
      const user = sampleUsers[i % sampleUsers.length]; // Cycle through users
      
      const postData = {
        user_id: user.id,
        type: post.type,
        title: post.title,
        content: post.content,
        location: post.location,
        price: post.price,
        event_date: post.event_date,
        category: post.category,
        images: post.images,
        created_at: new Date(Date.now() - (i * 24 * 60 * 60 * 1000)).toISOString(), // Spread posts over time
      };

      const { error: postError } = await supabase
        .from('posts')
        .insert([postData]);

      if (postError) {
        console.error('Error creating post:', postError);
      }
    }

    console.log('✅ Sample data seeded successfully!');
    return { success: true };
  } catch (error) {
    console.error('❌ Error seeding sample data:', error);
    return { success: false, error };
  }
};

export const clearSampleData = async () => {
  try {
    console.log('🧹 Clearing sample data...');

    // Clear posts
    const { error: postsError } = await supabase
      .from('posts')
      .delete()
      .in('user_id', sampleUsers.map(u => u.id));

    if (postsError) {
      console.error('Error clearing posts:', postsError);
    }

    // Clear users
    const { error: usersError } = await supabase
      .from('users')
      .delete()
      .in('id', sampleUsers.map(u => u.id));

    if (usersError) {
      console.error('Error clearing users:', usersError);
    }

    console.log('✅ Sample data cleared successfully!');
    return { success: true };
  } catch (error) {
    console.error('❌ Error clearing sample data:', error);
    return { success: false, error };
  }
}; 