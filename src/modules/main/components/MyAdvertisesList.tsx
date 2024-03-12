import {ListItem} from "~/modules/main/components/ListItem";
import {FlatList, StyleSheet} from "react-native";
import React, {useState} from "react";
import {CommonSizes} from "~/core/theme/commonSizes";
import {EmptyScreen} from "~/components/EmptyScreen";
import {ImageResources} from "~/common/ImageResources.g";

export function MyAdvertisesList() {
    const [data] = useState([
        {
            id: '1',
            title: 'Продажа велосипеда',
            body: 'Почти новый горный велосипед, бренд XYZ, 2023 года выпуска. Использовался всего несколько месяцев',
            price: '1200 руб.',
            location: 'Тирасполь',
            date: 'сегодня в 13:04',
            image: null
        }
    ]);

    return (
        <>
            {data ? <FlatList
                data={data}
                keyExtractor={item => item.id}
                renderItem={({item}) => {
                    return <ListItem item={item}/>;
                }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            /> : <EmptyScreen
                image={ImageResources.plus}
                title={"emptyScreen.myAdvertises.title"}
                text={"emptyScreen.myAdvertises.text"}/>}
        </>
    );
}

const styles = StyleSheet.create({
    content: {
        paddingTop: CommonSizes.padding.large,
        paddingHorizontal: CommonSizes.padding.large
    }
});
