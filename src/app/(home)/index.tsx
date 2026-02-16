import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome Home</Text>
        <Text style={styles.subtitle}>Your healing journey begins here.</Text>
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
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 25,
  },
  title: {
    fontFamily: "PlusJakartaSans_700Bold",
    fontSize: 32,
    color: "#000",
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 16,
    color: "#8E8E93",
    textAlign: "center",
  },
});
