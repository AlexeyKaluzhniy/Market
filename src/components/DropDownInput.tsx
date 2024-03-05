import {Image, StyleSheet, TouchableOpacity, View} from "react-native";
import {showActionSheet} from "~/common/helpers/dialogsHelpers";
import {useTranslation} from "react-i18next";
import {CommonSizes} from "~/core/theme/commonSizes";
import {LightThemeColors} from "~/core/theme/colors";
import {CommonStyles} from "~/core/theme/commonStyles";
import {Roboto} from "~/infrastructure";
import {ImageResources} from "~/common/ImageResources.g";
import {languagesNames} from "~/common/localization/localization";

export function DropDownInput() {
    const {t} = useTranslation();

    const handleShowMenu = () => {
        showActionSheet({
            options: [...languagesNames, t("common.cancel")],
            cancelButtonIndex: languagesNames.length,
        }, (optionIndex) => console.log(optionIndex));
    };

    return (
        <View style={styles.dropDownInput}>
            <Roboto.Title.Medium text={'Язык'}/>
            <TouchableOpacity onPress={handleShowMenu}>
                <Image source={ImageResources.drop_down} style={styles.dropDownIcon}/>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    dropDownInput: {
        ...CommonStyles.rowCenter,
        borderWidth: CommonSizes.borderWidth.extraThin,
        borderColor: LightThemeColors.outlineVariant,
        borderRadius: CommonSizes.borderRadius.largePlus,
        justifyContent: 'space-between',
        paddingHorizontal: CommonSizes.padding.large,
        height: 52,
    },
    dropDownIcon: {
        tintColor: LightThemeColors.outlineVariant
    }
});
