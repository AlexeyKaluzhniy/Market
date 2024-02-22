import React, {useCallback, useMemo, useState} from "react";
import {LayoutChangeEvent, StyleSheet, View, ViewProps} from "react-native";
import {SliderHeight} from "~/components/TabBars";

export const useTabHook = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [height, setHeight] = useState([100, 100]);
  const onHeightChange = useCallback((index: number, newHeight: number) => {
    if (newHeight) {
      setHeight(prevState => {
        const newSizes = [...prevState];
        newSizes[index] = newHeight;

        return newSizes;
      });
    }
  }, []);
  const onSceneLayout = (index: number) => (e: LayoutChangeEvent) => {
    onHeightChange(index, e.nativeEvent.layout?.height);
  };

  return {
    setTabIndex,
    style: useMemo(() => ({minHeight: height[tabIndex] + SliderHeight}), [height, tabIndex]),
    SceneContainer: useCallback(({index, ...props}: ViewProps & {index: number}) => (
      <View onLayout={onSceneLayout(index)} {...props} style={[styles.sceneContainer, props.style]}/>
      // eslint-disable-next-line react-hooks/exhaustive-deps
    ), []),
    onHeightChange,
    tabIndex,
    height,
  };
};

const styles = StyleSheet.create({
  sceneContainer: {
    minHeight: 100,
  },
});