import { View, ViewStyle } from "react-native";
import { AppBaseContainerLayout, AppBaseContainerProps } from "./app-base-container";
import { forwardRef } from "react";


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

export const AppDynamicContainer = forwardRef<View, AppDynamicContainerProps>(
    ({ children, ...props }, ref) => {
        return (
            <View ref={ref} style={AppDynamicContainerLayout(props)}>
                {children}
            </View>
        );
    }
);