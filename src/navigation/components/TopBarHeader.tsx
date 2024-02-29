import {NavigationFunctionComponent} from "react-native-navigation";
import {StyleSheet, TextInput, TouchableOpacity, View} from "react-native";
import FilterIcon from '../../../resources/icons/filter.svg';
import MenuIcon from '../../../resources/icons/menu.svg';
import {CommonStyles} from "~/core/theme/commonStyles";
import {LightThemeColors} from "~/core/theme/colors";
import {CommonSizes} from "~/core/theme/commonSizes";

export const TopBarHeader: NavigationFunctionComponent = () => {
    return (
        <View style={styles.container}>
            <View style={styles.searchBar}>
                <View style={CommonStyles.rowCenter}>
                    <TouchableOpacity style={styles.menu}>
                        <MenuIcon/>
                    </TouchableOpacity>
                    <TextInput
                        placeholder="Поиск объявления"
                        style={styles.menu}
                    />
                </View>
            </View>
            <TouchableOpacity style={styles.filter}>
                <FilterIcon/>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...CommonStyles.rowCenter,
        justifyContent: 'space-between'
    },
    searchBar: {
        backgroundColor: LightThemeColors.searchBar,
        height: 48,
        borderRadius: CommonSizes.borderRadius.extraLargePlus,
        marginTop: CommonSizes.margin.small,
        marginRight: CommonSizes.margin.small,
        flex: 1
    },
    menu: {
        marginLeft: CommonSizes.margin.extraLarge
    },
    filter: {
        padding: CommonSizes.padding.medium,
        backgroundColor: LightThemeColors.searchBar,
        borderRadius: CommonSizes.borderRadius.extraLarge,
        marginTop: CommonSizes.margin.smallPlus
    }
});
