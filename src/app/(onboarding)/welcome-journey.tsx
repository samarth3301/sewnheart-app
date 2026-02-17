import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WelcomeJourneyScreen() {
  const router = useRouter();

  const handleStart = () => {
    // Navigate to transition video
    router.replace("/(onboarding)/transition" as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View entering={FadeIn.duration(800)} style={styles.header}>
        <Text style={styles.headerLabel}>On_Sexual_Type</Text>
      </Animated.View>

      <View style={styles.content}>
        <Animated.View entering={FadeInUp.delay(200).duration(800)}>
          <Text style={styles.title}>Welcome to{"\n"}SEWNHEART</Text>
        </Animated.View>
      </View>

      <Animated.View
        entering={FadeInDown.delay(400).duration(800)}
        style={styles.footer}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={handleStart}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Start Your Journey</Text>

          <View style={styles.iconContainer}>
            {/* Dark Abstract Profile Circle */}
            <View
              style={[styles.profileCircle, styles.darkCircle, { zIndex: 2 }]}
            >
              <View style={styles.abstractShape} />
            </View>

            {/* Pink Initial Profile Circle */}
            <View
              style={[styles.profileCircle, styles.pinkCircle, { zIndex: 1 }]}
            >
              <Text style={styles.initialText}>S</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Bottom indicator space */}
        <View style={styles.bottomIndicator} />
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7", // Very light gray background as seen in screenshot
  },
  header: {
    alignItems: "center",
    paddingTop: 8,
  },
  headerLabel: {
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 11,
    color: "#8E8E93",
    opacity: 0.6,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: "PlusJakartaSans_700Bold",
    fontSize: 38,
    lineHeight: 46,
    textAlign: "center",
    color: "#000",
    letterSpacing: -0.5,
  },
  footer: {
    paddingHorizontal: 25,
    paddingBottom: 20,
  },
  button: {
    backgroundColor: "#E5E5EA", // Light gray capsule
    height: 66,
    borderRadius: 33,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    position: "relative",
  },
  buttonText: {
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: 17,
    color: "#000",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    right: 12,
  },
  profileCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white",
  },
  darkCircle: {
    backgroundColor: "#1C1C1E",
    overflow: "hidden",
  },
  pinkCircle: {
    backgroundColor: "#FF2D55", // iOS Pink
    marginLeft: -12, // Overlap
  },
  abstractShape: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#007AFF", // Blue accent inside dark circle
    opacity: 0.4,
    position: "absolute",
    bottom: -5,
    right: -5,
  },
  initialText: {
    color: "white",
    fontSize: 16,
    fontFamily: "PlusJakartaSans_700Bold",
  },
  bottomIndicator: {
    height: 5,
    width: 140,
    backgroundColor: "#000",
    borderRadius: 3,
    alignSelf: "center",
    marginTop: 25,
    opacity: 0.1, // Soft visual placeholder for home indicator
  },
});
