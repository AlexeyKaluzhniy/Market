import {Image, ImageURISource, StyleSheet, TouchableOpacity, View} from "react-native";
import React from "react";
import {Roboto} from "~/infrastructure";
import {CommonSizes} from "~/core/theme/commonSizes";
import {LightThemeColors} from "~/core/theme/colors";
import {CommonStyles} from "~/core/theme/commonStyles";
import {FavoriteButton} from "~/components/FavoriteButton";
import {Navigation} from "react-native-navigation";
import {Pages} from "~/navigation/pages";

interface IListItemProps {
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

export function ListItem({item}: IListItemProps) {
    const navigateToDetails = () => {
        Navigation.push(Pages.tabs.id, {
            component: {
                name: Pages.details.name,
                options: {
                    topBar: {
                        visible: false
                    },
                },
                passProps: {
                    item: item
                }
            }
        });
    };

    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.6} onPress={navigateToDetails}>
            {item.image && <Image source={item.image} style={styles.image}/>}
            <View style={{padding: CommonSizes.padding.large}}>
                <View style={styles.header}>
                    <Roboto.Title.Medium text={item.title}/>
                    <FavoriteButton/>
                </View>
                <Roboto.Body.Medium text={item.body} numberOfLines={2} color={LightThemeColors.onSurface}/>
                <Roboto.Title.Large text={item.price} style={styles.text}/>
                <Roboto.Body.Medium text={item.location} style={styles.text} color={LightThemeColors.onSurface}/>
                <Roboto.Body.Medium text={item.date} color={LightThemeColors.onSurface}/>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        borderWidth: CommonSizes.borderWidth.extraThin,
        borderRadius: CommonSizes.borderRadius.medium,
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
    },
    image: {
        alignSelf: 'center',
        width: '100%',
        borderTopLeftRadius: CommonSizes.borderRadius.medium - 1,
        borderTopRightRadius: CommonSizes.borderRadius.medium - 1
    }
});
