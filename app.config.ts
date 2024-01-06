import { ExpoConfig, ConfigContext } from "@expo/config";
import * as dotenv from "dotenv";

// initialize dotenv
dotenv.config();

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "AppDelivery",
  slug: "AppDelivery",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  plugins: [
    [
      "expo-notifications",
      {
        icon: "./local/assets/notification-icon.png",
        color: "#ffffff",
        sounds: [
          "./local/assets/notification-sound.wav",
          "./local/assets/notification-sound-other.wav"
        ]
      }
    ],
    [
      "expo-image-picker",
      {
        photosPermission: "custom photos permission",
        cameraPermission: "Allow $(PRODUCT_NAME) to open the camera",
        "//": "Disables the microphone permission",
        microphonePermission: false
      }
    ]
  ],
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff"
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.gopetutorial.appdelivery",
    config: {
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY
    },
    infoPlist: {
      UIBackgroundModes: ["location", "fetch"]
    }
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff"
    },
    package: "com.gopetutorial.appdelivery",
    config: {
      googleMaps: {
        apiKey: process.env.GOOGLE_MAPS_API_KEY
      }
    },
    permissions: [
      "android.permission.ACCESS_BACKGROUND_LOCATION",
      "android.permission.ACCESS_COARSE_LOCATION",
      "android.permission.ACCESS_FINE_LOCATION",
      "android.permission.FOREGROUND_SERVICE"
    ]
  },
  web: {
    favicon: "./assets/favicon.png"
  },
  extra: {
    eas: {
      projectId: process.env.PROJECT_ID
    }
  }
});
