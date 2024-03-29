import {FlatList, SafeAreaView, StyleSheet} from "react-native";
import {CheckBoxButton} from "~/components/CheckBoxButton";
import {CommonSizes} from "~/core/theme/commonSizes";
import {useAppSelector} from "~/core/store/store";
import {useCallback} from "react";
import {selectCities} from "~/core/store/filter/filterSlice";

export const ModalizeCitiesContainer = () => {
    const cities = ['Тирасполь', 'Бендеры', 'Дубоссары', 'Григориополь', 'Каменка', 'Рыбница', 'Слободзея', 'Днестровск'];
    const citiesChosen = useAppSelector(selectCities);

    const renderItem = useCallback(({item, index}: { item: string; index: number }) => {
        return (
            <CheckBoxButton
                city={item}
                key={index}
                isChecked={citiesChosen && !!citiesChosen.find((el) => el === item)}
            />
        );
    }, [citiesChosen]);

    return (
        <SafeAreaView>
            <FlatList
                data={cities}
                renderItem={renderItem}
                contentContainerStyle={styles.container}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: CommonSizes.margin.medium,
        marginBottom: CommonSizes.margin.medium
    }
});
