import React, {useMemo, useRef, useState} from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TextInputKeyPressEventData,
    TouchableOpacity,
    View
} from "react-native";
import {Navigation, NavigationFunctionComponent} from "react-native-navigation";
import {CustomHeader} from "~/components/CustomHeader";
import {CommonStyles} from "~/core/theme/commonStyles";
import {ThemeColors} from "~/core/theme/colors";
import {SubmitButton} from "~/components/SubmitButton";
import {Pages} from "~/navigation/pages";
import {Roboto} from "~/infrastructure/typography";
import {CommonSizes} from "~/core/theme/commonSizes";
import {useThemeColors, useThemedStyles} from "~/core/theme/hooks";
import {isAndroid, isIos} from "~/core/theme/commonConsts";

export const EnterCode: NavigationFunctionComponent = (props): JSX.Element => {
    const inputRefs = useRef<TextInput[]>([]);
    const [isDisabled, setDisabled] = useState(false);
    const [remainingTime, setRemainingTime] = useState(30);
    const [isFocused, setFocused] = useState<boolean[]>(Array(inputRefs.current.length).fill(false));
    const styles = useThemedStyles(stylesG);
    const colors = useThemeColors();

    const handleFocus = (index: number, state: boolean) => {
        setFocused(prev => {
            const newState = [...prev];
            newState[index] = state;

            return newState;
        });
    };

    const textStyles = useMemo(() => ({color: isDisabled ? colors.onSurface : colors.main}), [colors.main, colors.onSurface, isDisabled]);

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
            <CustomHeader headerTitle="authentication.enterCode" id={props.componentId} isAuth isStack/>
            <View style={[styles.container, CommonStyles.marginContainer]}>
                <Roboto.Body.Medium labelKey="authentication.enterCodeText" color={colors.onSurface}/>
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
                                style={[styles.input, isFocused[index] ? styles.activeInput : styles.inactiveInput]}
                                selectionColor={colors.main}
                            />
                        );
                    })}
                </View>
                <SubmitButton submitButtonTitle="authentication.confirm" onSubmit={onSubmit} disabled={false}/>
                <TouchableOpacity
                    style={styles.resendCode}
                    disabled={isDisabled}
                    onPress={!isDisabled ? handleSendCode : () => null}>
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
        paddingHorizontal: isAndroid ? CommonSizes.padding.extraLargePlus : CommonSizes.padding.superLarge,
        paddingVertical: isIos ? CommonSizes.padding.large : CommonSizes.padding.smallPlus,
        borderColor: colors.outline,
        color: colors.onSurface,
        height: 52,
        width: 75
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
