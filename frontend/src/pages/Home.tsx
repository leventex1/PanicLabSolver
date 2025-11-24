import { useRouter } from "expo-router"
import { ConfigList } from "../features/ConfigList"
import { AppButton } from "../ui/app-button"
import { AppText } from "../ui/app-text"
import { AppBaseContainer } from "../ui/layouts/app-base-container"
import { AppDynamicContainer } from "../ui/layouts/app-dynamic-container"


export const Home = (): React.JSX.Element => {
    const router = useRouter()

    return (
        <AppDynamicContainer vertical gap={32}>
            <AppBaseContainer flex justify="center" pTop={16}>
                <AppText order={4} weight={3}>QQRiQ</AppText>
            </AppBaseContainer>
            <AppBaseContainer flex justify="center" gap={8}>
                <AppButton onClick={() => router.navigate("/new-config")}>
                    <AppText order={2} weight={2} colorSwap>New Config</AppText>
                </AppButton>
            </AppBaseContainer>
            <AppDynamicContainer vertical gap={16}>
                <AppText>Previous Configs</AppText>
                <ConfigList />
            </AppDynamicContainer>
        </AppDynamicContainer>
    )
}
