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

const DURATION_OPTIONS = [
	{ id: "1-3-months", label: "1-3 Months" },
	{ id: "3-6-months", label: "3-6 Months" },
	{ id: "1-2-years", label: "1-2 Years" },
	{ id: "2-5-years", label: "2-5 Years" },
	{ id: "5-10-years", label: "5-10 Years" },
	{ id: "10-plus-years", label: "10+ Years" },
	{ id: "married", label: "We were married", fullWidth: true },
	{ id: "engaged", label: "We were engaged", fullWidth: true },
];

export default function RelationshipDurationScreen() {
	const router = useRouter();
	const [selectedId, setSelectedId] = useState<string | null>(null);

	const handleSelect = (id: string) => {
		setSelectedId(id);
		Haptics.selectionAsync();
	};

	const handleContinue = () => {
		if (selectedId) {
			console.log("Relationship duration selected:", selectedId);
			router.push("/(onboarding)/breakup-reason" as any);
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
					<Text style={styles.title}>How Long ?</Text>
					<Text style={styles.subtitle}>
						Help us understand your healing journey
					</Text>
				</View>

				{/* Divider */}
				<View style={styles.divider} />

				<View style={styles.content}>
					<Text style={styles.label}>
						How long was your relationship?{" "}
						<Text style={styles.required}>*</Text>
					</Text>

					<View style={styles.gridContainer}>
						{DURATION_OPTIONS.map((option) => {
							const isSelected = selectedId === option.id;
							return (
								<TouchableOpacity
									key={option.id}
									style={[
										styles.optionCard,
										option.fullWidth ? styles.fullWidthCard : styles.gridCard,
										isSelected && styles.optionCardSelected,
									]}
									onPress={() => handleSelect(option.id)}
									activeOpacity={0.8}
								>
									<Text
										style={[styles.optionLabel, isSelected && styles.textWhite]}
									>
										{option.label}
									</Text>
								</TouchableOpacity>
							);
						})}
					</View>
				</View>
			</ScrollView>

			{/* Footer Divider */}
			<View style={styles.divider} />

			<View style={styles.footer}>
				<Text style={styles.disclaimerText}>
					Sharing details about your relationship helps us tailor your healing
					journey and connect you with relevant resources.
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
		paddingBottom: 40,
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
		backgroundColor: "#F2F4F6",
		width: "100%",
	},
	content: {
		flex: 1,
		paddingHorizontal: 25,
		marginTop: 35,
	},
	label: {
		fontFamily: "PlusJakartaSans_600SemiBold",
		fontSize: 16,
		color: "#000",
		marginBottom: 20,
	},
	required: {
		color: "#FF3B30",
	},
	gridContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
		gap: 2, // Tight gap to match screenshot
	},
	optionCard: {
		backgroundColor: "#F2F4F7",
		borderRadius: 8,
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 20,
	},
	gridCard: {
		width: "49.6%", // Adjusted for tight 2px gap
		height: 95,
	},
	fullWidthCard: {
		width: "100%",
		height: 95,
	},
	optionCardSelected: {
		backgroundColor: "#DE153A",
	},
	optionLabel: {
		fontFamily: "PlusJakartaSans_600SemiBold",
		fontSize: 20,
		lineHeight: 26,
		letterSpacing: 0,
		color: "#000",
		textAlign: "center",
	},
	textWhite: {
		color: "white",
	},
	footer: {
		paddingHorizontal: 25,
		paddingTop: 15,
		paddingBottom: 10,
		gap: 20,
		backgroundColor: "white",
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
	buttonDisabled: {
		opacity: 0.8,
	},
	buttonText: {
		fontFamily: "PlusJakartaSans_600SemiBold",
		fontSize: 18,
		color: "#000",
	},
});
