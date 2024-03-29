import React, {FC, memo, useCallback, useMemo} from "react";
import {
  Pressable,
  PressableAndroidRippleConfig,
  PressableProps,
  PressableStateCallbackType,
  StyleProp,
  ViewStyle,
} from "react-native";
import {Colors} from "../../core/theme/colors";
import {isAndroid} from "../../core/theme/commonConsts";

interface IProps extends PressableProps {
  style?: StyleProp<ViewStyle>;
  highlightColor?: string;
  androidRippleConfig?: PressableAndroidRippleConfig;
}

export const TouchablePlatform: FC<IProps> = memo(({children, highlightColor, ...props}) => {
  const pressableStyle = useCallback(
    (state: PressableStateCallbackType) => {
      if (isAndroid) {
        return props.style;
      } else {
        return [
          props.style,
          state.pressed &&
          ({
            backgroundColor: `${highlightColor}33`,
          } as ViewStyle),
        ];
      }
    },
    [props.style, highlightColor],
  );

  const rippleConfig = useMemo(() => {
    return highlightColor != null ? {...androidRippleConfig, color: highlightColor} : androidRippleConfig;
  }, [highlightColor]);

  return (
    <Pressable
      android_disableSound={false}
      android_ripple={props.androidRippleConfig || rippleConfig}
      {...props}
      style={pressableStyle as any}
    >
      {children}
    </Pressable>
  );
});

const androidRippleConfig: PressableAndroidRippleConfig = {
  color: Colors.white,
  borderless: false,
};

TouchablePlatform.defaultProps = {
  highlightColor: Colors.buttonHighlight,
};
