import {StyleSheet, TextInput, TouchableOpacity, View} from "react-native";
import {CommonStyles} from "~/core/theme/commonStyles";
import {SideMenuButton} from "~/common/components/SideMenuButton";
import FilterIcon from "../../../../resources/icons/filter.svg";
import React from "react";
import {LightThemeColors} from "~/core/theme/colors";
import {CommonSizes} from "~/core/theme/commonSizes";

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
            <TouchableOpacity style={styles.filter}>
                <FilterIcon/>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...CommonStyles.rowCenter,
        marginVertical: CommonSizes.margin.smallPlus
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
    filter: {
        padding: CommonSizes.padding.medium,
        backgroundColor: LightThemeColors.searchBar,
        borderRadius: CommonSizes.borderRadius.extraLarge,
    },
});
