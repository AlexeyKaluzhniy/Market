import React from "react";
import {Constructor, SectionList, SectionListProps} from "react-native";
import {IWrapperProps, Wrapper} from "./Wrapper";

export function SectionListWrapper<T>({isLoading, tryAgain, error, ...props}: IWrapperProps & SectionListProps<T>) {
  const Component: Constructor<React.Component<SectionListProps<T>>> = SectionList;

  return (
    <Wrapper
      isLoading={isLoading}
      tryAgain={tryAgain}
      error={error}
      Component={Component}
      props={props}
    />
  );
}
