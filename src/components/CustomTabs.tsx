import {Route, SceneRendererProps, TabBar, TabView} from "react-native-tab-view";
import {Colors, LightThemeColors} from "~/core/theme/colors";
import React, {useState} from "react";
import {StyleSheet} from "react-native";
import {CommonSizes} from "~/core/theme/commonSizes";
import {windowWidth} from "~/core/theme/commonConsts";

interface IProps {
    routes: Route[];
    renderScene: (props: (SceneRendererProps & {route: Route})) => React.ReactNode;
}

export function CustomTabs({routes, renderScene}: IProps) {
    const [index, setIndex] = useState(0);

    return (
        <TabView
            navigationState={{index, routes}}
            renderScene={renderScene}
            onIndexChange={setIndex}
            renderTabBar={props =>
                <TabBar
                    {...props}
                    style={tabStyles.tabBar}
                    indicatorStyle={tabStyles.indicatorStyle}
                    labelStyle={tabStyles.labelStyle}
                    activeColor={LightThemeColors.main}
                    tabStyle={tabStyles.tab}
                    pressColor={Colors.transparent}
                />
            }
        />
    );
}

const tabStyles = StyleSheet.create({
    indicatorStyle: {
        backgroundColor: LightThemeColors.main,
        height: 5,
        borderTopLeftRadius: CommonSizes.borderRadius.smallPlus,
        borderTopRightRadius: CommonSizes.borderRadius.smallPlus,
    },
    labelStyle: {
        color: LightThemeColors.text,
        textTransform: 'capitalize',
        marginBottom: CommonSizes.margin.smallPlus,
    },
    tab: {
        width: windowWidth / 2,
    },
    tabBar: {
        backgroundColor: LightThemeColors.background,
        borderBottomWidth: CommonSizes.borderWidth.extraThin,
        borderColor: LightThemeColors.outline,
        elevation: 0
    }
});
