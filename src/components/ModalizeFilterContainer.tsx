import {StyleSheet, Text, View} from "react-native";
import {CommonSizes} from "~/core/theme/commonSizes";
import {Roboto} from "~/infrastructure";
import {LightThemeColors} from "~/core/theme/colors";
import {DefaultInput} from "~/components/DefaultInput";
import {CommonStyles} from "~/core/theme/commonStyles";
import {useState} from "react";
import RemoveIcon from "../../resources/icons/remove.svg";
import {useTranslation} from "react-i18next";
import {Navigation, NavigationFunctionComponent} from "react-native-navigation";
import {navigation} from "~/services";
import {Components} from "~/navigation/components";
import {ModalizeCitiesContainer} from "~/components/ModalizeCitiesContainer";
import {ModalizeCitiesHeader} from "~/components/ModalizeCititesHeader";

export const ModalizeFilterContainer: NavigationFunctionComponent = (props) => {
    const {t} = useTranslation();
    const [cities, setCities] = useState<string[]>(['Тирасполь', 'Бендеры']);

    const openCitiesModal = () => {
        Navigation.dismissAllOverlays();
        navigation.showOverlay(Components.modalizeContainer, {
            screenIdSuffix: props.componentId, params: {
                getHeaderComponent: ModalizeCitiesHeader,
                getContentComponent: () => ModalizeCitiesContainer({
                    citiesChosen: cities,
                    setCitiesChosen: setCities
                }),
                titleCloseButton: "common.reset"
            }
        });
    };

    return (
        <View style={styles.container}>
            <Roboto.Title.Medium labelKey={"filter.city"}/>
            <View style={styles.chosenCitiesContainer}>
                {cities && cities.map(city => {
                    return (
                        <View key={city} style={styles.chosenCities}>
                            <Text>{city}</Text>
                            <RemoveIcon style={styles.removeIcon}/>
                        </View>
                    );
                })}
            </View>
            <Roboto.Label.Large labelKey={"filter.add_city"} style={styles.addCity} onPress={openCitiesModal}/>
            <Roboto.Title.Medium labelKey={"filter.adv_price"} style={styles.price}/>
            <View style={styles.inputContainer}>
                <DefaultInput placeholder={t("filter.from")} name={'from'} setValue={() => console.log(1)}/>
                <DefaultInput placeholder={t("filter.to")} name={'to'} setValue={() => console.log(1)}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: CommonSizes.padding.large
    },
    addCity: {
        color: LightThemeColors.main,
        marginTop: CommonSizes.margin.medium
    },
    price: {
        marginTop: CommonSizes.margin.extraLarge
    },
    inputContainer: {
        ...CommonStyles.rowCenter,
        justifyContent: 'space-between',
        marginBottom: CommonSizes.margin.largePlus
    },
    chosenCitiesContainer: {
        ...CommonStyles.rowCenter,
        marginTop: CommonSizes.margin.medium
    },
    chosenCities: {
        ...CommonStyles.rowCenter,
        borderWidth: CommonSizes.borderWidth.extraThin,
        paddingHorizontal: CommonSizes.padding.smallPlus,
        paddingVertical: CommonSizes.padding.extraSmallPlus,
        borderRadius: CommonSizes.borderRadius.small,
        marginRight: CommonSizes.margin.extraSmallPlus
    },
    removeIcon: {
        marginTop: CommonSizes.margin.extraSmall,
        marginLeft: CommonSizes.margin.smallPlus
    }
});
