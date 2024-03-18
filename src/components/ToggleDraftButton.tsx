import DotsVertical from "../../resources/icons/dot_vertical.svg";
import {Dropdown} from "react-native-element-dropdown";
import {StyleSheet, View} from "react-native";
import {useThemeColors} from "~/core/theme/hooks";
import {LightThemeColors} from "~/core/theme/colors";

export function ToggleDraftButton() {
    const colors = useThemeColors();
    const values = [
        {value: 'Сохранить черновик'},
        {value: 'Очистить'}
    ];

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
            activeColor={colors.surfaceContainer}
            data={values}
            maxHeight={300}
            labelField="value"
            valueField="value"
            onChange={(item) => console.log(item.value)}
            renderRightIcon={renderIcon}
        />
    );
}

const styles = StyleSheet.create({
    dropdown: {
        width: 50,
        height: 50,
    },
    containerStyle: {
        width: 200,
        marginLeft: -160,
        marginBottom: -5,
        backgroundColor: LightThemeColors.surfaceContainer
    },
    iconStyle: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-end',
        marginBottom: -10,
        marginLeft: 10
    },
    textStyle: {
        fontSize: 14,
        color: LightThemeColors.onSurface
    }
});
