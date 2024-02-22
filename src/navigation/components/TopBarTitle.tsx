import React from "react";
import {View} from "react-native";
import {NavigationFunctionComponent} from "react-native-navigation";
import { Brand } from "~/infrastructure";
import {Colors} from "~/core/theme/colors";
import {TFuncKeyApp} from "~/common/localization/localization";

interface IProps {
  title: TFuncKeyApp
}

export const TopBarTitle: NavigationFunctionComponent<IProps> = (props) => {
  return (
    <View>
      <Brand.H1 color={Colors.black} labelKey={props.title}/>
    </View>
  );
};
