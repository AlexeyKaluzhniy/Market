import {StyleSheet, TextInput, View} from "react-native";
import {CommonStyles} from "~/core/theme/commonStyles";
import {SideMenuButton} from "~/common/components/SideMenuButton";
import React from "react";
import {LightThemeColors} from "~/core/theme/colors";
import {CommonSizes} from "~/core/theme/commonSizes";
import {FilterButton} from "~/components/FilterButton";
import {useTranslation} from "react-i18next";

export function MainScreenHeader() {
    const {t} = useTranslation();

    return (
        <View style={styles.container}>
            <View style={[styles.searchBar, CommonStyles.rowCenter]}>
                <SideMenuButton/>
                <TextInput
                    placeholder={t("common.search")}
                    style={styles.menu}
                    selectionColor={LightThemeColors.main}
                />
            </View>
            <FilterButton/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...CommonStyles.rowCenter,
        marginTop: CommonSizes.margin.smallPlus,
        marginHorizontal: CommonSizes.margin.largePlus
    },
    searchBar: {
        ...CommonStyles.flex1,
        backgroundColor: LightThemeColors.searchBar,
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
        ...CommonStyles.flex1
    },
});
