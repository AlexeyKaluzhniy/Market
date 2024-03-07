import {Image, SafeAreaView, StyleSheet, View} from "react-native";
import {NavigationFunctionComponent} from "react-native-navigation";
import React from "react";
import {CustomHeader} from "~/components/CustomHeader";
import {AddButton} from "~/components/AddButton";
import {CommonStyles} from "~/core/theme/commonStyles";
import {ImageResources} from "~/common/ImageResources.g";
import {Roboto} from "~/infrastructure";
import {CommonSizes} from "~/core/theme/commonSizes";
import {LightThemeColors} from "~/core/theme/colors";

export const Favorite: NavigationFunctionComponent = (props): JSX.Element => {
    const images = null;

    return (
        <SafeAreaView style={CommonStyles.flex1}>
            <CustomHeader id={props.componentId} headerTitle="pages.favorite"/>
            {images ? <View></View> :
                <View style={styles.emptyContainer}>
                    <Image source={ImageResources.heart} style={styles.heartImage}/>
                    <Roboto.Title.Large text={"Добавляйте объявления в избранное"} style={styles.title}/>
                    <Roboto.Body.Medium text={"Вы можете вернуться к нам позже"} style={styles.textLater}/>
                </View>
            }
            <AddButton/>
        </SafeAreaView>
    );
};

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
    textLater: {
        marginTop: CommonSizes.margin.largePlus,
        color: LightThemeColors.onSurface
    }
});
