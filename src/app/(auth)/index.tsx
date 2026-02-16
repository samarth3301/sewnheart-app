import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import { useVideoPlayer, VideoView } from "expo-video";
import * as WebBrowser from "expo-web-browser";
import { useState } from "react";
import {
	ActivityIndicator,
	Alert,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { API_ENDPOINTS, API_URL } from "../../../src/config/api";

WebBrowser.maybeCompleteAuthSession();

const videoSource = require("../../../assets/backgrounds/auth_screen_bg.mp4");

export default function WelcomeScreen() {
	// Navigation hook
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	// Video background setup
	const player = useVideoPlayer(videoSource, (p) => {
		p.loop = true;
		p.muted = true;
		p.play();
	});

	const handleGoogleSignIn = async () => {
		try {
			setIsLoading(true);
			const redirectUri = Linking.createURL("/auth-callback");
			const authUrl = `${API_URL}${API_ENDPOINTS.auth.google_auth}?redirect_uri=${encodeURIComponent(
				redirectUri,
			)}`;

			const result = await WebBrowser.openAuthSessionAsync(
				authUrl,
				redirectUri,
			);

			if (result.type === "success") {
				const { url } = result;
				const params = Linking.parse(url).queryParams;

				if (params?.token) {
					// Handle successful login (e.g., store token, navigate to onboarding)
					console.log("Logged in with token:", params.token);
					router.replace("/(onboarding)" as any);
				} else {
					Alert.alert("Error", "Authentication failed: No token received");
				}
			}
		} catch (error) {
			console.error("Google Sign-In Error:", error);
			Alert.alert("Error", "An error occurred during Google Sign-In");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<View style={styles.container}>
			<VideoView
				player={player}
				style={StyleSheet.absoluteFill}
				contentFit="cover"
				nativeControls={false}
			/>
			<View style={styles.overlay}>
				<SafeAreaView style={styles.contentContainer}>
					<View style={styles.topSection}>
						<Image
							source={require("../../../assets/branding/logo_white.svg")}
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

						<TouchableOpacity
							style={styles.whiteButton}
							activeOpacity={0.8}
							onPress={handleGoogleSignIn}
							disabled={isLoading}
						>
							{isLoading ? (
								<ActivityIndicator color="black" />
							) : (
								<>
									<Image
										source="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
										style={styles.googleIcon}
										contentFit="contain"
									/>
									<Text style={styles.whiteButtonText}>
										Continue With Google
									</Text>
								</>
							)}
						</TouchableOpacity>

						<TouchableOpacity
							style={styles.outlinedButton}
							activeOpacity={0.7}
							onPress={() => router.push("/email")}
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
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	background: {
		flex: 1,
		width: "100%",
	},
	overlay: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.30)", // Subtler overlay for video visibility
	},
	contentContainer: {
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
