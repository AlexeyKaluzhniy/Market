import React from "react";
import {SafeAreaView, StyleSheet, View} from "react-native";
import {CommonStyles} from "~/core/theme/commonStyles";
import {LanguageButton} from "~/common/components/LanguageButton";
import {Navigation} from "react-native-navigation";
import {CommonSizes} from "~/core/theme/commonSizes";
import {ThemeColors} from "~/core/theme/colors";
import {Roboto} from "~/infrastructure/typography";
import {EditButton} from "~/common/components/EditButton";
import {TFuncKeyApp} from "~/common/localization/localization";
import {BackButton} from "~/components/BackButton";
import {FavoriteButton} from "~/components/FavoriteButton";
import {ConfirmButton} from "~/common/components/ConfirmButton";
import {useThemedStyles} from "~/core/theme/hooks";
import {SideMenuButton} from "~/common/components/SideMenuButton";

interface IProps {
    headerTitle?: TFuncKeyApp;
    hasEditButton?: boolean;
    isStack?: boolean;
    isDrawer?: boolean;
    isAuth?: boolean;
    isDetails?: boolean;
    isEdit?: boolean;
    onPressConfirmButton?: () => void;
    onPressEditButton?: () => void;
    id: string;
}

export function CustomHeader(
    {
        headerTitle,
        isStack,
        hasEditButton,
        isAuth,
        id,
        isDetails,
        isEdit,
        isDrawer,
        onPressConfirmButton,
        onPressEditButton
    }: IProps) {
    const styles = useThemedStyles(stylesG);

    const handleGoBack = () => {
        Navigation.pop(id);
    };

    return (
        <SafeAreaView style={[CommonStyles.row, styles.container]}>
            <View style={CommonStyles.rowCenter}>
                {isStack && <BackButton onPress={handleGoBack}/>}
                {isDrawer && <SideMenuButton/>}
                <Roboto.Title.Large style={styles.headerTitle} labelKey={headerTitle}/>
            </View>
            {isAuth && <LanguageButton/>}
            {hasEditButton && <EditButton onPressEditButton={onPressEditButton}/>}
            {isDetails && <FavoriteButton/>}
            {isEdit && <ConfirmButton onPress={onPressConfirmButton}/>}
        </SafeAreaView>
    );
}

const stylesG = (colors: ThemeColors) => StyleSheet.create({
    container: {
        marginHorizontal: CommonSizes.margin.extraLarge,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: CommonSizes.margin.extraLarge,
    },
    headerTitle: {
        marginLeft: CommonSizes.margin.largePlus,
        fontSize: CommonSizes.font.large,
        lineHeight: CommonSizes.lineHeight.large,
        color: colors.onSurface,
    },
});
