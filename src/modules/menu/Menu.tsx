import React from "react";
import {ScrollView} from "react-native";
import {CommonStyles} from "~/core/theme/commonStyles";

export const Menu = () => {
  return (
    <ScrollView testID={"MenuPageID"} contentInsetAdjustmentBehavior={"automatic"} style={CommonStyles.flex1}/>
  );
};
