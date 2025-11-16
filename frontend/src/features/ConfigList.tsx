import { ScrollView } from "react-native"
import { AppText } from "../ui/app-text"
import { AppBaseContainer } from "../ui/layouts/app-base-container"
import { AppDynamicContainer } from "../ui/layouts/app-dynamic-container"
import { getConfigs } from "../config"


export const ConfigList: React.FunctionComponent = () => {
    const configDecks = getConfigs()

    return (
        <ScrollView>
            <AppDynamicContainer vertical gap={8} scrollable>
                {configDecks.map((config, i) => (
                    <AppText key={i}>{config.date.toDateString()}</AppText>
                ))}
            </AppDynamicContainer>
        </ScrollView>
    )
}
