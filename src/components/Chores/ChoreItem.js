import {Text, View} from "react-native";
import {colors, layout, type} from "../../shared/core";
import {Entypo} from "@expo/vector-icons";

export default function ChoreItem(props) {
    const {chore, days} = props;

    return (
        <View
            style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'nowrap',
                alignItems: 'center',
                paddingVertical: layout.padding / 1.2,
                paddingHorizontal: layout.padding,
                width: '100%',
                borderBottomWidth: 1,
                borderBottomColor: colors.lightestGray,
                backgroundColor: colors.white,
            }}
        >
            <View
                style={{
                    flex: 1
                }}
            >
                <Text style={{textTransform: 'capitalize'}}>{chore}</Text>
                {/*{days && (*/}
                {/*    <View>*/}
                {/*        {days.map(day => <Text key={day.day_id}>{day.day}</Text>)}*/}
                {/*    </View>*/}
                {/*)}*/}
            </View>
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row'
                }}
            >
                <Entypo name="edit" size={type.icon.medium} color={colors.primary}
                        style={{marginHorizontal: layout.margin / 2}}/>
                <Entypo name="trash" size={type.icon.medium} color={colors.danger}
                        style={{marginHorizontal: layout.margin / 2}}/>
            </View>
        </View>
    );
}
