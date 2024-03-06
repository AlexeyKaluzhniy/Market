import {StyleSheet, TextInput, View} from "react-native";
import {CommonStyles} from "~/core/theme/commonStyles";
import {SideMenuButton} from "~/common/components/SideMenuButton";
import React from "react";
import {LightThemeColors} from "~/core/theme/colors";
import {CommonSizes} from "~/core/theme/commonSizes";
import {FilterButton} from "~/components/FilterButton";

export function ListHeaderComponent() {
    return (
        <View style={styles.container}>
            <View style={[styles.searchBar, CommonStyles.rowCenter]}>
                <SideMenuButton/>
                <TextInput
                    placeholder="Поиск объявления"
                    style={styles.menu}
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
        marginBottom: CommonSizes.margin.largePlus
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
        marginLeft: CommonSizes.margin.extraLarge
    },
});
