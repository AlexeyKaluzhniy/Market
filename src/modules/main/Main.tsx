import {NavigationFunctionComponent} from "react-native-navigation";
import {Text, View} from "react-native";
import {MainHeader} from "~/modules/main/components/MainHeader";
import {CommonStyles} from "~/core/theme/commonStyles";
import {AllAdvertisesList} from "~/modules/main/components/AllAdvertisesList";
import {useTranslation} from "react-i18next";
import React, {useCallback, useMemo} from "react";
import {Route} from "react-native-tab-view";
import {MyAdvertisesList} from "~/modules/main/components/MyAdvertisesList";
import {CustomTabs} from "~/components/CustomTabs";

const tabTypes = ["all", "my"] as const;

export const Main: NavigationFunctionComponent = (): JSX.Element => {
    const {t} = useTranslation();

    const routes = useMemo(() => tabTypes.map(type => ({key: type, title: t(`common.${type}`)})), [t]);
    const renderScene = useCallback((props: { route: Route }) => {
        switch (props.route.key) {
            case "all":
                return <AllAdvertisesList/>;
            case "my":
                return <MyAdvertisesList/>;
            default:
                return <Text></Text>;
        }
    }, []);

    return (
        <View style={CommonStyles.flex1}>
            <MainHeader/>
            <CustomTabs routes={routes} renderScene={renderScene}/>
        </View>
    );
};
