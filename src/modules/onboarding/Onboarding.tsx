import React, {useCallback, useEffect, useRef, useState} from "react";
import {ImageBackground, SafeAreaView, StyleSheet, TextStyle, View, ViewStyle} from "react-native";
import Carousel from "react-native-snap-carousel";
import {NavigationFunctionComponent} from "react-native-navigation";
import {useTranslation} from "react-i18next";
// import {firebase} from "@react-native-firebase/messaging";
import {OnboardingPagination} from "./components/OnboardingPagination";
import {CommonSizes} from "~/core/theme/commonSizes";
import {getTabsRootLayout} from "~/navigation/roots";
import {Colors} from "~/core/theme/colors";
import {windowWidth} from "~/core/theme/commonConsts";
import {PrimaryButton} from "~/common/components/PrimaryButton";
import {OnboardingResources} from "~/common/ImageResources.g";
import {CommonStyles} from "~/core/theme/commonStyles";
import {useAppDispatch, useAppSelector} from "~/core/store/store";
import {ButtonType, IOnboardingButton, IOnboardingData} from "~/types";
import {useHideSplash} from "../splash/useHideSplash";
import {navigation} from "~/services";
import {Brand, Regular} from "~/infrastructure";
import {SystemActions} from "~/core/store/system/systemSlice";
import {useMount} from "~/common/hooks/useMount";

