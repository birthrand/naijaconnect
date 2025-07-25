import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme/theme';

const nigerianTribes = [
  'Yoruba', 'Igbo', 'Hausa', 'Fulani', 'Ijaw', 'Kanuri', 'Ibibio', 'Tiv',
  'Edo', 'Nupe', 'Urhobo', 'Itsekiri', 'Efik', 'Annang', 'Other'
];

const nigerianLanguages = [
  'English', 'Yoruba', 'Igbo', 'Hausa', 'Pidgin English', 'French', 'Other'
];

const nigerianStates = [
  'Lagos', 'Kano', 'Kaduna', 'Katsina', 'Oyo', 'Rivers', 'Bauchi', 'Jigawa',
  'Imo', 'Niger', 'Borno', 'Plateau', 'Adamawa', 'Sokoto', 'Kebbi', 'Kogi',
  'Zamfara', 'Yobe', 'Kebbi', 'Nasarawa', 'Taraba', 'Kogi', 'Kwara', 'Ondo',
  'Edo', 'Cross River', 'Akwa Ibom', 'Kano', 'Kaduna', 'Katsina', 'Oyo',
  'Rivers', 'Bauchi', 'Jigawa', 'Imo', 'Niger', 'Borno', 'Plateau', 'Adamawa',
  'Sokoto', 'Kebbi', 'Kogi', 'Zamfara', 'Yobe', 'Kebbi', 'Nasarawa', 'Taraba',
  'Kogi', 'Kwara', 'Ondo', 'Edo', 'Cross River', 'Akwa Ibom', 'Abuja FCT'
];

