import React from "react";
import {StyleSheet, View} from "react-native";
import {CommonStyles} from "~/core/theme/commonStyles";
import {LanguageButton} from "~/common/components/LanguageButton";
import {Navigation} from "react-native-navigation";
import {CommonSizes} from "~/core/theme/commonSizes";
import {LightThemeColors} from "~/core/theme/colors";
import {Roboto} from "~/infrastructure/typography";
import {Pages} from "~/navigation/pages";
import {EditButton} from "~/common/components/EditButton";
import {TFuncKeyApp} from "~/common/localization/localization";
import {BackButton} from "~/components/BackButton";
import {OpenDrawerButton} from "~/components/OpenDrawerButton";
import {FavoriteButton} from "~/components/FavoriteButton";

interface IProps {
    headerTitle?: TFuncKeyApp;
    isProfile?: boolean;
    isStack?: boolean;
    isAuth?: boolean;
    isDetails?: boolean;
    id: string;
}

export function CustomHeader({headerTitle, isStack, isProfile, isAuth, id, isDetails}: IProps) {
    const handleGoBack = () => {
        Navigation.pop(id);
    };

    const handleOpenDrawer = () => {
        Navigation.mergeOptions(Pages.bottomTabsDrawer.id, {
            sideMenu: {
                left: {
                    visible: true
                }
            }
        });
    };

    return (
        <View style={[CommonStyles.row, styles.container]}>
            <View style={CommonStyles.rowCenter}>
                {isStack ? <BackButton onPress={handleGoBack}/> : <OpenDrawerButton onPress={handleOpenDrawer}/>}
                <Roboto.Title.Large style={styles.headerTitle} labelKey={headerTitle}/>
            </View>
            {isAuth && <LanguageButton/>}
            {isProfile && <EditButton/>}
            {isDetails && <FavoriteButton/>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: CommonSizes.margin.extraLarge,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: CommonSizes.margin.extraLarge,
    },
    headerTitle: {
        marginLeft: CommonSizes.margin.largePlus,
        fontSize: CommonSizes.font.large,
        lineHeight: CommonSizes.lineHeight.large,
        color: LightThemeColors.text,
    },
});
