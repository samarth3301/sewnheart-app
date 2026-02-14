import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EmailScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleGetCode = () => {
    // Logic to get code would go here
    console.log("Getting code for:", email);
    router.push("/verification");
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          bounces={false}
        >
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
              activeOpacity={0.7}
            >
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            <Text style={styles.title}>What is your Email ID</Text>
            <Text style={styles.subtitle}>Create account with email</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                Enter Your Email <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                placeholder=""
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                autoFocus={true}
              />
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.button, !email && styles.buttonDisabled]}
            onPress={handleGetCode}
            disabled={!email}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Get Code</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 25,
  },
  header: {
    marginTop: 10,
    marginBottom: 30,
  },
  backButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: "#F2F2F7",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
    color: "#000",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#8E8E93",
    marginBottom: 40,
  },
  inputContainer: {
    width: "100%",
    marginTop: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#3A3A3C",
    marginBottom: 10,
  },
  required: {
    color: "#FF3B30",
  },
  input: {
    width: "100%",
    height: 60,
    backgroundColor: "#E9E9F0",
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#000",
  },
  footer: {
    paddingHorizontal: 25,
    paddingBottom: 30,
  },
  button: {
    width: "100%",
    height: 60,
    backgroundColor: "#E9E9F0",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#3A3A3C",
  },
});
