import React from "react";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import ArrowBackIcon from '../../resources/icons/arrow_back.svg';
import {CommonStyles} from "~/core/theme/commonStyles";
import {LanguageButton} from "~/common/components/LanguageButton";
import {Navigation} from "react-native-navigation";
import {CommonSizes} from "~/core/theme/commonSizes";
import {LightThemeColors} from "~/core/theme/colors";
import {Roboto} from "~/infrastructure/typography";
import MenuIcon from "../../resources/icons/menu.svg";
import {Pages} from "~/navigation/pages";
import {EditButton} from "~/common/components/EditButton";
import {TFuncKeyApp} from "~/common/localization/localization";

interface IProps {
    headerTitle: TFuncKeyApp;
    isProfile?: boolean;
    isStack?: boolean;
    isAuth?: boolean;
    id: string;
}

export function CustomHeader({headerTitle, isStack, isProfile, isAuth, id}: IProps) {
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
                {isStack ?
                    <TouchableOpacity onPress={handleGoBack}>
                        <ArrowBackIcon/>
                    </TouchableOpacity> :
                    <TouchableOpacity onPress={handleOpenDrawer}>
                        <MenuIcon/>
                    </TouchableOpacity>
                }
                <Roboto.Title.Large style={styles.headerTitle} labelKey={headerTitle}/>
            </View>
            {isAuth ? <LanguageButton/> : isProfile && <EditButton/>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginLeft: CommonSizes.margin.extraLarge,
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
