import {Route, SceneRendererProps, TabBar, TabView} from "react-native-tab-view";
import {Colors, ThemeColors} from "~/core/theme/colors";
import React, {useMemo, useState} from "react";
import {StyleSheet} from "react-native";
import {CommonSizes} from "~/core/theme/commonSizes";
import {windowWidth} from "~/core/theme/commonConsts";
import {useThemeColors, useThemedStyles} from "~/core/theme/hooks";

interface IProps {
    routes: Route[];
    renderScene: (props: (SceneRendererProps & { route: Route })) => React.ReactNode;
}

export function CustomTabs({routes, renderScene}: IProps) {
    const [index, setIndex] = useState(0);
    const colors = useThemeColors();
    const styles = useThemedStyles(tabStyles);

    const labelWidth = useMemo(() => routes[index].title!.length * 7, [index, routes]);

    const indicatorWidth = useMemo(() => ({
        width: labelWidth,
        left: (windowWidth / 2 - labelWidth) / 2
    }), [labelWidth]);

    return (
        <TabView
            navigationState={{index, routes}}
            renderScene={renderScene}
            onIndexChange={setIndex}
            renderTabBar={props =>
                <TabBar
                    {...props}
                    style={styles.tabBar}
                    indicatorStyle={[styles.indicatorStyle, indicatorWidth]}
                    labelStyle={styles.labelStyle}
                    activeColor={colors.main}
                    tabStyle={styles.tab}
                    pressColor={Colors.transparent}
                />
            }
        />
    );
}

const tabStyles = (colors: ThemeColors) => StyleSheet.create({
    indicatorStyle: {
        backgroundColor: colors.main,
        height: CommonSizes.margin.extraSmall,
        borderTopLeftRadius: CommonSizes.borderRadius.smallPlus,
        borderTopRightRadius: CommonSizes.borderRadius.smallPlus,
    },
    labelStyle: {
        color: colors.onSurface,
        textTransform: 'capitalize',
        marginBottom: CommonSizes.margin.smallPlus,
    },
    tab: {
        width: windowWidth / 2,
    },
    tabBar: {
        backgroundColor: colors.background,
        borderBottomWidth: CommonSizes.borderWidth.extraThin,
        borderColor: colors.outlineVariant,
        elevation: 0
    }
});
