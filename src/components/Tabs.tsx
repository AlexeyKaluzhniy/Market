import React, {memo, ReactElement, useCallback, useEffect, useMemo, useState} from "react";
import {
  Route,
  TabBar,
  TabBarIndicator,
  TabBarIndicatorProps,
  TabBarItem,
  TabBarItemProps,
  TabBarProps,
  TabView,
  TabViewProps,
} from "react-native-tab-view";
import {windowWidth} from "~/core/theme/commonConsts";
import {StyleProp, StyleSheet, TextStyle} from "react-native";
import {NavigationState, SceneRendererProps} from "react-native-tab-view";
import {Scene} from "react-native-tab-view/lib/typescript/src/types";
import {CommonStyles} from "~/core/theme/commonStyles";
import {ThemeColors} from "~/core/theme/colors";
import {CommonSizes} from "~/core/theme/commonSizes";
import {Brand} from "~/infrastructure";
import {useThemeColors, useThemedStyles} from "~/core/theme/hooks";

type TabRoute = Route & {isFirst: boolean; isLast: boolean};

interface IProps<T extends Route, B extends Route> extends Omit<TabViewProps<T>, keyof {navigationState: any; onIndexChange: any}> {
  routes: TabViewProps<B>["navigationState"]["routes"];
  initialRouteKey?: string;
  onIndexChange?: (index: number) => void;
  forcedRouteIndex?: number;
}

export const TabsMargined: <T extends Route>(props: IProps<T & TabRoute, T> & {edgePadding?: number}) => ReactElement | null = memo((
  {
    edgePadding = CommonSizes.spacing.medium,
    routes,
    renderTabBar = CustomTabBar,
    ...tabsProps
  },
) => {
  const colors = useThemeColors();

  return (
    <Tabs
      {...tabsProps}
      renderTabBar={(tabBarProps) => renderTabBar({
        ...tabBarProps,
        renderTabBarItem: (props) => {
          const customStyle = props.route.isFirst ? {paddingLeft: edgePadding} : props.route.isLast ? {paddingRight: edgePadding} : {};

          return CustomTabBarItem({
            ...props,
            tabContainerStyle: StyleSheet.compose(props.tabContainerStyle, customStyle),
            activeColor: colors.text,
            inactiveColor: colors.text,
          });
        },
        renderIndicator: (props: TabBarIndicatorProps<Route>) => {
          return (
            <TabBarIndicator
              {...props}
              getTabWidth={(i) => props.getTabWidth(i) - (i == 0 || i == props.navigationState.routes.length - 1 ? edgePadding : 0)}
            />
          );
        },
      })}
      routes={useMemo(() => routes.map((el, i) => ({
        ...el,
        isFirst: i == 0,
        isLast: i == routes.length - 1,
      })), [routes])}
    />
  );
});

export const Tabs: <T extends Route>(props: IProps<T, T>) => ReactElement | null = memo((props) => {
  const {routes, initialRouteKey, forcedRouteIndex, onIndexChange, ...tabProps} = props;
  const initialRouteIndex = routes.findIndex(el => el.key == initialRouteKey);
  const [index, setIndex] = useState(initialRouteIndex == -1 ? 0 : initialRouteIndex);
  const onTabIndexChange = useCallback((newIndex: number) => {
    setIndex(newIndex);
    onIndexChange?.(newIndex);
  }, [onIndexChange]);
  useEffect(() => {
    if (forcedRouteIndex != null && forcedRouteIndex >= 0) {
      setIndex(forcedRouteIndex);
    }
  }, [forcedRouteIndex]);

  return (
    <TabView
      lazy
      initialLayout={useMemo(() => ({width: windowWidth, height: 0}), [])}
      navigationState={useMemo(() => ({index, routes}), [index, routes])}
      renderTabBar={CustomTabBar}
      onIndexChange={onTabIndexChange}
      //todo add focused to renderScene
      {...tabProps}
    />
  );
});

export const CustomTabBar = <T extends Route>(props: SceneRendererProps & Partial<TabBarProps<T>> & {
  navigationState: NavigationState<T>;
}) => {
  const renderCustomLabel = useCallback((labelProps: Scene<Route> & {
    focused: boolean;
    color: string;
    style?: StyleProp<TextStyle>;
  }) => <CustomLabel {...labelProps} />, []);
  const styles = useThemedStyles(stylesG);

  return (
    <TabBar
      scrollEnabled={true}
      tabStyle={styles.tab}
      contentContainerStyle={CommonStyles.flexGrow}
      indicatorStyle={styles.indicator}
      indicatorContainerStyle={styles.indicatorContainer}
      renderTabBarItem={CustomTabBarItem}
      renderLabel={renderCustomLabel}
      {...props}
      style={[styles.tabBar, props.style]}
    />
  );
};

export const CustomTabBarItem = <T extends Route>(props: TabBarItemProps<T> & {key: string}) => {
  return (
    <TabBarItem
      {...props}
      tabContainerStyle={[CommonStyles.flexGrow, CommonStyles.flex1, props.tabContainerStyle]}
    />
  );
};

export const CustomLabel = (props: Scene<Route> & {
  focused: boolean;
  color: string;
  style?: StyleProp<TextStyle>;
}) => {
  const styles = useThemedStyles(stylesG);
  const Component = props.focused ? Brand.H4 : Brand.H5;
  const anyRoute = props.route as any;
  const componentStyle = useMemo(() => {
    return [
      styles.label,
      props.style,
      anyRoute.fontSize ? {fontSize: anyRoute.fontSize} : null,
      {letterSpacing: props.focused ? undefined : 0.2} as TextStyle
    ];
  }, [anyRoute.fontSize, props.focused, props.style, styles.label]);

  return (
    <Component style={componentStyle} numberOfLines={1} allowFontScaling={false}>
      {props.route.title}
    </Component>
  );
};

const stylesG = (colors: ThemeColors) => StyleSheet.create({
  indicatorContainer: {
    marginHorizontal: 16,
  },
  tabBar: {
    ...CommonStyles.shadow,
    backgroundColor: colors.background,
  },
  tab: {
    minHeight: 1,
    width: "auto",
    padding: 0,
    alignItems: "stretch",
  },
  indicator: {
    backgroundColor: colors.main,
    height: 2,
  },
  label: {
    flexGrow: 1,
    color: colors.text,
    textAlign: "center",
    textTransform: "uppercase",
    paddingTop: 8,
    paddingBottom: 6,
  },
});

