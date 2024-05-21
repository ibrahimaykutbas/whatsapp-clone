import { View, Text, ImageBackground, StyleSheet } from "react-native";
import React, { useState, useEffect, useCallback, useRef } from "react";

import Colors from "@/constants/Colors";

import messagesData from "@/assets/data/messages.json";

import {
  GiftedChat,
  Bubble,
  SystemMessage,
  Send,
  InputToolbar,
  IMessage,
} from "react-native-gifted-chat";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";

import { Swipeable } from "react-native-gesture-handler";

import ChatMessageBox from "@/components/ChatMessageBox";
import ReplyMessageBar from "@/components/ReplyMessageBar";

const Chat = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [replyMessage, setReplyMessage] = useState<IMessage | null>(null);
  const [text, setText] = useState("");

  const insets = useSafeAreaInsets();

  const swipeableRowRef = useRef<Swipeable | null>(null);

  useEffect(() => {
    setMessages([
      ...messagesData.map((message) => {
        return {
          _id: message.id,
          text: message.msg,
          createdAt: new Date(message.date),
          user: {
            _id: message.from,
            name: message.from ? "You" : "Incoming",
          },
        };
      }),
      {
        _id: 0,
        system: true,
        text: "Start of the chat",
        createdAt: new Date(),
        user: {
          _id: 0,
          name: "Bot",
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  const updateRowRef = useCallback(
    (ref: any) => {
      if (
        ref &&
        replyMessage &&
        ref.props.children.props.currentMessage?._id === replyMessage._id
      ) {
        swipeableRowRef.current = ref;
      }
    },
    [replyMessage]
  );

  useEffect(() => {
    if (replyMessage && swipeableRowRef.current) {
      swipeableRowRef.current.close();
      swipeableRowRef.current = null;
    }
  }, [replyMessage]);

  return (
    <ImageBackground
      source={require("@/assets/images/pattern.png")}
      style={{
        flex: 1,
        marginBottom: insets.bottom,
        backgroundColor: Colors.background,
      }}
    >
      <GiftedChat
        messages={messages}
        onSend={(messages: any) => onSend(messages)}
        user={{ _id: 1 }}
        onInputTextChanged={setText}
        bottomOffset={insets.bottom}
        renderAvatar={null}
        maxComposerHeight={100}
        renderSystemMessage={(props) => (
          <SystemMessage {...props} textStyle={{ color: Colors.gray }} />
        )}
        renderBubble={(props) => {
          return (
            <Bubble
              {...props}
              textStyle={{
                right: {
                  color: "#000",
                },
              }}
              wrapperStyle={{
                left: {
                  backgroundColor: "#fff",
                },
                right: {
                  backgroundColor: Colors.lightGreen,
                },
              }}
            />
          );
        }}
        renderSend={(props) => (
          <View
            style={{
              flexDirection: "row",
              height: 44,
              justifyContent: "center",
              alignItems: "center",
              gap: 14,
              paddingHorizontal: 14,
            }}
          >
            {text.length > 0 && (
              <Send
                {...props}
                containerStyle={{
                  justifyContent: "center",
                }}
              >
                <Ionicons name="send" color={Colors.primary} size={28} />
              </Send>
            )}
            {text.length === 0 && (
              <>
                <Ionicons
                  name="camera-outline"
                  color={Colors.primary}
                  size={28}
                />
                <Ionicons name="mic-outline" color={Colors.primary} size={28} />
              </>
            )}
          </View>
        )}
        textInputProps={styles.composer}
        renderInputToolbar={(props) => (
          <InputToolbar
            {...props}
            containerStyle={{
              backgroundColor: Colors.background,
            }}
            renderActions={() => (
              <View
                style={{
                  height: 44,
                  justifyContent: "center",
                  alignItems: "center",
                  left: 5,
                }}
              >
                <Ionicons name="add" color={Colors.primary} size={28} />
              </View>
            )}
          />
        )}
        renderMessage={(props) => (
          <ChatMessageBox
            {...props}
            setReplyOnSwipeOpen={setReplyMessage}
            updateRowRef={updateRowRef}
          />
        )}
        renderChatFooter={() => (
          <ReplyMessageBar
            clearReply={() => setReplyMessage(null)}
            message={replyMessage}
          />
        )}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  composer: {
    backgroundColor: "#fff",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    paddingTop: 8,
    paddingHorizontal: 10,
    marginVertical: 4,
    fontSize: 16,
  },
});

export default Chat;
