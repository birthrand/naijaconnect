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