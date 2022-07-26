import {useState, useEffect} from 'react';
import {Text, View, ActivityIndicator} from 'react-native';
import moment from 'moment';
import MemberView from './MemberView';

import {getMembers, getMembersWithChoresToday} from "../../services/api/members";

import {type, layout} from "../../shared/core";

export default function MemberList(props) {
    const {
        refreshRequested,
        handleFinishedRefresh,
    } = props;

    const [isLoading, setLoading] = useState(true);
    const [members, setMembers] = useState();

    const getMembersAsync = async () => {
        try {
            const response = await getMembersWithChoresToday();
            const data = await response.json();
            console.log({choreData: data})
            setMembers(data);
            handleFinishedRefresh();
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isLoading || refreshRequested) getMembersAsync()
    }, [refreshRequested])

    return (
        <View
            style={{
                minHeight: 50,
                width: '100%',
                marginVertical: layout.margin
            }}
        >
            <Text style={{
                ...type.title,
                textAlign: 'center',
                padding: layout.padding,
                width: '100%',
            }}>{members && members.length} {members && members.length !== 1 ? 'members' : 'member'} with Chores Today:</Text>
            {isLoading ? (
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
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        width: '100%',
                        padding: layout.padding
                    }}
                >
                    {members && members.map(member => <MemberView key={`member_id_${member.member_id}`} {...member} />)}
                </View>
            )}
        </View>
    );
}
