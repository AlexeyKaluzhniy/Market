import {Image, StyleSheet, TouchableOpacity, View} from "react-native";
import {showActionSheet} from "~/common/helpers/dialogsHelpers";
import {useTranslation} from "react-i18next";
import {CommonSizes} from "~/core/theme/commonSizes";
import {LightThemeColors} from "~/core/theme/colors";
import {CommonStyles} from "~/core/theme/commonStyles";
import {Roboto} from "~/infrastructure";
import {ImageResources} from "~/common/ImageResources.g";
import {languages, languagesNames} from "~/common/localization/localization";
import {useAppDispatch, useAppSelector} from "~/core/store/store";
import {SystemActionsAsync} from "~/core/store/system/systemSlice";

export function OptionInput() {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const language = useAppSelector(state => state.system.language);

    const handleShowMenu = () => {
        showActionSheet({
            options: [...languagesNames, t("common.cancel")],
            cancelButtonIndex: languagesNames.length,
        }, (optionIndex) => languagesNames[optionIndex] && handleChangeLanguage(languagesNames[optionIndex]));
    };

    const handleChangeLanguage = (name: string) => {
        const l = languages.find(value => value.name === name) || language;
        dispatch(SystemActionsAsync.changeLang(l));
    };

    return (
        <View style={styles.dropDownInput}>
            <Roboto.Title.Medium text={language.name}/>
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
