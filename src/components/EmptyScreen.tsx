import {Image, ImageURISource, StyleSheet, View} from "react-native";
import {Roboto} from "~/infrastructure";
import React from "react";
import {CommonSizes} from "~/core/theme/commonSizes";
import {CommonStyles} from "~/core/theme/commonStyles";
import {LightThemeColors} from "~/core/theme/colors";
import {TFuncKeyApp} from "~/common/localization/localization";

interface IEmptyScreenProps {
    image: ImageURISource;
    title: TFuncKeyApp;
    text: TFuncKeyApp;
}

export function EmptyScreen({image, title, text}: IEmptyScreenProps) {
    return (
        <View style={styles.emptyContainer}>
            <Image source={image} style={styles.heartImage}/>
            <Roboto.Title.Large labelKey={title} style={styles.title}/>
            <Roboto.Body.Medium labelKey={text} style={styles.text}/>
        </View>
    );
}

const styles = StyleSheet.create({
    emptyContainer: {
        marginHorizontal: CommonSizes.margin.largePlus,
        justifyContent: 'center',
        alignItems: 'center',
        ...CommonStyles.flex1
    },
    heartImage: {
        marginTop: -CommonSizes.margin.superLarge
    },
    title: {
        textAlign: 'center',
        marginTop: CommonSizes.margin.extraLargePlus
    },
    text: {
        marginTop: CommonSizes.margin.largePlus,
        color: LightThemeColors.onSurface,
        textAlign: 'center'
    }
});
