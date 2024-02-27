import React from "react";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import ArrowBackIcon from '../../resources/icons/arrow_back.svg';
import {CommonStyles} from "~/core/theme/commonStyles";
import {LanguageButton} from "~/common/components/LanguageButton";
import {Navigation} from "react-native-navigation";
import {Pages} from "~/navigation/pages";
import {CommonSizes} from "~/core/theme/commonSizes";
import {LightThemeColors} from "~/core/theme/colors";
import {Title} from "~/infrastructure";
import {Normalize} from "react-i18next";

interface IProps {
    headerTitle: Normalize<{
        authentication: {
          enterCode: string;
          newPassword: string;
        };
    }>;
}

export function AuthCustomHeader({headerTitle}: IProps) {
    const handleGoBack = () => {
        Navigation.pop(Pages.auth.id);
    };

    return (
        <View style={[CommonStyles.row, styles.container]}>
            <View style={CommonStyles.rowCenter}>
                <TouchableOpacity onPress={handleGoBack}>
                    <ArrowBackIcon/>
                </TouchableOpacity>
                <Title.Large style={styles.headerTitle} labelKey={headerTitle}/>
            </View>
            <LanguageButton/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20
    },
    headerTitle: {
        marginLeft: 15,
        fontSize: CommonSizes.font.large,
        lineHeight: CommonSizes.lineHeight.large,
        color: LightThemeColors.text,
    }
});
