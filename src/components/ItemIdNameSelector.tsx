import React, {FC, memo, useCallback, useState} from "react";
import {Image, ImageStyle, ListRenderItemInfo, ScrollView, StyleSheet, TextStyle, TouchableOpacity, View, ViewStyle} from "react-native";
import {FlatListWrapper} from "~/common/components/FlatListWrapper";
import {useThemedStyles} from "~/core/theme/hooks";
import {ThemeColors} from "~/core/theme/colors";
import {CommonSizes} from "~/core/theme/commonSizes";
import {Regular} from "~/infrastructure";
import {windowHeight} from "~/core/theme/commonConsts";
import {CommonStyles} from "~/core/theme/commonStyles";
import {ImageResources} from "~/common/ImageResources.g";
import {CustomInput} from "~/common/components/CustomInput";
import {ItemIdNameDto} from "~/infrastructure/dto/common";

interface IProps {
  selectableItems: ItemIdNameDto[] | undefined;
  current: string;
  onChange: (id: string) => void;
  close: () => void;
}

export const ItemIdNameSelector: FC<IProps> = memo((props: IProps) => {
  const {selectableItems, current, onChange, close} = props;
  const [filterItem, setFilterItem] = useState("");
  const styles = useThemedStyles(styleGetter);

  const onSelected = useCallback((id: string) => {
    return () => {
      onChange(id);
      close();
    };
  }, [close, onChange]);

  const renderItem = useCallback((info: ListRenderItemInfo<ItemIdNameDto>) => {
    const isSelected = info.item.ItemId == current;

    return (
      <TouchableOpacity onPress={onSelected(info.item.ItemId)} style={styles.itemButton} activeOpacity={0.7}>
        <Regular.H1 text={info.item.ItemName.trim()} allowFontScaling={false} />
        {isSelected && <Image source={ImageResources.check} style={styles.selectIcon} />}
      </TouchableOpacity>
    );
  }, [current, onSelected, styles.itemButton, styles.selectIcon]);

  const data = filterItem
    ? selectableItems?.filter(si => si.ItemName.toLowerCase().indexOf(filterItem.toLowerCase()) >= 0)
    : selectableItems;

  return (
    <ScrollView
      horizontal={true}
      keyboardShouldPersistTaps={"handled"}
      style={styles.container}
      contentContainerStyle={CommonStyles.flex1}
    >
      <View style={CommonStyles.flex1}>
        <View style={styles.headerContainer}>
          <CustomInput
            style={styles.inputStyle}
            value={filterItem}
            onChangeText={setFilterItem}
            labelKey={"common.search"}
            clearButtonMode={"never"}
          />
        </View>
        <FlatListWrapper
          isLoading={false}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.ItemId + index}
          keyboardShouldPersistTaps={"handled"}
          ListEmptyComponent={<View />}
          getItemLayout={(_, index) => ({length: 34, offset: index * 34, index})}
          initialNumToRender={40}
          windowSize={40}
        />
      </View>
    </ScrollView>
  );
});

const styleGetter = (colors: ThemeColors) => StyleSheet.create({
  container: {
    height: windowHeight * 0.8
  } as ViewStyle,
  headerContainer: {
    paddingHorizontal: CommonSizes.spacing.medium,
    backgroundColor: colors.element,
  } as ViewStyle,
  inputStyle: {
    color: colors.text,
    backgroundColor: colors.background,
    paddingVertical: CommonSizes.spacing.extraSmall / 2,
    flexGrow: 1,
  } as TextStyle,
  selectIcon: {
    tintColor: colors.positive,
    height: 16,
    width: 16,
  } as ImageStyle,
  itemButton: {
    height: 34,
    alignItems: "center",
    paddingHorizontal: CommonSizes.spacing.medium,
    flexDirection: "row",
    justifyContent: "space-between",
  } as ViewStyle,
});
