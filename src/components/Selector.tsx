import {Image, StyleSheet, TouchableOpacity, View} from "react-native";
import {showActionSheet} from "~/common/helpers/dialogsHelpers";
import {useTranslation} from "react-i18next";
import {CommonSizes} from "~/core/theme/commonSizes";
import {LightThemeColors} from "~/core/theme/colors";
import {CommonStyles} from "~/core/theme/commonStyles";
import {Roboto} from "~/infrastructure";
import {ImageResources} from "~/common/ImageResources.g";

interface ISelectorProps {
    values: string[];
    handleSelect: (value: string) => void;
    title: string;
}

export function Selector({values, handleSelect, title}: ISelectorProps) {
    const {t} = useTranslation();

    const handleShowMenu = () => {
        showActionSheet({
            options: [...values, t("common.cancel")],
            cancelButtonIndex: values.length,
        }, (optionIndex) => values[optionIndex] && handleSelect(values[optionIndex]));
    };

    return (
        <TouchableOpacity onPress={handleShowMenu} activeOpacity={0.7}>
            <View style={styles.dropDownInput}>
                <Roboto.Title.Medium text={title}/>
                <Image source={ImageResources.drop_down} style={styles.dropDownIcon}/>
            </View>
        </TouchableOpacity>
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
