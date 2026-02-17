import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BeatScreen() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text>Beat Screen</Text>
    </SafeAreaView>
  );
}
