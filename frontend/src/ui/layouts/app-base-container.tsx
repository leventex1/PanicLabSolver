import { AppTheme } from "@/src/utils/styles"
import { StyleProp, View, ViewStyle } from "react-native"


export interface AppBaseContainerProps {
    children?: React.ReactNode
    flex?: boolean
    vertical?: boolean
    reverseVertical?: boolean
    justify?: "start" | "center" | "end" | "space-between"
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
    disableBackground?: boolean
    scrollable?: boolean
    outlineColor?: string
}
export const AppBaseContainerLayout = (props: AppBaseContainerProps): ViewStyle => {
    const justifyContent = !props.justify ? undefined :
        props.justify === "center" ? "center" :
        props.justify === "start" ? "flex-start" : 
        props.justify === "space-between" ? "space-between" :
        "flex-end"

    const outlineStyle: ViewStyle = !props.outlineColor ? { } : {
        borderWidth: 4,
        borderColor: props.outlineColor,
        borderStyle: "solid"
    }

    return {
        position: "relative",
        display: props.flex ? "flex" : undefined,
        flex: props.grow ? 1 : undefined,
        justifyContent,
        gap: props.gap ?? undefined,
        flexShrink: props.shrink ? 1 : undefined,
        flexDirection: props.vertical ? "column" : props.reverseVertical ? "column-reverse" : "row",
        paddingInline: props.pInline ?? 0,
        paddingBlock: props.pBlock ?? 0,
        paddingTop: props.pTop ?? undefined,
        paddingBottom: props.pBottom ?? undefined,
        width: props.width ?? (props.fullWidth ? "100%" : undefined),
        height: props.height ?? (props.fullHeight ? "100%" : undefined),
        backgroundColor: props.disableBackground ? undefined : props.color ?? AppTheme.background,
        borderRadius: props.borderRadius ?? 0,
        overflow: props.scrollable ? "scroll" : "hidden",
        ...outlineStyle
    }
}

export const AppBaseContainer: React.FunctionComponent<AppBaseContainerProps> = ({ children, ...props }) => <View style={AppBaseContainerLayout(props)}>{children}</View>