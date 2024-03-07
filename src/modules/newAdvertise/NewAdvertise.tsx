import {NavigationFunctionComponent} from "react-native-navigation";
import {Image, Keyboard, SafeAreaView, StyleSheet, TextInput, TouchableWithoutFeedback, View} from "react-native";
import {CustomHeader} from "~/components/CustomHeader";
import {CommonStyles} from "~/core/theme/commonStyles";
import {CommonSizes} from "~/core/theme/commonSizes";
import {DropDownList} from "~/components/DropDownList";
import {useState} from "react";
import {LightThemeColors} from "~/core/theme/colors";
import {ImageOrVideo} from "react-native-image-crop-picker";
import {ImagePickerButton} from "~/common/components/ImagePickerButton";

export const NewAdvertise: NavigationFunctionComponent = (props) => {
    const [priceListVisible, setPriceListVisible] = useState(false);
    const [cityListVisible, setCityListVisible] = useState(false);
    const [images, setImages] = useState<ImageOrVideo[]>([]);

    const toggleDropDownPriceList = () => {
        if (cityListVisible) {
            setCityListVisible(false);
            setPriceListVisible(prevState => !prevState);
        } else {
            setPriceListVisible(prevState => !prevState);
        }
    };

    const toggleDropDownCityList = () => {
        if (priceListVisible) {
            setPriceListVisible(false);
            setCityListVisible(prevState => !prevState);
        } else {
            setCityListVisible(prevState => !prevState);
        }
    };

    const dismissAll = () => {
        dismissDropDowns();
        Keyboard.dismiss();
    };

    const dismissDropDowns = () => {
        setPriceListVisible(false);
        setCityListVisible(false);
    };

    return (
        <SafeAreaView style={CommonStyles.flex1}>
            <CustomHeader id={props.componentId} isStack isEdit/>
            <TouchableWithoutFeedback onPress={dismissAll} style={{zIndex: 2}}>
                <View style={styles.container}>
                    <TextInput
                        placeholder={"Название"}
                        placeholderTextColor={LightThemeColors.text}
                        selectionColor={LightThemeColors.main}
                        style={styles.title}
                        onFocus={dismissDropDowns}
                    />
                    <View style={styles.dropDowns}>
                        <View style={CommonStyles.rowCenter}>
                            <TextInput
                                placeholder={"0"}
                                placeholderTextColor={LightThemeColors.text}
                                selectionColor={LightThemeColors.main}
                                onFocus={dismissDropDowns}
                                textAlign={"right"}
                                maxLength={5}
                                keyboardType={"numeric"}
                                style={{marginRight: CommonSizes.margin.extraSmallPlus}}
                            />
                            <DropDownList
                                values={['руб.', 'руб./час', 'руб./месяц', 'руб./год', 'руб./разово']}
                                isVisible={priceListVisible}
                                setVisible={toggleDropDownPriceList}/>
                        </View>
                        <DropDownList
                            values={['Тирасполь', 'Бендеры', 'Каменка', 'Рыбница', 'Слободзея', 'Григориополь', 'Дубоссары']}
                            onRightSide
                            isVisible={cityListVisible}
                            setVisible={toggleDropDownCityList}/>
                    </View>
                    <TextInput
                        multiline={true}
                        placeholder="Описание"
                        style={styles.description}
                        selectionColor={LightThemeColors.main}
                        placeholderTextColor={LightThemeColors.text}
                        textAlignVertical="top"
                        onFocus={dismissDropDowns}
                    />
                    {images && images.map(image => {
                        return (
                            <Image source={{uri: image.sourceURL}}/>
                        );
                    })}
                    <View style={CommonStyles.rowCenter}>
                        <ImagePickerButton isCamera images={images} setImage={setImages}/>
                        <ImagePickerButton images={images} setImage={setImages}/>
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
        ...CommonStyles.flex1,
        zIndex: -1,
        marginTop: CommonSizes.margin.large,
        fontSize: 16,
        lineHeight: 24,
        fontFamily: "Roboto",
    }
});
