import {Navigation, NavigationFunctionComponent} from "react-native-navigation";
import {navigation} from "~/services";
import {Components} from "~/navigation/components";
import {ReactNode} from "react";

export function showOverlay(
    ModalizeHeader: NavigationFunctionComponent<ReactNode>,
    ModalizeContainer: NavigationFunctionComponent<JSX.Element>) {
    Navigation.dismissAllOverlays();
    navigation.showOverlay(Components.modalizeContainer, {
        params: {
            getHeaderComponent: ModalizeHeader,
            getContentComponent: ModalizeContainer,
        }
    });
}
