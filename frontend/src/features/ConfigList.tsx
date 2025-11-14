import { ScrollView } from "react-native"
import { AppText } from "../ui/app-text"
import { AppBaseContainer } from "../ui/layouts/app-base-container"
import { AppDynamicContainer } from "../ui/layouts/app-dynamic-container"


export const ConfigList: React.FunctionComponent = () => {

    return (
        <ScrollView>
            <AppDynamicContainer vertical gap={8} scrollable>
                <AppBaseContainer><AppText>Test1</AppText></AppBaseContainer>
                <AppBaseContainer><AppText>Test2</AppText></AppBaseContainer>
            </AppDynamicContainer>
        </ScrollView>
    )
}
