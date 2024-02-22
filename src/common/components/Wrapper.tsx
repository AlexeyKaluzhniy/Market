import React, {useMemo} from "react";
import {StyleSheet, ViewStyle, VirtualizedListWithoutRenderItemProps} from "react-native";
import {EmptyView} from "./EmptyView";
import {defaultKeyIdExtractor} from "../helpers/defaultKeyIdExtractor";
import {isAndroid} from "~/core/theme/commonConsts";
import {WrapperEmptyComponent} from "./WrapperEmptyComponent";
import {useTranslation} from "react-i18next";
import {FetchBaseQueryError} from "@reduxjs/toolkit/dist/query/react";
import {SerializedError} from "@reduxjs/toolkit";

type ListProps<T> =
  VirtualizedListWithoutRenderItemProps<T>
  & {
  ItemSeparatorComponent?: React.ComponentType<any> | null | undefined;
};

export interface IWrapperProps {
  isLoading: boolean;
  tryAgain?: () => void;
  emptyTitle?: string;
  emptyDescription?: string;
  loaderSize?: "small" | "large";
  errorText?: string | null;
  error?: FetchBaseQueryError | SerializedError;
}

interface IProps<T> extends IWrapperProps {
  Component: React.ComponentType<T>;
  props: T;
  isLoading: boolean;
  tryAgain?: () => void;
}

//todo hide firstLoad, error, tryAgain and loadMore inside wrapper
export function Wrapper<T extends ListProps<any>>(
  {isLoading, tryAgain, error, errorText, Component, emptyTitle, emptyDescription, loaderSize, ...props}: IProps<T>,
) {
  const {t} = useTranslation();
  const ListEmptyComponent = useMemo(() => {
    return (
      <WrapperEmptyComponent
        isLoading={isLoading}
        tryAgain={tryAgain}
        error={error as any}
        errorText={errorText as any}
        loaderSize={loaderSize}
        FallbackComponent={
          props.props.ListEmptyComponent
          || (
            <EmptyView
              title={emptyTitle || t("empty.noData")}
              description={emptyDescription || t("empty.checkThisPageLater")}
            />
          )}
      />
    );
  }, [isLoading, tryAgain, error, errorText, loaderSize, props.props.ListEmptyComponent, emptyTitle, t, emptyDescription]);

  return (
    <Component
      contentContainerStyle={styles.contentContainer}
      removeClippedSubviews={isAndroid}
      refreshing={isLoading}
      keyExtractor={defaultKeyIdExtractor}
      onEndReachedThreshold={1}
      {...props.props}
      ListEmptyComponent={ListEmptyComponent}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
  } as ViewStyle,
});
