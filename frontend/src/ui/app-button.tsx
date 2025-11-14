import { TouchableOpacity } from "react-native"
import { AppBaseContainer } from "./layouts/app-base-container"
import { AppTheme } from "../utils/styles"


interface AppButtonProps {
    children?: React.ReactNode
    grow?: boolean
}
export const AppButton: React.FunctionComponent<AppButtonProps> = (props) => {

    return (
        <TouchableOpacity style={{ alignSelf: props.grow ? undefined : "flex-start" }}>
            <AppBaseContainer
                color={AppTheme.primary}
                pInline={24}
                pBlock={16}
                borderRadius={AppTheme.borderRadius}
            >
                {props.children}
            </AppBaseContainer>
        </TouchableOpacity>
    )
}
