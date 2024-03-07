import {Pages} from "./pages";
import {
    LayoutBottomTabs,
    LayoutStackChildren,
    Navigation,
} from "react-native-navigation";
import {Tabs} from "./tabs";
import {i18next} from "~/common/localization/localization";
import {Dimensions} from "react-native";
import {TabbarInactiveResources, TabbarLightResources} from "~/common/ImageResources.g";
import {Stacks} from "~/navigation/stacks";

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
        children: [
            {
                stack: {
                    id: Tabs.main.id,
                    children: [
                        {
                            component: {
                                id: Pages.newAdvertise.id,
                                name: Pages.newAdvertise.name
                            }
                        },
                        {
                            component: {
                                id: Pages.main.id,
                                name: Pages.main.name,
                            },
                            externalComponent: {
                                id: Pages.details.id,
                                name: Pages.details.name,
                            }
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
                                id: Pages.newAdvertise.id,
                                name: Pages.newAdvertise.name
                            }
                        },
                        {
                            component: {
                                id: Pages.favorite.id,
                                name: Pages.favorite.name,
                            },
                            externalComponent: {
                                id: Pages.details.id,
                                name: Pages.details.name
                            }
                        },
                    ],
                    options: {
                        bottomTab: {
                            text: i18next.t("pages.favorite"),
                            icon: TabbarInactiveResources.favorite,
                            selectedIcon: TabbarLightResources.favorite
                        },
                        topBar: {
                            visible: false
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
                            visible: false
                        },
                    }
                }
            }
        ],
    };
}

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
                                    },
                                },
                                pop: {
                                    content: {
                                        translationX: {
                                            from: 0,
                                            to: Dimensions.get('window').width,
                                            duration: 200
                                        },
                                    },
                                }
                            }
                        }
                    }
                }
            }
        }
    };
};

export const drawerStackScreensLayout = (name: string): LayoutStackChildren => {
    return {
        component: {
            name: name,
            options: {
                topBar: {
                    visible: false
                },
                sideMenu: {
                    left: {
                        visible: false,
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
                    },
                    pop: {
                        content: {
                            translationX: {
                                from: 0,
                                to: Dimensions.get('window').width,
                                duration: 200
                            },
                        },
                    }
                },
            }
        }
    };
};
