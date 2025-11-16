import { StyleProp, View, ViewStyle } from "react-native";
import { AppDynamicContainerLayout, AppDynamicContainerProps } from "./app-dynamic-container";


interface AppPageContainerProps extends AppDynamicContainerProps { }
export const AppPageContainerLayout = (props: AppPageContainerProps): ViewStyle => {
    const dynProps = AppDynamicContainerLayout({
        pInline: 8,
        pBlock: 8,
        ...props
    })
    return {
        maxWidth: 500,
        marginInline: "auto",
        ...dynProps
    }
}

export const AppPageContainer: React.FunctionComponent<AppPageContainerProps> = ({ children, ...props }) => <View style={AppPageContainerLayout(props)}>{children}</View>
