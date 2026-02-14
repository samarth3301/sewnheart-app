import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  MONTHS,
  WheelPicker,
  YEARS,
  getDaysInMonth,
} from "../../components/WheelPicker";

export default function BirthDateScreen() {
  const router = useRouter();
  const [day, setDay] = useState("11");
  const [month, setMonth] = useState("Mar");
  const [year, setYear] = useState("1952");

  // Dynamically calculate days for the currently selected month/year
  const daysList = getDaysInMonth(month, year);

  // Safety check: if user changes to a month with fewer days than currently selected
  useEffect(() => {
    const dayInt = parseInt(day);
    if (dayInt > daysList.length) {
      setDay(daysList[daysList.length - 1]);
    }
  }, [month, year]);

  const handleContinue = () => {
    console.log("Birth date selected:", { day, month, year });
    router.push("/(onboarding)/pronouns" as any);
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

      <View style={styles.titleSection}>
        <Text style={styles.title}>Your birth date</Text>
        <Text style={styles.subtitle}>We need this to verify your age</Text>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      <View style={styles.content}>
        <Text style={styles.label}>
          Select your birth date <Text style={styles.required}>*</Text>
        </Text>

        <View style={styles.pickerContainer}>
          <View style={styles.selectionHighlight} />
          <View style={styles.pickerColumns}>
            <WheelPicker
              data={MONTHS}
              selectedValue={month}
              onValueChange={setMonth}
            />
            <WheelPicker
              data={daysList}
              selectedValue={day}
              onValueChange={setDay}
            />
            <WheelPicker
              data={YEARS}
              selectedValue={year}
              onValueChange={setYear}
            />
          </View>
        </View>
      </View>

      {/* Footer Divider */}
      <View style={styles.divider} />

      <View style={styles.footer}>
        <Text style={styles.disclaimerText}>
          We use your birth date to ensure age-appropriate content and create
          meaningful connections with people in similar life stages.
        </Text>
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
  titleSection: {
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 25,
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
    flex: 1,
    paddingHorizontal: 25,
    marginTop: 40,
  },
  label: {
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: 16,
    color: "#000",
    marginBottom: 30,
  },
  required: {
    color: "#FF3B30",
  },
  pickerContainer: {
    height: 250,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  selectionHighlight: {
    position: "absolute",
    top: 100,
    height: 50,
    width: "100%",
    backgroundColor: "#F2F2F7",
    borderRadius: 25,
    zIndex: -1,
  },
  pickerColumns: {
    flexDirection: "row",
    height: 250,
    width: "100%",
    justifyContent: "space-between",
  },
  footer: {
    paddingHorizontal: 25,
    paddingTop: 15,
    paddingBottom: 10,
    gap: 20,
  },
  disclaimerText: {
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 12,
    color: "#8E8E93",
    textAlign: "center",
    lineHeight: 18,
  },
  button: {
    width: "100%",
    height: 60,
    backgroundColor: "#EBEDF0",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: 18,
    color: "#000",
  },
});
