import {Image, StyleSheet, TouchableOpacity, View} from "react-native";
import {CommonStyles} from "~/core/theme/commonStyles";
import {ImageResources} from "~/common/ImageResources.g";
import {Roboto} from "~/infrastructure";
import MailIcon from "../../../../resources/icons/mail.svg";
import PhoneIcon from "../../../../resources/icons/phone.svg";
import React from "react";
import {CommonSizes} from "~/core/theme/commonSizes";
import {useThemeColors, useThemedStyles} from "~/core/theme/hooks";
import {ThemeColors} from "~/core/theme/colors";

interface IPublisherProps {
    navigateToUserProfile: () => void;
}

export function Publisher({navigateToUserProfile}: IPublisherProps) {
    const colors = useThemeColors();
    const styles = useThemedStyles(stylesG);

    return (
        <>
            <View style={styles.outline}/>
            <TouchableOpacity style={styles.contentContainer} activeOpacity={0.7}
                              onPress={navigateToUserProfile}>
                <View style={CommonStyles.rowCenter}>
                    <Image source={ImageResources.avatar} style={styles.avatar}/>
                    <View style={styles.name}>
                        <Roboto.Body.Large text={"Евлампия Романова"} color={colors.onSurface}/>
                        <Roboto.Body.Small text={"на купи - и точка с декабря 2024"} color={colors.onSurface}/>
                    </View>
                </View>
                <View style={styles.mailContainer}>
                    <MailIcon color={colors.outline}/>
                    <Roboto.Body.Large text={"e.romanova@mail.ru"} style={styles.profileText}/>
                </View>
                <View style={CommonStyles.rowCenter}>
                    <PhoneIcon/>
                    <Roboto.Body.Large text={"+ 373 779 3 12 03"} style={[styles.profileText, styles.phoneText]}/>
                </View>
            </TouchableOpacity>
        </>
    );
}

const stylesG = (colors: ThemeColors) => StyleSheet.create({
    contentContainer: {
        marginHorizontal: CommonSizes.margin.largePlus,
    },
    outline: {
        height: 1,
        marginVertical: CommonSizes.margin.largePlus,
        backgroundColor: colors.outline
    },
    profileText: {
        marginLeft: CommonSizes.margin.largePlus,
        color: colors.onSurface
    },
    mailContainer: {
        ...CommonStyles.rowCenter,
        marginVertical: CommonSizes.margin.largePlus
    },
    phoneText: {
        marginLeft: CommonSizes.margin.medium
    },
    avatar: {
        width: 40,
        height: 40
    },
    name: {
        marginLeft: CommonSizes.margin.largePlus
    }
});
