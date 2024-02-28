import React from "react";
import {View} from "react-native";
import {NavigationFunctionComponent} from "react-native-navigation";
import {Colors} from "../../core/theme/colors";
import {TFuncKeyApp} from "../../common/localization/localization";
import {Roboto} from "~/infrastructure/typography";

interface IProps {
    title: TFuncKeyApp;
}

export const TopBarTitle: NavigationFunctionComponent<IProps> = (props) => {
    return (
        <View>
            <Roboto.Display.Large color={Colors.black} labelKey={props.title}/>
        </View>
    );
};
