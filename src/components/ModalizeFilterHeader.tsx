import {StyleSheet, TouchableOpacity, View} from "react-native";
import {CommonStyles} from "~/core/theme/commonStyles";
import {Roboto} from "~/infrastructure";
import {ThemeColors} from "~/core/theme/colors";
import {CommonSizes} from "~/core/theme/commonSizes";
import {useThemedStyles} from "~/core/theme/hooks";
import {Navigation, NavigationFunctionComponent} from "react-native-navigation";
import {useAppSelector} from "~/core/store/store";
import {selectPriceFrom, selectPriceTo} from "~/core/store/filter/filterSlice";
import {useState} from "react";
import {ErrorNotification} from "~/components/ErrorNotification";

export const ModalizeFilterHeader: NavigationFunctionComponent = (props) => {
    const styles = useThemedStyles(stylesG);
    const [priceFrom, priceTo] = useAppSelector(state => [selectPriceFrom(state), selectPriceTo(state)]);
    const [showError, setShowError] = useState(false);

    const closeOverlay = () => {
        if (Number(priceFrom) < Number(priceTo)) {
            Navigation.dismissAllOverlays();
        } else {
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
            }, 3000);
        }
    };

    return (
        <View style={[CommonStyles.rowCenter, styles.container]}>
            <Roboto.Title.Large labelKey={"common.filters"} style={styles.text}/>
            <TouchableOpacity onPress={closeOverlay} disabled={showError}>
                <Roboto.Label.Large labelKey={"common.confirm"} style={styles.confirmText}/>
            </TouchableOpacity>
            {showError && <ErrorNotification text={"errorNotifications.incorrectPriceFilter"}/>}
        </View>
    );
};

const stylesG = (colors: ThemeColors) => StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        paddingRight: CommonSizes.padding.large,
        marginTop: CommonSizes.margin.largePlus,
        paddingVertical: CommonSizes.padding.extraLargePlus,
    },
    text: {
        color: colors.onSurfaceVariant,
        marginLeft: CommonSizes.margin.medium
    },
    confirmText: {
        color: colors.main
    }
});
