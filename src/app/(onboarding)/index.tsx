import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ContinueToProfileScreen() {
  const router = useRouter();

  const handleContinue = () => {
    // Navigate to the next onboarding step
    console.log("Continuing to profile setup...");
    router.push("/(onboarding)/about-yourself" as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Continue to Profile</Text>
        <Text style={styles.subtitle}>Continue to Setup your Profile</Text>

        <View style={styles.avatarContainer}>
          <View style={styles.avatarPlaceholder}>
            <Ionicons name="person-outline" size={120} color="#D1D1D6" />
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleContinue}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 25,
    paddingTop: 60,
  },
  title: {
    fontFamily: "PlusJakartaSans_700Bold",
    fontSize: 32,
    lineHeight: 38,
    letterSpacing: -0.32,
    textAlign: "center",
    color: "#000",
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 12,
    lineHeight: 12,
    letterSpacing: -0.12,
    color: "#8E8E93",
    textAlign: "center",
    marginBottom: 60,
  },
  avatarContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  avatarPlaceholder: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0,
  },
  footer: {
    position: "absolute",
    bottom: 30, // Pushed down from 40
    left: 0,
    right: 0,
    paddingHorizontal: 25,
  },
  button: {
    width: "100%",
    height: 60, // Reduced from 68
    backgroundColor: "#EBEDF0",
    borderRadius: 30, // Adjusted for height
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: 18,
    color: "#000",
  },
});
