import EditIcon from "../../../resources/icons/edit.svg";
import {TouchableOpacity} from "react-native";
import React from "react";
import {Navigation} from "react-native-navigation";
import {Pages} from "~/navigation/pages";
import {useThemeColors} from "~/core/theme/hooks";

interface IEditButtonProps {
    onPressEditButton?: () => void;
}

export function EditButton({onPressEditButton}: IEditButtonProps) {
    const colors = useThemeColors();

    const handleNavigateToEditProfile = () => {
        Navigation.push(Pages.tabs.id, {
                component: {
                    name: Pages.editProfile.name,
                    options: {
                        topBar: {
                            visible: false
                        },
                        sideMenu: {
                            left: {
                                enabled: false
                            }
                        }
                    }
                }
            }
        );
    };

    return (
        <TouchableOpacity onPress={onPressEditButton || handleNavigateToEditProfile}>
            <EditIcon color={colors.outline}/>
        </TouchableOpacity>
    );
}
