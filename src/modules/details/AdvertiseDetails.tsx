import {NavigationFunctionComponent} from "react-native-navigation";
import {Image, ImageURISource, SafeAreaView, StyleSheet, TouchableOpacity, View} from "react-native";
import {CustomHeader} from "~/components/CustomHeader";
import React from "react";
import {CommonSizes} from "~/core/theme/commonSizes";
import {Roboto} from "~/infrastructure";
import {CommonStyles} from "~/core/theme/commonStyles";
import {LightThemeColors} from "~/core/theme/colors";
import {ImageResources} from "~/common/ImageResources.g";
import MailIcon from "../../../resources/icons/mail.svg";
import PhoneIcon from "../../../resources/icons/phone.svg";

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
    return (
        <SafeAreaView>
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
            <TouchableOpacity style={styles.contentContainer} activeOpacity={0.7}>
                <View style={CommonStyles.rowCenter}>
                    <Image source={ImageResources.avatar} style={{width: 40, height: 40}}/>
                    <View style={{marginLeft: 16}}>
                        <Roboto.Body.Large text={"Евлампия Романова"}/>
                        <Roboto.Body.Small text={"на купи - и точка с декабря 2024"}/>
                    </View>
                </View>
                <View style={styles.mailContainer}>
                    <MailIcon/>
                    <Roboto.Body.Large text={"e.romanova@mail.ru"} style={styles.profileText}/>
                </View>
                <View style={CommonStyles.rowCenter}>
                    <PhoneIcon/>
                    <Roboto.Body.Large text={"+ 373 779 3 12 03"} style={[styles.profileText, styles.phoneText]}/>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        marginHorizontal: CommonSizes.margin.largePlus
    },
    image: {
        borderRadius: CommonSizes.borderRadius.extraLargePlus,
        marginBottom: CommonSizes.margin.largePlus
    },
    locationContainer: {
        justifyContent: 'space-between',
    },
    text: {
        marginTop: CommonSizes.margin.small
    },
    outline: {
        height: 1,
        marginVertical: CommonSizes.margin.largePlus,
        backgroundColor: LightThemeColors.outline
    },
    profileText: {
        marginLeft: CommonSizes.margin.largePlus
    },
    mailContainer: {
        ...CommonStyles.rowCenter,
        marginVertical: CommonSizes.margin.largePlus
    },
    phoneText: {
        marginLeft: CommonSizes.margin.medium
    }
});
