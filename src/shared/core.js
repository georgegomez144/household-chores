export const colors = {
    backgroundColor: "#f1f1f1",
    textColor: "#1f1f1f",

    primary: "#0066EE",
    primaryTransparency: (opacity) => `rgba(0,102,238,${opacity})`,
    accent: "#FF9900",
    accentTransparency: (opacity) => `rgba(255,153,0,${opacity})`,
    tertiary: "#8800AA",
    tertiaryTransparency: (opacity) => `rgba(136,0,170,${opacity})`,

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
        fontSize: 8,
        fontWeight: 'bold',
    },
    icon: {
        xLarge: 36,
        large: 24,
        medium: 18,
        small: 12,
    }
}
