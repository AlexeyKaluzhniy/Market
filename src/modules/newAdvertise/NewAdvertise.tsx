import {NavigationFunctionComponent} from "react-native-navigation";
import {
    Keyboard, SafeAreaView,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableWithoutFeedback,
    View
} from "react-native";
import {CustomHeader} from "~/components/CustomHeader";
import {CommonStyles} from "~/core/theme/commonStyles";
import {CommonSizes} from "~/core/theme/commonSizes";
import {DropDownList} from "~/components/DropDownList";
import {useState} from "react";
import {ImagePickerButton} from "~/common/components/ImagePickerButton";
import {useTranslation} from "react-i18next";
import {AdvertiseImage} from "~/modules/newAdvertise/components/AdvertiseImage";
import {useThemeColors, useThemedStyles} from "~/core/theme/hooks";
import {ToggleDraftButton} from "~/components/ToggleDraftButton";
import {IAdvertise} from "~/infrastructure/dto/common/IAdvertise";
import {useAppDispatch} from "~/core/store/store";
import {actions} from "~/core/store/drafts/draftsSlice";
import {ThemeColors} from "~/core/theme/colors";
import {emptyDraft} from "~/infrastructure/mocks/emptyDraft";

enum Cities {
    Tiraspol = 'Тирасполь',
    Bender = 'Бендеры',
    Grigoriopol = 'Григориополь',
    Kamenka = 'Каменка',
    Rybnitsa = 'Рыбница',
    Slobozia = 'Слободзея',
    Dubossary = 'Дубоссары',
    Dnestrovsk = 'Днестровск',
}

interface INewAdvertiseProps {
    advertise: IAdvertise;
    isMyAd?: boolean;
}

export const NewAdvertise: NavigationFunctionComponent<INewAdvertiseProps> = (props) => {
    const dispatch = useAppDispatch();
    const {t} = useTranslation();
    const styles = useThemedStyles(stylesG);
    const colors = useThemeColors();
    const [advertiseDetails, setAdvertiseDetails] = useState<IAdvertise>(props.advertise || emptyDraft);

    const editDraftDropDownValues = [
        {value: t("drafts.reset")},
        {value: props.advertise ? t("drafts.delete") : t("drafts.save")}
    ];

    const editAdDropDownValues = [
        {value: t("drafts.reset")}
    ];

    const cities = [
        {value: Cities.Tiraspol},
        {value: Cities.Bender},
        {value: Cities.Grigoriopol},
        {value: Cities.Kamenka},
        {value: Cities.Rybnitsa},
        {value: Cities.Slobozia},
        {value: Cities.Dubossary},
        {value: Cities.Dnestrovsk}
    ];

    const prices = [
        {value: t("new_advertise.rub")},
        {value: t("new_advertise.rub/h")},
        {value: t("new_advertise.rub/m")},
        {value: t("new_advertise.rub/y")},
        {value: t("new_advertise.rub/once")},
    ];

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    const setDataAdvertise = (value: {}) => {
        setAdvertiseDetails(prevState => {
            return {...prevState, ...value};
        });
    };

    const confirmEditingAd = () => {
        if (props.isMyAd) {
            //todo add logic when backend will work
            return;
        } else {
            dispatch(actions.updateDraft({...advertiseDetails, id: props.advertise.id}));
        }
    };

    const confirmPublishAd = () => {
        //todo add logic when backend will work
        return;
    };

    return (
        <View style={styles.container}>
            <CustomHeader
                id={props.componentId}
                isStack
                isEdit
                onPressConfirmButton={props.advertise ? confirmEditingAd : confirmPublishAd}
            />
            <TouchableWithoutFeedback onPress={dismissKeyboard}>
                <View style={styles.body}>
                    <TextInput
                        placeholder={t("new_advertise.title")}
                        placeholderTextColor={colors.onSurface}
                        selectionColor={colors.main}
                        style={styles.title}
                        value={advertiseDetails.title}
                        onChangeText={(text) => setDataAdvertise({title: text})}
                    />
                    <View style={styles.dropDowns}>
                        <View style={CommonStyles.rowCenter}>
                            <TextInput
                                placeholder={"0"}
                                value={advertiseDetails.price}
                                placeholderTextColor={colors.onSurface}
                                selectionColor={colors.main}
                                textAlign={"right"}
                                maxLength={5}
                                keyboardType={"numeric"}
                                style={styles.price}
                                onChangeText={(text) => setDataAdvertise({price: text})}
                            />
                            <DropDownList
                                values={prices}
                                setDropDownValue={(value) => setDataAdvertise({priceType: value})}
                                valueShow={advertiseDetails.priceType}
                            />
                        </View>
                        <DropDownList
                            values={cities}
                            onRightSide
                            setDropDownValue={(value) => setDataAdvertise({city: value})}
                            valueShow={advertiseDetails.city}
                        />
                    </View>
                    <ScrollView>
                        <TextInput
                            multiline={true}
                            placeholder={t("new_advertise.description")}
                            value={advertiseDetails.description}
                            style={styles.description}
                            selectionColor={colors.main}
                            placeholderTextColor={colors.onSurface}
                            textAlignVertical="top"
                            onChangeText={(text) => setDataAdvertise({description: text})}
                        />
                        <AdvertiseImage images={advertiseDetails.images} setImages={setDataAdvertise}/>
                    </ScrollView>
                    <SafeAreaView style={styles.footer}>
                        <View style={CommonStyles.rowCenter}>
                            <ImagePickerButton isCamera images={advertiseDetails.images} setImage={setDataAdvertise}/>
                            <ImagePickerButton images={advertiseDetails.images} setImage={setDataAdvertise}/>
                        </View>
                        <ToggleDraftButton
                            advertise={advertiseDetails}
                            setAdvertise={setAdvertiseDetails}
                            values={props.isMyAd ? editAdDropDownValues : editDraftDropDownValues}/>
                    </SafeAreaView>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};

const stylesG = (colors: ThemeColors) => StyleSheet.create({
    container: {
        ...CommonStyles.flex1,
    },
    body: {
        marginHorizontal: CommonSizes.margin.largePlus,
        ...CommonStyles.flex1
    },
    title: {
        marginTop: CommonSizes.margin.superLarge,
        marginBottom: CommonSizes.margin.medium,
        fontSize: 28,
        lineHeight: 36,
        fontFamily: "Roboto",
        color: colors.onSurface
    },
    dropDowns: {
        ...CommonStyles.rowCenter,
        justifyContent: 'space-between'
    },
    description: {
        maxHeight: 300,
        marginTop: CommonSizes.margin.large,
        fontSize: 16,
        lineHeight: 24,
        fontFamily: "Roboto",
        color: colors.onSurface
    },
    price: {
        color: colors.onSurface,
        marginRight: CommonSizes.margin.extraSmallPlus
    },
    footer: {
        ...CommonStyles.rowCenter,
        justifyContent: 'space-between',
    }
});
