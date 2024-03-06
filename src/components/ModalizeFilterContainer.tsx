import {Text, View} from "react-native";
import {CommonSizes} from "~/core/theme/commonSizes";

export function ModalizeFilterContainer() {
    return (
        <View style={{paddingHorizontal: CommonSizes.padding.large,}}>
            <Text>Город</Text>
            <Text>Добавить город</Text>
            <Text>Цена объявления</Text>
        </View>
    );
}
