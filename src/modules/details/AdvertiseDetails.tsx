import {NavigationFunctionComponent} from "react-native-navigation";
import {Image, ImageURISource, SafeAreaView, StyleSheet, View} from "react-native";
import {CustomHeader} from "~/components/CustomHeader";
import React from "react";
import {CommonSizes} from "~/core/theme/commonSizes";
import {Roboto} from "~/infrastructure";
import {CommonStyles} from "~/core/theme/commonStyles";
import {LightThemeColors} from "~/core/theme/colors";

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
    }
});
