import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Linking,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const helpItems = [
  {
    id: 'faq',
    title: 'Frequently Asked Questions',
    subtitle: 'Find answers to common questions',
    icon: 'help-circle',
    action: 'navigate',
  },
  {
    id: 'contact',
    title: 'Contact Support',
    subtitle: 'Get in touch with our team',
    icon: 'mail',
    action: 'email',
    email: 'support@jappa.com',
  },
  {
    id: 'feedback',
    title: 'Send Feedback',
    subtitle: 'Help us improve Jappa',
    icon: 'chatbubble',
    action: 'email',
    email: 'feedback@jappa.com',
  },
  {
    id: 'tutorial',
    title: 'App Tutorial',
    subtitle: 'Learn how to use Jappa',
    icon: 'play-circle',
    action: 'navigate',
  },
];

export default function HelpSupportScreen({ navigation }) {
  const handleItemPress = (item) => {
    switch (item.action) {
      case 'email':
        if (item.email) {
          Linking.openURL(`mailto:${item.email}`);
        }
        break;
      case 'navigate':
        // For now, just show an alert
        alert(`${item.title} - Coming soon!`);
        break;
    }
  };

  const renderHelpItem = (item) => (
    <TouchableOpacity
      key={item.id}
      style={styles.helpItem}
      onPress={() => handleItemPress(item)}
      activeOpacity={0.8}
    >
      <View style={styles.helpItemIcon}>
        <Ionicons name={item.icon} size={24} color="#667eea" />
      </View>
      <View style={styles.helpItemContent}>
        <Text style={styles.helpItemTitle}>{item.title}</Text>
        <Text style={styles.helpItemSubtitle}>{item.subtitle}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#666666" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#121212', '#1E1E1E']}
        style={styles.background}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Help & Support</Text>
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>How can we help you?</Text>
            <Text style={styles.sectionSubtitle}>
              Choose an option below to get the support you need
            </Text>
          </View>

          <View style={styles.helpItemsContainer}>
            {helpItems.map(renderHelpItem)}
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.infoTitle}>Need immediate help?</Text>
            <Text style={styles.infoText}>
              Our support team is available 24/7 to assist you with any questions or issues you may have.
            </Text>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  background: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  headerButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#ffffff',
    opacity: 0.7,
    textAlign: 'center',
    lineHeight: 24,
  },
  helpItemsContainer: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  helpItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333333',
  },
  helpItemIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#2A2A2A',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  helpItemContent: {
    flex: 1,
  },
  helpItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  helpItemSubtitle: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.7,
  },
  infoSection: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    backgroundColor: '#1E1E1E',
    marginHorizontal: 24,
    borderRadius: 16,
    marginBottom: 32,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
  },
  infoText: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.7,
    textAlign: 'center',
    lineHeight: 20,
  },
}); 