export const Onboarding: NavigationFunctionComponent = () => {
  const carouselRef = useRef<Carousel<any> | null>(null);
  const [activeSlide, setActiveSlide] = useState<number>(0);
  // const [messagingStatus, setMessagingStatus] = useState<number>(0);
  const [carouselData, setCarouselData] = useState<IOnboardingData[]>([]);
  const [appTheme, deviceTheme] = useAppSelector(state => [
    state.system.appTheme,
    state.system.deviceTheme,
  ]);

  const dispatch = useAppDispatch();
  useHideSplash();

  useMount(() => {
    setTimeout(() => dispatch(SystemActions.setIsOnboardingVisited(true)), 300);
  });

  const {t} = useTranslation();

  useEffect(() => {
    setCarouselData([{
      header: t("onboarding.firstHeader"),
      body: t("onboarding.firstBody"),
      buttons: [{
        type: ButtonType.solid,
        text: t("common.continue"),
        actionType: "continue",
      }],
    }, {
      header: t("onboarding.secondHeader"),
      body: t("onboarding.secondBody"),
      buttons: [{
        type: ButtonType.solid,
        text: t("common.continue"),
        actionType: "continue",
      }],
    }, {
      header: t("onboarding.thirdHeader"),
      body: t("onboarding.thirdBody"),
      buttons: [{
        type: ButtonType.solid,
        text: t("onboarding.allowPush"),
        actionType: "allowPush",
      }, {
        type: ButtonType.outline,
        text: t("common.notNow"),
        actionType: "continue",
      }],
    }, {
      header: t("onboarding.forthHeader"),
      body: t("onboarding.forthBody"),
      buttons: [{
        type: ButtonType.solid,
        text: t("authentication.register"),
        actionType: "register",
      }, {
        type: ButtonType.outline,
        text: t("authentication.login"),
        actionType: "login",
      }],
    }]);
  }, [t]);

  const onNextPress = useCallback(() => {
    if (carouselRef.current) {
      carouselRef.current.snapToNext(true);
    }
  }, []);

  const onLogin = useCallback(async () => {
    // analytics.logEvent("onboarding_login");
    await navigation.setRootAsync(getTabsRootLayout(appTheme || deviceTheme || "dark"));
/*    await navigation.navigateWithoutTabsAsync(Pages.login, {
      params: {
        afterLoginCallback: () => navigation.updateOptions({bottomTabs: {currentTabId: Tabs.main.id}}),
      },
    });*/
    //todo add when login screen will implemented and analytics
  }, [appTheme, deviceTheme]);

  const onRegistration = useCallback(async () => {
    // analytics.logEvent("onboarding_registration");
    await navigation.setRootAsync(getTabsRootLayout(appTheme || deviceTheme || "dark"));
    // await navigation.navigateWithoutTabsAsync(Pages.signUp);
    //todo add navigation on signup and analytics
  }, [appTheme, deviceTheme]);

 /* const onMessagingStatus = useCallback((status: number) => {
    setMessagingStatus(status);
    if (status >= 1) {
      setCarouselData(data => {
        const newData = [...data];
        newData[2].buttons = [{
          type: ButtonType.solid,
          text: t("common.continue"),
          actionType: "continue",
        }];

        return newData;
      });
    } else if (status <= 0) {
      setCarouselData(data => {
        const newData = [...data];
        newData[2].buttons = [{
          type: ButtonType.solid,
          text: t("onboarding.allowPush"),
          actionType: "allowPush",
        }, {
          type: ButtonType.outline,
          text: t("common.notNow"),
          actionType: "continue",
        }];

        return newData;
      });
    }
  }, [setMessagingStatus, t]);*/

  /*const checkPermissions = useCallback(() => {
    firebase.messaging().hasPermission()
      .then((value) => onMessagingStatus(value))
      .catch((error) => {
        logger.warn("initial notification status failed", error);
      });
  }, [onMessagingStatus]);

  useEffect(() => {
    checkPermissions();
  }, [checkPermissions]);*/

  // useAppState({onForeground: checkPermissions});

 /* const onRequestNotifications = useCallback(() => {
    if (messagingStatus == -1) {
      firebase.messaging().requestPermission()
        .then((value) => {
          onMessagingStatus(value);
          // if (value == 0) {
          //   dispatch(ProfileActions.setNotificationSettings({
          //     result: {
          //       data: {push: false},
          //       loadState: LoadState.idle,
          //       error: null,
          //     }, params: undefined,
          //   }));
          // }
        })
        .catch((error) => {
          showAlert("Notifications not configured");
          logger.warn("Error during notification configuration", error);
        });
    } else {
      Alert.alert(t("onboarding.pushDeniedDialog.title"), t("onboarding.pushDeniedDialog.text"), [{
        text: t("onboarding.pushDeniedDialog.settings"),
        onPress: Linking.openSettings,
      }, {
        text: t("onboarding.pushDeniedDialog.cancel"),
        style: "cancel",
      }]);
    }

  }, [messagingStatus, onMessagingStatus, t]);*/

  const renderButton = useCallback((button: IOnboardingButton) => {
    let buttonStyle: ViewStyle;
    let labelStyle: ViewStyle | undefined;
    if (button.type == ButtonType.outline) {
      buttonStyle = StyleSheet.flatten([styles.buttonStyle, styles.whiteButton]);
      labelStyle = styles.whiteLabel;
    } else {
      buttonStyle = styles.buttonStyle;
      labelStyle = undefined;
    }

    let handler;
    switch (button.actionType) {
      case "continue":
        handler = onNextPress;
        break;
      case "allowPush":
        handler = () => console.log('ALLOW PUSH');
        break;
      case "register":
        handler = onRegistration;
        break;
      case "login":
        handler = onLogin;
        break;
      default:
        handler = undefined;
    }

    return (
      <PrimaryButton
        key={button.text}
        type={button.type}
        text={button.text}
        labelStyle={labelStyle}
        style={buttonStyle}
        onPress={handler}
      />
    );
  }, [onLogin, onNextPress, onRegistration]);

  const carouselItem = useCallback((baseData: {item: unknown; index: number; dataIndex: number}) => {
    const item = baseData.item as IOnboardingData;

    return (
      <ImageBackground
        style={styles.itemContainer}
        source={OnboardingResources[`onboarding_background_${baseData.index + 1}` as keyof OnboardingResources]}
      >
        <View style={styles.itemTextContainer}>
          <Brand.H1 color={Colors.white} style={CommonStyles.noTextTransform}>{item.header}</Brand.H1>
          <Regular.H1 color={Colors.white}>{item.body}</Regular.H1>
          <View style={styles.buttonsContainer}>
            {item.buttons.map(renderButton)}
          </View>
        </View>
      </ImageBackground>
    );
  }, [renderButton]);

  const onSkipOnboarding = useCallback(() => {
    // analytics.logEvent("skip_onboarding", {activeSlide: activeSlide + 1});
    navigation.setRoot(getTabsRootLayout(appTheme || deviceTheme || "dark"));
  }, [activeSlide, appTheme, deviceTheme]);

  return (
    <View style={CommonStyles.flex1}>
      <Carousel
        ref={ref => carouselRef.current = ref}
        data={carouselData}
        renderItem={carouselItem}
        sliderWidth={windowWidth}
        itemWidth={windowWidth}
        onSnapToItem={setActiveSlide}
        inactiveSlideScale={1}
        inactiveSlideOpacity={1}
        containerCustomStyle={styles.container}
        vertical={false}
      />
      <SafeAreaView>
        <OnboardingPagination
          activeIndex={activeSlide} totalItems={carouselData.length}
          onSkipPress={onSkipOnboarding}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.dark,
  } as ViewStyle,
  itemContainer: {
    flex: 1,
    padding: CommonSizes.spacing.medium,
    justifyContent: "flex-end",
  } as ViewStyle,
  buttonsContainer: {
    minHeight: 128,
  } as ViewStyle,
  buttonStyle: {
    marginTop: CommonSizes.spacing.medium,
    paddingVertical: CommonSizes.spacing.small,
  } as ViewStyle,
  whiteButton: {
    borderColor: Colors.white,
  } as ViewStyle,
  whiteLabel: {
    color: Colors.white,
  } as TextStyle,
  itemTextContainer: {
    height: 280,
    justifyContent: "space-between",
    marginTop: CommonSizes.spacing.large,
  } as ViewStyle,
});

Onboarding.options = {
  statusBar: {
    translucent: false,
    drawBehind: true,
    style: "light",
    backgroundColor: Colors.transparent,
  },
};
