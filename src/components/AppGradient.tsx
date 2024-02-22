import React, {memo, useCallback} from "react";
import {StyleProp, StyleSheet, ViewStyle} from "react-native";
import Svg, {Defs, LinearGradient, Rect, Stop, SvgProps} from "react-native-svg";
import {useThemeColors} from "~/core/theme/hooks/useThemeColors";

interface IProps extends SvgProps {
  height: number;
  width: number;
  style?: StyleProp<ViewStyle>;
  stopsOverride?: {color: string; position: number; opacity: number}[];
}

export const AppGradient = memo((props: IProps) => {
  const {height, width, style, stopsOverride} = props;
  const gradientWidth = width + 1;
  const themeColors = useThemeColors();

  const getStops = useCallback(() => (
    (stopsOverride || themeColors.linealBg).map((stopDsc, index) => (
      <Stop
        key={index.toString()}
        offset={stopDsc.position}
        stopColor={stopDsc.color}
        stopOpacity={stopDsc.opacity}
      />
    ))
  ), [stopsOverride, themeColors.linealBg]);

  return (
    <Svg
      {...props}
      width={gradientWidth}
      style={[styles.gradient, {height: height}, style]}
    >
      <Defs>
        <LinearGradient
          id={"grad"}
          gradientUnits={"objectBoundingBox"}
        >
          {getStops()}
        </LinearGradient>
      </Defs>
      <Rect
        transform={"rotate(90)"}
        fill={"url(#grad)"}
        width={height}
        height={gradientWidth}
        y={-gradientWidth}
      />
    </Svg>
  );
});

const styles = StyleSheet.create({
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
  } as ViewStyle,
});

