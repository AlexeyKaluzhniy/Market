import {Text, View} from "react-native";
import {NavigationFunctionComponent} from "react-native-navigation";
import React from "react";
import {Components} from "~/navigation/components";
import {i18next} from "~/common/localization/localization";

export const Favorite: NavigationFunctionComponent = (): JSX.Element => {
    return (
        <View>
            <Text>Избранные</Text>
        </View>
    );
};

Favorite.options = {
    topBar: {
        title: {
            component: {
                id: Components.topBarHeader.id,
                name: Components.topBarHeader.name,
                passProps: {
                    title: i18next.t("pages.favorite"),
                    isProfile: false,
                }
            },
        }
    }
}
