import { View, Text, StyleSheet } from "react-native";
import React from "react";

import { Ionicons } from "@expo/vector-icons";

export type BoxedIconProps = {
  name: typeof Ionicons.defaultProps;
  backgroundColor: string;
};

const BoxedIcon = ({ name, backgroundColor }: BoxedIconProps) => {
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Ionicons name={name} size={22} color="white" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 4,
    borderRadius: 6,
  },
});
export default BoxedIcon;
