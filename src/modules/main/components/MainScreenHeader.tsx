import {SafeAreaView, StyleSheet, TextInput, View} from "react-native";
import {CommonStyles} from "~/core/theme/commonStyles";
import {SideMenuButton} from "~/common/components/SideMenuButton";
import React from "react";
import {ThemeColors} from "~/core/theme/colors";
import {CommonSizes} from "~/core/theme/commonSizes";
import {FilterButton} from "~/components/FilterButton";
import {useTranslation} from "react-i18next";
import {useThemeColors, useThemedStyles} from "~/core/theme/hooks";
import {useAppDispatch} from "~/core/store/store";
import {actions} from "~/core/store/filter/filterSlice";

export function MainScreenHeader() {
    const {t} = useTranslation();
    const styles = useThemedStyles(stylesG);
    const colors = useThemeColors();
    const dispatch = useAppDispatch();

    const setSearchText = (text: string) => {
        dispatch(actions.setSearchStr(text));
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={[styles.searchBar, CommonStyles.rowCenter]}>
                <SideMenuButton/>
                <TextInput
                    placeholder={t("common.search")}
                    style={styles.menu}
                    selectionColor={colors.main}
                    placeholderTextColor={colors.onSurface}
                    onChangeText={setSearchText}
                />
            </View>
            <FilterButton/>
        </SafeAreaView>
    );
}

const stylesG = (colors: ThemeColors) => StyleSheet.create({
    container: {
        ...CommonStyles.rowCenter,
        marginTop: CommonSizes.margin.smallPlus,
        marginHorizontal: CommonSizes.margin.largePlus
    },
    searchBar: {
        ...CommonStyles.flex1,
        backgroundColor: colors.searchBar,
        height: 48,
        borderRadius: CommonSizes.borderRadius.extraLargePlus,
        marginRight: CommonSizes.margin.small,
        paddingLeft: CommonSizes.padding.large,
    },
    menu: {
        marginLeft: CommonSizes.margin.extraLarge,
        fontSize: 16,
        fontFamily: "Roboto",
        letterSpacing: 0.5,
        ...CommonStyles.flex1,
        color: colors.onSurface
    },
});
