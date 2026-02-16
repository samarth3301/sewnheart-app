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

export default function AboutYourselfScreen() {
	const router = useRouter();
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");

	const handleContinue = () => {
		console.log("Details submitted:", { firstName, lastName });
		router.push("/(onboarding)/birth-date" as any);
	};

	const isFormValid = firstName.trim().length > 0 && lastName.trim().length > 0;

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

					<View style={styles.titleSection}>
						<Text style={styles.title}>Tell us about yourself</Text>
						<Text style={styles.subtitle}>
							This is how others will know you
						</Text>
					</View>

					{/* Divider */}
					<View style={styles.divider} />

					<View style={styles.content}>
						<View style={styles.form}>
							{/* First Name */}
							<View style={styles.inputContainer}>
								<Text style={styles.label}>
									First Name <Text style={styles.required}>*</Text>
								</Text>
								<View style={styles.inputWrapper}>
									<TextInput
										style={[
											styles.input,
											firstName.length > 0 && styles.inputActive,
										]}
										value={firstName}
										onChangeText={setFirstName}
										placeholder=""
										autoCorrect={false}
									/>
									{firstName.length > 0 && (
										<View style={styles.checkIcon}>
											<Ionicons name="checkmark" size={16} color="black" />
										</View>
									)}
								</View>
							</View>

							{/* Last Name */}
							<View style={styles.inputContainer}>
								<Text style={styles.label}>
									Last Name <Text style={styles.required}>*</Text>
								</Text>
								<View style={styles.inputWrapper}>
									<TextInput
										style={[
											styles.input,
											lastName.length > 0 && styles.inputActive,
										]}
										value={lastName}
										onChangeText={setLastName}
										placeholder=""
										autoCorrect={false}
									/>
									{lastName.length > 0 && (
										<View style={styles.checkIcon}>
											<Ionicons name="checkmark" size={16} color="black" />
										</View>
									)}
								</View>
							</View>
						</View>
					</View>
				</ScrollView>

				{/* Footer Divider */}
				<View style={styles.divider} />

				<View style={styles.footer}>
					<Text style={styles.privacyText}>
						We respect your privacy. Your information is secure and will never
						be shared without your consent.
					</Text>
					<TouchableOpacity
						style={[styles.button, !isFormValid && styles.buttonDisabled]}
						onPress={handleContinue}
						disabled={!isFormValid}
						activeOpacity={0.8}
					>
						<Text style={styles.buttonText}>Continue</Text>
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
		paddingBottom: 40,
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
	form: {
		gap: 24,
	},
	inputContainer: {
		width: "100%",
	},
	label: {
		fontFamily: "PlusJakartaSans_600SemiBold",
		fontSize: 16,
		color: "#000",
		marginBottom: 10,
	},
	required: {
		color: "#FF3B30",
	},
	inputWrapper: {
		position: "relative",
		justifyContent: "center",
	},
	input: {
		width: "100%",
		height: 60,
		backgroundColor: "white",
		borderRadius: 12,
		paddingHorizontal: 15,
		paddingRight: 45,
		fontSize: 16,
		color: "#000",
		borderWidth: 1,
		borderColor: "#F2F2F7",
	},
	inputActive: {
		backgroundColor: "#F2F2F7",
		borderColor: "transparent",
	},
	checkIcon: {
		position: "absolute",
		right: 15,
	},
	footer: {
		paddingHorizontal: 25,
		paddingTop: 15,
		paddingBottom: 10, // Reduced from 25 to push button lower
		gap: 20,
	},
	privacyText: {
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
