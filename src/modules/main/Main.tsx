import {NavigationFunctionComponent} from "react-native-navigation";
import {Button, View} from "react-native";
import React from "react";
import {navigation} from "~/services";
import {Components} from "~/navigation/components";

export const Main: NavigationFunctionComponent = (props): JSX.Element => {
    return (
        <View style={{flex: 1}}>
            <Button title='ModalShow'
                    onPress={() => navigation.showOverlay(Components.modalizeContainer, {screenIdSuffix: props.componentId})}/>
        </View>
    );
};
