# NaijaConnect - A Centralized Networking Platform for Nigerians Worldwide

A comprehensive React Native mobile application built with Expo, designed to connect Nigerians across regions and the diaspora through social networking, professional tools, and cultural celebration.

## 🎯 Project Goals

- Connect Nigerians across regions and the diaspora
- Support career growth, business visibility, and community support
- Promote cultural identity and collaboration
- Provide a high-trust, culturally relevant digital space

## 👤 Target Users

- Young professionals and creatives
- Nigerian students (home and abroad)
- Small business owners and freelancers
- Community organizers and diaspora groups

## 🚀 Features

### 🔐 User Onboarding & Identity
- Email/phone signup with optional NIN verification
- Comprehensive user profiles (bio, location, interests, profession, tribe/language)
- Multi-step registration process

### 🤝 Social Networking
- Follow/unfollow system
- Interest-based groups (Tech, Fashion, Diaspora, NYSC)
- Community feed with filters by state, city, diaspora hub
- Emoji reactions and threaded comments

### 💼 Professional Tools
- Business & talent directory (searchable by skill/location)
- Micro job board for gig requests
- Event listings (virtual & local)

### 📬 Communication
- Secure in-app messaging (1-on-1 and group)
- Notification system (mentions, invites, messages)

### 🇳🇬 Cultural Elements
- Language tags (support for Pidgin, Yoruba, Hausa, Igbo)
- Region-based feeds (Lagos, Abuja, Enugu, Toronto)
- Highlight local initiatives and trending cultural topics

### 🛍️ Marketplace
- For Sale section for community commerce
- Local deals and promotions
- Business listings and reviews

## 🎨 Design Philosophy

- **Tone & Feel**: Modern, Afrocentric, warm, community-first
- **Color Palette**: Nigerian flag colors + earth tones (green, gold, red)
- **Typography**: Clean, mobile-first fonts with support for diacritics
- **Design System**: Consistent components and design tokens

## 🛠️ Tech Stack

- **Frontend**: React Native with Expo
- **Navigation**: React Navigation (Stack + Bottom Tabs)
- **UI Components**: React Native Paper + Custom Components
- **Icons**: Expo Vector Icons (Ionicons)
- **Styling**: StyleSheet with custom theme system
- **State Management**: React Hooks (useState, useEffect)
- **Images**: Expo Image Picker (planned)
- **Location**: Expo Location (planned)
- **Notifications**: Expo Notifications (planned)

## 📱 Screens & Navigation

### Authentication Flow
- **OnboardingScreen**: Welcome slides with Nigerian-themed content
- **LoginScreen**: Email/phone authentication with social login options
- **RegisterScreen**: Multi-step registration with cultural information

### Main App (Tab Navigation)
- **HomeScreen**: Community feed, local deals, and posts
- **DiscoverScreen**: Business discovery, events, and categories
- **PostScreen**: Create various types of posts (community, business, event, job, sale)
- **ForSaleScreen**: Marketplace for buying and selling
- **ProfileScreen**: User profile, settings, and cultural identity

### Additional Screens
- **ChatScreen**: Individual messaging
- **MessagesScreen**: Conversations list
- **EventsScreen**: Event management (placeholder)
- **GroupsScreen**: Community groups (placeholder)
- **JobBoardScreen**: Job listings (placeholder)
- **BusinessDirectoryScreen**: Business listings (placeholder)
- **SettingsScreen**: App settings (placeholder)

## 🎨 Theme System

The app uses a comprehensive theme system with:

### Colors
- **Primary**: Nigerian Green (#2E7D32)
- **Secondary**: Nigerian Gold (#FFD700)
- **Accent**: Nigerian Red (#D32F2F)
- **Additional**: Earth tones and warm colors

### Spacing
- Consistent spacing scale (xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48)

### Typography
- Font weights: light, regular, medium, bold
- Responsive font sizes

### Shadows
- Three levels: small, medium, large
- Consistent elevation across platforms

## 📦 Installation & Setup

1. **Prerequisites**
   ```bash
   npm install -g expo-cli
   ```

2. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd naijaconnect
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Run on device/simulator**
   - iOS: Press `i` in the terminal or scan QR code with Expo Go
   - Android: Press `a` in the terminal or scan QR code with Expo Go

## 🔧 Development

### Project Structure
```
src/
├── screens/          # All app screens
├── theme/           # Theme configuration
├── components/      # Reusable components (to be added)
├── utils/           # Utility functions (to be added)
└── services/        # API services (to be added)
```

### Key Dependencies
- `expo`: Core Expo framework
- `@react-navigation/native`: Navigation system
- `@react-navigation/stack`: Stack navigation
- `@react-navigation/bottom-tabs`: Tab navigation
- `react-native-paper`: Material Design components
- `expo-linear-gradient`: Gradient backgrounds
- `@expo/vector-icons`: Icon library

## 🚀 Future Enhancements

### Phase 2 Features
- Audio spaces (NaijaTalks)
- Community verification system
- Creator monetization tools
- Payment integrations (Paystack, Flutterwave)
- Advanced search and filtering
- Push notifications
- Offline support
- Multi-language support

### Backend Integration
- User authentication and management
- Real-time messaging
- Content management system
- Analytics and insights
- Admin dashboard

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Nigerian community for inspiration and cultural insights
- React Native and Expo communities for excellent tooling
- Design inspiration from modern social networking platforms

## 📞 Support

For support, email support@naijaconnect.com or join our community discussions.

---

**🇳🇬 Built with pride for the Nigerian community worldwide 🇳🇬**
