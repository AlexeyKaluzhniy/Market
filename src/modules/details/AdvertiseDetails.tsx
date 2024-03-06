import {NavigationFunctionComponent} from "react-native-navigation";
import {Text, View} from "react-native";
import {CustomHeader} from "~/components/CustomHeader";

export const AdvertiseDetails: NavigationFunctionComponent = (props) => {
    return (
        <View>
            <CustomHeader id={props.componentId} isStack isDetails/>
            <Text>Детали</Text>
        </View>
    );
};
