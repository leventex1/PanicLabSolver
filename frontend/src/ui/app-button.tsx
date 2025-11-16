import { TouchableOpacity } from "react-native"
import { AppBaseContainer } from "./layouts/app-base-container"
import { AppTheme } from "../utils/styles"


interface AppButtonProps {
    onClick?: () => void
    children?: React.ReactNode
    grow?: boolean
    secondary?: boolean
    color?: string
    outlineColor?: string
    pInline?: number
    pBlock?: number
}
export const AppButton: React.FunctionComponent<AppButtonProps> = (props) => {

    return (
        <TouchableOpacity style={{
                alignSelf: props.grow ? undefined : "flex-start",
                flex: props.grow ? 1 : undefined
            }}
                onPress={props.onClick}
            >
            <AppBaseContainer
                color={props.color ? props.color : props.secondary ? AppTheme.secondary : AppTheme.primary}
                pInline={props.pInline !== undefined ? props.pInline : 24}
                pBlock={props.pBlock !== undefined ? props.pBlock : 16}
                borderRadius={AppTheme.borderRadius}
                outlineColor={props.outlineColor}
            >
                {props.children}
            </AppBaseContainer>
        </TouchableOpacity>
    )
}
