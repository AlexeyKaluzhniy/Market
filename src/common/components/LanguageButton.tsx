import {StyleSheet, TouchableOpacity, View} from "react-native";
import LanguageIcon from "../../../resources/icons/language.svg";
import React from "react";
import {useAppDispatch, useAppSelector} from "~/core/store/store";
import {SystemActionsAsync} from "~/core/store/system/systemSlice";
import {languages} from "../localization/localization";

export function LanguageButton() {
    const dispatch = useAppDispatch();
    const lang = useAppSelector(state => state.system.language);
    const reverseLang = languages.find(i => i.languageTag != lang.languageTag) || lang;

    const handleChangeLang = () => {
        dispatch(SystemActionsAsync.changeLang(reverseLang));
    };

    return (
        <View style={styles.languageContainer}>
            <TouchableOpacity onPress={() => handleChangeLang()}>
                <LanguageIcon/>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    languageContainer: {
        alignItems: 'flex-end',
        height: 64,
        justifyContent: 'center',
        padding: 20
    },
});
