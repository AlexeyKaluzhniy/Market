import {Image, StyleSheet, TextInput, TextStyle, TouchableOpacity, View} from "react-native";
import React, {useCallback, useState} from "react";
import {ThemeColors} from "~/core/theme/colors";
import {CommonSizes} from "~/core/theme/commonSizes";
import {ImageResources} from "~/common/ImageResources.g";
import {Dto, Roboto} from "~/infrastructure";
import {useThemeColors, useThemedStyles} from "~/core/theme/hooks";

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
    }: Dto.Common.PropsCustomInput) {
    const [initValue, setInitValue] = useState(value);
    const [isVisible, setVisible] = useState(passwordInput);
    const [isFocused, setFocused] = useState(false);
    const styles = useThemedStyles(stylesG);
    const colors = useThemeColors();
    const eyeIcons = {
        open: ImageResources.eye,
        closed: ImageResources.eyeclosed
    };

    const updateValue = (text: string) => {
        setValue(name, text);
        setInitValue(text);
    };

    const activePlaceholderStyle: TextStyle = {
        top: -CommonSizes.margin.smallPlus,
        left: CommonSizes.margin.medium,
        paddingHorizontal: CommonSizes.padding.extraSmall,
        color: colors.main
    };

    const inactivePlaceholderStyle: TextStyle = {
        top: CommonSizes.margin.extraLarge,
        left: Icon ? 55 : CommonSizes.margin.extraLarge,
        fontSize: CommonSizes.font.medium,
        zIndex: -1,
        color: colors.onSurface
    };

    const movePlaceholder = useCallback(() => {
        if (isFocused) {
            return activePlaceholderStyle;
        } else if (!isFocused && !initValue) {
            return inactivePlaceholderStyle;
        } else {
            return {...activePlaceholderStyle, color: colors.onSurface};
        }
    }, [isFocused]);

    return (
        <View style={[styles.inputContainer, isFocused ? styles.activeInput : styles.inactiveInput]}>
            {Icon &&
                <Icon width={CommonSizes.image.largePlus} height={CommonSizes.image.largePlus} style={styles.icon}/>}
            <TextInput
                onChangeText={text => updateValue(text)}
                secureTextEntry={isVisible}
                style={styles.input}
                value={initValue}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                keyboardType={numberInput ? 'phone-pad' : 'default'}
                selectionColor={colors.main}
                maxLength={maxLength}
            />
            {passwordInput &&
                <TouchableOpacity onPress={() => setVisible((prev) => !prev)} style={styles.eyeIconContainer}>
                    <Image
                        source={isVisible ? eyeIcons.closed : eyeIcons.open}
                        style={styles.eyeIcon}
                    />
                </TouchableOpacity>}
            <Roboto.Body.Small text={placeholder} style={[styles.placeholder, movePlaceholder()]}/>
        </View>
    );
}

const stylesG = (colors: ThemeColors) => StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        marginTop: CommonSizes.margin.extraLarge,
        borderWidth: CommonSizes.borderWidth.extraThin,
        borderColor: colors.outlineVariant,
        borderRadius: CommonSizes.borderRadius.largePlus,
        alignItems: 'center',
        paddingLeft: CommonSizes.padding.large,
        height: 56,
    },
    input: {
        minWidth: '45%',
        fontSize: CommonSizes.font.medium,
        color: colors.text,
        flexGrow: 1,
    },
    eyeIconContainer: {
        marginRight: CommonSizes.margin.largePlus,
    },
    eyeIcon: {
        tintColor: colors.outline
    },
    activeInput: {
        borderWidth: CommonSizes.borderWidth.thin,
        borderColor: colors.main
    },
    inactiveInput: {
        borderWidth: CommonSizes.borderWidth.extraThin,
        borderColor: colors.outline
    },
    icon: {
        marginRight: CommonSizes.margin.smallPlus
    },
    placeholder: {
        backgroundColor: colors.background,
        position: 'absolute'
    }
});
