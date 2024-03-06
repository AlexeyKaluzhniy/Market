import {FlatList, StyleSheet} from "react-native";
import {ListItem} from "~/modules/main/components/ListItem";
import React, {useState} from "react";
import {CommonSizes} from "~/core/theme/commonSizes";
import {AdvertisesResources} from "~/common/ImageResources.g";

export function AllAdvertisesList() {
    const [data] = useState([
        {
            id: '1',
            title: 'Продажа велосипеда',
            body: 'Почти новый горный велосипед, бренд XYZ, 2023 года выпуска. Использовался всего несколько месяцев',
            price: '1200 руб.',
            location: 'Тирасполь',
            date: 'сегодня в 13:04',
            image: AdvertisesResources.bicycle
        },
        {
            id: '2',
            title: 'Продажа велосипеда',
            body: 'Почти новый горный велосипед, бренд XYZ, 2023 года выпуска. Использовался всего несколько месяцев',
            price: '1200 руб.',
            location: 'Тирасполь',
            date: 'сегодня в 13:04',
            image: null
        },
        {
            id: '3',
            title: 'Продажа велосипеда',
            body: 'Почти новый горный велосипед, бренд XYZ, 2023 года выпуска. Использовался всего несколько месяцев',
            price: '1200 руб.',
            location: 'Тирасполь',
            date: 'сегодня в 13:04',
            image: null
        },
        {
            id: '4',
            title: 'Продажа велосипеда',
            body: 'Почти новый горный велосипед, бренд XYZ, 2023 года выпуска. Использовался всего несколько месяцев',
            price: '1200 руб.',
            location: 'Тирасполь',
            date: 'сегодня в 13:04',
            image: AdvertisesResources.bicycle
        }
    ]);

    return (
        <FlatList
            data={data}
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
