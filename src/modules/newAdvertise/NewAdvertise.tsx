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
import {ImageOrVideo} from "react-native-image-crop-picker";
import {ImagePickerButton} from "~/common/components/ImagePickerButton";
import {useTranslation} from "react-i18next";
import {AdvertiseImage} from "~/modules/newAdvertise/components/AdvertiseImage";
import {useThemeColors} from "~/core/theme/hooks";
import {ToggleDraftButton} from "~/components/ToggleDraftButton";

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

export const NewAdvertise: NavigationFunctionComponent = (props) => {
    const {t} = useTranslation();
    const colors = useThemeColors();
    const [images, setImages] = useState<ImageOrVideo[]>([]);

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

    return (
        <View style={styles.container}>
            <CustomHeader id={props.componentId} isStack isEdit/>
            <TouchableWithoutFeedback onPress={dismissKeyboard}>
                <View style={styles.body}>
                    <TextInput
                        placeholder={t("new_advertise.title")}
                        placeholderTextColor={colors.onSurface}
                        selectionColor={colors.main}
                        style={styles.title}
                    />
                    <View style={styles.dropDowns}>
                        <View style={CommonStyles.rowCenter}>
                            <TextInput
                                placeholder={"0"}
                                placeholderTextColor={colors.onSurface}
                                selectionColor={colors.main}
                                textAlign={"right"}
                                maxLength={5}
                                keyboardType={"numeric"}
                                style={{marginRight: CommonSizes.margin.extraSmallPlus}}
                            />
                            <DropDownList
                                values={prices}
                            />
                        </View>
                        <DropDownList
                            values={cities}
                            onRightSide
                        />
                    </View>
                    <ScrollView>
                        <TextInput
                            multiline={true}
                            placeholder={t("new_advertise.description")}
                            style={styles.description}
                            selectionColor={colors.main}
                            placeholderTextColor={colors.onSurface}
                            textAlignVertical="top"
                        />
                        <AdvertiseImage images={images} setImages={setImages}/>
                    </ScrollView>
                    <SafeAreaView style={styles.footer}>
                        <View style={CommonStyles.rowCenter}>
                            <ImagePickerButton isCamera images={images} setImage={setImages}/>
                            <ImagePickerButton images={images} setImage={setImages}/>
                        </View>
                        <ToggleDraftButton/>
                    </SafeAreaView>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};

const styles = StyleSheet.create({
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
        fontFamily: "Roboto"
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
    },
    footer: {
        ...CommonStyles.rowCenter,
        justifyContent: 'space-between',
    }
});
