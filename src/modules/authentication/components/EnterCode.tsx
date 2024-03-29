import React, {useCallback, useMemo, useRef, useState} from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TextInputKeyPressEventData,
    TouchableOpacity,
    View
} from "react-native";
import {Navigation, NavigationComponentProps, NavigationFunctionComponent} from "react-native-navigation";
import {CustomHeader} from "~/components/CustomHeader";
import {CommonStyles} from "~/core/theme/commonStyles";
import {ThemeColors} from "~/core/theme/colors";
import {SubmitButton} from "~/components/SubmitButton";
import {Pages} from "~/navigation/pages";
import {Roboto} from "~/infrastructure/typography";
import {CommonSizes} from "~/core/theme/commonSizes";
import {useThemeColors, useThemedStyles} from "~/core/theme/hooks";
import {windowWidth} from "~/core/theme/commonConsts";
import {useLazyCheckOtpCodeQuery} from "~/core/store/auth/authQuery";

interface IProps extends NavigationComponentProps {
    phoneNumber: string;
}

export const EnterCode: NavigationFunctionComponent<IProps> = (props): JSX.Element => {
    const [checkOtpTrigger, {isSuccess}] = useLazyCheckOtpCodeQuery();
    const inputRefs = useRef<TextInput[]>([]);
    const [isDisabled, setDisabled] = useState(false);
    const [remainingTime, setRemainingTime] = useState(30);
    const [isFocused, setFocused] = useState<boolean[]>(Array(inputRefs.current.length).fill(false));
    const [code, setCode] = useState<string[]>(['', '', '', '']);
    const styles = useThemedStyles(stylesG);
    const colors = useThemeColors();

    const handleFocus = (index: number, state: boolean) => {
        setFocused(prev => {
            const newState = [...prev];
            newState[index] = state;

            return newState;
        });
    };

    const textStyles = useMemo(() => ({color: isDisabled ? colors.onSurface : colors.main}),
        [isDisabled, colors.main, colors.onSurface]);

    const inputStyle = useMemo(() => {
        return (index: number) => isFocused[index] ? styles.activeInput : styles.inactiveInput;
    }, [isFocused, styles.activeInput, styles.inactiveInput]);

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

    const onChangeInputText = (text: string, index: number) => {
        const newCode = [...code];
        newCode[index] = text;
        setCode(newCode);
    };

    const handleChangeCode = (index: number, text: string) => {
        onChangeInputText(text, index);
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

    const onSubmit = useCallback(() => {
        checkOtpTrigger({
            phoneNumber: props.phoneNumber,
            otpCodeReason: 'ResetPassword',
            otpCode: code.join('')
        });
        if (isSuccess) {
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
        }
    }, [isSuccess]);

    return (
        <View>
            <CustomHeader headerTitle="authentication.enterCode" id={props.componentId} isAuth isStack/>
            <View style={[styles.container, CommonStyles.marginContainer]}>
                <View style={CommonStyles.rowCenter}>
                    <Roboto.Body.Medium labelKey="authentication.enterCodeText" color={colors.onSurface}/>
                    <Roboto.Body.Medium text={props.phoneNumber} color={colors.onSurface}/>
                </View>
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
                                onFocus={() => handleFocus(index, true)}
                                onBlur={() => handleFocus(index, false)}
                                onKeyPress={({nativeEvent}) => handleBackspaceInput(nativeEvent, index)}
                                style={[styles.input, inputStyle(index)]}
                                selectionColor={colors.main}
                            />
                        );
                    })}
                </View>
                <SubmitButton submitButtonTitle="authentication.confirm" onSubmit={onSubmit}
                              disabled={code.includes('')}/>
                <TouchableOpacity
                    style={styles.resendCode}
                    disabled={isDisabled}
                    onPress={handleSendCode}>
                    <Roboto.Label.Large
                        labelKey="authentication.resendCode"
                        style={textStyles}>
                    </Roboto.Label.Large>
                    {isDisabled && <Text style={styles.timer}>{remainingTime}</Text>}
                </TouchableOpacity>
            </View>
        </View>
    );
};

const stylesG = (colors: ThemeColors) => StyleSheet.create({
    container: {
        marginHorizontal: CommonSizes.margin.largePlus,
    },
    input: {
        borderWidth: CommonSizes.borderWidth.extraThin,
        borderRadius: CommonSizes.borderRadius.largePlus,
        textAlign: 'center',
        borderColor: colors.outline,
        color: colors.onSurface,
        height: windowWidth / 390 * 56,
        width: windowWidth / 390 * 80
    },
    inputContainer: {
        justifyContent: 'space-between',
        marginHorizontal: CommonSizes.margin.extraSmall,
        marginTop: CommonSizes.margin.largePlus,
    },
    activeInput: {
        borderColor: colors.main,
        borderWidth: CommonSizes.borderWidth.thin
    },
    inactiveInput: {
        borderColor: colors.outline,
        borderWidth: CommonSizes.borderWidth.extraThin
    },
    resendCode: {
        marginTop: CommonSizes.margin.superLarge,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    timer: {
        marginLeft: CommonSizes.margin.smallPlus,
        color: colors.onSurface
    },
});
