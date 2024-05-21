import { View, Text, ScrollView, FlatList } from "react-native";
import React from "react";

import { defaultStyles } from "@/constants/Styles";

import chats from "@/assets/data/chats.json";

import ChatRow from "@/components/ChatRow";

const Chats = () => {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{ paddingBottom: 40, backgroundColor: "#fff" }}
    >
      <FlatList
        scrollEnabled={false}
        data={chats}
        renderItem={({ item }) => <ChatRow {...item} />}
        ItemSeparatorComponent={() => (
          <View style={[defaultStyles.separator, { marginLeft: 90 }]} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </ScrollView>
  );
};

export default Chats;
