import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

import Colors from "@/constants/Colors";

import { defaultStyles } from "@/constants/Styles";

import contacts from "@/assets/data/contacts.json";

import { AlphabetList } from "react-native-section-alphabet-list";

const NewChat = () => {
  const data = contacts.map((contact, index) => ({
    value: `${contact.first_name} ${contact.last_name}`,
    name: `${contact.first_name} ${contact.last_name}`,
    img: contact.img,
    desc: contact.desc,
    key: `${contact.first_name} ${contact.last_name}`,
  }));

  return (
    <View style={{ backgroundColor: Colors.background, paddingTop: 110 }}>
      <AlphabetList
        data={data}
        stickySectionHeadersEnabled
        indexLetterStyle={{
          color: Colors.primary,
          fontSize: 12,
        }}
        indexContainerStyle={{
          width: 24,
          backgroundColor: Colors.background,
        }}
        style={{
          marginLeft: 14,
        }}
        renderCustomSectionHeader={(section) => (
          <View style={styles.sectionHeaderContainer}>
            <Text>{section.title}</Text>
          </View>
        )}
        renderCustomItem={(item: any) => (
          <>
            <View style={styles.listItemContainer}>
              <Image
                source={{ uri: item.img }}
                style={{ width: 40, height: 40, borderRadius: 40 }}
              />
              <View>
                <Text style={{ color: "#000", fontSize: 14 }}>
                  {item.value}
                </Text>
                <Text style={{ color: Colors.gray, fontSize: 12 }}>
                  {item.desc.length > 40
                    ? `${item.desc.substring(0, 40)}`
                    : item.desc}
                </Text>
              </View>
            </View>
            <View style={defaultStyles.separator} />
          </>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionHeaderContainer: {
    backgroundColor: Colors.background,
    height: 30,
    justifyContent: "center",
    paddingHorizontal: 14,
  },
  listItemContainer: {
    flex: 1,
    flexDirection: "row",
    height: 50,
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 14,
    backgroundColor: "#fff",
  },
});
export default NewChat;
