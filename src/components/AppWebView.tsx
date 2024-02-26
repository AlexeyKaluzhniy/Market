import React, {FC, memo, useCallback, useRef, useState} from "react";
import WebView, {WebViewProps} from "react-native-webview";
import type {
  ShouldStartLoadRequest,
  WebViewErrorEvent,
  WebViewNavigationEvent,
  WebViewProgressEvent,
} from "react-native-webview/lib/WebViewTypes";
import {HttpUrl} from "../common/urls/httpUrl";
import {LoadingComponent} from "../common/components/LoadingComponent";
import {Image, ImageStyle, StyleSheet, View, ViewStyle} from "react-native";
import {ThemeColors} from "../core/theme/colors";
import {useThemedStyles} from "../core/theme/hooks";
import {TryAgain} from "../common/components/TryAgain";
import {useTranslation} from "react-i18next";
import NetInfo from "@react-native-community/netinfo";
import {TouchablePlatform} from "../common/components/TouchablePlatform";
import {ImageResources} from "../common/ImageResources.g";
import {CommonSizes} from "../core/theme/commonSizes";

interface IProps extends WebViewProps {
  onRef?: (ref: WebView) => void;
}

export const AppWebView: FC<IProps> = memo((props) => {
  const styles = useThemedStyles(stylesGetter);
  const {t} = useTranslation();
  const webViewRef = useRef<WebView | null>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const filterScript =
      /*/
      ""
      /*/
      `(function() {
  try {
    const header = document.getElementsByTagName("header")[0];
    if (header) {
      header.style.display = "none";
      // header.parentNode.removeChild(header);
    }
    const footer = document.getElementsByTagName("footer")[0];
    if (footer) {
      footer.style.display = "none";
      // footer.parentNode.removeChild(footer);
    }
  } catch (e) {
    window.ReactNativeWebView && window.ReactNativeWebView.postMessage(e.message);
  }
})()`
    /**/;

  const onRequest = useCallback((event: ShouldStartLoadRequest) => {
    console.log("onRequest event", {...event});
    if (event.url.indexOf("spartak.com") < 0) {
      new HttpUrl(event.url).tryOpen();

      return false;
    }

    return props?.onShouldStartLoadWithRequest?.(event) || true;
  }, [props]);

  const localOnLoadProgress = useCallback((e: WebViewProgressEvent) => {
    setCanGoBack(e.nativeEvent.canGoBack);
    props.onLoadProgress?.(e);
  }, [props]);

  const localOnLoadEnd = useCallback((e: WebViewNavigationEvent | WebViewErrorEvent) => {
    setIsLoading(false);
    props.onLoadEnd?.(e);
  }, [props]);

  const localOnError = useCallback((e: WebViewErrorEvent) => {
    setIsError(true);
    props.onError?.(e);
  }, [props]);

  const onRef = useCallback((reference: WebView) => {
    webViewRef.current = reference;
    props.onRef?.(reference);
  }, [props]);

  const isInternetReachable = NetInfo.useNetInfo().isInternetReachable;

  if (!isInternetReachable && !isLoading || isError) {
    return (
      <TryAgain errorText={t("errors.connectionError")} isLoading={false} onPress={webViewRef?.current?.reload} />
    );
  }

  return (
    <>
      <WebView
        {...props}
        ref={onRef}
        onShouldStartLoadWithRequest={onRequest}
        onLoadEnd={localOnLoadEnd}
        onLoadProgress={localOnLoadProgress}
        onError={localOnError}
        injectedJavaScript={props.injectedJavaScript ? filterScript + props.injectedJavaScript : filterScript}
        pullToRefreshEnabled={true}
      />
      {isLoading &&
        <View style={[StyleSheet.absoluteFill, styles.loader]}>
          <LoadingComponent size={"large"} />
        </View>
      }
      {canGoBack && <TouchablePlatform style={styles.backButton} onPress={webViewRef.current?.goBack}>
        <Image source={ImageResources.arrow_left} style={styles.backIcon} />
      </TouchablePlatform>}
    </>
  );
});

const stylesGetter = (colors: ThemeColors) => StyleSheet.create({
  loader: {
    backgroundColor: colors.background,
  } as ViewStyle,
  backButton: {
    backgroundColor: `${colors.background}88`,
    position: "absolute",
    top: CommonSizes.spacing.medium,
    left: CommonSizes.spacing.medium,
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  } as ViewStyle,
  backIcon: {
    tintColor: colors.text,
  } as ImageStyle,
});
