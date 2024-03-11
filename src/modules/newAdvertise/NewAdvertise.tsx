import {NavigationFunctionComponent} from "react-native-navigation";
import {
    Keyboard,
    SafeAreaView, ScrollView,
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
import {LightThemeColors} from "~/core/theme/colors";
import {ImageOrVideo} from "react-native-image-crop-picker";
import {ImagePickerButton} from "~/common/components/ImagePickerButton";
import {useTranslation} from "react-i18next";
import {AdvertiseImage} from "~/modules/newAdvertise/components/AdvertiseImage";
import DotsVertical from "../../../resources/icons/dot_vertical.svg";

export const NewAdvertise: NavigationFunctionComponent = (props) => {
    const {t} = useTranslation();
    const [images, setImages] = useState<ImageOrVideo[]>([]);

    const cities = [
        {value: 'Тирасполь'},
        {value: 'Бендеры'},
        {value: 'Григориополь'},
        {value: 'Каменка'},
        {value: 'Рыбница'},
        {value: 'Слободзея'},
        {value: 'Дубоссары'}
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
        <SafeAreaView style={CommonStyles.flex1}>
            <CustomHeader id={props.componentId} isStack isEdit/>
            <TouchableWithoutFeedback onPress={dismissKeyboard}>
                <View style={styles.container}>
                    <TextInput
                        placeholder={t("new_advertise.title")}
                        placeholderTextColor={LightThemeColors.text}
                        selectionColor={LightThemeColors.main}
                        style={styles.title}
                    />
                    <View style={styles.dropDowns}>
                        <View style={CommonStyles.rowCenter}>
                            <TextInput
                                placeholder={"0"}
                                placeholderTextColor={LightThemeColors.text}
                                selectionColor={LightThemeColors.main}
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
                            selectionColor={LightThemeColors.main}
                            placeholderTextColor={LightThemeColors.text}
                            textAlignVertical="top"
                        />
                        <AdvertiseImage images={images} setImages={setImages}/>
                    </ScrollView>
                    <View style={styles.footer}>
                        <View style={CommonStyles.rowCenter}>
                            <ImagePickerButton isCamera images={images} setImage={setImages}/>
                            <ImagePickerButton images={images} setImage={setImages}/>
                        </View>
                        <DotsVertical style={{marginRight: CommonSizes.margin.smallPlus}}/>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
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
        backgroundColor: LightThemeColors.background,
        justifyContent: 'space-between'
    }
});
