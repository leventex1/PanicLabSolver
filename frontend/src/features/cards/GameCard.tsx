import { AppBaseContainer } from "@/src/ui/layouts/app-base-container"
import { AppTheme } from "@/src/utils/styles"
import { Image } from "expo-image"


interface GameCardProps {
    source: any
    width: number
    height: number
    scale?: number
    background?: string
}
export const GameCard: React.FunctionComponent<GameCardProps> = ({ source, width, height, scale=1, background }) => {

    return (
        <AppBaseContainer flex justify="center" color={background} borderRadius={AppTheme.borderRadius} pInline={4} pBlock={4}>
            <AppBaseContainer flex vertical justify="center" disableBackground>
                <Image source={source} style={{ width: width * scale, height: height * scale }} />
            </AppBaseContainer>
        </AppBaseContainer>
    )
}
