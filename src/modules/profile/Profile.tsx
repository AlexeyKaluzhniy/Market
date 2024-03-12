import {Image, SafeAreaView, StyleSheet, View} from "react-native";
import {NavigationFunctionComponent} from "react-native-navigation";
import React from "react";
import {CustomHeader} from "~/components/CustomHeader";
import {ImageResources} from "~/common/ImageResources.g";
import {Roboto} from "~/infrastructure";
import {CommonSizes} from "~/core/theme/commonSizes";
import {LightThemeColors} from "~/core/theme/colors";

export const Profile: NavigationFunctionComponent = (props): JSX.Element => {
    return (
        <SafeAreaView>
            <CustomHeader id={props.componentId} headerTitle="pages.profile" isProfile/>
            <View style={styles.container}>
                <View style={styles.avatarContainer}>
                    <Image source={ImageResources.avatar} style={styles.avatar}/>
                    <Roboto.Title.Large text={"Георгий Васильков"} style={styles.name}/>
                </View>
                <View style={styles.data}>
                    <Roboto.Label.Medium text={"E-mail"}/>
                    <Roboto.Body.Large text={"g.vasilkov@yandex.ru"}/>
                </View>
                <View style={styles.data}>
                    <Roboto.Label.Medium text={"Телефон"}/>
                    <Roboto.Body.Large text={"+ 373 777 2 54 97"}/>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: CommonSizes.padding.large
    },
    data: {
        marginVertical: CommonSizes.margin.small
    },
    avatarContainer: {
        alignItems: 'center',
        borderBottomWidth: CommonSizes.borderWidth.extraThin,
        borderBottomColor: LightThemeColors.outline,
        paddingTop: CommonSizes.padding.extraLargePlus,
        paddingBottom: CommonSizes.padding.large,
        marginBottom: CommonSizes.margin.largePlus
    },
    avatar: {
        width: 100,
        height: 100
    },
    name: {
        marginTop: CommonSizes.margin.medium
    }
});
