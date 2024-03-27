import {Image, StyleSheet, View} from "react-native";
import {ImageResources} from "~/common/ImageResources.g";
import {Roboto} from "~/infrastructure";
import React from "react";
import {useThemeColors, useThemedStyles} from "~/core/theme/hooks";
import {ThemeColors} from "~/core/theme/colors";
import {CommonStyles} from "~/core/theme/commonStyles";
import {CommonSizes} from "~/core/theme/commonSizes";
import {IUserData} from "~/infrastructure/dto/common/IUserData";

interface IProfileDataProps {
    user: IUserData;
}

export function ProfileData({user}: IProfileDataProps) {
    const styles = useThemedStyles(stylesG);
    const colors = useThemeColors();

    return (
        <View style={styles.body}>
            <View style={styles.avatarContainer}>
                <Image source={user.avatar || ImageResources.avatar} style={styles.avatar}/>
                {user.name && <Roboto.Title.Large text={user.name} style={styles.name} color={colors.onSurface}/>}
            </View>
            {user.email &&
                <View style={styles.data}>
                    <Roboto.Label.Medium text={"E-mail"} color={colors.onSurface}/>
                    <Roboto.Body.Large text={user.email} color={colors.onSurface}/>
                </View>
            }
            {user.phone &&
                <View style={styles.data}>
                    <Roboto.Label.Medium labelKey={"authentication.phoneNumber"} color={colors.onSurface}/>
                    <Roboto.Body.Large text={user.phone} color={colors.onSurface}/>
                </View>
            }
        </View>
    );
}

const stylesG = (colors: ThemeColors) => StyleSheet.create({
    container: {
        ...CommonStyles.flex1,
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
