import {NavigationFunctionComponent} from "react-native-navigation";
import {SafeAreaView, StyleSheet, Text, View} from "react-native";
import React, {useCallback, useMemo} from "react";
import {CommonStyles} from "~/core/theme/commonStyles";
import {useHideSplash} from "../splash/useHideSplash";
import {useTranslation} from "react-i18next";
import {LanguageButton} from "~/common/components/LanguageButton";
import {Route} from "react-native-tab-view";
import {Login} from "./components/Login";
import {SignUp} from "./components/SignUp";
import {CustomTabs} from "~/components/CustomTabs";
import {CommonSizes} from "~/core/theme/commonSizes";

const tabTypes = ["login", "register"] as const;

export const Authentication: NavigationFunctionComponent = (navProps): JSX.Element => {
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

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.languageContainer}>
                <LanguageButton/>
            </View>
            <CustomTabs renderScene={renderScene} routes={routes}/>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        ...CommonStyles.flex1,
    },
    languageContainer: {
        marginRight: CommonSizes.margin.extraLarge
    }
});
