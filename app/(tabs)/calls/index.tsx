import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
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

import Animated, {
  CurvedTransition,
  FadeInUp,
  FadeOutUp,
} from "react-native-reanimated";

const transition = CurvedTransition.delay(5);

const Calls = () => {
  const [items, setItems] = useState(calls);
  const [isEditting, setIsEditting] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Options>("All");

  const onEdit = () => {
    setIsEditting((prev) => !prev);
  };

  useEffect(() => {
    if (selectedOption === "All") {
      setItems(calls);
    } else {
      setItems(calls.filter((item) => item.missed));
    }
  }, [selectedOption]);

  const RenderItem = ({ item, index }: any) => (
    <Animated.View entering={FadeInUp.delay(index * 1)} exiting={FadeOutUp}>
      <View style={[defaultStyles.item]}>
        <Image source={{ uri: item.img }} style={styles.avatar} />
        <View style={{ flex: 1, gap: 2 }}>
          <Text
            style={{ fontSize: 18, color: item.missed ? Colors.red : "#000" }}
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
      </View>
    </Animated.View>
  );

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
              <RenderItem item={item} index={index} />
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
