import { Stack, usePathname } from "expo-router";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProgressBar } from "../../components/ProgressBar";

const PROGRESS_MAP: Record<string, number> = {
  "(onboarding)": 0.1,
  "about-yourself": 0.2,
  "birth-date": 0.3,
  pronouns: 0.4,
  "sexual-orientation": 0.5,
  "last-relationship": 0.6,
  "relationship-duration": 0.7,
  "breakup-reason": 0.85,
  "terms-and-conditions": 1.0,
};

export default function OnboardingLayout() {
  const pathname = usePathname();

  // Extract the last part of the pathname to determine progress
  const segments = pathname.split("/").filter(Boolean);
  const currentSegment = segments[segments.length - 1] || "(onboarding)";
  const progress = PROGRESS_MAP[currentSegment] || 0.1;

  return (
    <View style={styles.container}>
      {/* 
        We put the ProgressBar inside a SafeAreaView container 
        to ensure it's always at the top but below the notch 
      */}
      <SafeAreaView edges={["top"]} style={styles.safeArea}>
        <ProgressBar progress={progress} />
      </SafeAreaView>

      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="about-yourself" />
        <Stack.Screen name="birth-date" />
        <Stack.Screen name="pronouns" />
        <Stack.Screen name="sexual-orientation" />
        <Stack.Screen name="last-relationship" />
        <Stack.Screen name="relationship-duration" />
        <Stack.Screen name="breakup-reason" />
        <Stack.Screen name="terms-and-conditions" />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  safeArea: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
});
