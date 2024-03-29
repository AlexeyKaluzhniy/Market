import DotsVertical from "../../resources/icons/dot_vertical.svg";
import {Dropdown} from "react-native-element-dropdown";
import {StyleSheet, View} from "react-native";
import {useThemeColors, useThemedStyles} from "~/core/theme/hooks";
import {ThemeColors} from "~/core/theme/colors";
import {CommonSizes} from "~/core/theme/commonSizes";
import {IAdvertise} from "~/infrastructure/dto/common/IAdvertise";
import {useAppDispatch} from "~/core/store/store";
import {actions} from "~/core/store/drafts/draftsSlice";
import {Pages} from "~/navigation/pages";
import {Navigation} from "react-native-navigation";
import {useTranslation} from "react-i18next";
import {emptyDraft} from "~/infrastructure/mocks/emptyDraft";

interface ITogglwDraftButton {
    advertise: IAdvertise;
    setAdvertise: (advertise: IAdvertise) => void;
    values: { value: string }[];
}

export function ToggleDraftButton({advertise, setAdvertise, values}: ITogglwDraftButton) {
    const {t} = useTranslation();
    const colors = useThemeColors();
    const styles = useThemedStyles(stylesG);
    const dispatch = useAppDispatch();

    const handleChangeValue = (value: string) => {
        switch (value) {
            case t("drafts.reset"): {
                setAdvertise(emptyDraft);
            }
                break;
            case t("drafts.save"): {
                dispatch(actions.addDraft({...advertise, title: advertise.title}));
            }
                break;
            default: {
                Navigation.pop(Pages.tabs.id);
                dispatch(actions.removeDraft(advertise));
            }
                break;
        }
    };

    const renderIcon = () => {
        return (
            <View style={styles.iconStyle}>
                <DotsVertical color={colors.outline}/>
            </View>
        );
    };

    return (
        <Dropdown
            style={styles.dropdown}
            containerStyle={styles.containerStyle}
            iconStyle={styles.iconStyle}
            itemTextStyle={styles.textStyle}
            itemContainerStyle={styles.itemContainerStyle}
            activeColor={colors.surfaceContainer}
            data={values}
            labelField="value"
            valueField="value"
            onChange={({value}) => handleChangeValue(value)}
            renderRightIcon={renderIcon}
        />
    );
}

const stylesG = (colors: ThemeColors) => StyleSheet.create({
    dropdown: {
        width: CommonSizes.image.superLarge,
    },
    containerStyle: {
        width: 185,
        marginLeft: -145,
        backgroundColor: colors.surfaceContainer,
        borderRadius: CommonSizes.borderRadius.extraSmall,
        elevation: 3,
    },
    iconStyle: {
        width: CommonSizes.image.superLarge,
        height: CommonSizes.image.superLarge,
        fontSize: CommonSizes.font.small + 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-end',
        marginBottom: -CommonSizes.margin.small,
        marginLeft: CommonSizes.margin.smallPlus
    },
    textStyle: {
        fontSize: CommonSizes.font.small + 1,
        color: colors.onSurface,
        marginLeft: -CommonSizes.margin.extraSmallPlus
    },
    itemContainerStyle: {
        marginVertical: -CommonSizes.margin.extraSmallPlus,
    }
});
