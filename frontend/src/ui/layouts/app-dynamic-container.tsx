import { View, ViewStyle } from "react-native";
import { AppBaseContainerLayout, AppBaseContainerProps } from "./app-base-container";


export interface AppDynamicContainerProps extends AppBaseContainerProps { }
export const AppDynamicContainerLayout = (props: AppDynamicContainerProps): ViewStyle => {
    return AppBaseContainerLayout({
        flex: true,
        grow: true,
        fullWidth: true,
        fullHeight: true,
        ...props,
    })
}

export const AppDynamicContainer: React.FunctionComponent<AppDynamicContainerProps> = ({ children, ...props }) => <View style={AppDynamicContainerLayout(props)}>{children}</View>