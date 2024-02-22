import React from "react";
import {TryAgain} from "./TryAgain";
import {LoadingComponent} from "./LoadingComponent";
import {FetchBaseQueryError} from "@reduxjs/toolkit/dist/query/react";
import {SerializedError} from "@reduxjs/toolkit";

type Props = {
  isLoading: boolean;
  error?: string | null;
  tryAgain?: () => void;
  FallbackComponent?: React.ComponentType<any> | React.ReactElement | null;
  loaderSize?: "small" | "large";
} & ({
  errorText: string | null;
} | {
  error: FetchBaseQueryError | SerializedError;
});

export const WrapperEmptyComponent = ({isLoading, tryAgain, FallbackComponent, loaderSize, ...props}: Props) => {
  const error = (props as any).error;
  const errorText = (props as any).errorText;
  if (error || errorText) {
    return <TryAgain onPress={tryAgain} error={error} errorText={errorText} isLoading={isLoading} />;
  }
  if (isLoading) {
    return <LoadingComponent size={loaderSize} />;
  } else {
    return FallbackComponent ? typeof FallbackComponent == "object" ? FallbackComponent : <FallbackComponent /> : null;
  }
};
