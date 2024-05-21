import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";

import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";

import { Stack } from "expo-router";

import calls from "@/assets/data/calls.json";

import { Ionicons } from "@expo/vector-icons";

import { format } from "date-fns";

import { SegmentedControl } from "@/components/SegmentedControl";
import { Options } from "@/components/SegmentedControl";
import SwipeableRow from "@/components/SwipeableRow";

import Animated, {
  CurvedTransition,
  FadeInUp,
  FadeOutUp,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import * as Haptics from "expo-haptics";

const transition = CurvedTransition.delay(100);

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const Calls = () => {
  const [items, setItems] = useState(calls);
  const [isEditting, setIsEditting] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Options>("All");

  const editing = useSharedValue(-30);

  const onEdit = () => {
    const editingNew = !isEditting;

    editing.value = editingNew ? 0 : -30;

    setIsEditting(editingNew);
  };

  useEffect(() => {
    if (selectedOption === "All") {
      setItems(calls);
    } else {
      setItems(calls.filter((item) => item.missed));
    }
  }, [selectedOption]);

  const removeCall = (item: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setItems(items.filter((i) => i.id !== item.id));
  };

  const animatedRowStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: withTiming(editing.value) }],
  }));

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <SegmentedControl
              options={["All", "Missed"]}
              selectedOption={selectedOption}
              onOptionPress={setSelectedOption}
            />
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={onEdit}>
              <Text style={styles.headerLeftText}>
                {isEditting ? "Done" : "Edit"}
              </Text>
            </TouchableOpacity>
          ),
        }}
      />

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <Animated.View style={defaultStyles.block} layout={transition}>
          <Animated.FlatList
            data={items}
            renderItem={({ item, index }) => (
              <SwipeableRow onDelete={() => removeCall(item)}>
                <Animated.View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                  entering={FadeInUp.delay(index * 20)}
                  exiting={FadeOutUp}
                >
                  <AnimatedTouchableOpacity
                    onPress={() => removeCall(item)}
                    style={[animatedRowStyles, { paddingLeft: 8 }]}
                  >
                    <Ionicons
                      name="remove-circle"
                      size={24}
                      color={Colors.red}
                    />
                  </AnimatedTouchableOpacity>

                  <Animated.View
                    style={[
                      defaultStyles.item,
                      animatedRowStyles,
                      { paddingLeft: 10 },
                    ]}
                  >
                    <Image source={{ uri: item.img }} style={styles.avatar} />
                    <View style={{ flex: 1, gap: 2 }}>
                      <Text
                        style={{
                          fontSize: 18,
                          color: item.missed ? Colors.red : "#000",
                        }}
                      >
                        {item.name}
                      </Text>

                      <View style={{ flexDirection: "row", gap: 4 }}>
                        <Ionicons
                          name={item.video ? "videocam" : "call"}
                          size={16}
                          color={Colors.gray}
                        />
                        <Text style={{ flex: 1, color: Colors.gray }}>
                          {item?.incoming ? "Incoming" : "Outgoing"}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        gap: 6,
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ color: Colors.gray }}>
                        {format(item.date, "MM.dd.yy")}
                      </Text>
                      <Ionicons
                        name="information-circle-outline"
                        size={24}
                        color={Colors.primary}
                      />
                    </View>
                  </Animated.View>
                </Animated.View>
              </SwipeableRow>
            )}
            scrollEnabled={false}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => (
              <View style={defaultStyles.separator} />
            )}
            itemLayoutAnimation={transition}
            skipEnteringExitingAnimations
          />
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  headerLeftText: {
    color: Colors.primary,
    fontSize: 18,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
});
export default Calls;
