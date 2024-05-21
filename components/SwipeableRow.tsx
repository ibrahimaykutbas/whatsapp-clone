import React, { Component, PropsWithChildren } from "react";
import { Animated, StyleSheet, View, Text } from "react-native";

import { RectButton } from "react-native-gesture-handler";

import Swipeable from "react-native-gesture-handler/Swipeable";

export default class SwipeableRow extends Component<
  PropsWithChildren<unknown & { onDelete: () => void }>
> {
  private renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>,
    _dragAnimatedValue: Animated.AnimatedInterpolation<number>
  ) => (
    <View
      style={{
        width: 80,
        flexDirection: "row",
      }}
    >
      {this.renderRightAction("Delete", "#dd2c00", 80, progress)}
    </View>
  );

  private renderRightAction = (
    text: string,
    color: string,
    x: number,
    progress: Animated.AnimatedInterpolation<number>
  ) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    });

    const pressHandler = () => {
      this.close();
    };

    return (
      <Animated.View
        style={{
          flex: 1,
          transform: [{ translateX: trans }],
        }}
      >
        <RectButton
          style={[styles.rightAction, { backgroundColor: color }]}
          onPress={pressHandler}
        >
          <Text style={styles.actionText}>{text}</Text>
        </RectButton>
      </Animated.View>
    );
  };

  private swipeableRow?: Swipeable;

  private updateRef = (ref: Swipeable) => {
    this.swipeableRow = ref;
  };
  private close = () => {
    this.swipeableRow?.close();
    this.props.onDelete();
  };

  private onSwipeableOpen = () => {
    this.close();
  };

  render() {
    const { children } = this.props;
    return (
      <Swipeable
        ref={this.updateRef}
        enableTrackpadTwoFingerGesture
        friction={2}
        rightThreshold={40}
        renderRightActions={this.renderRightActions}
      >
        {children}
      </Swipeable>
    );
  }
}

const styles = StyleSheet.create({
  actionText: {
    color: "white",
    fontSize: 16,
    backgroundColor: "transparent",
    padding: 10,
    alignSelf: "center",
  },
  rightAction: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});
