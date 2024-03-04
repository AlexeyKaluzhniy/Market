import {NavigationFunctionComponent} from "react-native-navigation";
import {Button, View} from "react-native";
import React from "react";
import {ModalizeContainer} from "~/components/ModalizeContainer";

export const Main: NavigationFunctionComponent = (props): JSX.Element => {
    return (
        <View>
            <Button title='ModalShow' onPress={() => console.log('+')}/>
            <ModalizeContainer componentId={props.componentId}/>
        </View>
    );
};
