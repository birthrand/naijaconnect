export default {
  expo: {
    name: "NaijaConnect",
    slug: "naijaconnect",
    version: "1.0.0",
    orientation: "portrait",
    userInterfaceStyle: "light",
    splash: {
      backgroundColor: "#2E7D32"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        backgroundColor: "#2E7D32"
      }
    },
    plugins: [
      "expo-image-picker",
      "expo-location",
      "expo-notifications"
    ],
    sdkVersion: "53.0.0"
  }
}; 