import React, {memo, useCallback, useMemo, useRef} from "react";
import {ScrollViewProps, StyleSheet, ViewStyle} from "react-native";
import {Modalize, ModalizeProps} from "react-native-modalize";
import {isIos} from "~/core/theme/commonConsts";
import {Colors, LightThemeColors, ThemeColors} from "~/core/theme/colors";
import {useThemedStyles} from "~/core/theme/hooks";
import {Navigation, NavigationFunctionComponent} from "react-native-navigation";
import {TouchablePlatform} from "~/common/components/TouchablePlatform";
import {useMount} from "~/common/hooks/useMount";
import {Roboto} from "~/infrastructure";
import {CommonSizes} from "~/core/theme/commonSizes";

interface IProps {
  getHeaderComponent?: (closeButton: React.ReactNode) => React.ReactNode;
  getContentComponent?: (close: () => void) => React.ReactNode;
  modalizeProps?: Omit<ModalizeProps, "HeaderComponent" | "children">;
}

export const ModalizeContainer: NavigationFunctionComponent<IProps> = memo((props) => {
  const {getHeaderComponent, getContentComponent, modalizeProps} = props;
  const styles = useThemedStyles(styleGetter);
  const modalizeRef = useRef<Modalize>();

  useMount(() => modalizeRef.current?.open());

  const closeModal = useCallback(() => {
    modalizeRef.current?.close();
    setTimeout(async () => Navigation.dismissAllOverlays(), 300);
  }, []);

  const close = useCallback(() => {
    Navigation.dismissAllOverlays();
  }, []);

  const scrollViewProps: ScrollViewProps = useMemo(() => ({bounces: false}), []);

  const closeButton = useMemo(() => (
    <TouchablePlatform onPress={closeModal} style={styles.closeContainer}>
      <Roboto.Label.Large labelKey={"common.done"} style={styles.done}/>
    </TouchablePlatform>
  ), [closeModal, styles.closeContainer, styles.done]);

  return (
    <Modalize
      withHandle={true}
      handlePosition={"inside"}
      adjustToContentHeight={true}
      scrollViewProps={scrollViewProps}
      keyboardAvoidingBehavior={isIos ? "padding" : undefined}
      avoidKeyboardLikeIOS={true}
      onClosed={close}
      ref={modalizeRef}
      useNativeDriver={true}
      snapPoint={50}
      HeaderComponent={getHeaderComponent?.(closeButton) || closeButton}
      {...modalizeProps}
      handleStyle={styles.handleLine}
      modalStyle={styles.modalContainer}
    >
      {getContentComponent?.(closeModal) || undefined}
    </Modalize>
  );
});

const styleGetter = (colors: ThemeColors) => StyleSheet.create({
  handleLine: {
    backgroundColor: `${colors.background}88`,
    width: 32,
    marginTop: CommonSizes.margin.largePlus
  } as ViewStyle,
  modalContainer: {
    backgroundColor: LightThemeColors.background,
    overflow: "visible",
  } as ViewStyle,
  closeContainer: {
    alignSelf: 'flex-end',
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: CommonSizes.padding.superLarge
  } as ViewStyle,
  done: {
    color: LightThemeColors.main
  } as ViewStyle
});

ModalizeContainer.options = {
  layout: {
    componentBackgroundColor: Colors.transparent,
  },
  overlay: {
    interceptTouchOutside: false,
  },
};
