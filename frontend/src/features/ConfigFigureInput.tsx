import { useEffect, useState } from "react"
import { AppButton } from "../ui/app-button"
import { AppBaseContainer } from "../ui/layouts/app-base-container"
import { AppTheme, GameTheme, InputButtonHeights } from "../utils/styles"
import { FigureColor, FigureTexture, FigureType } from "solver/types"
import { Image } from "expo-image"
import { Card, FigureCard } from "solver/card"


interface ConfigFigureInputProps {
    onSelection: (card: Card) => void
}
export const ConfigFigureInput: React.FunctionComponent<ConfigFigureInputProps> = ({ onSelection }) => {
    const [figureType, setFigureType] = useState<FigureType | null>(null)
    const [figureColor, setFigureColor] = useState<FigureColor | null>(null)
    const [figureTexture, setFigureTexture] = useState<FigureTexture | null>(null)

    useEffect(() => {
        if (figureType !== null && figureColor !== null && figureTexture !== null)
            onSelection(new FigureCard(figureType, figureColor, figureTexture))

    }, [figureType, figureColor, figureTexture])

    return (
        <>
            <AppBaseContainer flex gap={8}>
                <AppButton grow secondary outlineColor={figureType === FigureType.ONEEYED ? GameTheme.background : AppTheme.secondary} onClick={() => setFigureType(FigureType.ONEEYED)}>
                    <AppBaseContainer grow flex justify="center" disableBackground height={InputButtonHeights}>
                        <AppBaseContainer flex vertical justify="center" disableBackground>
                            <Image source={require("../../assets/one-template.png")} style={{ width: 100 / 2, height: 120 / 2}} />
                        </AppBaseContainer>
                    </AppBaseContainer>
                </AppButton>
                <AppButton grow secondary outlineColor={figureType === FigureType.TOWEYED ? GameTheme.background : AppTheme.secondary} onClick={() => setFigureType(FigureType.TOWEYED)}>
                    <AppBaseContainer grow flex justify="center" disableBackground height={InputButtonHeights}>
                        <AppBaseContainer flex vertical justify="center" disableBackground>
                            <Image source={require("../../assets/two-template.png")} style={{ width: 100 / 2, height: 120 / 2}} />
                        </AppBaseContainer>
                    </AppBaseContainer>
                </AppButton>
            </AppBaseContainer>
            <AppBaseContainer flex gap={8}>
                <AppButton grow secondary outlineColor={figureColor === FigureColor.RED ? GameTheme.background : AppTheme.secondary} onClick={() => setFigureColor(FigureColor.RED)}>
                    <AppBaseContainer grow flex height={InputButtonHeights}>
                        <AppBaseContainer grow color={GameTheme.redPrimary} />
                        <AppBaseContainer grow color={GameTheme.redSecondary} />
                    </AppBaseContainer>
                </AppButton>
                <AppButton grow secondary outlineColor={figureColor === FigureColor.BLUE ? GameTheme.background : AppTheme.secondary} onClick={() => setFigureColor(FigureColor.BLUE)}>
                    <AppBaseContainer grow flex height={InputButtonHeights}>
                        <AppBaseContainer grow color={GameTheme.bluePrimary} />
                        <AppBaseContainer grow color={GameTheme.blueSecondary} />
                    </AppBaseContainer>
                </AppButton>
            </AppBaseContainer>
            <AppBaseContainer flex gap={8}>
                <AppButton grow secondary outlineColor={figureTexture === FigureTexture.STRIPED ? GameTheme.background : AppTheme.secondary} onClick={() => setFigureTexture(FigureTexture.STRIPED)}>
                    <AppBaseContainer grow flex justify="center" disableBackground height={InputButtonHeights}>
                        <AppBaseContainer flex vertical justify="center" disableBackground>
                            <Image source={require("../../assets/striped.png")} style={{ width: 64, height: 64}} />
                        </AppBaseContainer>
                    </AppBaseContainer>
                </AppButton>
                <AppButton grow secondary outlineColor={figureTexture === FigureTexture.DOTTED ? GameTheme.background : AppTheme.secondary} onClick={() => setFigureTexture(FigureTexture.DOTTED)}>
                    <AppBaseContainer grow flex justify="center" disableBackground height={InputButtonHeights}>
                        <AppBaseContainer flex vertical justify="center" disableBackground>
                            <Image source={require("../../assets/dotted.png")} style={{ width: 64, height: 64}} />
                        </AppBaseContainer>
                    </AppBaseContainer>
                </AppButton>
            </AppBaseContainer>
        </>
    )
}
