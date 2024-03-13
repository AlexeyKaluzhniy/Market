import {Route, SceneRendererProps, TabBar, TabView} from "react-native-tab-view";
import {Colors, ThemeColors} from "~/core/theme/colors";
import React, {useState} from "react";
import {StyleSheet} from "react-native";
import {CommonSizes} from "~/core/theme/commonSizes";
import {windowWidth} from "~/core/theme/commonConsts";
import {useThemeColors, useThemedStyles} from "~/core/theme/hooks";

interface IProps {
    routes: Route[];
    renderScene: (props: (SceneRendererProps & {route: Route})) => React.ReactNode;
}

export function CustomTabs({routes, renderScene}: IProps) {
    const [index, setIndex] = useState(0);
    const colors = useThemeColors();
    const styles = useThemedStyles(tabStyles);

    return (
        <TabView
            navigationState={{index, routes}}
            renderScene={renderScene}
            onIndexChange={setIndex}
            renderTabBar={props =>
                <TabBar
                    {...props}
                    style={styles.tabBar}
                    indicatorStyle={styles.indicatorStyle}
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
        height: 5,
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
