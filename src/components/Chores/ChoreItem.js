import {useState, useEffect} from "react";
import {Text, View, Pressable, ActivityIndicator} from "react-native";
import {Entypo} from "@expo/vector-icons";
import moment from 'moment';

import {editChoreStatus, saveNewChoreStatus} from "../../services/api/chores";
import {colors, layout, type} from "../../shared/core";
import ChoresList from "./ChoreList";

export default function ChoreItem(props) {
    const {
        chore_status_id,
        member_chore_day_id,
        chore,
        complete,
        name: memberName,
        index,
        interactive,
        editable
    } = props;

    const [isLoading, setIsLoading] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    function toggleChecked() {
        setIsLoading(true);
        if (!chore_status_id) {
            saveNewChoreStatus({
                complete: !isComplete,
                date: moment().format('YYYY-MM-DD'),
                member_chore_day_id
            })
                .then(res => res.json())
                .then(res => {
                    setIsLoading(false);
                    if (res) setIsComplete(!isComplete);
                })
                .catch(console.error)
        } else {
            editChoreStatus( +chore_status_id, {
                complete: !isComplete,
                date: moment().format('YYYY-MM-DD')
            })
                .then(res => res.json())
                .then(res => {
                    setIsLoading(false);
                    if(res) setIsComplete(!isComplete);
                })
                .catch(console.error)
        }
    }

    const checkAndSetIsComplete = () => {
        setIsComplete(complete);
    }

    useEffect(() => {
        checkAndSetIsComplete();
    }, [complete])

    return (
        <Pressable
            onPress={toggleChecked}
            diabled={!interactive}
            style={({pressed}) => [{
                ...layout.rowSB,
                paddingVertical: layout.padding / 1.3,
                paddingHorizontal: layout.padding,
                width: '100%',
                borderTopWidth: index === 0 && 1,
                borderBottomWidth: 1,
                borderColor: colors.lightestGray,
                backgroundColor: pressed && interactive ? colors.primaryTransparency(0.2) : colors.clear,
            }]}
        >
            {interactive && <View
                style={{
                    ...layout.center,
                    height: 26,
                    width: 26,
                    marginRight: layout.margin,
                    borderWidth: 1,
                    borderColor: colors.lightestGray,
                    borderRadius: layout.margin / 4,
                    backgroundColor: !isLoading && isComplete ? colors.accent : colors.white,
                }}
            >
                {isLoading && <ActivityIndicator size="small"/>}
                {!isLoading && isComplete && <Entypo name="check" size={type.icon.large} color={colors.textColor}/>}
            </View>}
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                }}
            >
                <Text style={{textTransform: 'capitalize'}}>{chore}</Text>
                <Text style={{...type.capitalize, ...type.subTitle}}>{memberName}</Text>
            </View>
            {editable && (
                <View
                    style={{
                        ...layout.rowSB,
                        width: 60
                    }}
                >
                    <Pressable
                        onPress={() => alert(`edit chore: ${chore}`)}
                    >
                        <Entypo name="edit" size={type.icon.medium} color={colors.primary} />
                    </Pressable>
                    <Pressable
                        onPress={() => alert(`delete chore: ${chore}`)}
                    >
                        <Entypo name="trash" size={type.icon.medium} color={colors.danger} />
                    </Pressable>
                </View>
            )}
        </Pressable>
    );
}

ChoreItem.defaultProps = {
    interactive: true,
    editable: false
}
