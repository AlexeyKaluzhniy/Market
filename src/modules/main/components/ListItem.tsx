import {StyleSheet, TouchableOpacity, View} from "react-native";
import React from "react";
import {Roboto} from "~/infrastructure";
import {CommonSizes} from "~/core/theme/commonSizes";
import {LightThemeColors} from "~/core/theme/colors";
import {CommonStyles} from "~/core/theme/commonStyles";
import {FavoriteButton} from "~/components/FavoriteButton";

interface IListItemProps {
    item: {
        id: string;
        title: string;
        body: string;
        price: string;
        location: string;
        date: string;
    };
}

export function ListItem({item}: IListItemProps) {
    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.6}>
            <View style={styles.header}>
                <Roboto.Title.Medium text={item.title}/>
                <FavoriteButton/>
            </View>
            <Roboto.Body.Medium text={item.body} numberOfLines={2} color={LightThemeColors.onSurface}/>
            <Roboto.Title.Large text={item.price} style={styles.text}/>
            <Roboto.Body.Medium text={item.location} style={styles.text} color={LightThemeColors.onSurface}/>
            <Roboto.Body.Medium text={item.date} color={LightThemeColors.onSurface}/>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        borderWidth: CommonSizes.borderWidth.extraThin,
        borderRadius: CommonSizes.borderRadius.medium,
        padding: CommonSizes.padding.large,
        borderColor: LightThemeColors.outline,
        marginBottom: CommonSizes.margin.small
    },
    text: {
        marginTop: CommonSizes.margin.small
    },
    header: {
        ...CommonStyles.row,
        justifyContent: 'space-between',
        paddingBottom: CommonSizes.padding.large
    }
});
