import {useState} from 'react';
import {
    NativeModules,
    View,
    Pressable,
    Animated
} from 'react-native';
import {Entypo} from '@expo/vector-icons';
import Elevations from "react-native-elevation";

import {colors, layout, type} from "../shared/core";

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);


export default function NavigationBar() {

    const [selected, setSelected] = useState('link_dashboard');

    const routes = [
        {
            key: 'link_dashboard',
            link: '/dashboard',
            text: 'Home',
            icon: 'home'
        },
        {
            key: 'link_chores',
            link: '/chores',
            text: 'Chores',
            icon: 'bucket'
        },
        {
            key: 'link_schedule',
            link: '/schedule',
            text: 'Schedule',
            icon: 'calendar'
        },
        {
            key: 'link_settings',
            link: '/settings',
            text: 'Settings',
            icon: 'cog'
        }
    ];

    function goToPageStack(route) {
        console.log({route});
        setSelected((route.key));
    }

    function isSelected(route) {
        return selected === route.key;
    }

    return (
        <View
            style={{
                position: 'absolute',
                bottom: 20,
                left: '5%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: "center",
                alignItems: 'center',
                height: 60,
                width: '90%',
                backgroundColor: colors.primary,
                borderRadius: layout.margin * 4,
                ...Elevations[6]
            }}
        >
            {routes.map(route => (
                <Pressable
                    key={route.key}
                    onPress={() => goToPageStack(route)}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 1
                    }}
                >
                    <Animated.View
                        style={{
                            ...layout.center,
                            marginTop: isSelected(route) ? -layout.margin : layout.margin,
                            backgroundColor: isSelected(route) ? colors.accent : colors.clear,
                            minHeight: isSelected(route) && 50,
                            minWidth: isSelected(route) && 50,
                            borderRadius: isSelected(route) ? 50 : 0,
                            ...Elevations[4]
                        }}
                    >
                        <Entypo
                            name={route.icon}
                            size={type.icon.medium}
                            color={isSelected(route) ? colors.white : colors.lightestGray}
                            style={{...Elevations[isSelected(route) && 4]}}
                        />
                    </Animated.View>
                    <Animated.Text style={{
                        color: isSelected(route) ? colors.white : colors.lightestGray,
                        marginTop: layout.margin / 4,
                        opacity: isSelected(route) ? 1 : 0,
                        ...type.uppercase,
                        ...type.smallText,
                        ...Elevations[isSelected(route) && 4]
                    }}>{route.text}</Animated.Text>
                </Pressable>
            ))}
        </View>
    );
}
