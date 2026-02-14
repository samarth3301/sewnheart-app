import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import {
	ImageBackground,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WelcomeScreen() {
	// Navigation hook
	const router = useRouter();

	return (
		<ImageBackground
			source={require("../../../assets/backgrounds/welcome-bg.png")}
			style={styles.background}
			resizeMode="cover"
		>
			<View style={styles.overlay}>
				<SafeAreaView style={styles.container}>
					<View style={styles.topSection}>
						<Image
							source={require("../../../assets/branding/logo.png")}
							style={styles.logo}
							contentFit="contain"
						/>
						<Text style={styles.subtitle}>Sew Your Heart</Text>
					</View>

					<View style={styles.bottomSection}>
						<TouchableOpacity style={styles.whiteButton} activeOpacity={0.8}>
							<AntDesign name="apple" size={22} color="black" />
							<Text style={styles.whiteButtonText}>Continue With Apple</Text>
						</TouchableOpacity>

						<TouchableOpacity style={styles.whiteButton} activeOpacity={0.8}>
							<Image
								source="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
								style={styles.googleIcon}
								contentFit="contain"
							/>
							<Text style={styles.whiteButtonText}>Continue With Google</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={styles.outlinedButton}
							activeOpacity={0.7}
							onPress={() => router.replace("/(tabs)")}
						>
							<Ionicons name="mail-outline" size={22} color="white" />
							<Text style={styles.outlinedButtonText}>Continue with Email</Text>
						</TouchableOpacity>

						<TouchableOpacity style={styles.linkButton} activeOpacity={0.6}>
							<Text style={styles.linkText}>Create an Account</Text>
						</TouchableOpacity>

						<View style={styles.legalContainer}>
							<Text style={styles.legalText}>
								By continuing, you agree to SEWNHEART's{" "}
								<Text style={styles.legalLink}>Terms of Service</Text> and{" "}
								<Text style={styles.legalLink}>Privacy Policy</Text>. We're
								committed to protecting your privacy and creating a safe healing
								space.
							</Text>
						</View>
					</View>
				</SafeAreaView>
			</View>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	background: {
		flex: 1,
		width: "100%",
	},
	overlay: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.45)", // Darker overlay for better contrast
	},
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 25,
		paddingVertical: 40,
	},
	topSection: {
		alignItems: "center",
		marginTop: 80,
	},
	logo: {
		width: 240,
		height: 80,
	},
	subtitle: {
		color: "white",
		fontSize: 18,
		marginTop: 5,
		fontWeight: "500",
		textAlign: "center",
		opacity: 0.9,
	},
	bottomSection: {
		width: "100%",
		alignItems: "center",
		gap: 16,
		marginBottom: 30,
	},
	whiteButton: {
		flexDirection: "row",
		backgroundColor: "white",
		width: "100%",
		height: 60,
		borderRadius: 30,
		alignItems: "center",
		justifyContent: "center",
		gap: 12,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	whiteButtonText: {
		color: "black",
		fontSize: 17,
		fontWeight: "600",
	},
	googleIcon: {
		width: 22,
		height: 22,
	},
	outlinedButton: {
		flexDirection: "row",
		backgroundColor: "transparent",
		width: "100%",
		height: 60,
		borderRadius: 30,
		borderWidth: 1.5,
		borderColor: "white",
		alignItems: "center",
		justifyContent: "center",
		gap: 12,
	},
	outlinedButtonText: {
		color: "white",
		fontSize: 17,
		fontWeight: "600",
	},
	linkButton: {
		marginTop: 8,
	},
	linkText: {
		color: "white",
		fontSize: 16,
		fontWeight: "600",
		textDecorationLine: "underline",
	},
	legalContainer: {
		marginTop: 25,
		paddingHorizontal: 15,
	},
	legalText: {
		color: "rgba(255, 255, 255, 0.8)",
		fontSize: 12,
		textAlign: "center",
		lineHeight: 18,
	},
	legalLink: {
		textDecorationLine: "underline",
		fontWeight: "500",
	},
});
