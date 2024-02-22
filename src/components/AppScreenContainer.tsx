import React, {memo} from "react";
import {ScrollView, ScrollViewProps, StyleSheet, View, ViewStyle} from "react-native";
import {CommonStyles} from "~/core/theme/commonStyles";
import {ThemeColors} from "~/core/theme/colors";
import {useThemedStyles} from "~/core/theme/hooks";

interface IProps extends ScrollViewProps {
  Component: typeof View | typeof ScrollView;
}

const AppScreenContainerFC = (props: IProps) => {
  const styles = useThemedStyles(stylesGetter);

  return (
    <props.Component
      {...props}
      style={[styles.container, (props.style || CommonStyles.flexGrow)]}
      contentContainerStyle={props.contentContainerStyle || CommonStyles.flexGrow}
    />
  );
};

const stylesGetter = (colors: ThemeColors) => StyleSheet.flatten({
  container: {
    backgroundColor: colors.background,
  } as ViewStyle,
});

AppScreenContainerFC.defaultProps = {
  Component: ScrollView,
};

export const AppScreenContainer = memo(AppScreenContainerFC);
