import {StyleSheet, View} from "react-native";
import React, {useEffect, useState} from "react";
import {Navigation, NavigationFunctionComponent} from "react-native-navigation";
import {Pages} from "~/navigation/pages";
import {CustomHeader} from "~/components/CustomHeader";
import {CustomInputForm} from "./CustomInputForm";
import {CommonStyles} from "~/core/theme/commonStyles";
import {object, string} from "yup";
import {Roboto} from "~/infrastructure";
import {CommonSizes} from "~/core/theme/commonSizes";
import {ThemeColors} from "~/core/theme/colors";
import {useThemedStyles} from "~/core/theme/hooks";
import {useLazySendOtpCodeQuery} from "~/core/store/auth/authQuery";

export const ForgotPassword: NavigationFunctionComponent = (props): JSX.Element => {
    const styles = useThemedStyles(stylesG);
    const [phone, setPhone] = useState('');
    const [sendOtpCode] = useLazySendOtpCodeQuery();

    const schema = object({
        phone: string().required().matches(/^\d{11}$/),
    });

    useEffect(() => {
        if (phone) {
            Navigation.push(Pages.auth.id, {
                component: {
                    name: Pages.code.name,
                    options: {
                        topBar: {
                            visible: false
                        },
                    },
                    passProps: {
                        phoneNumber: phone
                    }
                }
            });
        }
    }, [phone]);


    return (
        <View style={CommonStyles.flex1}>
            <CustomHeader headerTitle='authentication.recoverPassword' id={props.componentId} isStack isAuth/>
            <View style={[CommonStyles.flex1, CommonStyles.marginContainer]}>
                <Roboto.Body.Medium style={styles.text} labelKey="authentication.phoneRecovery"/>
                <CustomInputForm
                    submitButtonTitle='authentication.sendSms'
                    phoneField
                    schema={schema}
                    onSubmit={setPhone}
                />
            </View>
        </View>
    );
};

const stylesG = (colors: ThemeColors) => StyleSheet.create({
    text: {
        marginHorizontal: CommonSizes.margin.largePlus,
        color: colors.onSurface
    }
});

