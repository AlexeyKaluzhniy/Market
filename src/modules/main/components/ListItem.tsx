import {Image, StyleSheet, TouchableOpacity, View} from "react-native";
import React from "react";
import {Roboto} from "~/infrastructure";
import {CommonSizes} from "~/core/theme/commonSizes";
import {ThemeColors} from "~/core/theme/colors";
import {CommonStyles} from "~/core/theme/commonStyles";
import {FavoriteButton} from "~/components/FavoriteButton";
import {Navigation} from "react-native-navigation";
import {Pages} from "~/navigation/pages";
import {useThemeColors, useThemedStyles} from "~/core/theme/hooks";
import {ImageResources} from "~/common/ImageResources.g";

interface IListItemProps {
    item: {
        id: string;
        title: string;
        description: string;
        price: string;
        location: string;
        date: string;
        images: ImageResources[] | null;
    };
    isMyAd?: boolean;
}

export function ListItem({item, isMyAd}: IListItemProps) {
    const colors = useThemeColors();
    const styles = useThemedStyles(stylesG);

    const navigateToDetails = () => {
        Navigation.push(Pages.tabs.id, {
            component: {
                name: Pages.details.name,
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
                    item: item,
                    isMyAd: isMyAd
                }
            }
        });
    };

    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.6} onPress={navigateToDetails}>
            {item.images && <Image source={item.images[0]} style={styles.image}/>}
            <View style={{padding: CommonSizes.padding.large}}>
                <View style={styles.header}>
                    <Roboto.Title.Medium text={item.title} color={colors.onSurface}/>
                    <FavoriteButton/>
                </View>
                <Roboto.Body.Medium text={item.description} numberOfLines={2} color={colors.onSurface}/>
                <Roboto.Title.Large text={item.price} style={styles.text}/>
                <Roboto.Body.Medium text={item.location} style={styles.text} color={colors.onSurface}/>
                <Roboto.Body.Medium text={item.date} color={colors.onSurface}/>
            </View>
        </TouchableOpacity>
    );
}

const stylesG = (colors: ThemeColors) => StyleSheet.create({
    container: {
        borderWidth: CommonSizes.borderWidth.extraThin,
        borderRadius: CommonSizes.borderRadius.medium,
        borderColor: colors.outline,
        marginBottom: CommonSizes.margin.small
    },
    text: {
        marginTop: CommonSizes.margin.small,
        color: colors.onSurface
    },
    header: {
        ...CommonStyles.row,
        justifyContent: 'space-between',
        paddingBottom: CommonSizes.padding.large
    },
    image: {
        alignSelf: 'center',
        width: '100%',
        height: 176,
        borderTopLeftRadius: CommonSizes.borderRadius.medium - 1,
        borderTopRightRadius: CommonSizes.borderRadius.medium - 1,
    }
});
