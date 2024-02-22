import React, {memo, useCallback, useMemo, useRef} from "react";
import {Image, ScrollViewProps, StyleSheet, ViewStyle} from "react-native";
import {Modalize, ModalizeProps} from "react-native-modalize";
import {isIos} from "~/core/theme/commonConsts";
import {Colors, ThemeColors} from "~/core/theme/colors";
import {useThemedStyles} from "~/core/theme/hooks";
import {Navigation, NavigationFunctionComponent} from "react-native-navigation";
import {CommonSizes} from "~/core/theme/commonSizes";
import {TouchablePlatform} from "~/common/components/TouchablePlatform";
import {useMount} from "~/common/hooks/useMount";
import {ImageResources} from "~/common/ImageResources.g";

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
      <Image source={ImageResources.close_modal} />
    </TouchablePlatform>
  ), [closeModal, styles.closeContainer]);

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
  } as ViewStyle,
  modalContainer: {
    backgroundColor: colors.element,
    overflow: "visible",
  } as ViewStyle,
  closeContainer: {
    alignSelf: "flex-end",
    margin: CommonSizes.spacing.medium,
    backgroundColor: `${colors.background}66`,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  } as ViewStyle,
});

ModalizeContainer.options = {
  layout: {
    componentBackgroundColor: Colors.transparent,
  },
  overlay: {
    interceptTouchOutside: false,
  },
};
