import {Image, StyleSheet, TextInput, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import {LightThemeColors} from "../core/theme/colors";
import {CommonSizes} from "../core/theme/commonSizes";
import {IPropsCustomInput} from "../infrastructure/dto/common/IPropsCustomInput";

export function CustomInput({placeholder, setValue, Icon, passwordInput, name}: IPropsCustomInput) {
    const [isVisible, setVisible] = useState(false);
    const [isFocused, setFocused] = useState(false);
    const eyeIcons = {
        open: require('../../resources/images/Eye.png'),
        closed: require('../../resources/images/EyeClosed.png')
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
        marginTop: 20,
        borderWidth: 1,
        borderColor: LightThemeColors.secondaryText,
        borderRadius: 16,
        alignItems: 'center',
        paddingLeft: 15,
        height: 57
    },
    input: {
        width: '78%',
        fontSize: CommonSizes.font.medium,
        marginLeft: 10
    },
    eyeIcon: {
        marginRight: 5
    },
    activeInput: {
        borderWidth: 2,
        borderColor: LightThemeColors.main
    },
    inactiveInput: {
        borderWidth: 1,
        borderColor: LightThemeColors.secondaryText
    }
});
