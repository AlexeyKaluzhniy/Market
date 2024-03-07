import {SafeAreaView, Text} from "react-native";
import {NavigationFunctionComponent} from "react-native-navigation";
import React from "react";
import {CustomHeader} from "~/components/CustomHeader";

export const Profile: NavigationFunctionComponent = (props): JSX.Element => {
    return (
        <SafeAreaView>
            <CustomHeader id={props.componentId} headerTitle="pages.profile" isProfile/>
            <Text>Профиль</Text>
        </SafeAreaView>
    );
};
