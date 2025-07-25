import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Import screens
import OnboardingScreen from './src/screens/OnboardingScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import TrendingScreen from './src/screens/TrendingScreen';
import CommunityScreen from './src/screens/CommunityScreen';
import DiscoverScreen from './src/screens/DiscoverScreen';
import PostScreen from './src/screens/PostScreen';
import HelpSupportScreen from './src/screens/HelpSupportScreen';
import UserProfileScreen from './src/screens/UserProfileScreen';
import EditProfileScreen from './src/screens/EditProfileScreen';
import SideHustleScreen from './src/screens/SideHustleScreen';
import MediaViewerScreen from './src/screens/MediaViewerScreen';

// Import theme and context
import { theme } from './src/theme/theme';
import { SupabaseProvider, useSupabase } from './src/contexts/SupabaseContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Trending') {
            iconName = focused ? 'trending-up' : 'trending-up-outline';
          } else if (route.name === 'Community') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'SideHustle') {
            iconName = focused ? 'briefcase' : 'briefcase-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#667eea',
        tabBarInactiveTintColor: '#666666',
        tabBarStyle: {
          backgroundColor: '#1E1E1E',
          borderTopWidth: 0,
          paddingBottom: 8,
          paddingTop: 8,
          height: 80,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          shadowColor: '#000000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen
        name="Trending"
        component={TrendingScreen}
        options={{ tabBarLabel: 'Trending' }}
      />
      <Tab.Screen
        name="Community"
        component={CommunityScreen}
        options={{ tabBarLabel: 'Community' }}
      />
      <Tab.Screen
        name="SideHustle"
        component={SideHustleScreen}
        options={{ tabBarLabel: 'SideHustle' }}
      />
    </Tab.Navigator>
  );
}

function AppContent() {
  const { user, loading } = useSupabase();
  
  if (loading) {
    return null; // Loading screen
  }

  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor="transparent" translucent={true} barStyle="light-content" />
      <Stack.Navigator 
        initialRouteName={user ? "MainApp" : "Onboarding"} 
        screenOptions={{ headerShown: false }}
      >
        {user ? (
          <>
            <Stack.Screen name="MainApp" component={TabNavigator} />
            <Stack.Screen name="Post" component={PostScreen} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
            <Stack.Screen name="HelpSupport" component={HelpSupportScreen} />
            <Stack.Screen name="UserProfile" component={UserProfileScreen} />
            <Stack.Screen name="MediaViewer" component={MediaViewerScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <SupabaseProvider>
            <AppContent />
          </SupabaseProvider>
        </PaperProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
} 