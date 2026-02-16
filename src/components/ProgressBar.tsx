import React, { useEffect } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import Animated, {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";

interface ProgressBarProps {
	progress: number; // 0 to 1
	style?: ViewStyle;
}

export const ProgressBar = ({ progress, style }: ProgressBarProps) => {
	const animatedProgress = useSharedValue(progress);

	useEffect(() => {
		animatedProgress.value = withTiming(progress, {
			duration: 600,
			easing: Easing.bezier(0.33, 1, 0.68, 1), // OutQuart for a smooth "slow-down" effect
		});
	}, [progress]);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			width: `${animatedProgress.value * 100}%`,
		};
	});

	return (
		<View style={[styles.container, style]}>
			<Animated.View style={[styles.bar, animatedStyle]} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		height: 4,
		backgroundColor: "#F2F2F7",
		width: "100%",
	},
	bar: {
		height: "100%",
		backgroundColor: "#D1123D", // Brand Red
	},
});
