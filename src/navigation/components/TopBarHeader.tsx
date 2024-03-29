import {NavigationFunctionComponent} from "react-native-navigation";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import {CommonStyles} from "~/core/theme/commonStyles";
import {SideMenuButton} from "~/common/components/SideMenuButton";
import {Roboto} from "~/infrastructure";
import {CommonSizes} from "~/core/theme/commonSizes";
import EditIcon from "../../../resources/icons/edit.svg";
import {AppNavigationComponent} from "~/navigation/helpers/NavigationHOC";

interface ITopBarHeader extends NavigationFunctionComponent {
    title: string;
    isProfile: boolean;
}

export const TopBarHeader: AppNavigationComponent<ITopBarHeader> = (props) => {
    return (
        <View style={styles.container}>
            <SideMenuButton/>
            <Roboto.Title.Large text={props.title} style={styles.title}/>
            {props.isProfile && <TouchableOpacity><EditIcon/></TouchableOpacity>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...CommonStyles.rowCenter,
        ...CommonStyles.flex1,
        ...CommonStyles.flexGrow,
        paddingHorizontal: CommonSizes.padding.extraSmallPlus
    },
    title: {
        marginLeft: CommonSizes.margin.extraLarge,
        ...CommonStyles.flex1
    }
});
