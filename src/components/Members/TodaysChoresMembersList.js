import {useState, useEffect} from 'react';
import {Text, View, Pressable, ActivityIndicator} from 'react-native';
import {Entypo} from "@expo/vector-icons";
import MemberView from './MemberView';

import {getMembers} from "../../services/api/members";

import Elevations from 'react-native-elevation';
import {colors, type, layout} from "../../shared/core";

export default function MemberList(props) {
    const {
        filterByMember,
        refreshRequested,
        handleFinishedRefresh,
    } = props;

    const [isLoading, setLoading] = useState(true);
    const [filterTriggered, setFilterTrigger] = useState(false);
    const [members, setMembers] = useState();

    const getMembersAsync = async () => {
        setLoading(true);
        try {
            const today = new Date().getDay() + 1;
            const response = await getMembers();
            const data = await response.json();
            const members = data.filter(member => {
                let isTrue = false;
                if(member.chores.length > 0) {
                    member.chores.forEach(chore => {
                        if (chore.days) {
                            if(Array.isArray(chore.days)) {
                                isTrue = chore.days.find(day => +day.day_id === today);
                            } else {
                                isTrue = +chore.days.day_id === today;
                            }
                        }
                    })
                }
                return isTrue;
            })
            setMembers(members);
            handleFinishedRefresh(false);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getMembersAsync();
        if(refreshRequested) {
            getMembersAsync();
        }
    }, [refreshRequested])

    function goToMember(id) {
        clearMemberFilter();
        filterByMember(id);
        setFilterTrigger(true);
    }

    function clearMemberFilter() {
        filterByMember(null);
        setFilterTrigger(false);
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
            }}>{members.length} {members.length !== 1 ? 'members' : 'member'} with Chores Today:</Text>

            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    paddingHorizontal: layout.padding
                }}
            >
                {filterTriggered && (
                    <Pressable
                        onPress={clearMemberFilter}
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingVertical: layout.padding / 4,
                            paddingHorizontal: layout.padding / 2,
                            backgroundColor: colors.mediumGray,
                            borderRadius: layout.padding / 2
                        }}
                    >
                        <Entypo name="cross" size={type.icon.medium} color={colors.white} />
                        <Text style={{
                            fontWeight: 'bold',
                            color: colors.white,
                            ...type.uppercase
                        }}>clear</Text>
                    </Pressable>
                )}
            </View>
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
                        {...member}
                        goToMember={goToMember}
                        clearSelection={!filterTriggered}
                    />
                ))}
            </View>
        </View>
    );
}
