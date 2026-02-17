import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MatchScreen() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text>Match Screen</Text>
    </SafeAreaView>
  );
}
