import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { useRef, useState } from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ITEM_HEIGHT = 50;
const SCROLLER_HEIGHT = 150;

export default function HeartSpaceScreen() {
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1 State
  const [selectedFeeling, setSelectedFeeling] = useState("Overwhelmed");
  const feelingScrollRef = useRef<ScrollView>(null);
  const feelings = [
    "Hurting",
    "Detached",
    "Overwhelmed",
    "Processing",
    "Growing",
  ];

  // Step 2 State
  const [selectedTrigger, setSelectedTrigger] = useState(
    "Visited familiar place",
  );
  const triggerScrollRef = useRef<ScrollView>(null);
  const triggers = [
    "Saw them online",
    "Heard our song",
    "Visited familiar place",
    "Felt lonely",
    "Anniversary/special date",
  ];

  // Step 3 State
  const [heartNote, setHeartNote] = useState("");

  // Step 4 State
  const [gratitudeNote, setGratitudeNote] = useState("");

  // Handle Step 1 Scroll
  const handleFeelingScroll = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const y = event.nativeEvent.contentOffset.y;
    const index = Math.round(y / ITEM_HEIGHT);
    if (
      index >= 0 &&
      index < feelings.length &&
      feelings[index] !== selectedFeeling
    ) {
      setSelectedFeeling(feelings[index]);
      Haptics.selectionAsync();
    }
  };

  // Handle Step 2 Scroll
  const handleTriggerScroll = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const y = event.nativeEvent.contentOffset.y;
    const index = Math.round(y / ITEM_HEIGHT);
    if (
      index >= 0 &&
      index < triggers.length &&
      triggers[index] !== selectedTrigger
    ) {
      setSelectedTrigger(triggers[index]);
      Haptics.selectionAsync();
    }
  };

  const goToNextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  };

  const goToPrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      Haptics.selectionAsync();
    }
  };

  const renderSteps = () => {
    const previousSteps = [];
    for (let i = 1; i < currentStep; i++) {
      previousSteps.push(i);
    }

    const futureSteps = [];
    for (let i = currentStep + 1; i <= 5; i++) {
      futureSteps.push(i);
    }

    return (
      <View style={styles.stepsContainer}>
        {previousSteps.map((s) => (
          <View key={s} style={[styles.stepBox, styles.stepBoxPrevious]}>
            <Text style={styles.stepTextPrevious}>{s}</Text>
          </View>
        ))}
        <View style={[styles.stepBox, styles.stepBoxActive]}>
          <Text style={styles.stepTextActive}>{currentStep}</Text>
        </View>
        {futureSteps.length > 0 && (
          <>
            <View style={styles.stepDivider} />
            <View style={styles.futureStepsContainer}>
              {futureSteps.map((s, index) => (
                <View
                  key={s}
                  style={[
                    styles.futureStepBox,
                    index > 0 && styles.futureStepBorder,
                  ]}
                >
                  <Text style={styles.futureStepText}>{s}</Text>
                </View>
              ))}
            </View>
          </>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good Morning, Layto</Text>
            <Text style={styles.subtitle}>Your healing journey</Text>
          </View>
          <View style={styles.headerRight}>
            <View style={styles.streakContainer}>
              <View style={styles.streakTextWrapper}>
                <Text style={styles.streakText}>03</Text>
                <View style={styles.redDot} />
              </View>
              <MaterialCommunityIcons
                name="heart-flash"
                size={24}
                color="#DE153A"
              />
            </View>
          </View>
        </View>

        <View style={styles.journeyContainer}>
          <View style={styles.dailyBadge}>
            <Text style={styles.dailyBadgeText}>Start your daily journey</Text>
          </View>

          <View style={styles.journeyCard}>
            {renderSteps()}

            {currentStep === 1 && (
              <>
                <Text style={styles.journeyTitle}>How You feeling today?</Text>
                <View style={styles.feelingContainer}>
                  <View style={styles.illustrationContainer}>
                    <View style={styles.faceOutline}>
                      <View style={styles.bandageLines}>
                        <View style={styles.bandage1} />
                        <View style={styles.bandage2} />
                      </View>
                      <View style={styles.eyes}>
                        <View style={styles.eye} />
                        <View style={styles.eye} />
                      </View>
                      <View style={styles.mouth} />
                    </View>
                  </View>
                  <View style={styles.scrollerWrapper}>
                    <ScrollView
                      ref={feelingScrollRef}
                      showsVerticalScrollIndicator={false}
                      snapToInterval={ITEM_HEIGHT}
                      snapToAlignment="start"
                      decelerationRate="fast"
                      onScroll={handleFeelingScroll}
                      scrollEventThrottle={16}
                      contentContainerStyle={styles.scrollerContent}
                    >
                      {feelings.map((f) => {
                        const isSelected = selectedFeeling === f;
                        return (
                          <TouchableOpacity
                            key={f}
                            style={[
                              styles.itemScroll,
                              isSelected && styles.itemScrollSelected,
                            ]}
                            onPress={() => {
                              setSelectedFeeling(f);
                              const idx = feelings.indexOf(f);
                              feelingScrollRef.current?.scrollTo({
                                y: idx * ITEM_HEIGHT,
                                animated: true,
                              });
                              Haptics.selectionAsync();
                            }}
                          >
                            <Text
                              style={[
                                styles.itemText,
                                isSelected && styles.itemTextSelected,
                              ]}
                            >
                              {f}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </ScrollView>
                  </View>
                </View>
              </>
            )}

            {currentStep === 2 && (
              <>
                <Text style={styles.journeyTitle}>
                  Any triggers today? (optional)
                </Text>
                <View style={styles.feelingContainer}>
                  <View style={styles.scrollerWrapperFull}>
                    <ScrollView
                      ref={triggerScrollRef}
                      showsVerticalScrollIndicator={false}
                      snapToInterval={ITEM_HEIGHT}
                      snapToAlignment="start"
                      decelerationRate="fast"
                      onScroll={handleTriggerScroll}
                      scrollEventThrottle={16}
                      contentContainerStyle={styles.scrollerContent}
                    >
                      {triggers.map((t) => {
                        const isSelected = selectedTrigger === t;
                        return (
                          <TouchableOpacity
                            key={t}
                            style={[
                              styles.itemScrollFull,
                              isSelected && styles.itemScrollSelected,
                            ]}
                            onPress={() => {
                              setSelectedTrigger(t);
                              const idx = triggers.indexOf(t);
                              triggerScrollRef.current?.scrollTo({
                                y: idx * ITEM_HEIGHT,
                                animated: true,
                              });
                              Haptics.selectionAsync();
                            }}
                          >
                            <Text
                              style={[
                                styles.itemTextLarge,
                                isSelected && styles.itemTextSelected,
                              ]}
                            >
                              {t}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </ScrollView>
                  </View>
                </View>
              </>
            )}

            {currentStep === 3 && (
              <>
                <Text style={styles.journeyTitle}>What's on your heart?</Text>
                <View style={styles.noteContainer}>
                  <TextInput
                    style={styles.noteInput}
                    placeholder="Express your feelings, thoughts, or reflections..."
                    placeholderTextColor="#D1D1D6"
                    multiline
                    value={heartNote}
                    onChangeText={setHeartNote}
                  />
                </View>
              </>
            )}

            {currentStep === 4 && (
              <>
                <Text style={styles.journeyTitle}>
                  Something I'm grateful for
                </Text>
                <View style={styles.noteContainer}>
                  <TextInput
                    style={styles.noteInput}
                    placeholder="Express your feelings, thoughts, or reflections..."
                    placeholderTextColor="#D1D1D6"
                    multiline
                    value={gratitudeNote}
                    onChangeText={setGratitudeNote}
                  />
                </View>
              </>
            )}

            {currentStep === 5 && (
              <>
                <Text style={styles.journeyTitle}>Voice Note</Text>
                <View style={styles.voiceNoteContainer}>
                  <TouchableOpacity style={styles.voiceNoteBox}>
                    <MaterialCommunityIcons
                      name="microphone-outline"
                      size={32}
                      color="#000"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.voiceNoteBox}>
                    <MaterialCommunityIcons
                      name="volume-high"
                      size={32}
                      color="#000"
                    />
                  </TouchableOpacity>
                </View>
              </>
            )}

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={goToPrevStep}
                disabled={currentStep === 1}
              >
                <Text
                  style={[
                    styles.backButtonText,
                    currentStep === 1 && { opacity: 0.3 },
                  ]}
                >
                  ← Back
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.nextButton,
                  currentStep === 5 && styles.finishButton,
                ]}
                onPress={
                  currentStep === 5
                    ? () => alert("Journey Completed!")
                    : goToNextStep
                }
              >
                {currentStep < 5 && (
                  <View style={styles.heartPeekContainer}>
                    <MaterialCommunityIcons
                      name="heart-outline"
                      size={24}
                      color="#DE153A"
                    />
                  </View>
                )}
                <Text style={styles.nextButtonText}>
                  {currentStep === 5 ? "Finish Journey" : "Next"}
                </Text>
                {currentStep < 5 && (
                  <Ionicons name="arrow-forward" size={24} color="white" />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Today's Reflection */}
        <View style={styles.reflectionSection}>
          <View style={styles.sectionHeader}>
            <Ionicons name="calendar-outline" size={24} color="black" />
            <Text style={styles.sectionTitle}>Today's Reflection</Text>
          </View>
          <View style={styles.reflectionCard}>
            <Text style={styles.reflectionQuote}>
              "If there's one small thing that brought you comfort today, what
              was it?"
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FB",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  greeting: {
    fontFamily: "PlusJakartaSans_700Bold",
    fontSize: 22,
    color: "#000",
  },
  subtitle: {
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 14,
    color: "#8E8E93",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  streakContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#DE153A",
    gap: 8,
  },
  streakTextWrapper: {
    position: "relative",
  },
  redDot: {
    position: "absolute",
    top: 0,
    right: -4,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#DE153A",
  },
  streakText: {
    fontFamily: "PlusJakartaSans_700Bold",
    fontSize: 18,
    color: "#DE153A",
  },
  journeyContainer: {
    marginTop: 20,
    marginBottom: 25,
    position: "relative",
  },
  dailyBadge: {
    backgroundColor: "#DE153A",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignSelf: "flex-start",
    marginBottom: 12,
  },
  dailyBadgeText: {
    color: "white",
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: 14,
  },
  stepLabel: {
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 14,
    color: "#8E8E93",
    marginBottom: 8,
    marginLeft: 4,
  },
  journeyCard: {
    backgroundColor: "white",
    borderRadius: 24,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  stepsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 20,
    gap: 8,
  },
  stepBox: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  stepBoxActive: {
    backgroundColor: "#DE153A",
  },
  stepBoxPrevious: {
    backgroundColor: "#F2F2F7",
  },
  stepTextActive: {
    color: "white",
    fontFamily: "PlusJakartaSans_700Bold",
    fontSize: 13,
  },
  stepTextPrevious: {
    color: "#8E8E93",
    fontFamily: "PlusJakartaSans_700Bold",
    fontSize: 13,
  },
  stepDivider: {
    width: 32,
    height: 1,
    backgroundColor: "#E5E5EA",
  },
  futureStepsContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D1D1D6",
    overflow: "hidden",
  },
  futureStepBox: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  futureStepBorder: {
    borderLeftWidth: 1,
    borderLeftColor: "#D1D1D6",
  },
  futureStepText: {
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: 13,
    color: "#D1D1D6",
  },
  journeyTitle: {
    fontFamily: "PlusJakartaSans_700Bold",
    fontSize: 32,
    lineHeight: 38,
    color: "#000",
    marginBottom: 30,
  },
  feelingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
    height: SCROLLER_HEIGHT,
  },
  illustrationContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  faceOutline: {
    width: 120,
    height: 120,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#000",
    backgroundColor: "white",
    padding: 10,
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
  },
  bandageLines: {
    position: "absolute",
    top: 10,
    left: -20,
    right: -20,
    transform: [{ rotate: "-20deg" }],
  },
  bandage1: {
    height: 15,
    backgroundColor: "#F2F4F6",
    borderTopWidth: 2,
    borderBottomWidth: 1,
    borderColor: "#000",
  },
  bandage2: {
    height: 15,
    backgroundColor: "#F2F4F6",
    borderBottomWidth: 2,
    borderColor: "#000",
  },
  eyes: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
  eye: {
    width: 12,
    height: 12,
    backgroundColor: "#000",
    borderRadius: 6,
  },
  mouth: {
    width: 40,
    height: 15,
    borderTopWidth: 2,
    borderColor: "#000",
    alignSelf: "center",
    marginTop: 15,
    borderRadius: 20,
  },
  scrollerWrapper: {
    flex: 1,
    height: SCROLLER_HEIGHT,
    justifyContent: "center",
  },
  scrollerWrapperFull: {
    flex: 1,
    height: SCROLLER_HEIGHT,
    justifyContent: "center",
  },
  scrollerContent: {
    paddingVertical: (SCROLLER_HEIGHT - ITEM_HEIGHT) / 2,
    alignItems: "center",
  },
  itemScroll: {
    height: ITEM_HEIGHT,
    justifyContent: "center",
    borderRadius: 25,
    minWidth: 120,
  },
  itemScrollFull: {
    height: ITEM_HEIGHT,
    justifyContent: "center",
    borderRadius: 25,
    paddingHorizontal: 20,
  },
  itemScrollSelected: {
    backgroundColor: "#F2F2F7",
  },
  itemText: {
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 18,
    color: "#D1D1D6",
    textAlign: "center",
  },
  itemTextLarge: {
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: 20,
    color: "#D1D1D6",
    textAlign: "center",
  },
  itemTextSelected: {
    color: "#000",
    fontFamily: "PlusJakartaSans_700Bold",
  },
  noteContainer: {
    backgroundColor: "#F8F9FB",
    borderRadius: 16,
    padding: 24,
    height: 220,
    marginBottom: 35,
    borderWidth: 1,
    borderColor: "#F2F2F7",
  },
  noteInput: {
    flex: 1,
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 16,
    color: "#333",
    textAlignVertical: "top",
    paddingTop: 0,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
  },
  backButton: {
    flex: 1,
    height: 60,
    backgroundColor: "#F2F2F7",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  backButtonText: {
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: 16,
    color: "#8E8E93",
  },
  nextButton: {
    flex: 1,
    height: 60,
    backgroundColor: "#DE153A",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  heartPeekContainer: {
    position: "absolute",
    top: -20,
    right: 40,
    backgroundColor: "white",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#DE153A",
  },
  reflectionSection: {
    marginTop: 10,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 15,
  },
  sectionTitle: {
    fontFamily: "PlusJakartaSans_700Bold",
    fontSize: 24,
    color: "#000",
  },
  reflectionCard: {
    backgroundColor: "white",
    borderRadius: 24,
    padding: 30,
    borderWidth: 1,
    borderColor: "#F2F4F6",
  },
  reflectionQuote: {
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 18,
    lineHeight: 28,
    color: "#333",
    fontStyle: "italic",
    textAlign: "center",
  },
  nextButtonText: {
    color: "white",
    fontFamily: "PlusJakartaSans_700Bold",
    fontSize: 16,
  },
  finishButton: {
    backgroundColor: "#000",
  },
  voiceNoteContainer: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 35,
    height: 180,
  },
  voiceNoteBox: {
    flex: 1,
    backgroundColor: "#F8F9FB",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#F2F2F7",
  },
});
