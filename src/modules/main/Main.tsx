import {NavigationFunctionComponent} from "react-native-navigation";
import {StyleSheet, Text, View} from "react-native";
import {MainScreenHeader} from "~/modules/main/components/MainScreenHeader";
import {CommonStyles} from "~/core/theme/commonStyles";
import {AllAdvertisesList} from "~/modules/main/components/AllAdvertisesList";
import {useTranslation} from "react-i18next";
import React, {useCallback, useEffect, useMemo} from "react";
import {Route} from "react-native-tab-view";
import {MyAdvertisesList} from "~/modules/main/components/MyAdvertisesList";
import {CustomTabs} from "~/components/CustomTabs";
import {AddButton} from "~/components/AddButton";
import {useLazyGetAdsQuery} from "~/core/store/api/ad/adQuery";
import {useHideSplash} from "~/modules/splash/useHideSplash";

const tabTypes = ["all", "my"] as const;

export const Main: NavigationFunctionComponent = (): JSX.Element => {
    const {t} = useTranslation();
    const [advertiseTrigger] = useLazyGetAdsQuery();

    useHideSplash();

    useEffect(() => {
        advertiseTrigger();
    }, [advertiseTrigger]);

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
        <View style={styles.container}>
            <MainScreenHeader/>
            <CustomTabs routes={routes} renderScene={renderScene}/>
            <AddButton/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...CommonStyles.flex1,
    }
});
