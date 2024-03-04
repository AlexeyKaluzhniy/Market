import {Dimensions, View} from "react-native";
import {Navigation, NavigationFunctionComponent} from "react-native-navigation";
import {GestureDetector, Gesture} from 'react-native-gesture-handler';
import {Directions} from 'react-native-gesture-handler';
import {Colors, LightThemeColors} from "~/core/theme/colors";
import {ModalizeContainer} from "~/components/ModalizeContainer";

export const ModalWrapper: NavigationFunctionComponent = (props) => {
    const fling = Gesture.Fling();
    fling.direction(Directions.DOWN);
    fling.onEnd(() => {
        Navigation.pop(props.componentId, {
            animations: {
                pop: {
                    content: {
                        translationY: {
                            from: 0,
                            to: Dimensions.get('window').height / 2,
                            duration: 200
                        },
                        alpha: {
                            from: 1,
                            to: 0
                        }
                    }
                }
            },
        });
    });

    console.log('props.componentId', props.componentId);

    return (
        <GestureDetector gesture={fling}>
            <View style={{backgroundColor: Colors.red}}>
                <ModalizeContainer componentId={props.componentId}/>
            </View>
        </GestureDetector>
    );
};
