import {Navigation, NavigationFunctionComponent} from "react-native-navigation";
import {ScrollView, StyleSheet, View} from "react-native";
import {CustomHeader} from "~/components/CustomHeader";
import React from "react";
import {CommonSizes} from "~/core/theme/commonSizes";
import {Roboto} from "~/infrastructure";
import {CommonStyles} from "~/core/theme/commonStyles";
import {ThemeColors} from "~/core/theme/colors";
import {useThemeColors, useThemedStyles} from "~/core/theme/hooks";
import {Pages} from "~/navigation/pages";
import {Publisher} from "~/modules/details/components/Publisher";
import {ImagesSlider} from "~/modules/details/components/ImagesSlider";
import {externalUser} from "~/infrastructure/mocks/users";
import {IUserData} from "~/infrastructure/dto/common/IUserData";
import {IAdvertise} from "~/infrastructure/dto/common/IAdvertise";

interface IProps {
    item: IAdvertise;
    isMyAd: boolean;
}

interface IPassProps {
    advertise?: IAdvertise;
    isMyAd?: boolean;
    isExternalUserProfile?: boolean;
    userData?: IUserData;
}

export const AdvertiseDetails: NavigationFunctionComponent<IProps> = (props) => {
    const styles = useThemedStyles(stylesG);
    const colors = useThemeColors();

    const handlePressRightButton = (page: string, passProps: IPassProps) => {
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
                    {props.item.images && <ImagesSlider images={props.item.images}/>}
                    <View style={[CommonStyles.rowCenter, styles.locationContainer]}>
                        <Roboto.Body.Medium text={props.item.date} color={colors.onSurface}/>
                        <Roboto.Body.Medium text={props.item.city} color={colors.onSurface}/>
                    </View>
                    <Roboto.Title.Large text={props.item.title} style={styles.text}/>
                    <Roboto.Title.Large text={props.item.price} style={styles.text}/>
                    <Roboto.Body.Small labelKey={"new_advertise.description"} style={styles.text}/>
                    <Roboto.Body.Medium text={props.item.description} style={styles.text}/>
                </View>
                {!props.isMyAd && <Publisher navigateToUserProfile={() => handlePressRightButton(
                    Pages.profile.name,
                    {
                        isExternalUserProfile: true,
                        userData: externalUser
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
