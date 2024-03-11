import {StyleSheet, TouchableOpacity} from "react-native";
import FilterIcon from "../../resources/icons/filter.svg";
import React, {ReactNode} from "react";
import {CommonSizes} from "~/core/theme/commonSizes";
import {LightThemeColors} from "~/core/theme/colors";
import {navigation} from "~/services";
import {Components} from "~/navigation/components";
import {ModalizeHeader} from "~/components/ModalizeHeader";
import {ModalizeFilterContainer} from "~/components/ModalizeFilterContainer";

export function FilterButton() {
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
            <FilterIcon/>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    filter: {
        padding: CommonSizes.padding.medium,
        backgroundColor: LightThemeColors.searchBar,
        borderRadius: CommonSizes.borderRadius.extraLarge,
    },
});
