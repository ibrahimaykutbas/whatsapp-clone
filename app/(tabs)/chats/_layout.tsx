import { View, Text, TouchableOpacity, Image } from "react-native";
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
              <Link href="/(modals)/new-chat" asChild>
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

      <Stack.Screen
        name="[id]"
        options={{
          title: "",
          headerBackTitleVisible: false,
          headerRight: () => (
            <View style={{ flexDirection: "row", gap: 30 }}>
              <TouchableOpacity>
                <Ionicons
                  name="videocam-outline"
                  color={Colors.primary}
                  size={30}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons
                  name="call-outline"
                  color={Colors.primary}
                  size={30}
                />
              </TouchableOpacity>
            </View>
          ),
          headerTitle: () => (
            <View
              style={{
                flexDirection: "row",
                width: 220,
                gap: 10,
                paddingBottom: 4,
                alignItems: "center",
              }}
            >
              <Image
                source={{ uri: "https://picsum.photos/seed/696/3000/2000" }}
                style={{ width: 40, height: 40, borderRadius: 40 }}
              />
              <Text style={{ fontSize: 16, fontWeight: "500" }}>User</Text>
            </View>
          ),
          headerStyle: {
            backgroundColor: Colors.background,
          },
        }}
      />
    </Stack>
  );
};

export default Layout;
