import {Image, ImageURISource, StyleSheet, View} from "react-native";
import {Roboto} from "~/infrastructure";
import React from "react";
import {CommonSizes} from "~/core/theme/commonSizes";
import {CommonStyles} from "~/core/theme/commonStyles";
import {ThemeColors} from "~/core/theme/colors";
import {TFuncKeyApp} from "~/common/localization/localization";
import {useThemedStyles} from "~/core/theme/hooks";

interface IEmptyScreenProps {
    image: ImageURISource;
    title: TFuncKeyApp;
    text: TFuncKeyApp;
}

export function EmptyScreen({image, title, text}: IEmptyScreenProps) {
    const styles = useThemedStyles(stylesG);

    return (
        <View style={styles.emptyContainer}>
            <Image source={image} style={styles.image}/>
            <Roboto.Title.Large labelKey={title} style={styles.title}/>
            <Roboto.Body.Medium labelKey={text} style={styles.text}/>
        </View>
    );
}

const stylesG = (colors: ThemeColors) => StyleSheet.create({
    emptyContainer: {
        marginHorizontal: CommonSizes.margin.largePlus,
        justifyContent: 'center',
        alignItems: 'center',
        ...CommonStyles.flex1,
    },
    image: {
        marginTop: -CommonSizes.margin.superLarge,
        tintColor: colors.outlineVariant
    },
    title: {
        textAlign: 'center',
        marginTop: CommonSizes.margin.extraLargePlus,
        color: colors.onSurface
    },
    text: {
        marginTop: CommonSizes.margin.largePlus,
        color: colors.onSurface,
        textAlign: 'center'
    }
});
