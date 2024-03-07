import {SafeAreaView, Text} from "react-native";
import {NavigationFunctionComponent} from "react-native-navigation";
import React from "react";
import {CustomHeader} from "~/components/CustomHeader";
import {AddButton} from "~/components/AddButton";
import {CommonStyles} from "~/core/theme/commonStyles";

export const Favorite: NavigationFunctionComponent = (props): JSX.Element => {
    return (
        <SafeAreaView style={CommonStyles.flex1}>
            <CustomHeader id={props.componentId} headerTitle="pages.favorite"/>
            <Text>Избранные</Text>
            <AddButton/>
        </SafeAreaView>
    );
};
