import {FlatList, StyleSheet} from "react-native";
import {ListItem} from "~/modules/main/components/ListItem";
import {CommonSizes} from "~/core/theme/commonSizes";
import {data} from "~/infrastructure/mocks/mockAdvertises";
import {useAppSelector} from "~/core/store/store";
import {selectFilters, selectSearchStr} from "~/core/store/filter/filterSlice";
import {EmptyScreen} from "~/components/EmptyScreen";
import {ImageResources} from "~/common/ImageResources.g";
import {useMemo} from "react";
import {CommonStyles} from "~/core/theme/commonStyles";

export function AllAdvertisesList() {
    const filters = useAppSelector(selectFilters);
    const searchStr = useAppSelector(selectSearchStr);
    const isCitiesEmpty = filters.cities.length === 0;
    const isSearchStrEmpty = searchStr.length === 0;
    const minPrice = filters.priceFrom !== '' ? filters.priceFrom : 0;
    const maxPrice = filters.priceTo !== '' ? filters.priceTo : Infinity;
    const filteredData = data.filter(ad => {
        const passesCityFilter = isCitiesEmpty || filters.cities.includes(ad.location);
        const passesMinPriceFilter = (isNaN(Number(ad.price)) && minPrice == 0) || (Number(ad.price) >= minPrice);
        const passesMaxPriceFilter = isNaN(Number(ad.price)) || Number(ad.price) <= Number(maxPrice);
        const passesSearch = isSearchStrEmpty || ad.title.toLowerCase().includes(searchStr.trim().toLowerCase());

        return passesCityFilter && passesMaxPriceFilter && passesMinPriceFilter && passesSearch;
    });

    const containerStyle = useMemo(() => filteredData.length ? undefined : CommonStyles.flex1, [filteredData]);

    return (
        <FlatList
            data={filteredData}
            keyExtractor={item => item.id}
            renderItem={({item}) => {
                return <ListItem item={item}/>;
            }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[styles.content, containerStyle]}
            ListEmptyComponent={() => <EmptyScreen
                image={ImageResources.search}
                title={"emptyScreen.allAdvertises.title"}
                text={"emptyScreen.allAdvertises.text"}/>}
        />
    );
}

const styles = StyleSheet.create({
    content: {
        paddingTop: CommonSizes.padding.large,
        paddingHorizontal: CommonSizes.padding.large
    }
});
