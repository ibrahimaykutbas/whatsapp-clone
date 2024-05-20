import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";

import Colors from "@/constants/Colors";

import { defaultStyles } from "@/constants/Styles";

import { devices, items, support } from "@/constants/SettingsMenu";

import { useAuth } from "@clerk/clerk-expo";

import BoxedIcon from "@/components/BoxedIcon";

import { Ionicons } from "@expo/vector-icons";

const Settings = () => {
  const { signOut } = useAuth();

  const RenderItem = ({ item }: any) => {
    return (
      <View style={defaultStyles.item}>
        <BoxedIcon name={item.icon} backgroundColor={item.backgroundColor} />
        <Text
          style={{
            fontSize: 18,
            flex: 1,
          }}
        >
          {item.name}
        </Text>
        <Ionicons name="chevron-forward" size={20} color={Colors.gray} />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={defaultStyles.block}>
          <FlatList
            data={devices}
            renderItem={({ item }) => <RenderItem item={item} />}
            ItemSeparatorComponent={() => (
              <View style={defaultStyles.separator} />
            )}
            scrollEnabled={false}
          />
        </View>

        <View style={defaultStyles.block}>
          <FlatList
            data={items}
            renderItem={({ item }) => <RenderItem item={item} />}
            ItemSeparatorComponent={() => (
              <View style={defaultStyles.separator} />
            )}
            scrollEnabled={false}
          />
        </View>

        <View style={defaultStyles.block}>
          <FlatList
            data={support}
            renderItem={({ item }) => <RenderItem item={item} />}
            ItemSeparatorComponent={() => (
              <View style={defaultStyles.separator} />
            )}
            scrollEnabled={false}
          />
        </View>

        <TouchableOpacity onPress={() => signOut()}>
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  buttonText: {
    color: Colors.primary,
    fontSize: 18,
    textAlign: "center",
    paddingVertical: 14,
  },
});
export default Settings;
