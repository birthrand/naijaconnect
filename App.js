import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import OnboardingScreen from './src/screens/OnboardingScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import CommunityScreen from './src/screens/CommunityScreen';
import DiscoverScreen from './src/screens/DiscoverScreen';
import PostScreen from './src/screens/PostScreen';
import ForSaleScreen from './src/screens/ForSaleScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ChatScreen from './src/screens/ChatScreen';
import MessagesScreen from './src/screens/MessagesScreen';
import EventsScreen from './src/screens/EventsScreen';
import GroupsScreen from './src/screens/GroupsScreen';
import JobBoardScreen from './src/screens/JobBoardScreen';
import BusinessDirectoryScreen from './src/screens/BusinessDirectoryScreen';
import SettingsScreen from './src/screens/SettingsScreen';

// Import theme
import { theme } from './src/theme/theme';
import { DESIGN_SYSTEM } from './src/theme/designSystem';

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
          } else if (route.name === 'Community') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'Discover') {
            iconName = focused ? 'compass' : 'compass-outline';
          } else if (route.name === 'Network') {
            iconName = focused ? 'bag' : 'bag-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: DESIGN_SYSTEM.navigation.tabBar.activeColor,
        tabBarInactiveTintColor: DESIGN_SYSTEM.navigation.tabBar.inactiveColor,
        tabBarStyle: {
          backgroundColor: DESIGN_SYSTEM.navigation.tabBar.backgroundColor,
          borderTopWidth: DESIGN_SYSTEM.navigation.tabBar.borderTopWidth,
          borderTopColor: DESIGN_SYSTEM.navigation.tabBar.borderTopColor,
          paddingBottom: DESIGN_SYSTEM.navigation.tabBar.paddingBottom,
          paddingTop: DESIGN_SYSTEM.navigation.tabBar.paddingTop,
          height: DESIGN_SYSTEM.navigation.tabBar.height,
        },
        tabBarLabelStyle: {
          fontSize: DESIGN_SYSTEM.navigation.tabBar.labelFontSize,
          fontWeight: DESIGN_SYSTEM.navigation.tabBar.labelFontWeight,
          marginTop: 2,
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
        name="Community" 
        component={CommunityScreen}
        options={{ tabBarLabel: 'Community' }}
      />
      <Tab.Screen 
        name="Discover" 
        component={DiscoverScreen}
        options={{ tabBarLabel: 'Discover' }}
      />
      <Tab.Screen
        name="Network"
        component={ForSaleScreen}
        options={{ tabBarLabel: 'Network' }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ tabBarLabel: 'Profile' }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <StatusBar 
            style="dark" 
            backgroundColor="transparent" 
            translucent={true}
            barStyle="dark-content"
          />
          <Stack.Navigator
            initialRouteName="Onboarding"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="MainApp" component={TabNavigator} />
            <Stack.Screen name="Post" component={PostScreen} />
            <Stack.Screen name="Chat" component={ChatScreen} />
            <Stack.Screen name="Messages" component={MessagesScreen} />
            <Stack.Screen name="Events" component={EventsScreen} />
            <Stack.Screen name="Groups" component={GroupsScreen} />
            <Stack.Screen name="JobBoard" component={JobBoardScreen} />
            <Stack.Screen name="BusinessDirectory" component={BusinessDirectoryScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
} 