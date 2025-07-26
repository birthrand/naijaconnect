import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@env';

// Fallback values (for development only)
const FALLBACK_URL = 'https://ktnseaxpqxpydhlybepl.supabase.co';
const FALLBACK_KEY = 'REDACTED_SUPABASE_ANON_KEY'; // <-- REDACTED

// Supabase Configuration
export const supabaseConfig = {
  url: SUPABASE_URL || FALLBACK_URL,
  anonKey: SUPABASE_ANON_KEY || FALLBACK_KEY,
};

// Validate required environment variables
export const validateEnvironment = () => {
  const requiredVars = {
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
  };

  const missingVars = Object.entries(requiredVars)
    .filter(([key, value]) => !value)
    .map(([key]) => key);

  if (missingVars.length > 0) {
    console.warn(
      `⚠️ Missing environment variables: ${missingVars.join(', ')}. ` +
      'Using fallback values for development.'
    );
    // Don't throw error, just warn and use fallbacks
  }
};

// App Configuration
export const appConfig = {
  name: 'NaijaConnect',
  version: '1.0.0',
  environment: __DEV__ ? 'development' : 'production',
};

export default {
  supabase: supabaseConfig,
  app: appConfig,
};
