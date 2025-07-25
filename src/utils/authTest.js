import { supabase } from '../lib/supabase';

// Test utility for authentication flow
export const authTest = {
  // Test user signup
  async testSignup(email, password, userData = {}) {
    try {
      console.log('Testing signup for:', email);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
          emailRedirectTo: undefined,
        },
      });

      if (error) {
        console.error('Signup error:', error);
        return { success: false, error };
      }

      console.log('Signup successful:', data);
      return { success: true, data };
    } catch (error) {
      console.error('Signup test failed:', error);
      return { success: false, error };
    }
  },

  // Test user signin
  async testSignin(email, password) {
    try {
      console.log('Testing signin for:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Signin error:', error);
        return { success: false, error };
      }

      console.log('Signin successful:', data);
      return { success: true, data };
    } catch (error) {
      console.error('Signin test failed:', error);
      return { success: false, error };
    }
  },

  // Test user signout
  async testSignout() {
    try {
      console.log('Testing signout');
      
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error('Signout error:', error);
        return { success: false, error };
      }

      console.log('Signout successful');
      return { success: true };
    } catch (error) {
      console.error('Signout test failed:', error);
      return { success: false, error };
    }
  },

  // Test current session
  async testSession() {
    try {
      console.log('Testing current session');
      
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        console.error('Session error:', error);
        return { success: false, error };
      }

      console.log('Session check successful:', session ? 'User logged in' : 'No session');
      return { success: true, session };
    } catch (error) {
      console.error('Session test failed:', error);
      return { success: false, error };
    }
  },

  // Test user profile creation
  async testProfileCreation(userId, userData) {
    try {
      console.log('Testing profile creation for user:', userId);
      
      const { data, error } = await supabase
        .from('users')
        .insert([
          {
            id: userId,
            email: userData.email,
            full_name: userData.full_name || '',
            username: userData.username || '',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (error) {
        console.error('Profile creation error:', error);
        return { success: false, error };
      }

      console.log('Profile creation successful:', data);
      return { success: true, data };
    } catch (error) {
      console.error('Profile creation test failed:', error);
      return { success: false, error };
    }
  },

  // Run full authentication test
  async runFullTest() {
    console.log('=== Starting Authentication Test ===');
    
    const testEmail = `test-${Date.now()}@example.com`;
    const testPassword = 'testpassword123';
    const testUserData = {
      full_name: 'Test User',
      username: 'testuser',
    };

    // Test 1: Signup
    console.log('\n1. Testing Signup...');
    const signupResult = await this.testSignup(testEmail, testPassword, testUserData);
    
    if (!signupResult.success) {
      console.error('Signup test failed');
      return false;
    }

    // Test 2: Profile Creation
    console.log('\n2. Testing Profile Creation...');
    const profileResult = await this.testProfileCreation(signupResult.data.user.id, {
      email: testEmail,
      ...testUserData,
    });

    if (!profileResult.success) {
      console.error('Profile creation test failed');
      return false;
    }

    // Test 3: Signout
    console.log('\n3. Testing Signout...');
    const signoutResult = await this.testSignout();
    
    if (!signoutResult.success) {
      console.error('Signout test failed');
      return false;
    }

    // Test 4: Signin
    console.log('\n4. Testing Signin...');
    const signinResult = await this.testSignin(testEmail, testPassword);
    
    if (!signinResult.success) {
      console.error('Signin test failed');
      return false;
    }

    // Test 5: Session Check
    console.log('\n5. Testing Session...');
    const sessionResult = await this.testSession();
    
    if (!sessionResult.success) {
      console.error('Session test failed');
      return false;
    }

    // Test 6: Final Signout
    console.log('\n6. Testing Final Signout...');
    const finalSignoutResult = await this.testSignout();
    
    if (!finalSignoutResult.success) {
      console.error('Final signout test failed');
      return false;
    }

    console.log('\n=== Authentication Test Completed Successfully ===');
    return true;
  },
};

export default authTest; 