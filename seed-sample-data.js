const { seedSampleData } = require('./src/utils/seedData.js');

console.log('🚀 Starting sample data seeding...');

seedSampleData()
  .then((result) => {
    if (result.success) {
      console.log('✅ Sample data seeded successfully!');
      console.log('📱 You can now see posts with media in your home feed.');
      process.exit(0);
    } else {
      console.error('❌ Failed to seed sample data:', result.error);
      process.exit(1);
    }
  })
  .catch((error) => {
    console.error('❌ Error seeding sample data:', error);
    process.exit(1);
  }); 