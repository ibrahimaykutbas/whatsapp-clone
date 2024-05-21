import { View, TouchableOpacity, Text } from "react-native";

import Colors from "@/constants/Colors";

import { Ionicons } from "@expo/vector-icons";

import { IMessage } from "react-native-gifted-chat";

import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";

type ReplyMessageBarProps = {
  clearReply: () => void;
  message: IMessage | null;
};

const ReplyMessageBar = ({ clearReply, message }: ReplyMessageBarProps) => {
  return (
    <>
      {message && (
        <Animated.View
          entering={FadeInDown}
          exiting={FadeOutDown}
          style={{
            flexDirection: "row",
            height: 50,
            backgroundColor: "#E4E9EB",
          }}
        >
          <View
            style={{ width: 6, height: 50, backgroundColor: "#89BC0C" }}
          ></View>
          <View>
            <Text
              style={{
                color: "#89BC0C",
                fontSize: 15,
                fontWeight: "600",
                paddingTop: 5,
                paddingLeft: 10,
              }}
            >
              {message.user.name}
            </Text>
            <Text
              style={{ color: Colors.gray, paddingLeft: 10, paddingTop: 5 }}
            >
              {message?.text.length > 40
                ? `${message?.text.substring(0, 40)}...`
                : message?.text}
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "flex-end",
              paddingRight: 10,
            }}
          >
            <TouchableOpacity onPress={clearReply}>
              <Ionicons
                name="close-circle-outline"
                size={28}
                color={Colors.gray}
              />
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </>
  );
};

export default ReplyMessageBar;
