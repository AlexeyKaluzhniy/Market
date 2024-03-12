import {StyleSheet, View} from "react-native";
import {CheckBoxButton} from "~/components/CheckBoxButton";
import {CommonSizes} from "~/core/theme/commonSizes";
import {useAppSelector} from "~/core/store/store";

export const ModalizeCitiesContainer = () => {
    const cities = ['Тирасполь', 'Бендеры', 'Дубоссары', 'Григориополь', 'Каменка', 'Рыбница', 'Слободзея', 'Днестровск'];
    const citiesChosen = useAppSelector(state => state.filter.cities);

    return (
        <View style={styles.container}>
            {cities.map(city => <CheckBoxButton
                city={city} key={city}
                isChecked={citiesChosen && !!citiesChosen.find((item) => item === city)}
            />)}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: CommonSizes.margin.medium,
        marginBottom: CommonSizes.margin.medium
    }
});
