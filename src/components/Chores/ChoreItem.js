import {useState, useEffect} from "react";
import {Text, View, Pressable} from "react-native";
import {Entypo} from "@expo/vector-icons";
import moment from 'moment';

import {editChoreStatus, saveNewChoreStatus} from "../../services/api/chores";
import {colors, layout, type} from "../../shared/core";

export default function ChoreItem(props) {
    const {
        chore_status_id,
        member_chore_day_id,
        chore,
        complete,
        name: memberName,
        index,
    } = props;

    const [isComplete, setIsComplete] = useState(false);

    function toggleChecked() {
        if (!chore_status_id) {
            saveNewChoreStatus({
                complete: !isComplete,
                date: moment().format('YYYY-MM-DD'),
                member_chore_day_id
            })
                .then(res => res.json())
                .then(res => {
                    if (res) setIsComplete(!complete);
                })
                .catch(console.error)
        } else {
            editChoreStatus( chore_status_id, {
                complete: !isComplete,
                date: moment().format('YYYY-MM-DD')
            })
                .then(res => res.json())
                .then(res => {
                    if(res) setIsComplete(!complete);
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
            style={({pressed}) => [{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'nowrap',
                alignItems: 'center',
                paddingVertical: layout.padding,
                paddingHorizontal: layout.padding,
                width: '100%',
                borderTopWidth: index === 0 && 1,
                borderBottomWidth: 1,
                borderColor: colors.lightestGray,
                backgroundColor: pressed ? colors.primaryTransparency(0.2) : colors.clear,
            }]}
        >
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 26,
                    width: 26,
                    marginRight: layout.margin,
                    borderWidth: 1,
                    borderColor: colors.lightestGray,
                    borderRadius: layout.margin / 4,
                    backgroundColor: isComplete ? colors.accent : colors.white,
                }}
            >
                {isComplete && <Entypo name="check" size={type.icon.large} color={colors.textColor}/>}
            </View>
            <View
                style={{
                    flex: 1
                }}
            >
                <Text style={{textTransform: 'capitalize'}}>{chore}</Text>
                <Text style={{...type.capitalize, ...type.subTitle}}>{memberName}</Text>
            </View>
        </Pressable>
    );
}
