import {View} from "react-native";
import {NavigationFunctionComponent} from "react-native-navigation";
import React from "react";
import {CustomHeader} from "~/components/CustomHeader";
import {CommonStyles} from "~/core/theme/commonStyles";
import {IUserData} from "~/infrastructure/dto/common/IUserData";
import {ProfileData} from "~/modules/profile/components/ProfileData";

interface IProfileProps {
    isExternalUserProfile?: boolean;
    userData?: IUserData;
}

export const Profile: NavigationFunctionComponent<IProfileProps> = (props): JSX.Element => {
    const internalUser = {
        avatar: '',
        name: 'Георгий Васильков',
        registerDate: '',
        email: 'g.vasilkov@yandex.ru',
        phone: '+ 373 777 2 54 97',
    };

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
