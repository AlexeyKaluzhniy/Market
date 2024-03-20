import {Navigation, NavigationFunctionComponent} from "react-native-navigation";
import {Image, ImageURISource, StyleSheet, TouchableOpacity, View} from "react-native";
import {CustomHeader} from "~/components/CustomHeader";
import React from "react";
import {CommonSizes} from "~/core/theme/commonSizes";
import {Roboto} from "~/infrastructure";
import {CommonStyles} from "~/core/theme/commonStyles";
import {ThemeColors} from "~/core/theme/colors";
import {ImageResources} from "~/common/ImageResources.g";
import MailIcon from "../../../resources/icons/mail.svg";
import PhoneIcon from "../../../resources/icons/phone.svg";
import {useThemeColors, useThemedStyles} from "~/core/theme/hooks";
import {Pages} from "~/navigation/pages";

interface IProps {
    item: {
        id: string;
        title: string;
        body: string;
        price: string;
        location: string;
        date: string;
        image: ImageURISource | null;
    };
}

export const AdvertiseDetails: NavigationFunctionComponent<IProps> = (props) => {
    const styles = useThemedStyles(stylesG);
    const colors = useThemeColors();

    const userData = {
        name: "Евлампия Романова",
        registerDate: "на купи - и точка с декабря 2024",
        email: "e.romanova@mail.ru",
        phone: "+ 373 779 3 12 03"
    };

    const navigatetoUserProfile = () => {
        Navigation.push(Pages.tabs.id, {
            component: {
                name: Pages.profile.name,
                options: {
                    topBar: {
                        visible: false
                    },
                    sideMenu: {
                        left: {
                            enabled: false
                        }
                    }
                },
                passProps: {
                    isExternalUserProfile: true,
                    userData: userData
                }
            }
        });
    };

    return (
        <View style={styles.container}>
            <CustomHeader id={props.componentId} isStack isDetails/>
            <View style={styles.contentContainer}>
                {props.item.image &&
                    <Image source={props.item.image} style={styles.image}/>}
                <View style={[CommonStyles.rowCenter, styles.locationContainer]}>
                    <Roboto.Body.Medium text={props.item.date}/>
                    <Roboto.Body.Medium text={props.item.location}/>
                </View>
                <Roboto.Title.Large text={props.item.title} style={styles.text}/>
                <Roboto.Title.Large text={props.item.price} style={styles.text}/>
                <Roboto.Body.Small text={"Описание"} style={styles.text}/>
                <Roboto.Body.Medium text={props.item.body} style={styles.text}/>
            </View>
            <View style={styles.outline}/>
            <TouchableOpacity style={styles.contentContainer} activeOpacity={0.7} onPress={navigatetoUserProfile}>
                <View style={CommonStyles.rowCenter}>
                    <Image source={ImageResources.avatar} style={styles.avatar}/>
                    <View style={styles.name}>
                        <Roboto.Body.Large text={"Евлампия Романова"} color={colors.onSurface}/>
                        <Roboto.Body.Small text={"на купи - и точка с декабря 2024"} color={colors.onSurface}/>
                    </View>
                </View>
                <View style={styles.mailContainer}>
                    <MailIcon color={colors.outline}/>
                    <Roboto.Body.Large text={"e.romanova@mail.ru"} style={styles.profileText}/>
                </View>
                <View style={CommonStyles.rowCenter}>
                    <PhoneIcon/>
                    <Roboto.Body.Large text={"+ 373 779 3 12 03"} style={[styles.profileText, styles.phoneText]}/>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const stylesG = (colors: ThemeColors) => StyleSheet.create({
    container: {
        ...CommonStyles.flex1,
    },
    contentContainer: {
        marginHorizontal: CommonSizes.margin.largePlus,
    },
    image: {
        borderRadius: CommonSizes.borderRadius.extraLargePlus,
        marginBottom: CommonSizes.margin.largePlus
    },
    locationContainer: {
        justifyContent: 'space-between',
    },
    text: {
        marginTop: CommonSizes.margin.small,
        color: colors.onSurface
    },
    outline: {
        height: 1,
        marginVertical: CommonSizes.margin.largePlus,
        backgroundColor: colors.outline
    },
    profileText: {
        marginLeft: CommonSizes.margin.largePlus,
        color: colors.onSurface
    },
    mailContainer: {
        ...CommonStyles.rowCenter,
        marginVertical: CommonSizes.margin.largePlus
    },
    phoneText: {
        marginLeft: CommonSizes.margin.medium
    },
    avatar: {
        width: 40,
        height: 40
    },
    name: {
        marginLeft: CommonSizes.margin.largePlus
    }
});
