import React, { Dispatch, FC, SetStateAction, memo } from "react";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Colors from "@/constants/Colors";

import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const Palette = {
  baseGray05: Colors.lightGray,
  baseGray80: "#ff00ff",
  background: "#fff",
};

export type Options = "All" | "Missed";

type SegmentedControlProps = {
  options: Options[];
  selectedOption: Options;
  onOptionPress?: Dispatch<SetStateAction<Options>>;
};

const SegmentedControl: FC<SegmentedControlProps> = memo(
  ({ options, selectedOption, onOptionPress }) => {
    const internalPadding = 6;
    const segmentedControlWidth = 180;

    const itemWidth =
      (segmentedControlWidth - internalPadding) / options.length;

    const rStyle = useAnimatedStyle(() => {
      return {
        left: withTiming(
          itemWidth * options.indexOf(selectedOption) + internalPadding / 2
        ),
      };
    }, [selectedOption, options, itemWidth]);

    return (
      <View
        style={[
          styles.container,
          {
            width: segmentedControlWidth,
            borderRadius: 6,
            paddingLeft: internalPadding / 2,
          },
        ]}
      >
        <Animated.View
          style={[
            {
              width: itemWidth,
            },
            rStyle,
            styles.activeBox,
          ]}
        />
        {options.map((option) => {
          return (
            <TouchableOpacity
              onPress={() => {
                onOptionPress?.(option);
              }}
              key={option}
              style={[
                {
                  width: itemWidth,
                },
                styles.labelContainer,
              ]}
            >
              <Text style={styles.label}>{option}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 44,
    backgroundColor: Palette.baseGray05,
  },
  activeBox: {
    position: "absolute",
    borderRadius: 6,
    height: "80%",
    top: "10%",
    backgroundColor: Palette.background,
  },
  labelContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 14,
  },
});

export { SegmentedControl };
