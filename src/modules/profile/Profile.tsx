import {View} from "react-native";
import {NavigationFunctionComponent} from "react-native-navigation";
import React from "react";
import {CustomHeader} from "~/components/CustomHeader";
import {CommonStyles} from "~/core/theme/commonStyles";
import {ProfileData} from "~/modules/profile/components/ProfileData";
import {internalUser} from "~/infrastructure/mocks/users";
import {Dto} from "~/infrastructure";

interface IProfileProps {
    isExternalUserProfile?: boolean;
    userData?: Dto.Common.UserData;
}

export const Profile: NavigationFunctionComponent<IProfileProps> = (props): JSX.Element => {
    return (
        <View style={CommonStyles.flex1}>
            {props.isExternalUserProfile ?
                <CustomHeader id={props.componentId} isStack/> :
                <CustomHeader id={props.componentId} headerTitle="pages.profile" hasEditButton isDrawer/>
            }
            <ProfileData user={props.userData || internalUser}/>
        </View>
    );
};
