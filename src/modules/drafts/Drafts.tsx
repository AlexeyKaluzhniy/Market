import {Navigation, NavigationFunctionComponent} from "react-native-navigation";
import {FlatList, StyleSheet, TouchableOpacity, View} from "react-native";
import {CustomHeader} from "~/components/CustomHeader";
import {CommonStyles} from "~/core/theme/commonStyles";
import {useAppSelector} from "~/core/store/store";
import {IAdvertise} from "~/infrastructure/dto/common/IAdvertise";
import {Roboto} from "~/infrastructure";
import {ThemeColors} from "~/core/theme/colors";
import {useThemeColors, useThemedStyles} from "~/core/theme/hooks";
import {CommonSizes} from "~/core/theme/commonSizes";
import {Pages} from "~/navigation/pages";
import {useTranslation} from "react-i18next";
import {EmptyScreen} from "~/components/EmptyScreen";
import {ImageResources} from "~/common/ImageResources.g";
import {selectDrafts} from "~/core/store/drafts/draftsSelectors";

export const Drafts: NavigationFunctionComponent = (props) => {
    const drafts = useAppSelector(selectDrafts);
    const {t} = useTranslation();
    const styles = useThemedStyles(stylesG);
    const colors = useThemeColors();

    const handleEditAdvertise = (draft: IAdvertise) => {
        Navigation.push(props.componentId, {
            component: {
                name: Pages.newAdvertise.name,
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
                    draft: draft
                }
            }
        });
    };

    const renderItem = (item: IAdvertise) => {
        return (
            <TouchableOpacity
                style={styles.itemContainer}
                activeOpacity={0.5}
                onPress={() => handleEditAdvertise(item)}
            >
                <Roboto.Title.Large
                    text={item.title || t("drafts.untitled")}
                    numberOfLines={1}
                    color={colors.onSurface}
                />
            </TouchableOpacity>
        );
    };

    return (
        <View style={CommonStyles.flex1}>
            <CustomHeader id={props.componentId} isStack headerTitle={"pages.drafts"}/>
            <FlatList
                data={drafts}
                renderItem={({item}) => renderItem(item)}
                contentContainerStyle={styles.contentContainer}
                ListEmptyComponent={() => <EmptyScreen
                    image={ImageResources.draft}
                    title={"emptyScreen.drafts.title"}
                    text={"emptyScreen.drafts.text"}/>}
            />
        </View>
    );
};

const stylesG = (colors: ThemeColors) => StyleSheet.create({
    itemContainer: {
        borderWidth: CommonSizes.borderWidth.extraThin,
        borderRadius: CommonSizes.borderRadius.smallPlus,
        paddingHorizontal: CommonSizes.padding.smallPlus,
        paddingVertical: CommonSizes.padding.smallPlus,
        borderColor: colors.outline,
        marginBottom: CommonSizes.margin.smallPlus
    },
    contentContainer: {
        paddingHorizontal: CommonSizes.padding.large,
        ...CommonStyles.flex1
    }
});
