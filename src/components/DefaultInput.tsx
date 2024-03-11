import {Image, StyleSheet, TextInput, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import {LightThemeColors} from "~/core/theme/colors";
import {CommonSizes} from "~/core/theme/commonSizes";
import {IPropsCustomInput} from "~/infrastructure/dto/common/IPropsCustomInput";
import {ImageResources} from "~/common/ImageResources.g";
import {CommonStyles} from "~/core/theme/commonStyles";

export function DefaultInput(
    {
        placeholder,
        setValue,
        Icon,
        passwordInput = false,
        name,
    }: IPropsCustomInput) {
    const [isVisible, setVisible] = useState(passwordInput);
    const [isFocused, setFocused] = useState(false);
    const eyeIcons = {
        open: ImageResources.eye,
        closed: ImageResources.eyeclosed
    };

    return (
        <View style={[styles.inputContainer, isFocused ? styles.activeInput : styles.inactiveInput]}>
            {Icon && <Icon width={25} height={25}/>}
            <TextInput
                onChangeText={text => setValue(name, text)}
                placeholder={placeholder}
                secureTextEntry={isVisible}
                style={styles.input}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                keyboardType={!passwordInput ? 'numeric' : 'default'}
                selectionColor={LightThemeColors.main}
            />
            {passwordInput &&
                <TouchableOpacity onPress={() => setVisible((prev) => !prev)} style={styles.eyeIcon}>
                    <Image
                        source={isVisible ? eyeIcons.closed : eyeIcons.open}
                    />
                </TouchableOpacity>}
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        marginTop: CommonSizes.margin.extraLarge,
        borderWidth: CommonSizes.borderWidth.extraThin,
        borderColor: LightThemeColors.secondaryText,
        borderRadius: CommonSizes.borderRadius.largePlus,
        alignItems: 'center',
        paddingLeft: CommonSizes.padding.large,
        height: 56,
    },
    input: {
        minWidth: '43%',
        fontSize: CommonSizes.font.medium,
        marginLeft: CommonSizes.margin.smallPlus,
        color: LightThemeColors.text,
    },
    eyeIcon: {
        marginRight: CommonSizes.margin.mediumPlus,
        alignItems: 'flex-end',
        ...CommonStyles.flex1
    },
    activeInput: {
        borderWidth: CommonSizes.borderWidth.thin,
        borderColor: LightThemeColors.main
    },
    inactiveInput: {
        borderWidth: CommonSizes.borderWidth.extraThin,
        borderColor: LightThemeColors.secondaryText
    }
});
