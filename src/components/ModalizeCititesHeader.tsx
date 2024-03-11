import {Roboto} from "~/infrastructure";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import {CommonStyles} from "~/core/theme/commonStyles";
import {CommonSizes} from "~/core/theme/commonSizes";
import {LightThemeColors} from "~/core/theme/colors";
import ArrowBackIcon from "../../resources/icons/arrow_back.svg";
import {Navigation, NavigationFunctionComponent} from "react-native-navigation";
import {navigation} from "~/services";
import {Components} from "~/navigation/components";
import {ModalizeFilterContainer} from "~/components/ModalizeFilterContainer";
import {ReactNode} from "react";
import {ModalizeHeader} from "~/components/ModalizeHeader";

export const ModalizeCitiesHeader: NavigationFunctionComponent = (props) => {
    const handleGoBack = () => {
        Navigation.dismissAllOverlays();
        navigation.showOverlay(Components.modalizeContainer, {
            screenIdSuffix: props.componentId, params: {
                getHeaderComponent: (closeButton: ReactNode) => ModalizeHeader(closeButton, "common.filters"),
                getContentComponent: ModalizeFilterContainer,
                titleCloseButton: "common.confirm"
            }
        });
    };

    return (
        <View style={[CommonStyles.rowCenter, styles.container]}>
            <View style={CommonStyles.rowCenter}>
                <TouchableOpacity onPress={handleGoBack}>
                    <ArrowBackIcon style={{width: 15, height: 15}}/>
                </TouchableOpacity>
                <Roboto.Title.Medium labelKey={"authentication.registrationUserData.city"} style={styles.text}/>
            </View>
            <Roboto.Label.Large labelKey={"common.reset"} style={styles.resetText}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        paddingHorizontal: CommonSizes.padding.large,
        marginTop: CommonSizes.margin.largePlus,
        paddingVertical: CommonSizes.padding.extraLargePlus
    },
    text: {
        color: LightThemeColors.secondaryText,
        marginLeft: CommonSizes.margin.medium
    },
    resetText: {
        color: LightThemeColors.main
    }
});
