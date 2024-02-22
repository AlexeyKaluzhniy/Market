import React, {FC, memo, ReactNode, useCallback, useEffect, useMemo, useRef} from "react";
import {Animated, SafeAreaView, StyleProp, StyleSheet, View, ViewStyle} from "react-native";
import {ImageStyle} from "react-native-fast-image";
import {Navigation} from "react-native-navigation";
import {CommonSizes} from "~/core/theme/commonSizes";
import {Tabs} from "~/navigation/tabs";
import {Colors, ThemeColors} from "~/core/theme/colors";
import {NavigationTopBar} from "~/common/components/NavigationTopBar";
import {isAndroid, isIos, StatusBarHeight, StatusBarHeightIos} from "~/core/theme/commonConsts";
import AndroidKeyboardAdjust from "react-native-android-keyboard-adjust";
import {useMount} from "~/common/hooks/useMount";
import {useThemedStyles} from "~/core/theme/hooks";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

interface IProps {
  componentId: string;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  disableBackButton?: boolean;
  renderRightButton?: (color: string) => ReactNode;
  renderBackground?: (scrollY: Animated.Value) => ReactNode;
  renderHeader: ((scrollY: Animated.Value) => ReactNode) | FC;
  headerHeight: number;
  navBarTitle: string;
  onBack?: () => void;
  radiusless?: boolean;
  alwaysShowTitle?: boolean;
  headerAppearanceDistance?: number;
  children: React.ReactNode | React.ReactNode[];
}

const AnimatedKeyboardAwareScrollView = Animated.createAnimatedComponent(KeyboardAwareScrollView);

