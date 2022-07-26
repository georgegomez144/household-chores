import {useEffect, useState} from 'react';
import {
    View,
    Pressable,
    Animated
} from 'react-native';
import * as DEVICE from 'expo-device';
import {Entypo} from '@expo/vector-icons';
import Elevations from "react-native-elevation";

import {colors, layout, type} from "../shared/core";
import {getMembers} from "../services/api/members";

const routes = [
    {
        key: 'link_dashboard',
        link: '/dashboard',
        text: 'Home',
        icon: 'home',
        page: 'Home'
    },
    {
        key: 'link_schedule',
        link: '/schedule',
        text: 'Schedule',
        icon: 'calendar',
        page: 'Schedule'
    },
    {
        key: 'empty-spacer',
        empty: true
    },
    {
        key: 'link_chores',
        link: '/chores',
        text: 'Chores',
        icon: 'bucket',
        page: 'Chores'
    },
    {
        key: 'link_admin',
        link: '/admin',
        text: 'Admin',
        icon: 'users',
        page: 'Admin'
    }
];

export default function NavigationBar({state, navigation}) {

    const [isAdmin, setIsAdmin] = useState(false);
    const [notLoaded, setNotLoaded] = useState(true);

    const deviceName = DEVICE.deviceName.replace(/\s/g, '_');
    const device_identifier = `${deviceName}_${DEVICE.osBuildId}_${DEVICE.platformApiLevel}`

    const currentPage = state.routes.find((route, index) => index === state.index);
    // console.log(currentPage)

    const getMembersAsync = async () => {
        try {
            const response = await getMembers();
            const data = await response.json();
            const thisMember = Array.isArray(data) && data.find(({device_code}) => device_code === device_identifier)
            const memberIsAdmin = thisMember.admin === "1";
            setIsAdmin(memberIsAdmin)
        } catch (e) {
            console.error(e)
        } finally {
            // console.log(isAdmin);
            setNotLoaded(false)
        }
    }

    useEffect(() => {
        if (notLoaded) getMembersAsync();
    }, [])

    function goToPageStack(route, index) {
        if (state.index !== index) navigation.navigate({name: route.page, merge: true});
    }

    function isSelected(index) {
        // Only because of the spacer
        return state.index === (index > 2 ? index - 1 : index);
    }

    const handleActionButton = () => {
        switch (currentPage.name) {
            case 'Admin':
                alert("you're on the admin page");
                break;
            case 'Chores':
                alert("you're on the chores page");
                break;
            case 'Schedule':
                alert("you're on the schedule page");
                break;
            default:
                alert('this is the default home page action');
        }
    }

    function NavigationAddButton() {
        return (
            <View
                style={{
                    position: 'absolute',
                    top: -30,
                }}
            >
                <Pressable
                    onPress={handleActionButton}
                    style={{
                        ...layout.center,
                        backgroundColor: colors.tertiary,
                        borderRadius: '50%',
                        height: 60,
                        width: 60,
                        ...Elevations[6]
                    }}
                >
                    <Entypo name="plus" size={type.icon.xLarge} color={colors.white}/>
                </Pressable>
            </View>
        )
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
            <NavigationAddButton/>
            {routes.map((route, index) => isAdmin && route.empty ? (
                <View
                    key={route.key}
                    style={{
                        height: 50,
                        width: 50
                    }}
                ></View>
            ) : (
                <Pressable
                    key={route.key}
                    onPress={() => goToPageStack(route, index > 2 ? index - 1 : index)} // Only because of the spacer
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
                            marginTop: isSelected(index) ? -layout.margin : layout.margin,
                            backgroundColor: isSelected(index) ? colors.accent : colors.clear,
                            minHeight: isSelected(index) && 50,
                            minWidth: isSelected(index) && 50,
                            borderRadius: isSelected(index) ? 50 : 0,
                            ...Elevations[4]
                        }}
                    >
                        <Entypo
                            name={route.icon}
                            size={type.icon.medium}
                            color={isSelected(route) ? colors.white : colors.lightestGray}
                            style={{...Elevations[isSelected(index) && 4]}}
                        />
                    </Animated.View>
                    <Animated.Text style={{
                        color: isSelected(index) ? colors.white : colors.lightestGray,
                        marginTop: layout.margin / 4,
                        opacity: isSelected(index) ? 1 : 0,
                        ...type.uppercase,
                        ...type.smallText,
                        ...Elevations[isSelected(index) && 4]
                    }}>{route.text}</Animated.Text>
                </Pressable>
            ))}
        </View>
    );
}
