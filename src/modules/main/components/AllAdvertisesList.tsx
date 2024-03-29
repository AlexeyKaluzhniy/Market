import {FlatList, StyleSheet} from "react-native";
import {ListItem} from "~/modules/main/components/ListItem";
import {CommonSizes} from "~/core/theme/commonSizes";
import {data} from "~/infrastructure/mocks/mockAdvertises";
import {useAppSelector} from "~/core/store/store";
import {selectFilters} from "~/core/store/filter/filterSlice";

export function AllAdvertisesList() {
    const filters = useAppSelector(selectFilters);
    const isCitiesEmpty = filters.cities.length === 0;
    const minPrice = filters.priceFrom !== '' ? filters.priceFrom : 0;
    const maxPrice = filters.priceTo !== '' ? filters.priceTo : Infinity;
    const filteredData = data.filter(ad => {
        const passesCityFilter = isCitiesEmpty || filters.cities.includes(ad.location);
        const passesPriceFilter = ad.price >= minPrice && ad.price <= maxPrice;

        return passesCityFilter && passesPriceFilter;
    });

    return (
        <FlatList
            data={filteredData}
            keyExtractor={item => item.id}
            renderItem={({item}) => {
                return <ListItem item={item}/>;
            }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.content}
        />
    );
}

const styles = StyleSheet.create({
    content: {
        paddingTop: CommonSizes.padding.large,
        paddingHorizontal: CommonSizes.padding.large
    }
});
