import {useState, useEffect} from 'react';
import {Text, View, Pressable, ActivityIndicator} from 'react-native';
import MemberView from './MemberView';

import {getMembers} from "../../services/api/members";

import Elevations from 'react-native-elevation';
import {colors, type, layout} from "../../shared/core";

export default function MemberList(props) {

    const [isLoading, setLoading] = useState(true);
    const [members, setMembers] = useState();

    const getMembersAsync = async () => {
        setLoading(true);
        try {
            const response = await getMembers();
            const data = await response.json();
            setMembers(data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getMembersAsync();
    }, [])

    function goToMember(id) {
        console.log(`Go to ${members.find(member => member.member_id === id).name}'s member page by member id: ${id}`);
    }

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
            }}>{members.length} Members:</Text>

            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    width: '100%',
                    padding: layout.padding
                }}
            >
                {members && members.map(member => (
                    <MemberView
                        key={member.member_id}
                        {...member} />
                ))}
            </View>
        </View>
    );
}
