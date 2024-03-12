import {Image, StyleSheet, TextInput, TextStyle, TouchableOpacity, View} from "react-native";
import React, {useCallback, useState} from "react";
import {LightThemeColors} from "~/core/theme/colors";
import {CommonSizes} from "~/core/theme/commonSizes";
import {IPropsCustomInput} from "~/infrastructure/dto/common/IPropsCustomInput";
import {ImageResources} from "~/common/ImageResources.g";
import {Roboto} from "~/infrastructure";

export function DefaultInput(
    {
        placeholder,
        setValue,
        Icon,
        passwordInput,
        name,
        maxLength,
        numberInput,
        value
    }: IPropsCustomInput) {
    const [initValue, setInitValue] = useState(value);
    const [isVisible, setVisible] = useState(passwordInput);
    const [isFocused, setFocused] = useState(false);
    const eyeIcons = {
        open: ImageResources.eye,
        closed: ImageResources.eyeclosed
    };

    const updateValue = (text: string) => {
        setValue(name, text);
        setInitValue(text);
    };

    const activePlaceholderStyle: TextStyle = {
        top: -10,
        left: 12,
        paddingHorizontal: 3,
        color: LightThemeColors.main
    };

    const inactivePlaceholderStyle: TextStyle = {
        top: 20,
        left: Icon ? 55 : 20,
        fontSize: 16,
        zIndex: -1
    };

    const movePlaceholder = useCallback(() => {
        if (isFocused) {
            return activePlaceholderStyle;
        } else if (!isFocused && !initValue) {
            return inactivePlaceholderStyle;
        } else {
            return {...activePlaceholderStyle, color: LightThemeColors.text};
        }
    }, [isFocused]);

    return (
        <View style={[styles.inputContainer, isFocused ? styles.activeInput : styles.inactiveInput]}>
            {Icon && <Icon width={25} height={25} style={styles.icon}/>}
            <TextInput
                onChangeText={text => updateValue(text)}
                secureTextEntry={isVisible}
                style={styles.input}
                value={initValue}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                keyboardType={numberInput ? 'numeric' : 'default'}
                selectionColor={LightThemeColors.main}
                maxLength={maxLength}
            />
            {passwordInput &&
                <TouchableOpacity onPress={() => setVisible((prev) => !prev)} style={styles.eyeIcon}>
                    <Image
                        source={isVisible ? eyeIcons.closed : eyeIcons.open}
                    />
                </TouchableOpacity>}
            <Roboto.Body.Small text={placeholder} style={[styles.placeholder, movePlaceholder()]}/>
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
        minWidth: '45%',
        fontSize: CommonSizes.font.medium,
        color: LightThemeColors.text,
        flexGrow: 1,
    },
    eyeIcon: {
        marginRight: CommonSizes.margin.largePlus,
    },
    activeInput: {
        borderWidth: CommonSizes.borderWidth.thin,
        borderColor: LightThemeColors.main
    },
    inactiveInput: {
        borderWidth: CommonSizes.borderWidth.extraThin,
        borderColor: LightThemeColors.secondaryText
    },
    icon: {
        marginRight: CommonSizes.margin.smallPlus
    },
    placeholder: {
        backgroundColor: LightThemeColors.background,
        position: 'absolute'
    }
});
