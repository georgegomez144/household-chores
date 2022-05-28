import {useState, useEffect} from 'react';
import {Text, View, ActivityIndicator} from 'react-native';
import ChoreItem from "./ChoreItem";

import {getDay} from "../../services/api/days";

import {type, layout} from "../../shared/core";

export default function TodaysChoresList(props) {
    const {
        memberToFilterBy,
        refreshRequested,
        handleFinishedRefresh
    } = props;

    const [isLoading, setLoading] = useState(true);
    const [chores, setChores] = useState([]);

    const getTodaysChoresAsync = async () => {
        try {
            const today = new Date().getDay() + 1;
            const response = await getDay(today);
            const data = await response.json();
            const choresData = data.chores.map(chore => {
                return {
                    ...chore,
                    complete: chore.complete === '1'
                }
            });
            setChores(choresData);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
            handleFinishedRefresh(false);
        }
    };

    function filterChoresByMemberId(id) {
        setLoading(true);
        const filteredChores = chores.filter(chore => chore.member_id == id);
        setChores(filteredChores);
        setLoading(false);
    }

    useEffect(() => {
        if (refreshRequested) {
            getTodaysChoresAsync();
        }
        if(memberToFilterBy) {
            filterChoresByMemberId(memberToFilterBy);
        } else {
            getTodaysChoresAsync();
        }
    }, [refreshRequested, memberToFilterBy])

    return isLoading ? (
        <View
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 50,
                width: '100%'
            }}
        >
            <ActivityIndicator size="small"/>
        </View>
    ) : (
        <View
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 50,
                width: '100%'
            }}
        >
            <Text style={{
                ...type.title,
                textAlign: 'center',
                padding: layout.padding,
                width: '100%',
            }}>Today's Chores:</Text>
            {chores && chores.map((chore, index) => <ChoreItem key={`${chore.chore_id}_${chore.member_chore_day_id}`} {...chore} index={index}/>)}
        </View>
    );
}
