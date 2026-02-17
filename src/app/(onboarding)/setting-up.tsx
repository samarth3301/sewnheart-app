import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  FadeIn,
  FadeInDown,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const HEART_1 = require("../../../assets/icons/profile_onboarding/heart_animation_1.svg");
const HEART_2 = require("../../../assets/icons/profile_onboarding/heart_animation_2.svg");

export default function SettingUpScreen() {
  const router = useRouter();
  const [heartFrame, setHeartFrame] = useState(1);
  const [statusIndex, setStatusIndex] = useState(0);
  const scale = useSharedValue(1);

  const statusItems = [
    "Creating your profile...",
    "Customizing your healing journey...",
    "Connecting you to our community...",
  ];

  useEffect(() => {
    // Heart pounding logic with synchronized frames
    const heartbeat = () => {
      scale.value = withSequence(
        withTiming(1.15, { duration: 150 }, (finished) => {
          if (finished) runOnJS(setHeartFrame)(2); // Switch to animation_2 when starting to shrink
        }),
        withTiming(1, { duration: 150 }, (finished) => {
          if (finished) runOnJS(setHeartFrame)(1); // Switch back to animation_1 when finished shrinking
        }),
        withTiming(1.1, { duration: 150 }, (finished) => {
          if (finished) runOnJS(setHeartFrame)(2); // Second thump shrink
        }),
        withTiming(1, { duration: 600 }, (finished) => {
          if (finished) {
            runOnJS(setHeartFrame)(1); // Reset for rest period
            runOnJS(heartbeat)(); // Recursive loop
          }
        }),
      );
    };

    heartbeat();

    const statusInterval = setInterval(() => {
      setStatusIndex((i) => (i < statusItems.length - 1 ? i + 1 : i));
    }, 2000);

    const timeout = setTimeout(() => {
      router.replace("/(onboarding)/welcome-journey" as any);
    }, 7000);

    return () => {
      clearInterval(statusInterval);
      clearTimeout(timeout);
    };
  }, []);

  const heartAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <Animated.View entering={FadeIn.duration(1000)} style={styles.content}>
        <Animated.View style={[styles.animationContainer, heartAnimatedStyle]}>
          <Image
            source={heartFrame === 1 ? HEART_1 : HEART_2}
            style={styles.heart}
            contentFit="contain"
            transition={200} // Fast transition during pounding
          />
        </Animated.View>

        <Text style={styles.title}>Setting up your healing space...</Text>

        <View style={styles.statusContainer}>
          {statusItems.map((item, index) => {
            const isVisible = index <= statusIndex;
            if (!isVisible) return null; // Don't even render if not visible yet to avoid conflicts

            return (
              <Animated.View
                key={item}
                entering={FadeInDown.delay(100).duration(800)}
              >
                <Text style={styles.statusText}>{item}</Text>
              </Animated.View>
            );
          })}
        </View>
      </Animated.View>
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
    paddingHorizontal: 40,
  },
  animationContainer: {
    width: 180,
    height: 180,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  heart: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontFamily: "PlusJakartaSans_700Bold",
    fontSize: 32,
    lineHeight: 40,
    textAlign: "center",
    color: "#000",
    marginBottom: 60, // Increased space to match screenshot
  },
  statusContainer: {
    alignItems: "center",
    gap: 12,
  },
  statusText: {
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 16,
    color: "#8E8E93", // Soft gray like in screenshot
    textAlign: "center",
  },
  statusTextInactive: {
    opacity: 0,
  },
});
