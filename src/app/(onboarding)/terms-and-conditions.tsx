import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
	NativeScrollEvent,
	NativeSyntheticEvent,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TermsAndConditionsScreen() {
	const router = useRouter();
	const [scrollProgress, setScrollProgress] = useState(0);
	const [hasReadEnd, setHasReadEnd] = useState(false);

	const handleAgree = () => {
		if (!hasReadEnd) return;
		console.log("Terms accepted");
		// This is the last screen, transition to the main app or a success screen
		router.replace("/(onboarding)/index" as any); // Or wherever the app starts
	};

	const handleDisagree = () => {
		console.log("Terms declined");
		router.back();
	};

	const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
		const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
		const totalHeight = contentSize.height - layoutMeasurement.height;
		if (totalHeight <= 0) {
			setScrollProgress(1);
			return;
		}
		const currentProgress = contentOffset.y / totalHeight;
		const progress = Math.min(Math.max(currentProgress, 0), 1);
		setScrollProgress(progress);

		if (progress >= 0.99) {
			if (!hasReadEnd) {
				console.log("End of terms reached");
			}
			setHasReadEnd(true);
		}
	};

	return (
		<SafeAreaView style={styles.container} edges={["top", "bottom"]}>
			{/* Static Header Section */}
			<View style={styles.staticHeader}>
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
					<Text style={styles.title}>Terms and Conditions</Text>
					<Text style={styles.subtitle}>Create account with email</Text>
				</View>

				{/* Reading Progress Bar */}
				<View style={styles.progressBarContainer}>
					<View
						style={[styles.progressBar, { width: `${scrollProgress * 100}%` }]}
					/>
				</View>
			</View>

			<ScrollView
				contentContainerStyle={styles.scrollContent}
				bounces={false}
				onScroll={handleScroll}
				scrollEventThrottle={16}
			>
				<View style={styles.content}>
					<View style={styles.card}>
						<Text style={styles.cardText}>
							<Text style={styles.boldText}>Welcome to Sewnheart</Text> a
							platform created to help individuals navigate post-breakup
							recovery and emotional growth by connecting with others on similar
							journeys. These Terms and Conditions ("Terms") govern your access
							to and use of the Sewn Heart mobile application and related
							services (collectively, the “Service”), operated by Sewnheart,
							Inc. (“we,” “us,” or “our”).
						</Text>
					</View>

					<View style={styles.card}>
						<Text style={styles.cardText}>
							<Text style={styles.boldText}>
								Please read these Terms carefully
							</Text>{" "}
							before using Sewnheart. By accessing or using the Service, you
							agree to be bound by these Terms. If you do not accept these Terms
							in full, do not use the Service.
						</Text>
					</View>

					{/* Card 1 */}
					<View style={styles.card}>
						<View style={styles.numberCircle}>
							<Text style={styles.numberText}>1</Text>
						</View>
						<Text style={styles.cardTitle}>Eligibility</Text>
						<Text style={styles.cardTextSmall}>
							You must be at least{" "}
							<Text style={styles.boldText}>18 years old</Text> to use Sewn
							Heart. By creating an account, you represent and warrant that you
							meet this requirement.
						</Text>
					</View>

					{/* Card 2 */}
					<View style={styles.card}>
						<View style={styles.numberCircle}>
							<Text style={styles.numberText}>2</Text>
						</View>
						<Text style={styles.cardTitle}>Use of the Service</Text>
						<Text style={styles.cardTextSmall}>
							Sewn Heart is a platform{" "}
							<Text style={styles.boldText}>
								designed to connect individuals who have experienced emotional
								hardships such as breakups, divorce, or personal loss
							</Text>
							. The Service provides tools and AI-generated insights to support
							emotional well-being and help users make meaningful connections.
						</Text>
						<Text style={styles.cardTextSmall}>
							You agree to use Sewn Heart solely for personal, non-commercial
							purposes, and only in accordance with applicable laws and these
							Terms.
						</Text>
					</View>

					{/* Card 3 */}
					<View style={styles.card}>
						<View style={styles.numberCircle}>
							<Text style={styles.numberText}>3</Text>
						</View>
						<Text style={styles.cardTitle}>AI Functionality</Text>
						<Text style={styles.cardTextSmall}>
							Sewn Heart leverages artificial intelligence ("AI") technologies
							to:
						</Text>
						<View style={styles.bulletList}>
							<View style={styles.bulletPoint}>
								<Text style={styles.bullet}>•</Text>
								<Text style={styles.bulletText}>
									Analyze user interactions, preferences, and emotional
									patterns.
								</Text>
							</View>
							<View style={styles.bulletPoint}>
								<Text style={styles.bullet}>•</Text>
								<Text style={styles.bulletText}>
									Generate personalized content and insights to assist with
									emotional healing.
								</Text>
							</View>
							<View style={styles.bulletPoint}>
								<Text style={styles.bullet}>•</Text>
								<Text style={styles.bulletText}>
									Suggest connections with other users who may provide mutual
									support or shared experiences.
								</Text>
							</View>
							<View style={styles.bulletPoint}>
								<Text style={styles.bullet}>•</Text>
								<Text style={styles.bulletText}>
									Offer automated journaling prompts, conversation starters, and
									content tailored to emotional progress.
								</Text>
							</View>
						</View>
						<Text style={styles.cardTextSmall}>
							You acknowledge and agree that while our AI is designed to offer
							helpful guidance,{" "}
							<Text style={styles.boldText}>
								it is not a substitute for professional mental health care or
								therapy
							</Text>
							.
						</Text>
					</View>

					{/* Card 4 */}
					<View style={styles.card}>
						<View style={styles.numberCircle}>
							<Text style={styles.numberText}>4</Text>
						</View>
						<Text style={styles.cardTitle}>User Responsibilities</Text>
						<Text style={styles.cardTextSmall}>You agree:</Text>
						<View style={styles.bulletList}>
							<View style={styles.bulletPoint}>
								<Text style={styles.bullet}>•</Text>
								<Text style={styles.bulletText}>
									To provide accurate, current, and complete information in your
									profile.
								</Text>
							</View>
							<View style={styles.bulletPoint}>
								<Text style={styles.bullet}>•</Text>
								<Text style={styles.bulletText}>
									Not to impersonate any person or entity or misrepresent
									yourself.
								</Text>
							</View>
							<View style={styles.bulletPoint}>
								<Text style={styles.bullet}>•</Text>
								<Text style={styles.bulletText}>
									Not to use the Service to harass, abuse, defame, stalk, or
									threaten others.
								</Text>
							</View>
							<View style={styles.bulletPoint}>
								<Text style={styles.bullet}>•</Text>
								<Text style={styles.bulletText}>
									Not to upload or distribute any inappropriate, offensive, or
									harmful content.
								</Text>
							</View>
						</View>
						<Text style={styles.cardTextSmall}>
							We reserve the right to suspend or terminate accounts that violate
							these guidelines.
						</Text>
					</View>

					{/* Card 5 */}
					<View style={styles.card}>
						<View style={styles.numberCircle}>
							<Text style={styles.numberText}>5</Text>
						</View>
						<Text style={styles.cardTitle}>Subscription and Fees</Text>
						<Text style={styles.cardTextSmall}>
							Sewn Heart offers a tiered pricing model that may include:
						</Text>
						<View style={styles.bulletList}>
							<View style={styles.bulletPoint}>
								<Text style={styles.bullet}>•</Text>
								<Text style={styles.bulletText}>
									Monthly or annual subscription plans for continued access to
									core services.
								</Text>
							</View>
							<View style={styles.bulletPoint}>
								<Text style={styles.bullet}>•</Text>
								<Text style={styles.bulletText}>
									Optional premium features, such as personalized AI coaching,
									visibility boosts, and advanced analytics.
								</Text>
							</View>
						</View>
						<Text style={styles.cardTextSmall}>
							All fees are non-refundable unless required by law. We reserve the
							right to change pricing at any time, with reasonable notice to
							users.
						</Text>
						<Text style={styles.cardTextSmall}>
							You authorize us to charge your payment method on a recurring
							basis until you cancel.
						</Text>
					</View>

					{/* Card 6 */}
					<View style={styles.card}>
						<View style={styles.numberCircle}>
							<Text style={styles.numberText}>6</Text>
						</View>
						<Text style={styles.cardTitle}>Account Termination</Text>
						<Text style={styles.cardTextSmall}>
							You may terminate your account at any time by following the
							instructions within the app. Upon termination, your profile and
							data may be retained for a limited time in accordance with our
							Privacy Policy.
						</Text>
						<Text style={styles.cardTextSmall}>
							We reserve the right to terminate or suspend access to the Service
							for any reason, including violation of these Terms or if we
							believe the user poses a risk to others or the community.
						</Text>
					</View>

					{/* Card 7 */}
					<View style={styles.card}>
						<View style={styles.numberCircle}>
							<Text style={styles.numberText}>7</Text>
						</View>
						<Text style={styles.cardTitle}>Privacy</Text>
						<Text style={styles.cardTextSmall}>
							Your use of Sewn Heart is subject to our [Privacy Policy] which
							explains how we collect, use, and protect your personal data,
							including how AI models process data to provide insights and
							support. You acknowledge and consent to the use of your data as
							described.
						</Text>
					</View>

					{/* Card 8 */}
					<View style={styles.card}>
						<View style={styles.numberCircle}>
							<Text style={styles.numberText}>8</Text>
						</View>
						<Text style={styles.cardTitle}>Disclaimers</Text>
						<Text style={styles.cardTextSmall}>
							Your use of Sewn Heart is subject to our [Privacy Policy] which
							explains how we collect, use, and protect your personal data,
							including how AI models process data to provide insights and
							support. You acknowledge and consent to the use of your data as
							described.
						</Text>
					</View>

					{/* Card 9 */}
					<View style={styles.card}>
						<View style={styles.numberCircle}>
							<Text style={styles.numberText}>9</Text>
						</View>
						<Text style={styles.cardTitle}>Limitation of Liability</Text>
						<Text style={styles.cardTextSmall}>
							Your use of Sewn Heart is subject to our [Privacy Policy] which
							explains how we collect, use, and protect your personal data,
							including how AI models process data to provide insights and
							support. You acknowledge and consent to the use of your data as
							described.
						</Text>
					</View>

					{/* Card 10 */}
					<View style={styles.card}>
						<View style={styles.numberCircle}>
							<Text style={styles.numberText}>10</Text>
						</View>
						<Text style={styles.cardTitle}>Indemnification</Text>
						<Text style={styles.cardTextSmall}>
							You agree to indemnify and hold harmless Sewn Heart, its
							affiliates, officers, employees, and agents from and against any
							and all claims, losses, liabilities, expenses, damages, and costs
							arising from your use of the Service, violation of these Terms, or
							any breach of your representations and warranties.
						</Text>
					</View>

					{/* Card 11 */}
					<View style={styles.card}>
						<View style={styles.numberCircle}>
							<Text style={styles.numberText}>11</Text>
						</View>
						<Text style={styles.cardTitle}>Modifications</Text>
						<Text style={styles.cardTextSmall}>
							We reserve the right to modify or update these Terms at any time.
							If changes are material, we will provide notice through the app or
							via email. Continued use of the Service after such updates
							constitutes acceptance of the revised Terms.
						</Text>
					</View>

					{/* Card 12 */}
					<View style={styles.card}>
						<View style={styles.numberCircle}>
							<Text style={styles.numberText}>12</Text>
						</View>
						<Text style={styles.cardTitle}>Governing Law</Text>
						<Text style={styles.cardTextSmall}>
							These Terms are governed by and construed in accordance with the
							laws of the State of [Your State], without regard to its conflict
							of laws principles. You agree to resolve any disputes exclusively
							in the courts located in [Your Jurisdiction].
						</Text>
					</View>

					{/* Card 13 */}
					<View style={styles.card}>
						<View style={styles.numberCircle}>
							<Text style={styles.numberText}>13</Text>
						</View>
						<Text style={styles.cardTitle}>Contact Us</Text>
						<Text style={styles.cardTextSmall}>
							If you have any questions about these Terms, please contact us at:
						</Text>
						<View style={styles.contactInfo}>
							<Text style={styles.cardTextSmall}>Sewn Heart, Inc.</Text>
							<Text style={styles.cardTextSmall}>
								Email:{" "}
								<Text style={styles.boldText}>support@sewnheart.com</Text>
							</Text>
							<Text style={styles.cardTextSmall}>
								Mailing Address: [Insert Company Address]
							</Text>
						</View>
					</View>
				</View>
			</ScrollView>

			<View style={styles.footer}>
				<View style={styles.buttonRow}>
					<TouchableOpacity
						style={[styles.button, styles.disagreeButton]}
						onPress={handleDisagree}
						activeOpacity={0.8}
					>
						<Text style={styles.disagreeButtonText}>Disagree</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[
							styles.button,
							hasReadEnd ? styles.agreeButton : styles.disabledButton,
						]}
						onPress={handleAgree}
						activeOpacity={hasReadEnd ? 0.8 : 1}
						disabled={!hasReadEnd}
					>
						<Text
							style={[
								styles.agreeButtonText,
								!hasReadEnd && styles.disabledButtonText,
							]}
						>
							Agree
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
	},
	staticHeader: {
		backgroundColor: "white",
		zIndex: 10,
	},
	header: {
		paddingHorizontal: 25,
		paddingTop: 10,
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
		paddingTop: 20,
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
	progressBarContainer: {
		height: 4,
		backgroundColor: "#F2F4F6",
		width: "100%",
		marginTop: 10,
	},
	progressBar: {
		height: "100%",
		backgroundColor: "#DE153A",
	},
	content: {
		paddingHorizontal: 25,
		gap: 12,
	},
	card: {
		backgroundColor: "#F2F4F7",
		borderRadius: 8,
		padding: 20,
	},
	cardText: {
		fontFamily: "PlusJakartaSans_500Medium",
		fontSize: 15,
		lineHeight: 22,
		color: "#4A4A4A",
	},
	cardTextSmall: {
		fontFamily: "PlusJakartaSans_500Medium",
		fontSize: 14,
		lineHeight: 20,
		color: "#4A4A4A",
		marginTop: 10,
	},
	contactInfo: {
		marginTop: 5,
	},
	bulletList: {
		marginTop: 15,
		gap: 10,
	},
	bulletPoint: {
		flexDirection: "row",
		paddingRight: 10,
	},
	bullet: {
		fontSize: 18,
		color: "#666",
		marginRight: 10,
		marginTop: -2,
	},
	bulletText: {
		fontFamily: "PlusJakartaSans_500Medium",
		fontSize: 14,
		lineHeight: 20,
		color: "#4A4A4A",
		flex: 1,
	},
	boldText: {
		fontFamily: "PlusJakartaSans_700Bold",
		color: "#000",
	},
	numberCircle: {
		width: 32,
		height: 32,
		borderRadius: 16,
		backgroundColor: "#E5E7EB",
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 12,
	},
	numberText: {
		fontFamily: "PlusJakartaSans_600SemiBold",
		fontSize: 14,
		color: "#000",
	},
	cardTitle: {
		fontFamily: "PlusJakartaSans_700Bold",
		fontSize: 22,
		color: "#000",
		marginBottom: 4,
	},
	footer: {
		paddingHorizontal: 25,
		paddingTop: 15,
		paddingBottom: 25,
		backgroundColor: "white",
		borderTopWidth: 1,
		borderTopColor: "#F2F4F6",
	},
	buttonRow: {
		flexDirection: "row",
		gap: 12,
	},
	button: {
		flex: 1,
		height: 60,
		borderRadius: 12,
		alignItems: "center",
		justifyContent: "center",
	},
	disagreeButton: {
		backgroundColor: "#EBEDF0",
	},
	agreeButton: {
		backgroundColor: "#DE153A",
	},
	disabledButton: {
		backgroundColor: "#E5E7EB",
		opacity: 0.6,
	},
	disagreeButtonText: {
		fontFamily: "PlusJakartaSans_600SemiBold",
		fontSize: 18,
		color: "#000",
	},
	agreeButtonText: {
		fontFamily: "PlusJakartaSans_600SemiBold",
		fontSize: 18,
		color: "#FFF",
	},
	disabledButtonText: {
		color: "#9CA3AF",
	},
});
