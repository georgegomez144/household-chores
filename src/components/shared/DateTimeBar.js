import {useEffect, useState} from "react";
import moment from "moment";
import {Text, View} from "react-native";
import {colors, layout, type} from "../../shared/core";
import Elevations from "react-native-elevation";
import {clear} from "react-native/Libraries/LogBox/Data/LogBoxData";

const timeHourFormat = 'hh';
const timeMinutesAFormat = 'mm A';

export function DateTimeBar() {
    const [timeHour, setTimeHour] = useState(moment().format(timeHourFormat));
    const [timeMinutesA, setTimeMinutesA] = useState(moment().format(timeMinutesAFormat));
    const [blinkerText, setBlinkerText] = useState(':');

    const isAM = moment().format('A') === 'AM'
    const currentDate = moment().format('dddd, MMM Do, Y')

    useEffect(() => {
        const getTime = setInterval(() => {
            setTimeHour(moment().format(timeHourFormat))
            setTimeMinutesA(moment().format(timeMinutesAFormat))
        }, 500)

        const secondsBlinker = setInterval(() => {
            setBlinkerText(blinkerText === ':' ? ' ' : ':')
        }, 1000)

        return () => {
            clearInterval(getTime);
            clearInterval(secondsBlinker);
        }
    }, [timeHour, timeMinutesA, blinkerText])

    return (
        <View
            style={{
                ...layout.rowSB,
                width: '100%',
                paddingHorizontal: layout.padding,
                paddingVertical: layout.padding / 3,
                backgroundColor: isAM ? colors.primary : colors.tertiary
            }}
        >
            <Text style={{...type.h4, color: colors.white}}>{currentDate}</Text>
            <View
                style={{
                    ...layout.center,
                    ...layout.row,
                    width: 120,
                    height: layout.padding * 1.5,
                    borderRadius: layout.padding / 4,
                    backgroundColor: isAM ? colors.primaryLight : colors.tertiaryLight
                }}
            >
                <Text style={{...type.h4, color: colors.white, ...Elevations[4]}}>
                    {timeHour}
                </Text>
                <Text style={{width: 10, ...type.h4, textAlign: 'center', lineHeight: 16, color: colors.white, ...Elevations[4]}}>
                    {blinkerText}
                </Text>
                <Text style={{...type.h4, color: colors.white, ...Elevations[4]}}>
                    {timeMinutesA}
                </Text>
            </View>
        </View>
    )}
