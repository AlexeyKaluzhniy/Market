import {NavigationFunctionComponent} from "react-native-navigation";
import {Image, SafeAreaView, StyleSheet, TouchableOpacity, View} from "react-native";
import {CustomHeader} from "~/components/CustomHeader";
import {ImageResources} from "~/common/ImageResources.g";
import EditIcon from "../../../../resources/icons/edit.svg";
import {Colors, LightThemeColors} from "~/core/theme/colors";
import {CommonSizes} from "~/core/theme/commonSizes";
import {DefaultInput} from "~/components/DefaultInput";
import ImagePicker, {ImageOrVideo, Options} from "react-native-image-crop-picker";
import {useTranslation} from "react-i18next";
import {useState} from "react";

const pickerOptions: Options = {
    height: 1000,
    width: 1000,
    cropping: true,
    compressImageQuality: 0.5,
    multiple: false,
    mediaType: "photo",
    includeBase64: true,
};

export const EditProfile: NavigationFunctionComponent = (props) => {
    const {t} = useTranslation();
    const [image, setImage] = useState<ImageOrVideo>();

    const openGallery = () => {
        ImagePicker.openPicker(pickerOptions)
            .then(img => setImage(img))
            .catch(error => console.warn(error));
    };

    return (
        <SafeAreaView>
            <CustomHeader id={props.componentId} isStack isEdit headerTitle={"editProfile.screenTitle"}/>
            <View style={styles.container}>
                <View style={styles.avatarContainer}>
                    <Image source={ image ? {uri: image.path} : ImageResources.avatar } style={styles.avatar}/>
                    <TouchableOpacity style={styles.editPhotoButton} activeOpacity={0.8} onPress={openGallery}>
                        <EditIcon color={Colors.white}/>
                    </TouchableOpacity>
                </View>
                <View>
                    <DefaultInput name={"name"} placeholder={t("editProfile.name")} setValue={() => console.log(1)}/>
                    <DefaultInput name={"lastName"} placeholder={t("editProfile.surname")} setValue={() => console.log(1)}/>
                    <DefaultInput name={"email"} placeholder={t("editProfile.email")} setValue={() => console.log(1)}/>
                    <DefaultInput name={"phone"} placeholder={t("authentication.phoneNumber")} setValue={() => console.log(1)} numberInput/>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: CommonSizes.padding.large,
    },
    avatarContainer: {
        alignItems: 'center',
        paddingTop: CommonSizes.padding.extraLargePlus,
        marginBottom: CommonSizes.margin.largePlus
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: CommonSizes.borderRadius.extraLargePlus * 2
    },
    editPhotoButton: {
        padding: CommonSizes.padding.smallPlus,
        backgroundColor: LightThemeColors.main,
        borderRadius: CommonSizes.borderRadius.extraLarge,
        marginTop: -35,
        marginRight: -55
    }
});
