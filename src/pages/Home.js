import {useState, useEffect} from "react";
import {RefreshControl, ScrollView, Text, View} from "react-native";
import {DateTimeBar} from "../components/shared/DateTimeBar";
import {layout} from "../shared/core";

import TodaysChoresMembersList from "../components/Members/TodaysChoresMembersList";
import TodaysChoresList from "../components/Chores/TodaysChoreList";


export default function Home(props) {
    const [refreshing, setRefreshing] = useState(false);

    function onRefresh() {
        setRefreshing(true);
    }

    function handleFinishedRefresh(status) {
        setRefreshing(false);
    }

    useEffect(() => {
    }, [handleFinishedRefresh])

    return (
        <>
            <DateTimeBar />
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
                        refreshRequested={refreshing}
                        handleFinishedRefresh={handleFinishedRefresh}
                    />
                    <TodaysChoresList
                        refreshRequested={refreshing}
                        handleFinishedRefresh={handleFinishedRefresh}
                    />
                </View>
            </ScrollView>
        </>
    );
}
