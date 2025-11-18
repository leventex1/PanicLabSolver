import { Image } from "expo-image"
import { AppButton } from "../ui/app-button"
import { AppBaseContainer } from "../ui/layouts/app-base-container"
import { AppTheme, GameTheme, InputButtonHeights } from "../utils/styles"
import { useEffect, useState } from "react"
import { StarterDirection, StarterType } from "solver/types"
import { StarterCard } from "solver/card"


interface GameStarterInputProps {
    onSelection: (card: StarterCard, starterDirection: StarterDirection) => void
}
export const GameStarterInput: React.FunctionComponent<GameStarterInputProps> = ({ onSelection }) => {
    const [starterDirection, setStarterDirection] = useState<StarterDirection | null>(null)
    const [starterType, setStarterType] = useState<StarterType | null>(null)

    useEffect(() => {
        if (starterDirection !== null && starterType !== null)
            onSelection(new StarterCard(starterType), starterDirection)
    }, [starterDirection, starterType])

    return (
        <AppBaseContainer flex vertical gap={8} pBlock={16}>
            <AppBaseContainer flex gap={8}>
                <AppButton grow secondary outlineColor={starterDirection === StarterDirection.BLACK ? GameTheme.background : AppTheme.secondary} onClick={() => setStarterDirection(StarterDirection.BLACK)}>
                    <AppBaseContainer grow flex justify="center" disableBackground height={InputButtonHeights}>
                        <AppBaseContainer flex vertical justify="center" disableBackground>
                            <Image source={require("../../assets/black-arrow.png")} style={{ width: 100 / 2, height: 120 / 2}} />
                        </AppBaseContainer>
                    </AppBaseContainer>
                </AppButton>
                <AppButton grow secondary outlineColor={starterDirection === StarterDirection.WHITE ? GameTheme.background : AppTheme.secondary} onClick={() => setStarterDirection(StarterDirection.WHITE)}>
                    <AppBaseContainer grow flex justify="center" disableBackground height={InputButtonHeights}>
                        <AppBaseContainer flex vertical justify="center" disableBackground>
                            <Image source={require("../../assets/white-arrow.png")} style={{ width: 100 / 2, height: 120 / 2}} />
                        </AppBaseContainer>
                    </AppBaseContainer>
                </AppButton>
            </AppBaseContainer>
            <AppBaseContainer flex gap={8}>
                <AppButton grow secondary outlineColor={starterType === StarterType.RED ? GameTheme.background : AppTheme.secondary} pInline={0} pBlock={0} onClick={() => setStarterType(StarterType.RED)}>
                    <AppBaseContainer grow flex justify="center" color={GameTheme.starterRed} height={InputButtonHeights} />
                </AppButton>
                <AppButton grow secondary outlineColor={starterType === StarterType.BLUE ? GameTheme.background : AppTheme.secondary} pInline={0} pBlock={0} onClick={() => setStarterType(StarterType.BLUE)}>
                    <AppBaseContainer grow flex justify="center" color={GameTheme.starterBlue} height={InputButtonHeights} />
                </AppButton>
                <AppButton grow secondary outlineColor={starterType === StarterType.YELLOW ? GameTheme.background : AppTheme.secondary} pInline={0} pBlock={0} onClick={() => setStarterType(StarterType.YELLOW)}>
                    <AppBaseContainer grow flex justify="center" color={GameTheme.starterYellow} height={InputButtonHeights} />
                </AppButton>
            </AppBaseContainer>
        </AppBaseContainer>
    )
}
