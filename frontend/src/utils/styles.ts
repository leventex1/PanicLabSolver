interface AppStyle {
    background: string
    foreground: string
    primary: string
    secondary: string
    accent: string
    light: string
    borderColor: string
    borderRadius: number    // px
}

interface GameStyle {
    redPrimary: string
    redSecondary: string
    bluePrimary: string
    blueSecondary: string
    background: string
    dark: string
    starterBlue: string
    starterRed: string
    starterYellow: string
}


export const AppTheme: AppStyle = {
    background: "#e7e7eeff",
    foreground: "#1d1d1dff",
    primary: "#e2312bff",
    secondary: "#a8a8a8ff",
    accent: "#be130dff",
    light: "#f3f3f3ff",
    borderColor: "#3b3b3bff",
    borderRadius: 4
}

export const GameTheme: GameStyle = {
    redPrimary: "#F1203C",
    redSecondary: "#FD682C",
    bluePrimary: "#6F0D8E",
    blueSecondary: "#04A8BF",
    background: "#60C654",
    dark: "#373737",
    starterBlue: "#0D5B5B",
    starterRed: "#AF2D33",
    starterYellow: "#E4A90C"
}

export const InputButtonHeights = 80