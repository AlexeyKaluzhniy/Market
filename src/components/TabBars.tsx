import {Animated, StyleSheet} from "react-native";
import {windowWidth} from "~/core/theme/commonConsts";
import React from "react";
import {Colors, ThemeColors} from "~/core/theme/colors";
import {CustomTabBar, CustomTabBarItem} from "./Tabs";
import {CommonStyles} from "~/core/theme/commonStyles";
import {Brand, Regular} from "~/infrastructure";
import {useThemedStyles} from "~/core/theme/hooks";

export const CupTabBar: typeof CustomTabBar = (tabBarProps) => CustomTabBar({
  ...tabBarProps,
  renderLabel: (props) => {
    const Component = props.focused ? Brand.H4 : Brand.H5;

    return (
      <Component
        style={props.focused ? styles.label2 : styles.label2inactive}
        text={props.route.title}
        color={props.color}
        numberOfLines={1}
      />
    );
  },
  style: styles.transparentTabBar,
});

export const ShadowedTabBar: typeof CustomTabBar = (tabBarProps) => CustomTabBar({
  ...tabBarProps,
  style: {
    ...CommonStyles.shadowTopBar,
  },
});

export const CupTabBarScrollable: typeof CustomTabBar = (
  {renderTabBarItem = CustomTabBarItem, ...tabBarProps}) => CupTabBar({
  ...tabBarProps,
  renderTabBarItem: (props) =>
    renderTabBarItem({...props, tabContainerStyle: [props.tabContainerStyle, {flexGrow: 1, flex: 0}]}),
});

export const ChipsTabBar: typeof CustomTabBar = (
  {renderTabBarItem = CustomTabBarItem, ...tabBarProps},
) => {
  const sliderStyles = useThemedStyles(sliderStylesGenerator);

  return CustomTabBar({
    ...tabBarProps,
    renderTabBarItem: (props) =>
      renderTabBarItem({...props, tabContainerStyle: [props.tabContainerStyle, {flexGrow: 0, flex: 0}]}),
    renderLabel: (props) => {
      return (
        <Regular.H3
          style={[styles.label3, props.focused ? sliderStyles.focusedChipsLabel : sliderStyles.chipsLabel]}
          allowFontScaling={false}
          text={props.route.title}
        />
      );
    },
    renderIndicator: () => null,
    style: styles.transparentTabBar,
  });
};

export const SliderTabBar: typeof CustomTabBar = (tabBarProps) => {
  const sliderStyles = useThemedStyles(sliderStylesGenerator);

  return CustomTabBar({
    ...tabBarProps,
    renderTabBarItem: (props) => <CustomTabBarItem {...props} tabContainerStyle={sliderStyles.sliderTabContainer} />,
    renderLabel: (props) => {
      return (
        <Regular.H3
          style={[styles.label4, props.focused ? sliderStyles.focusedSliderLabel : sliderStyles.sliderLabel]}
          allowFontScaling={false}
          text={props.route.title}
        />
      );
    },
    renderIndicator: (props) => <Animated.View style={[props.style, sliderStyles.slider, {
      width: (windowWidth - 34) / props.navigationState.routes.length,
      transform: [{translateX: Animated.multiply(props.position, (windowWidth - 34) / props.navigationState.routes.length)}],
    }]} />,
    indicatorContainerStyle: {},
    activeColor: sliderStyles.colors.main,
    style: sliderStyles.sliderTabBar,
  });
};

export const SliderHeight = 32;

const sliderStylesGenerator = (colors: ThemeColors) => StyleSheet.create({
  slider: {
    left: 0,
    top: 0,
    bottom: 0,
    // right: "50%",
    height: null as unknown as undefined,
    position: "absolute",
    zIndex: 2,
  },
  sliderTabContainer: {
    flexBasis: 100,
    height: SliderHeight,
    zIndex: 1,
  },
  focusedSliderLabel: {
    color: Colors.white,
  },
  sliderLabel: {
    color: colors.text,
  },
  sliderTabBar: {
    width: windowWidth - 32,
    alignSelf: "center",
    backgroundColor: colors.element,
    borderWidth: 1,
    borderColor: colors.winline2,
    elevation: 0,
  },
  focusedChipsLabel: {
    color: Colors.white,
    backgroundColor: Colors.primary,
  },
  chipsLabel: {
    color: colors.text,
    backgroundColor: colors.element,
  },
});

const styles = StyleSheet.create({
  label2: {
    marginHorizontal: 16,
    textAlign: "center",
    textTransform: "uppercase",
    paddingTop: 12,
    paddingBottom: 6,
  },
  label2inactive: {
    marginHorizontal: 16,
    textAlign: "center",
    textTransform: "uppercase",
    paddingTop: 12,
    paddingBottom: 6,
    paddingHorizontal: 7,
  },
  label3: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginHorizontal: 6,
    textAlign: "center",
    marginVertical: 16,
    overflow: "hidden",
  },
  label4: {
    paddingHorizontal: 12,
    marginVertical: 6,
    textAlign: "center",
  },
  transparentTabBar: {
    backgroundColor: Colors.transparent,
    elevation: 0,
  },
});
