import {NavigationFunctionComponent} from "react-native-navigation";
import {View} from "react-native";
import {CustomHeader} from "~/components/CustomHeader";
import {CommonStyles} from "~/core/theme/commonStyles";

export const Drafts: NavigationFunctionComponent = (props) => {
    return (
        <View style={CommonStyles.flex1}>
            <CustomHeader id={props.componentId} isStack headerTitle={"pages.drafts"}/>
        </View>
    );
};
