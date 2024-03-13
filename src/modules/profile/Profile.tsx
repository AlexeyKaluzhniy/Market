import {Image, StyleSheet, View} from "react-native";
import {NavigationFunctionComponent} from "react-native-navigation";
import React from "react";
import {CustomHeader} from "~/components/CustomHeader";
import {ImageResources} from "~/common/ImageResources.g";
import {Roboto} from "~/infrastructure";
import {CommonSizes} from "~/core/theme/commonSizes";
import {ThemeColors} from "~/core/theme/colors";
import {useThemeColors, useThemedStyles} from "~/core/theme/hooks";
import {CommonStyles} from "~/core/theme/commonStyles";

export const Profile: NavigationFunctionComponent = (props): JSX.Element => {
    const styles = useThemedStyles(stylesG);
    const colors = useThemeColors();

    return (
        <View style={styles.container}>
            <CustomHeader id={props.componentId} headerTitle="pages.profile" isProfile/>
            <View style={styles.body}>
                <View style={styles.avatarContainer}>
                    <Image source={ImageResources.avatar} style={styles.avatar}/>
                    <Roboto.Title.Large text={"Георгий Васильков"} style={styles.name} color={colors.onSurface}/>
                </View>
                <View style={styles.data}>
                    <Roboto.Label.Medium text={"E-mail"} color={colors.onSurface}/>
                    <Roboto.Body.Large text={"g.vasilkov@yandex.ru"} color={colors.onSurface}/>
                </View>
                <View style={styles.data}>
                    <Roboto.Label.Medium text={"Телефон"} color={colors.onSurface}/>
                    <Roboto.Body.Large text={"+ 373 777 2 54 97"} color={colors.onSurface}/>
                </View>
            </View>
        </View>
    );
};

const stylesG = (colors: ThemeColors) => StyleSheet.create({
    container: {
        ...CommonStyles.flex1,
        backgroundColor: colors.background
    },
    body: {
        paddingHorizontal: CommonSizes.padding.large,
    },
    data: {
        marginVertical: CommonSizes.margin.small
    },
    avatarContainer: {
        alignItems: 'center',
        borderBottomWidth: CommonSizes.borderWidth.extraThin,
        borderBottomColor: colors.outline,
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
