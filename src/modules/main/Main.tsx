import {NavigationFunctionComponent} from "react-native-navigation";
import {ScrollView} from "react-native";
import React from "react";
import {CommonStyles} from "~/core/theme/commonStyles";
import {useHideSplash} from "~/modules/splash/useHideSplash";

export const Main: NavigationFunctionComponent = (): JSX.Element => {
  useHideSplash();
  return <ScrollView testID={"MainPageID"} contentInsetAdjustmentBehavior={"automatic"} style={CommonStyles.flex1}/>;
};
