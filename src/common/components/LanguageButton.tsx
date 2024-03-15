import {StyleSheet, TouchableOpacity, View} from "react-native";
import LanguageIcon from "../../../resources/icons/language.svg";
import React from "react";
import {useAppDispatch, useAppSelector} from "~/core/store/store";
import {SystemActionsAsync} from "~/core/store/system/systemSlice";
import {languages} from "../localization/localization";
import {useThemeColors} from "~/core/theme/hooks";

export function LanguageButton() {
    const colors = useThemeColors();
    const dispatch = useAppDispatch();
    const lang = useAppSelector(state => state.system.language);
    const reverseLang = languages.find(i => i.languageTag != lang.languageTag) || lang;

    const handleChangeLang = () => {
        dispatch(SystemActionsAsync.changeLang(reverseLang));
    };

    return (
        <View style={styles.languageContainer}>
            <TouchableOpacity onPress={() => handleChangeLang()}>
                <LanguageIcon color={colors.outline}/>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    languageContainer: {
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
});
