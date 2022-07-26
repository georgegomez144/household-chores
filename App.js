import {useEffect, useState} from 'react'
import {StatusBar} from 'expo-status-bar';
import {View, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";

import {TopBar} from "./src/components/shared/TopBar";
import {
    FirstTimeLoadScreen,
    PrivatePageToLoad
} from './src/pages'

import {colors, layout, type} from "./src/shared/core";

export default function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [isInitialized, setIsInitialized] = useState(false)
    const [thisMember, setThisMember] = useState({});

    const getDeviceMember = async () => {
        try {
            const jsonString = await AsyncStorage.getItem('device-member');
            const member = jsonString !== null ? JSON.parse(jsonString) : null;
            if (member !== null) {
                const {member_id, device_code, name, admin} = member;
                setThisMember({
                    member_id,
                    name,
                    device_code,
                    admin,
                });
                setIsInitialized(true)
            } else {
                setIsInitialized(false)
            }
        } catch (e) {
            console.error(e)
        } finally {
            setIsLoading(false);
        }
    }

    const handleAllowAccess = () => {
        setIsInitialized(true);
    }

    useEffect(() => {
        getDeviceMember();
    }, [])

    return (
        <View style={{
            flex: 1,
            backgroundColor: colors.backgroundColor
        }}>
            {isLoading ? (
                <View
                    style={{
                        flex: 1,
                        ...layout.center,
                    }}
                >
                    <ActivityIndicator size="large" color={colors.tertiary} />
                </View>
            ) : (
                !isInitialized ? (
                    <FirstTimeLoadScreen handleReloadApp={handleAllowAccess}/>
                ) : (
                    <NavigationContainer>
                        <TopBar {...{ setIsLoading, setIsInitialized }} />
                        <PrivatePageToLoad member={thisMember}/>

                    </NavigationContainer>
                )
            )}
            <StatusBar style="auto" backgroundColor={colors.primary}/>
        </View>
    );
}
