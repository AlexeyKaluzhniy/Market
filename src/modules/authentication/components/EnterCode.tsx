import React, {useRef, useState} from "react";
import {StyleSheet, Text, TextInput, TextInputKeyPressEventData, TouchableOpacity, View} from "react-native";
import {Navigation, NavigationFunctionComponent} from "react-native-navigation";
import {AuthCustomHeader} from "~/components/AuthCustomHeader";
import {CommonStyles} from "~/core/theme/commonStyles";
import {LightThemeColors} from "~/core/theme/colors";
import {SubmitButton} from "~/components/SubmitButton";
import {Pages} from "~/navigation/pages";
import {Roboto} from "~/infrastructure/typography";

export const EnterCode: NavigationFunctionComponent = (): JSX.Element => {
    const inputRefs = useRef<TextInput[]>([]);
    const [isDisabled, setDisabled] = useState(false);
    const [remainingTime, setRemainingTime] = useState(30);

    const handleSendCode = () => {
        setDisabled(true);
        const start = new Date().getTime();
        const interval = setInterval(() => {
            const now = new Date().getTime();
            setRemainingTime(prev => prev - 1);
            if (now - start >= 30000) {
                setDisabled(false);
                clearInterval(interval);
                setRemainingTime(30);
            }
        }, 1000);
    };

    const handleChangeCode = (index: number, text: string) => {
        if (text.length !== 0 && index !== 3) {
            inputRefs.current[index + 1].focus();
        } else if (text.length == 0 && index !== 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleBackspaceInput = (nativeEvent: TextInputKeyPressEventData, index: number) => {
        if (nativeEvent.key == 'Backspace') {
            handleChangeCode(index, '');
        }
    };

    const onSubmit = () => {
        Navigation.push(Pages.auth.id, {
            component: {
                name: Pages.newPassword.name,
                options: {
                    topBar: {
                        visible: false
                    },
                },
            }
        });
    };

    return (
        <View>
            <AuthCustomHeader headerTitle="authentication.enterCode"/>
            <View style={[styles.container, CommonStyles.marginContainer]}>
                <Roboto.Body.Medium labelKey="authentication.enterCodeText"/>
                <View style={[CommonStyles.row, styles.inputContainer]}>
                    {[...new Array(4)].map((value, index) => {
                        return (
                            <TextInput
                                key={index}
                                ref={ref => {
                                    if (ref && !inputRefs.current.includes(ref)) {
                                        inputRefs.current = [...inputRefs.current, ref];
                                    }
                                }}
                                selectTextOnFocus
                                keyboardType="numeric"
                                maxLength={1}
                                onChangeText={text => {
                                    handleChangeCode(index, text);
                                }}
                                onKeyPress={({nativeEvent}) => handleBackspaceInput(nativeEvent, index)}
                                style={styles.input}
                                selectionColor={LightThemeColors.main}
                            />
                        );
                    })}
                </View>
                <SubmitButton submitButtonTitle="authentication.confirm" onSubmit={onSubmit}/>
                <TouchableOpacity
                    style={styles.resendCode}
                    disabled={isDisabled}
                    onPress={!isDisabled ? handleSendCode : () => null}>
                    <Roboto.LabelFont.Large
                        labelKey="authentication.resendCode"
                        style={isDisabled ? styles.textInactive : styles.textActive}>
                    </Roboto.LabelFont.Large>
                    {isDisabled && <Text style={styles.timer}>{remainingTime}</Text>}
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 16,
    },
    input: {
        borderWidth: 1,
        borderRadius: 15,
        textAlign: 'center',
        paddingHorizontal: 25,
        borderColor: LightThemeColors.secondaryText
    },
    inputContainer: {
        justifyContent: 'space-between',
        marginHorizontal: 3,
        marginTop: 16
    },
    resendCode: {
        marginTop: 38,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    textActive: {
        color: LightThemeColors.main
    },
    textInactive: {
        color: LightThemeColors.secondaryText
    },
    timer: {
        marginLeft: 10
    }
});
