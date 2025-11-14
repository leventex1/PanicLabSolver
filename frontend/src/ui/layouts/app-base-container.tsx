import { AppTheme } from "@/src/utils/styles"
import { StyleProp, View, ViewStyle } from "react-native"


export interface AppBaseContainerProps {
    children?: React.ReactNode
    flex?: boolean
    vertical?: boolean
    justify?: "start" | "center" | "end"
    gap?: number
    grow?: boolean
    shrink?: boolean
    pInline?: number
    pBlock?: number
    pTop?: number
    pBottom?: number
    width?: number
    fullWidth?: boolean
    height?: number
    fullHeight?: boolean
    color?: string
    borderRadius?: number
    scrollable?: boolean
}
export const AppBaseContainerLayout = (props: AppBaseContainerProps): ViewStyle => {
    const justifyContent = !props.justify ? undefined :
        props.justify === "center" ? "center" :
        props.justify === "start" ? "flex-start" :
        "flex-end"

    return {
        display: props.flex ? "flex" : undefined,
        flex: props.grow ? 1 : undefined,
        justifyContent,
        gap: props.gap ?? undefined,
        flexShrink: props.shrink ? 1 : undefined,
        flexDirection: props.vertical ? "column" : "row",
        paddingInline: props.pInline ?? 0,
        paddingBlock: props.pBlock ?? 0,
        paddingTop: props.pTop ?? undefined,
        paddingBottom: props.pBottom ?? undefined,
        width: props.width ?? (props.fullWidth ? "100%" : undefined),
        height: props.height ?? (props.fullHeight ? "100%" : undefined),
        backgroundColor: props.color ?? AppTheme.background,
        borderRadius: props.borderRadius ?? 0,
        overflow: props.scrollable ? "scroll" : "hidden"
    }
}

export const AppBaseContainer: React.FunctionComponent<AppBaseContainerProps> = ({ children, ...props }) => <View style={AppBaseContainerLayout(props)}>{children}</View>