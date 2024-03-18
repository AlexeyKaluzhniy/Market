import {StyleSheet, TouchableOpacity} from "react-native";
import FilterIcon from "../../resources/icons/filter.svg";
import {CommonSizes} from "~/core/theme/commonSizes";
import {ThemeColors} from "~/core/theme/colors";
import {ModalizeFilterContainer} from "~/components/ModalizeFilterContainer";
import {useThemeColors, useThemedStyles} from "~/core/theme/hooks";
import {showOverlay} from "~/navigation/helpers/showOverlay";
import {ModalizeFilterHeader} from "~/components/ModalizeFilterHeader";

export function FilterButton() {
    const colors = useThemeColors();
    const styles = useThemedStyles(stylesG);

    const handlePressFilter = () => {
        showOverlay(ModalizeFilterHeader, ModalizeFilterContainer);
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
