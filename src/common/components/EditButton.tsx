import EditIcon from "../../../resources/icons/edit.svg";
import {TouchableOpacity} from "react-native";
import React from "react";
import {Navigation} from "react-native-navigation";
import {Pages} from "~/navigation/pages";
import {useThemeColors} from "~/core/theme/hooks";

export function EditButton() {
    const colors = useThemeColors();

    const handleNavigateToEditProfile = () => {
        Navigation.push(Pages.tabs.id, {
                component: {
                    name: Pages.editProfile.name,
                    options: {
                        topBar: {
                            visible: false
                        },
                    }
                }
            }
        );
    };

    return (
        <TouchableOpacity onPress={handleNavigateToEditProfile}>
            <EditIcon color={colors.outline}/>
        </TouchableOpacity>
    );
}
