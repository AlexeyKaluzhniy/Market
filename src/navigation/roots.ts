import {Pages} from "./pages";
import {LayoutBottomTabs, Navigation} from "react-native-navigation";
import {Tabs} from "./tabs";
import {i18next} from "../common/localization/localization";

import {Dimensions} from "react-native";
import {TabbarInactiveResources, TabbarLightResources} from "~/common/ImageResources.g";
import {Components} from "~/navigation/components";
import {Stacks} from "~/navigation/stacks";
import {LightThemeColors} from "~/core/theme/colors";

export function setInitialRoot() {
    Navigation.setRoot({
        root: {
            component: {
                name: Pages.splash.name,
                id: Pages.splash.id,
                options: {
                    topBar: {
                        visible: false,
                    },
                },
            },
        },
    });
}

export async function setAuthRoot() {
    Navigation.setRoot({
        root: {
            stack: {
                children: [{
                    component: {
                        name: Pages.auth.name,
                        id: Pages.auth.id,
                        options: {
                            topBar: {
                                visible: false,
                            },
                        },
                    },
                }],
                options: {
                    animations: {
                        push: {
                            content: {
                                translationX: {
                                    from: Dimensions.get('window').width,
                                    to: 0,
                                    duration: 200
                                }
                            }
                        },
                        pop: {
                            content: {
                                translationX: {
                                    from: 0,
                                    to: Dimensions.get('window').width,
                                    duration: 200
                                }
                            }
                        }
                    }
                }
            },
        }
    });
}

export function bottomTabsLayout(): LayoutBottomTabs {
    return {
        id: Pages.tabs.id,
        options: {
            topBar: {
                visible: true,
            },
        },
        children: [
            {
                stack: {
                    id: Tabs.main.id,
                    children: [
                        {
                            component: {
                                id: Pages.main.id,
                                name: Pages.main.name,
                            },
                        },
                    ],
                    options: {
                        bottomTab: {
                            text: i18next.t("pages.main"),
                            icon: TabbarInactiveResources.advertise,
                            selectedIcon: TabbarLightResources.advertise
                        },
                        topBar: {
                            visible: false,
                        },
                    },
                },
            },
            {
                stack: {
                    id: Tabs.favorite.id,
                    children: [
                        {
                            component: {
                                id: Pages.favorite.id,
                                name: Pages.favorite.name,
                            },
                        },
                    ],
                    options: {
                        bottomTab: {
                            text: i18next.t("pages.favorite"),
                            icon: TabbarInactiveResources.favorite,
                            selectedIcon: TabbarLightResources.favorite
                        },
                        topBar: {
                            title: getTopBarHeader(i18next.t("pages.favorite"), Pages.favorite.id),
                            elevation: 0
                        }
                    },
                },
            },
            {
                stack: {
                    id: Tabs.profile.id,
                    children: [
                        {
                            component: {
                                id: Pages.profile.id,
                                name: Pages.profile.name,
                            },
                        },
                    ],
                    options: {
                        bottomTab: {
                            text: i18next.t("pages.profile"),
                            icon: TabbarInactiveResources.profile,
                            selectedIcon: TabbarLightResources.profile
                        },
                        topBar: {
                            title: getTopBarHeader(i18next.t("pages.profile"), Pages.profile.id, true),
                            elevation: 0
                        }
                    }
                }
            }
        ]
    };
}

const getTopBarHeader = (title: string, pageId: string, isProfile = false) => {
    return {
        component: {
            id: Components.topBarHeader.id + pageId,
            name: Components.topBarHeader.name,
            passProps: {
                title: title,
                isProfile: isProfile
            }
        }
    };
};

export const getBottomTabsLayout = () => {
    return {
        root: {
            sideMenu: {
                left: {
                    component: {
                        id: Pages.bottomTabsDrawer.id,
                        name: Pages.bottomTabsDrawer.name,
                    },
                },
                options: {
                    sideMenu: {
                        left: {
                            width: Dimensions.get('window').width / 390 * 360,
                        },
                    },
                },
                center: {
                    stack: {
                        id: Stacks.drawerStack.id,
                        children: [{
                            bottomTabs: bottomTabsLayout()
                        }]
                    }
                }
            }
        }
    };
};

export const drawerStackScreensLayout = (name: string, titleText: string) => {
    return {
        component: {
            name: name,
            options: {
                topBar: {
                    title: {
                        text: titleText,
                        fontSize: 22,
                    },
                    backButton: {
                        color: LightThemeColors.outlineVariant
                    },
                    elevation: 0
                },
                sideMenu: {
                    left: {
                        visible: false
                    },
                },
                animations: {
                    push: {
                        content: {
                            translationX: {
                                from: Dimensions.get('window').width,
                                to: 0,
                                duration: 200
                            }
                        },
                        topBar: {
                            translationX: {
                                from: Dimensions.get('window').width,
                                to: 0,
                                duration: 200
                            }
                        }
                    },
                    pop: {
                        content: {
                            translationX: {
                                from: 0,
                                to: Dimensions.get('window').width,
                                duration: 200
                            }
                        },
                        topBar: {
                            translationX: {
                                from: 0,
                                to: Dimensions.get('window').width,
                                duration: 200
                            }
                        }
                    }
                },
            }
        }
    };
};
