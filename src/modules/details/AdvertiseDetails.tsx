import {Navigation, NavigationFunctionComponent} from "react-native-navigation";
import {ImageURISource, ScrollView, StyleSheet, View} from "react-native";
import {CustomHeader} from "~/components/CustomHeader";
import React from "react";
import {CommonSizes} from "~/core/theme/commonSizes";
import {Roboto} from "~/infrastructure";
import {CommonStyles} from "~/core/theme/commonStyles";
import {ThemeColors} from "~/core/theme/colors";
import {useThemeColors, useThemedStyles} from "~/core/theme/hooks";
import {Pages} from "~/navigation/pages";
import {Publisher} from "~/modules/details/components/Publisher";
import {ImagesList} from "~/modules/details/components/ImagesList";

interface IProps {
    item: {
        id: string;
        title: string;
        description: string;
        price: string;
        location: string;
        date: string;
        images: ImageURISource[] | null;
    };
    isMyAd: boolean;
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

    const handlePressRightButton = (page: string, passProps: any) => {
        Navigation.push(Pages.tabs.id, {
            component: {
                name: page,
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
                passProps: passProps
            }
        });
    };

    return (
        <View style={styles.container}>
            <CustomHeader
                id={props.componentId}
                isStack isDetails={!props.isMyAd}
                hasEditButton={props.isMyAd}
                onPressEditButton={() => handlePressRightButton(Pages.newAdvertise.name, {
                    advertise: props.item,
                    isMyAd: props.isMyAd
                })}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.contentContainer}>
                    {props.item.images && <ImagesList images={props.item.images}/>}
                    <View style={[CommonStyles.rowCenter, styles.locationContainer]}>
                        <Roboto.Body.Medium text={props.item.date} color={colors.onSurface}/>
                        <Roboto.Body.Medium text={props.item.location} color={colors.onSurface}/>
                    </View>
                    <Roboto.Title.Large text={props.item.title} style={styles.text}/>
                    <Roboto.Title.Large text={props.item.price} style={styles.text}/>
                    <Roboto.Body.Small text={"Описание"} style={styles.text}/>
                    <Roboto.Body.Medium text={props.item.description} style={styles.text}/>
                </View>
                {!props.isMyAd && <Publisher navigateToUserProfile={() => handlePressRightButton(
                    Pages.profile.name,
                    {
                        isExternalUserProfile: true,
                        userData: userData
                    })}
                />}
            </ScrollView>
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
    },
    locationContainer: {
        justifyContent: 'space-between',
    },
    text: {
        marginTop: CommonSizes.margin.small,
        color: colors.onSurface
    },
});
