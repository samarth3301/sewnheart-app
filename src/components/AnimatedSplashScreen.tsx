import { useColorScheme } from "@/hooks/use-color-scheme";
import { Image } from "expo-image";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from "react-native-reanimated";

interface AnimatedSplashScreenProps {
  onAnimationFinish: () => void;
}

export function AnimatedSplashScreen({
  onAnimationFinish,
}: AnimatedSplashScreenProps) {
  const colorScheme = useColorScheme();
  const [isAppReady, setIsAppReady] = useState(false);
  const opacity = useSharedValue(0);

  const isDark = colorScheme === "dark";
  const backgroundColor = isDark ? "#000000" : "#FFFFFF";
  const logoSource = isDark
    ? require("../../assets/branding/logo_white.svg")
    : require("../../assets/branding/logo_black.svg");

  useEffect(() => {
    async function prepare() {
      // Small delay to ensure everything is settled
      await new Promise((resolve) => setTimeout(resolve, 500));
      setIsAppReady(true);
      await SplashScreen.hideAsync();

      // Start animation
      opacity.value = withSequence(
        // Fade in
        withTiming(1, { duration: 1000 }),
        // Hold for a bit
        withDelay(
          500,
          // Fade out
          withTiming(0, { duration: 800 }, (finished) => {
            if (finished) {
              runOnJS(onAnimationFinish)();
            }
          }),
        ),
      );
    }

    prepare();
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Animated.View style={[styles.logoContainer, animatedStyle]}>
        <Image source={logoSource} style={styles.logo} contentFit="contain" />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },
  logoContainer: {
    width: "60%",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: "100%",
    height: "100%",
  },
});
