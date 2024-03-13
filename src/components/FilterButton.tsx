import {StyleSheet, TouchableOpacity} from "react-native";
import FilterIcon from "../../resources/icons/filter.svg";
import React, {ReactNode} from "react";
import {CommonSizes} from "~/core/theme/commonSizes";
import {LightThemeColors, ThemeColors} from "~/core/theme/colors";
import {navigation} from "~/services";
import {Components} from "~/navigation/components";
import {ModalizeHeader} from "~/components/ModalizeHeader";
import {ModalizeFilterContainer} from "~/components/ModalizeFilterContainer";
import {useThemeColors, useThemedStyles} from "~/core/theme/hooks";

export function FilterButton() {
    const colors = useThemeColors();
    const styles = useThemedStyles(stylesG);

    const handlePressFilter = () => {
        navigation.showOverlay(Components.modalizeContainer, {
            params: {
                getHeaderComponent: (closeButton: ReactNode) => ModalizeHeader(closeButton, "common.filters"),
                getContentComponent: ModalizeFilterContainer,
                titleCloseButton: "common.confirm"
            }
        });
    };

    return (
        <TouchableOpacity style={styles.filter} onPress={handlePressFilter}>
            <FilterIcon color={colors.outline}/>
        </TouchableOpacity>
    );
}

const stylesG = (colors: ThemeColors) => StyleSheet.create({
    filter: {
        padding: CommonSizes.padding.medium,
        backgroundColor: colors.searchBar,
        borderRadius: CommonSizes.borderRadius.extraLarge,
    },
});
