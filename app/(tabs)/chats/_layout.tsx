import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

import Colors from "@/constants/Colors";

import { Link, Stack } from "expo-router";

import { Ionicons } from "@expo/vector-icons";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Chats",
          headerLargeTitle: true,
          headerTransparent: true,
          headerBlurEffect: "regular",
          headerSearchBarOptions: {
            placeholder: "Search",
          },
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerLeft: () => (
            <TouchableOpacity>
              <Ionicons
                name="ellipsis-horizontal-circle-outline"
                size={30}
                color={Colors.primary}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View style={{ flexDirection: "row", gap: 30 }}>
              <TouchableOpacity>
                <Ionicons
                  name="camera-outline"
                  size={30}
                  color={Colors.primary}
                />
              </TouchableOpacity>
              <Link href="/" asChild>
                <TouchableOpacity>
                  <Ionicons
                    name="add-circle"
                    size={30}
                    color={Colors.primary}
                  />
                </TouchableOpacity>
              </Link>
            </View>
          ),
        }}
      />
    </Stack>
  );
};

export default Layout;
