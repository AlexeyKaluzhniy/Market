import {StyleSheet, TouchableOpacity} from "react-native";
import ConfirmIcon from "../../../resources/icons/confirmSmall.svg";
import {useThemeColors} from "~/core/theme/hooks";
import {CommonSizes} from "~/core/theme/commonSizes";
import {useMemo} from "react";

interface ICheckBoxProps {
    isChecked: boolean;
    setChecked: (isChecked?: boolean) => void;
}

export function CustomCheckBox({isChecked, setChecked}: ICheckBoxProps) {
    const colors = useThemeColors();

    const checkBoxColor = useMemo(() => {
        return {
            backgroundColor: isChecked ? colors.main : undefined,
            borderColor: isChecked ? colors.main : colors.onSurfaceVariant,
            borderWidth: isChecked ? 0 : 2
        };
    }, [colors.main, colors.onSurfaceVariant, isChecked]);

    return (
        <TouchableOpacity
            style={[styles.checkBoxContainer, checkBoxColor]}
            onPress={() => setChecked(!isChecked)}
        >
            {isChecked && <ConfirmIcon width={12} height={12}/>}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    checkBoxContainer: {
        width: 18,
        height: 18,
        borderRadius: CommonSizes.borderRadius.extraSmall,
        marginRight: CommonSizes.margin.extraLarge,
        marginLeft: CommonSizes.margin.extraSmallPlus,
        marginTop: CommonSizes.margin.extraSmallPlus,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
