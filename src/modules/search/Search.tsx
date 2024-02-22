import {NavigationFunctionComponent} from "react-native-navigation";
import {ScrollView} from "react-native";
import React from "react";
import {CommonStyles} from "~/core/theme/commonStyles";

export const Search: NavigationFunctionComponent = (): JSX.Element => {
    return <ScrollView contentInsetAdjustmentBehavior={"automatic"} style={CommonStyles.flex1}/>;
};
