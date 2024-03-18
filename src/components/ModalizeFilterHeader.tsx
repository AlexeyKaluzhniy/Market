import {StyleSheet, TouchableOpacity, View} from "react-native";
import {CommonStyles} from "~/core/theme/commonStyles";
import {Roboto} from "~/infrastructure";
import {ThemeColors} from "~/core/theme/colors";
import {CommonSizes} from "~/core/theme/commonSizes";
import {useThemedStyles} from "~/core/theme/hooks";
import {Navigation, NavigationFunctionComponent} from "react-native-navigation";

export const ModalizeFilterHeader: NavigationFunctionComponent = (props) => {
    const styles = useThemedStyles(stylesG);

    const closeOverlay = () => {
        Navigation.dismissAllOverlays();
    };

    return (
        <View style={[CommonStyles.rowCenter, styles.container]}>
            <Roboto.Title.Large labelKey={"common.filters"} style={styles.text}/>
            <TouchableOpacity onPress={closeOverlay}>
                <Roboto.Label.Large labelKey={"common.confirm"} style={styles.confirmText}/>
            </TouchableOpacity>
        </View>
    );
};

const stylesG = (colors: ThemeColors) => StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        paddingRight: CommonSizes.padding.large,
        marginTop: CommonSizes.margin.largePlus,
        paddingVertical: CommonSizes.padding.extraLargePlus
    },
    text: {
        color: colors.onSurfaceVariant,
        marginLeft: CommonSizes.margin.medium
    },
    confirmText: {
        color: colors.main
    }
});