export default function RegisterScreen({ navigation }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    tribe: '',
    language: '',
    state: '',
    profession: '',
    interests: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    if (currentStep === 1 && (!formData.firstName || !formData.lastName || !formData.email)) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    if (currentStep === 2 && (!formData.password || !formData.confirmPassword)) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    if (currentStep === 2 && formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      handleRegister();
    }
  };

  const handleRegister = async () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate('MainApp');
    }, 2000);
  };

  const renderStep1 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Basic Information</Text>
      <Text style={styles.stepSubtitle}>Tell us about yourself</Text>
      
      <View style={styles.inputContainer}>
        <Ionicons name="person" size={20} color={theme.colors.gray} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="First Name"
          placeholderTextColor={theme.colors.gray}
          value={formData.firstName}
          onChangeText={(value) => updateFormData('firstName', value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="person" size={20} color={theme.colors.gray} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          placeholderTextColor={theme.colors.gray}
          value={formData.lastName}
          onChangeText={(value) => updateFormData('lastName', value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="mail" size={20} color={theme.colors.gray} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          placeholderTextColor={theme.colors.gray}
          value={formData.email}
          onChangeText={(value) => updateFormData('email', value)}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="call" size={20} color={theme.colors.gray} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          placeholderTextColor={theme.colors.gray}
          value={formData.phone}
          onChangeText={(value) => updateFormData('phone', value)}
          keyboardType="phone-pad"
        />
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Security</Text>
      <Text style={styles.stepSubtitle}>Create your password</Text>
      
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed" size={20} color={theme.colors.gray} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={theme.colors.gray}
          value={formData.password}
          onChangeText={(value) => updateFormData('password', value)}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.eyeIcon}
        >
          <Ionicons
            name={showPassword ? 'eye-off' : 'eye'}
            size={20}
            color={theme.colors.gray}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed" size={20} color={theme.colors.gray} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor={theme.colors.gray}
          value={formData.confirmPassword}
          onChangeText={(value) => updateFormData('confirmPassword', value)}
          secureTextEntry={!showConfirmPassword}
        />
        <TouchableOpacity
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          style={styles.eyeIcon}
        >
          <Ionicons
            name={showConfirmPassword ? 'eye-off' : 'eye'}
            size={20}
            color={theme.colors.gray}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Cultural & Professional Info</Text>
      <Text style={styles.stepSubtitle}>Help us personalize your experience</Text>
      
      <View style={styles.inputContainer}>
        <Ionicons name="people" size={20} color={theme.colors.gray} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Tribe (Optional)"
          placeholderTextColor={theme.colors.gray}
          value={formData.tribe}
          onChangeText={(value) => updateFormData('tribe', value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="language" size={20} color={theme.colors.gray} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Preferred Language"
          placeholderTextColor={theme.colors.gray}
          value={formData.language}
          onChangeText={(value) => updateFormData('language', value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="location" size={20} color={theme.colors.gray} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="State/Region"
          placeholderTextColor={theme.colors.gray}
          value={formData.state}
          onChangeText={(value) => updateFormData('state', value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="briefcase" size={20} color={theme.colors.gray} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Profession"
          placeholderTextColor={theme.colors.gray}
          value={formData.profession}
          onChangeText={(value) => updateFormData('profession', value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="heart" size={20} color={theme.colors.gray} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Interests (e.g., Tech, Fashion, Business)"
          placeholderTextColor={theme.colors.gray}
          value={formData.interests}
          onChangeText={(value) => updateFormData('interests', value)}
        />
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <LinearGradient
        colors={[theme.colors.primary, theme.colors.deepGreen]}
        style={styles.gradient}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={24} color={theme.colors.white} />
            </TouchableOpacity>
            <Text style={styles.logo}>🇳🇬 NaijaConnect</Text>
            <View style={styles.placeholder} />
          </View>

          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${(currentStep / 3) * 100}%` }]} />
            </View>
            <Text style={styles.progressText}>Step {currentStep} of 3</Text>
          </View>

          {/* Form Container */}
          <View style={styles.formContainer}>
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}

            <TouchableOpacity
              style={[styles.nextButton, isLoading && styles.nextButtonDisabled]}
              onPress={handleNextStep}
              disabled={isLoading}
            >
              <Text style={styles.nextButtonText}>
                {isLoading ? 'Creating Account...' : currentStep === 3 ? 'Create Account' : 'Next'}
              </Text>
              {!isLoading && (
                <Ionicons
                  name={currentStep === 3 ? 'checkmark' : 'arrow-forward'}
                  size={20}
                  color={theme.colors.white}
                />
              )}
            </TouchableOpacity>
          </View>

          {/* Login Link */}
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: theme.spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.lg,
  },
  backButton: {
    padding: theme.spacing.sm,
  },
  logo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.white,
  },
  placeholder: {
    width: 40,
  },
  progressContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: theme.colors.white,
    opacity: 0.3,
    borderRadius: 2,
    marginBottom: theme.spacing.sm,
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.secondary,
    borderRadius: 2,
  },
  progressText: {
    color: theme.colors.white,
    fontSize: 14,
    fontWeight: '500',
  },
  formContainer: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.xl,
    marginBottom: theme.spacing.lg,
    ...theme.shadows.large,
  },
  stepContainer: {
    marginBottom: theme.spacing.lg,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.black,
    marginBottom: theme.spacing.sm,
  },
  stepSubtitle: {
    fontSize: 16,
    color: theme.colors.gray,
    marginBottom: theme.spacing.lg,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.lightGray,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  inputIcon: {
    marginRight: theme.spacing.sm,
  },
  input: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    fontSize: 16,
    color: theme.colors.black,
  },
  eyeIcon: {
    padding: theme.spacing.sm,
  },
  nextButton: {
    backgroundColor: theme.colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.medium,
  },
  nextButtonDisabled: {
    opacity: 0.7,
  },
  nextButtonText: {
    color: theme.colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: theme.spacing.sm,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: theme.spacing.xl,
  },
  loginText: {
    color: theme.colors.white,
    fontSize: 16,
  },
  loginLink: {
    color: theme.colors.secondary,
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 