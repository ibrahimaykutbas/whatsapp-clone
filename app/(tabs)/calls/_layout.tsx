import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

import Colors from "@/constants/Colors";

import { Stack } from "expo-router";

import { Ionicons } from "@expo/vector-icons";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Calls",
          headerLargeTitle: true,
          headerShadowVisible: false,
          /* headerBlurEffect: "light",
          headerTransparent: true, */
          headerStyle: { backgroundColor: Colors.background },
          headerSearchBarOptions: {
            placeholder: "Search",
          },
          headerRight: () => (
            <TouchableOpacity>
              <Ionicons name="call-outline" size={30} color={Colors.primary} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
};

export default Layout;
