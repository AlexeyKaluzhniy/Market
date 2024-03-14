import {StyleSheet, TouchableOpacity, View} from "react-native";
import {CommonSizes} from "~/core/theme/commonSizes";
import {Roboto} from "~/infrastructure";
import {ThemeColors} from "~/core/theme/colors";
import {DefaultInput} from "~/components/DefaultInput";
import {CommonStyles} from "~/core/theme/commonStyles";
import RemoveIcon from "../../resources/icons/remove.svg";
import {useTranslation} from "react-i18next";
import {Navigation, NavigationFunctionComponent} from "react-native-navigation";
import {navigation} from "~/services";
import {Components} from "~/navigation/components";
import {ModalizeCitiesContainer} from "~/components/ModalizeCitiesContainer";
import {ModalizeCitiesHeader} from "~/components/ModalizeCititesHeader";
import {useAppDispatch, useAppSelector} from "~/core/store/store";
import {actions} from "~/core/store/filter/filterSlice";
import {useThemeColors, useThemedStyles} from "~/core/theme/hooks";

export const ModalizeFilterContainer: NavigationFunctionComponent = (props) => {
    const {t} = useTranslation();
    const styles = useThemedStyles(stylesG);
    const colors = useThemeColors();
    const dispatch = useAppDispatch();
    const cities = useAppSelector(state => state.filter.cities);
    const priceFrom = useAppSelector(state => state.filter.priceFrom);
    const priceTo = useAppSelector(state => state.filter.priceTo);

    const openCitiesModal = () => {
        Navigation.dismissAllOverlays();
        navigation.showOverlay(Components.modalizeContainer, {
            screenIdSuffix: props.componentId, params: {
                getHeaderComponent: ModalizeCitiesHeader,
                getContentComponent: ModalizeCitiesContainer,
                titleCloseButton: "common.reset"
            }
        });
    };

    const removeCity = (city: string) => {
        dispatch(actions.resetCity(city));
    };

    const setPriceFrom = (name: string, price: string) => {
        dispatch(actions.setPriceFrom(price));
    };

    const setPriceTo = (name: string, price: string) => {
        dispatch(actions.setPriceTo(price));
    };

    return (
        <View style={styles.container}>
            <Roboto.Title.Medium labelKey={"filter.city"} color={colors.onSurface}/>
            <View style={styles.chosenCitiesContainer}>
                {cities && cities.map(city => {
                    return (
                        <TouchableOpacity
                            key={city}
                            style={styles.chosenCities}
                            onPress={() => removeCity(city)}
                            activeOpacity={0.8}
                        >
                            <Roboto.Label.Large text={city} color={colors.text}/>
                            <RemoveIcon style={styles.removeIcon}/>
                        </TouchableOpacity>
                    );
                })}
            </View>
            <Roboto.Label.Large labelKey={"filter.add_city"} style={styles.addCity} onPress={openCitiesModal}/>
            <Roboto.Title.Medium labelKey={"filter.adv_price"} style={styles.price}/>
            <View style={styles.inputContainer}>
                <DefaultInput
                    placeholder={t("filter.from")}
                    name={'from'}
                    setValue={setPriceFrom}
                    maxLength={5}
                    numberInput
                    value={priceFrom}/>
                <DefaultInput
                    placeholder={t("filter.to")}
                    name={'to'}
                    setValue={setPriceTo}
                    maxLength={5}
                    numberInput
                    value={priceTo}/>
            </View>
        </View>
    );
};

const stylesG = (colors: ThemeColors) => StyleSheet.create({
    container: {
        paddingHorizontal: CommonSizes.padding.large
    },
    addCity: {
        color: colors.main,
        marginTop: CommonSizes.margin.small
    },
    price: {
        marginTop: CommonSizes.margin.extraLarge,
        color: colors.onSurface
    },
    inputContainer: {
        ...CommonStyles.rowCenter,
        justifyContent: 'space-between',
        marginBottom: CommonSizes.margin.largePlus,
    },
    chosenCitiesContainer: {
        ...CommonStyles.rowCenter,
        marginTop: CommonSizes.margin.medium,
        flexWrap: 'wrap',
    },
    chosenCities: {
        ...CommonStyles.rowCenter,
        borderWidth: CommonSizes.borderWidth.extraThin,
        paddingHorizontal: CommonSizes.padding.smallPlus,
        paddingVertical: CommonSizes.padding.extraSmallPlus,
        borderRadius: CommonSizes.borderRadius.small,
        marginRight: CommonSizes.margin.extraSmallPlus,
        marginBottom: CommonSizes.margin.extraSmallPlus,
        borderColor: colors.outline
    },
    removeIcon: {
        marginTop: CommonSizes.margin.extraSmall,
        marginLeft: CommonSizes.margin.smallPlus
    }
});
