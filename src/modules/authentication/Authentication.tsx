import {NavigationFunctionComponent} from "react-native-navigation";
import {StyleSheet, Text, View} from "react-native";
import React, {useCallback, useMemo, useState} from "react";
import {CommonStyles} from "~/core/theme/commonStyles";
import {useHideSplash} from "../splash/useHideSplash";
import {useTranslation} from "react-i18next";
import {LanguageButton} from "~/common/components/LanguageButton";
import {Route, TabBar, TabView} from "react-native-tab-view";
import {Login} from "./components/Login";
import {SignUp} from "./components/SignUp";
import {Colors, LightThemeColors} from "~/core/theme/colors";
import {windowWidth} from "~/core/theme/commonConsts";
import {CommonSizes} from "~/core/theme/commonSizes";

const tabTypes = ["login", "register"] as const;

export const Authentication: NavigationFunctionComponent = (): JSX.Element => {
    useHideSplash();

    const {t} = useTranslation();

    const routes = useMemo(() => tabTypes.map(type => ({key: type, title: t(`authentication.${type}`)})), [t]);
    const renderScene = useCallback((props: { route: Route }) => {
        switch (props.route.key) {
            case "login":
                return <Login/>;
            case "register":
                return <SignUp/>;
            default:
                return <Text></Text>;
        }
    }, []);

    const [index, setIndex] = useState(0);

    return (
        <View style={CommonStyles.flex1}>
            <LanguageButton/>
            <TabView
                navigationState={{index, routes}}
                renderScene={renderScene}
                onIndexChange={setIndex}
                renderTabBar={props =>
                    <TabBar
                        {...props}
                        style={tabStyles.tabBar}
                        indicatorStyle={tabStyles.indicatorStyle}
                        labelStyle={tabStyles.labelStyle}
                        activeColor={LightThemeColors.main}
                        tabStyle={tabStyles.tab}
                        pressColor={Colors.transparent}
                        pressOpacity={0}
                    />
                }
            />
        </View>
    );
};

const tabStyles = StyleSheet.create({
    indicatorStyle: {
        backgroundColor: LightThemeColors.main,
        height: 5,
        borderTopLeftRadius: CommonSizes.borderRadius.smallPlus,
        borderTopRightRadius: CommonSizes.borderRadius.smallPlus,
    },
    labelStyle: {
        color: LightThemeColors.text,
        textTransform: 'capitalize',
        marginBottom: CommonSizes.margin.smallPlus,
    },
    tab: {
        width: windowWidth / 2,
    },
    tabBar: {
        backgroundColor: Colors.white,
    }
});
