import * as Haptics from "expo-haptics";
import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  View,
} from "react-native";

export const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const YEARS = Array.from({ length: 101 }, (_, i) =>
  (new Date().getFullYear() - i).toString(),
);

export const ITEM_HEIGHT = 50;

// Helper to get actual days in month
export const getDaysInMonth = (monthStr: string, yearStr: string) => {
  const monthIndex = MONTHS.indexOf(monthStr);
  const year = parseInt(yearStr);
  // Date(year, month + 1, 0) gives the last day of the month
  const daysCount = new Date(year, monthIndex + 1, 0).getDate();
  return Array.from({ length: daysCount }, (_, i) =>
    (i + 1).toString().padStart(2, "0"),
  );
};

interface WheelPickerProps {
  data: string[];
  selectedValue: string;
  onValueChange: (value: string) => void;
}

export const WheelPicker = ({
  data,
  selectedValue,
  onValueChange,
}: WheelPickerProps) => {
  const paddedData = ["", "", ...data, "", ""];
  const flatListRef = useRef<FlatList>(null);
  const [localIndex, setLocalIndex] = useState(data.indexOf(selectedValue));
  const lastHapticIndex = useRef(data.indexOf(selectedValue));

  const onMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const y = event.nativeEvent.contentOffset.y;
    const index = Math.round(y / ITEM_HEIGHT);
    if (data[index]) {
      onValueChange(data[index]);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = event.nativeEvent.contentOffset.y;
    const index = Math.round(y / ITEM_HEIGHT);

    // Trigger visual/haptic update as soon as we cross halfway to the next item
    if (
      index !== lastHapticIndex.current &&
      index >= 0 &&
      index < data.length
    ) {
      setLocalIndex(index);
      Haptics.selectionAsync();
      lastHapticIndex.current = index;
    }
  };

  useEffect(() => {
    const index = data.indexOf(selectedValue);
    if (index !== -1) {
      setLocalIndex(index);
      lastHapticIndex.current = index;
      if (flatListRef.current) {
        flatListRef.current.scrollToOffset({
          offset: index * ITEM_HEIGHT,
          animated: true,
        });
      }
    }
  }, [selectedValue, data]);

  return (
    <View style={styles.pickerColumnInner}>
      <FlatList
        ref={flatListRef}
        data={paddedData}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        snapToAlignment="center"
        decelerationRate="fast"
        onScroll={handleScroll}
        onMomentumScrollEnd={onMomentumScrollEnd}
        keyExtractor={(_, index) => index.toString()}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => {
          const isVisualSelected = index - 2 === localIndex;
          return (
            <View style={styles.pickerItem}>
              <Text
                style={[
                  styles.pickerText,
                  isVisualSelected && styles.pickerTextActive,
                ]}
              >
                {item}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  pickerColumnInner: {
    flex: 1,
    height: 250,
  },
  pickerItem: {
    height: ITEM_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },
  pickerText: {
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 20,
    color: "#D1D1D6",
  },
  pickerTextActive: {
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: 24,
    color: "#000",
  },
});
