import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PRONOUN_OPTIONS = [
  {
    id: "he-him",
    label: "He/Him",
    subLabel: "Masculine pronouns",
  },
  {
    id: "she-her",
    label: "She/Her",
    subLabel: "Feminine pronounce",
  },
  {
    id: "they-them",
    label: "They/Them",
    subLabel: "Non-binary pronouns",
  },
  {
    id: "other",
    label: "Other",
    subLabel: "Prefer not to say",
  },
];

export default function PronounsScreen() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string | null>("he-him");

  const handleSelect = (id: string) => {
    setSelectedId(id);
    Haptics.selectionAsync();
  };

  const handleContinue = () => {
    if (selectedId) {
      console.log("Pronouns selected:", selectedId);
      router.push("/(onboarding)/sexual-orientation" as any);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
        <View style={styles.titleSection}>
          <Text style={styles.title}>Express your identity</Text>
          <Text style={styles.subtitle}>Help others address you correctly</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.content}>
          <Text style={styles.label}>
            Choose your pronouns <Text style={styles.required}>*</Text>
          </Text>

          <View style={styles.optionsContainer}>
            {PRONOUN_OPTIONS.map((option) => {
              const isSelected = selectedId === option.id;
              return (
                <TouchableOpacity
                  key={option.id}
                  style={[
                    styles.optionCard,
                    isSelected && styles.optionCardSelected,
                  ]}
                  onPress={() => handleSelect(option.id)}
                  activeOpacity={0.8}
                >
                  <View style={styles.optionTextContainer}>
                    <Text
                      style={[
                        styles.optionLabel,
                        isSelected && styles.textWhite,
                      ]}
                    >
                      {option.label}
                    </Text>
                    <Text
                      style={[
                        styles.optionSubLabel,
                        isSelected && styles.textWhiteSub,
                      ]}
                    >
                      {option.subLabel}
                    </Text>
                  </View>
                  {isSelected && (
                    <View style={styles.checkSquare}>
                      <Ionicons name="checkmark" size={16} color="#DE153A" />
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>

      <View style={styles.divider} />

      <View style={styles.footer}>
        <Text style={styles.disclaimerText}>
          We're committed to creating an inclusive environment. You can update
          your pronouns anytime in your profile settings.
        </Text>
        <TouchableOpacity
          style={[styles.button, !selectedId && styles.buttonDisabled]}
          onPress={handleContinue}
          disabled={!selectedId}
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
  header: {
    paddingHorizontal: 25,
    paddingTop: 10,
    marginBottom: 20,
  },
  backButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#EFF0F2",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContent: {
    paddingBottom: 20,
  },
  titleSection: {
    alignItems: "center",
    marginBottom: 20,
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
  },
  divider: {
    height: 1,
    backgroundColor: "#F2F2F7",
    width: "100%",
  },
  content: {
    paddingHorizontal: 25,
    paddingTop: 40,
  },
  label: {
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: 16, // User didn't specify for this label, but keeping it SemiBold
    color: "#000",
    marginBottom: 20,
  },
  required: {
    color: "#FF3B30",
  },
  optionsContainer: {
    gap: 2,
  },
  optionCard: {
    width: "100%",
    height: 100,
    backgroundColor: "#F2F2F7",
    borderRadius: 8,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  optionCardSelected: {
    backgroundColor: "#DE153A",
  },
  optionTextContainer: {
    flex: 1,
  },
  optionLabel: {
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: 20,
    lineHeight: 26,
    letterSpacing: 0,
    color: "#000",
    marginBottom: 4,
  },
  optionSubLabel: {
    fontFamily: "PlusJakartaSans_500Medium", // Sublabels are usually medium
    fontSize: 14,
    color: "#8E8E93",
  },
  textWhite: {
    color: "white",
  },
  textWhiteSub: {
    color: "rgba(255, 255, 255, 0.7)",
  },
  checkSquare: {
    width: 24,
    height: 24,
    backgroundColor: "white",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    paddingHorizontal: 30,
    paddingTop: 15,
    paddingBottom: 10,
    gap: 20,
    backgroundColor: "white",
  },
  disclaimerText: {
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 12, // Standardizing to match subtitle style
    color: "#8E8E93",
    textAlign: "center",
    lineHeight: 18,
    paddingHorizontal: 10,
  },
  button: {
    width: "100%",
    height: 60,
    backgroundColor: "#EBEDF0",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: 18,
    color: "#000",
  },
});
