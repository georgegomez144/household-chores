import {View, ScrollView, Text, RefreshControl} from 'react-native'
import {layout, type} from "../shared/core";
import AdminMemberList from "../components/Members/AdminMembersList";
import {useEffect, useState} from "react";

export default function Admin() {
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
        <ScrollView
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
            style={{flex: 1}}
        >
            <View
                style={{
                    flex: 1,
                    ...layout.center,
                    paddingBottom: layout.margin * 5
                }}
            >
                <Text style={{...type.heading}}>Admin Page</Text>
                <AdminMemberList
                    refreshRequested={refreshing}
                    handleFinishedRefresh={handleFinishedRefresh}
                />
            </View>
        </ScrollView>
    );
}
