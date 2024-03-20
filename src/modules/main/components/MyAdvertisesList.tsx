import {FlatList, StyleSheet} from "react-native";
import {EmptyScreen} from "~/components/EmptyScreen";
import {ImageResources} from "~/common/ImageResources.g";
import {data} from "~/infrastructure/mocks/mockAdvertises";
import {ListItem} from "~/modules/main/components/ListItem";
import {CommonSizes} from "~/core/theme/commonSizes";

export function MyAdvertisesList() {
    return (
        <FlatList
            data={[data[0]]}
            renderItem={({item}) => {
                return <ListItem item={item} isMyAd/>;
            }}
            ListEmptyComponent={() =>
                <EmptyScreen
                    image={ImageResources.plus}
                    title={"emptyScreen.myAdvertises.title"}
                    text={"emptyScreen.myAdvertises.text"}
                />
            }
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
