export const colors = {
    backgroundColor: "#f1f1f1",
    textColor: "#1f1f1f",

    primary: "#0066EE",
    primaryLight: "#0099EE",
    primaryTransparency: (opacity) => `rgba(0,102,238,${opacity})`,
    accent: "#FF9900",
    accentTransparency: (opacity) => `rgba(255,153,0,${opacity})`,
    tertiaryLight: "#8833AA",
    tertiary: "#8800AA",
    tertiaryDark: "#770066",
    tertiaryTransparency: (opacity) => `rgba(136,0,170,${opacity})`,

    clear: 'transparent',

    white: "#ffffff",
    black: "#111111",

    darkGray: "#444444",
    mediumGray: "#666666",
    lightGray: "#aaaaaa",
    lightestGray: "#dddddd",

    success: "#008010",
    danger: "#CC0000",
    warning: "#FF9900",
}

export const layout = {
    padding: 16,
    margin: 20,
    center: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rowSB: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    rowSE: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    rowSA: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    }
}

export const type = {
    h1: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    h2: {
        fontSize: 26,
        fontWeight: 'bold',
    },
    h3: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    h4: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    h5: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    h6: {
        fontSize: 9,
        fontWeight: 'bold',
    },
    heading: {
        fontSize: 26,
        fontWeight: 'bold',
        textTransform: 'capitalize'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textTransform: 'capitalize'
    },
    subTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: colors.lightGray
    },
    largeText: {
        fontSize: 20,
    },
    mediumText: {
        fontSize: 16,
    },
    smallText: {
        fontSize: 12,
    },
    capitalize: {
        textTransform: 'capitalize'
    },
    uppercase: {
        textTransform: 'uppercase'
    },
    icon: {
        xLarge: 36,
        large: 24,
        medium: 18,
        small: 12,
    }
}
