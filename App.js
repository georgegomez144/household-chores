import {useEffect, useState} from 'react'
import {StatusBar} from 'expo-status-bar';
import {Text, View, ScrollView, RefreshControl} from 'react-native';

import NavigationBar from "./src/components/NavigationBar";
import TodaysChoresMembersList from './src/components/Members/TodaysChoresMembersList';
import TodaysChoresList from "./src/components/Chores/TodaysChoreList";

import {type, colors, layout} from "./src/shared/core";

export default function App() {
    const [refreshing, setRefreshing] = useState(false);
    const [memberId, setMemberId] = useState()

    function filterChoresByMemberId(id) {
        setMemberId(id);
    }

    function onRefresh() {
        setRefreshing(true);
    }

    function handleFinishedRefresh(status) {
        setRefreshing(false);
    }

    useEffect(() => {
    }, [handleFinishedRefresh, filterChoresByMemberId])

    return (
        <View style={{
            flex: 1,
            backgroundColor: colors.backgroundColor
        }}>
            <View
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: layout.padding,
                    marginTop: 40,
                    height: 50,
                    width: '100%',
                }}
            >
                <Text style={{
                    ...type.heading
                }}>Household Chores</Text>
            </View>
            <ScrollView
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
                style={{flex: 1}}
            >
                <View style={{
                    flex: 1,
                    ...layout.center,
                    paddingBottom: layout.margin * 5
                }}>
                    <TodaysChoresMembersList
                        filterByMember={filterChoresByMemberId}
                        refreshRequested={refreshing}
                        handleFinishedRefresh={handleFinishedRefresh}
                    />
                    <TodaysChoresList
                        memberToFilterBy={memberId}
                        refreshRequested={refreshing}
                        handleFinishedRefresh={handleFinishedRefresh}
                    />
                </View>
            </ScrollView>
            <NavigationBar />
            <StatusBar style="auto" backgroundColor={colors.primary}/>
        </View>
    );
}
