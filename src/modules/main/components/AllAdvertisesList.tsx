import {FlatList, StyleSheet} from "react-native";
import {ListItem} from "~/modules/main/components/ListItem";
import {CommonSizes} from "~/core/theme/commonSizes";
import {data} from "~/infrastructure/mocks/mockAdvertises";

export function AllAdvertisesList() {
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
