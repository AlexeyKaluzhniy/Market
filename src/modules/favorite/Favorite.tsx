import {SafeAreaView, View} from "react-native";
import {NavigationFunctionComponent} from "react-native-navigation";
import React from "react";
import {CustomHeader} from "~/components/CustomHeader";
import {AddButton} from "~/components/AddButton";
import {CommonStyles} from "~/core/theme/commonStyles";
import {EmptyScreen} from "~/components/EmptyScreen";
import {ImageResources} from "~/common/ImageResources.g";

export const Favorite: NavigationFunctionComponent = (props): JSX.Element => {
    const images = null;

    return (
        <SafeAreaView style={CommonStyles.flex1}>
            <CustomHeader id={props.componentId} headerTitle="pages.favorite"/>
            {images ? <View></View> :
                <EmptyScreen
                    image={ImageResources.heart}
                    title={"emptyScreen.favorite.title"}
                    text={"emptyScreen.favorite.text"}/>
            }
            <AddButton/>
        </SafeAreaView>
    );
};