export const ScrollContainer: FC<IProps> = memo(
  ({
     componentId,
     style,
     containerStyle,
     contentContainerStyle,
     disableBackButton,
     children,
     renderRightButton,
     renderBackground,
     renderHeader,
     headerHeight,
     navBarTitle,
     onBack,
     radiusless,
     alwaysShowTitle,
     headerAppearanceDistance,
   }) => {
    const styles = useThemedStyles(stylesGetter);
    const scrollY = useRef(new Animated.Value(0));
    const headerAnimation = useRef(new Animated.Value(0));
    const scrollEvent = useRef(
      Animated.event(
        [
          {
            nativeEvent: {contentOffset: {y: scrollY.current}},
          },
        ],
        {
          useNativeDriver: true,
        },
      ),
    );

    useEffect(() => {
      if (componentId && disableBackButton) {
        Navigation.mergeOptions(componentId, {
          hardwareBackButton: {
            popStackOnPress: false,
          },
          popGesture: false,
        });
      }
    }, [componentId, disableBackButton]);

    const animatedStyles = useMemo(
      () => ({
        background: {
          ...styles.headerContainer,
          height: headerHeight,
          transform: [
            {
              translateY: scrollY.current.interpolate({
                inputRange: [0, headerHeight],
                outputRange: [0, -headerHeight / 2],
              }),
            },
            {
              scale: scrollY.current.interpolate({
                inputRange: [-10, 0, 1],
                outputRange: [1.08, 1, 1],
              }),
            },
          ],
        },
        headerStyle: {
          ...styles.headerContainer,
          height: headerHeight,
          transform: [
            {
              translateY: scrollY.current.interpolate({
                inputRange: [0, headerHeight],
                outputRange: [0, headerHeight / 2],
              }),
            },
            {
              scale: scrollY.current.interpolate({
                inputRange: [-15, 0, 1],
                outputRange: [1.08, 1, 1],
              }),
            },
          ],
        },
        defaultHeaderContainer: {
          ...styles.defaultHeaderContainer,
          opacity: headerAnimation.current.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 1],
            extrapolate: "clamp",
          }),
        },
        backContainer: {
          ...styles.backContainer,
          opacity: headerAnimation.current.interpolate({
            inputRange: [0, 100],
            outputRange: [1, 0],
            extrapolate: "clamp",
          }),
        },
      }),
      [styles, headerHeight],
    );

    const statusBarStyleRef = useRef<"visible" | "invisible">("invisible");
    useEffect(() => {
      const headerAppearanceCorrection = headerAppearanceDistance || 0;

      const scrollYRef = scrollY.current;

      const listener = scrollYRef.addListener((event) => {
        if (
          statusBarStyleRef.current == "invisible"
          && event.value > (headerHeight + headerAppearanceCorrection) - CommonSizes.spacing.medium * 4
        ) {
          Navigation.mergeOptions(componentId || Tabs.menu.id, {
            topBar: {
              visible: false,
            },
            statusBar: {
              translucent: false,
              drawBehind: true,
              style: styles.colors.theme == "light" ? "dark" : "light",
              backgroundColor: styles.colors.background,
            },
          });
          headerAnimation.current?.stopAnimation(() => {
            Animated.timing(headerAnimation.current, {
              toValue: 100,
              duration: 150,
              useNativeDriver: true,
            }).start();
          });
          statusBarStyleRef.current = "visible";
        } else if (
          statusBarStyleRef.current == "visible"
          && event.value < (headerHeight + headerAppearanceCorrection) - CommonSizes.spacing.medium * 4
        ) {
          Navigation.mergeOptions(componentId || Tabs.menu.id, {
            topBar: {
              visible: false,
            },
            statusBar: {
              translucent: false,
              drawBehind: true,
              style: "light",
              backgroundColor: Colors.transparent,
            },
          });
          headerAnimation.current?.stopAnimation(() => {
            Animated.timing(headerAnimation.current, {
              toValue: 0,
              duration: 150,
              useNativeDriver: true,
            }).start();
          });
          statusBarStyleRef.current = "invisible";
        }
      });

      return () => scrollYRef.removeListener(listener);
    }, [headerAppearanceDistance, componentId, headerHeight, styles]);

    const onBackLocal = useCallback(() => {
      Navigation.pop(componentId || Tabs.menu.id);
    }, [componentId]);

    useMount(() => {
      isAndroid && AndroidKeyboardAdjust.setAdjustResize();

      return () => {
        isAndroid && AndroidKeyboardAdjust.setAdjustPan();
      };
    });

    return (
      <SafeAreaView style={[styles.pageContainer, style]}>
        {renderBackground &&
          <Animated.View style={animatedStyles.background}>
            {renderBackground(scrollY.current)}
          </Animated.View>}
        <AnimatedKeyboardAwareScrollView
          keyboardDismissMode={"on-drag"}
          style={[styles.container, containerStyle]}
          contentContainerStyle={styles.contentContainer}
          onScroll={scrollEvent.current}
          enableAutomaticScroll={true}
          enableResetScrollToCoords={false}
          keyboardOpeningTime={100}
        >
          <Animated.View style={animatedStyles.headerStyle}>
            {renderHeader(scrollY.current)}
          </Animated.View>
          <View pointerEvents={"box-none"} style={{height: headerHeight - CommonSizes.spacing.mediumPlus}} />
          <View style={[radiusless ? styles.authContainerRadiusless : styles.authContainer, contentContainerStyle]}>{children}</View>
        </AnimatedKeyboardAwareScrollView>
        {disableBackButton && !renderRightButton ? null : (
          <Animated.View style={animatedStyles.backContainer}>
            <NavigationTopBar
              style={styles.transparentTopBar}
              title={alwaysShowTitle ? navBarTitle : ""}
              backHandler={disableBackButton ? undefined : (onBack || onBackLocal)}
              rightButtons={renderRightButton}
              color={styles.colors.text}
            />
          </Animated.View>
        )}
        <Animated.View style={animatedStyles.defaultHeaderContainer}>
          <NavigationTopBar
            style={styles.navBar}
            title={navBarTitle}
            backHandler={disableBackButton ? undefined : (onBack || onBackLocal)}
            rightButtons={renderRightButton}
          />
        </Animated.View>
      </SafeAreaView>
    );
  },
);

const stylesGetter = (colors: ThemeColors) => StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: colors.background,
    marginTop: isIos ? -StatusBarHeightIos : 0,
  } as ViewStyle,
  container: {
    flex: 1,
  } as ViewStyle,
  contentContainer: {
    flexGrow: 1,
  } as ViewStyle,
  authContainer: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: CommonSizes.borderRadius.medium,
  } as ViewStyle,
  authContainerRadiusless: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: CommonSizes.borderRadius.medium,
  },
  headerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  } as ViewStyle,
  defaultHeaderContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingTop: StatusBarHeight,
    backgroundColor: colors.background,
  } as ViewStyle,
  backContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingTop: StatusBarHeight,
  } as ViewStyle,
  backIconStyle: {
    width: 24,
    height: 24,
    tintColor: Colors.white,
  } as ImageStyle,
  navBar: {
    paddingTop: isIos ? StatusBarHeight + 10 : 10,
    paddingBottom: CommonSizes.spacing.small,
    backgroundColor: colors.background,
  },
  transparentTopBar: {
    paddingTop: isIos ? StatusBarHeight + 10 : 10,
    backgroundColor: Colors.transparent,
  },
});
