import { Text } from "react-native"
import { AppTheme } from "../utils/styles"


interface AppTextProps {
    children?: React.ReactNode
    order?: 0 | 1 | 2 | 3 | 4,
    weight?: 1 | 2 | 3,
    colorSwap?: boolean
    secondary?: boolean
}
export const AppText: React.FunctionComponent<AppTextProps> = (props) => {

    const fontSize = 
        props.order === 4 ? 96 :
        props.order === 3 ? 64 :
        props.order === 2 ? 32 :
        props.order === 0 ? 16 :
        20

    const fontWeight =
        props.weight === 3 ? 700 :
        props.weight === 2 ? 500 :
        300

    return (
        <Text style={{
            fontFamily: "chewy",
            fontSize,
            fontWeight,
            color: props.colorSwap ? AppTheme.light : props.secondary ? AppTheme.secondary : AppTheme.foreground,
            alignSelf: "flex-start",
        }}>
            {props.children}
        </Text>
    )
}
