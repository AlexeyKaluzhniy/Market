import React, {FC} from "react";
import {Image, ImageProps, StyleSheet} from "react-native";

interface IProps extends ImageProps {
  color: string;
}

export const AppIcon: FC<IProps> = (props: IProps) => {
  const style = StyleSheet.flatten([props.style, {tintColor: props.color}]);

  return <Image {...props} style={style} />;
};
