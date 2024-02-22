import {ActivityIndicator, StyleProp, View, ViewStyle} from "react-native";
import React from "react";
import {useThemeColors} from "~/core/theme/hooks";
import {CommonStyles} from "~/core/theme/commonStyles";

interface IProps {
  containerStyle?: StyleProp<ViewStyle>;
  size?: "small" | "large";
}

export const LoadingComponent = ({containerStyle, size}: IProps) => {
  const colors = useThemeColors();

  return (
    <View style={containerStyle || CommonStyles.flexCenter}>
      <ActivityIndicator
        animating={true}
        color={colors.main}
        size={size || "small"}
      />
    </View>
  );
};
