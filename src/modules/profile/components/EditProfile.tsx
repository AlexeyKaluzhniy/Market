import {NavigationFunctionComponent} from "react-native-navigation";
import {Image, SafeAreaView, StyleSheet, TouchableOpacity, View} from "react-native";
import {CustomHeader} from "~/components/CustomHeader";
import {ImageResources} from "~/common/ImageResources.g";
import EditIcon from "../../../../resources/icons/edit.svg";
import {Colors, LightThemeColors} from "~/core/theme/colors";
import {CommonSizes} from "~/core/theme/commonSizes";

export const EditProfile: NavigationFunctionComponent = (props) => {
    return (
        <SafeAreaView>
            <CustomHeader id={props.componentId} isStack isEdit headerTitle={"editProfile.screenTitle"}/>
            <View style={styles.container}>
                <View style={styles.avatarContainer}>
                    <Image source={ImageResources.avatar} style={styles.avatar}/>
                    <TouchableOpacity style={styles.editPhotoButton} activeOpacity={0.8}>
                        <EditIcon color={Colors.white}/>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: CommonSizes.padding.large
    },
    avatarContainer: {
        alignItems: 'center',
        paddingTop: CommonSizes.padding.extraLargePlus,
    },
    avatar: {
        width: 100,
        height: 100
    },
    editPhotoButton: {
        padding: CommonSizes.padding.smallPlus,
        backgroundColor: LightThemeColors.main,
        borderRadius: CommonSizes.borderRadius.extraLarge,
        marginTop: -35,
        marginRight: -55
    }
});
