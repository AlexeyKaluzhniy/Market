import {StyleSheet, View} from "react-native";
import {CheckBoxButton} from "~/components/CheckBoxButton";
import {CommonSizes} from "~/core/theme/commonSizes";

interface IModalizeCitiesContainerProps {
    citiesChosen: string[];
    setCitiesChosen: (citiesChosen: string[]) => void;
}

export const ModalizeCitiesContainer = ({citiesChosen, setCitiesChosen}: IModalizeCitiesContainerProps) => {
    const cities = ['Тирасполь', 'Бендеры', 'Дубоссары', 'Григориополь', 'Каменка', 'Рыбница', 'Слободзея', 'Днестровск'];

    return (
        <View style={styles.container}>
            {cities.map(city => <CheckBoxButton
                city={city} key={city}
                isChecked={!!citiesChosen.find((item) => item === city)}
                citiesChosen={citiesChosen}
                setCitiesChosen={setCitiesChosen}
            />)
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: CommonSizes.margin.medium,
        marginBottom: CommonSizes.margin.medium
    }
});
