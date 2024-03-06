import {NavigationFunctionComponent} from "react-native-navigation";
import {FlatList} from "react-native";
import React, {useState} from "react";
import {CommonSizes} from "~/core/theme/commonSizes";
import {ListHeaderComponent} from "~/modules/main/components/ListHeaderComponent";
import {ListItem} from "~/modules/main/components/ListItem";

export const Main: NavigationFunctionComponent = (props): JSX.Element => {
    const [data, setData] = useState([{
        id: '1',
        title: 'Продажа велосипеда',
        body: 'Почти новый горный велосипед, бренд XYZ, 2023 года выпуска. Использовался всего несколько месяцев',
        price: '1200 руб.',
        location: 'Тирасполь',
        date: 'сегодня в 13:04'
    }]);

    return (
        <FlatList
            data={data}
            keyExtractor={item => item.id}
            renderItem={({item}) => {
                return <ListItem item={item}/>;
            }}
            ListHeaderComponent={ListHeaderComponent}
            contentContainerStyle={{marginHorizontal: CommonSizes.margin.largePlus}}
        />
    );
};
