import { LayoutChangeEvent, View } from "react-native"
import { AppDynamicContainer } from "../ui/layouts/app-dynamic-container"
import { Card, ChangerCard, FigureCard, StarterCard } from "solver/card"
import { useState } from "react"
import { GameFigureCard } from "./cards/GameFigureCard"
import { GameChangerCard } from "./cards/GameChangerCard"
import { CardType } from "solver/types"
import { AppTheme } from "../utils/styles"
import { GameStarterCard } from "./cards/GameStarterCard"
import { GameTrapdoorCard } from "./cards/GameTrapdoorCard"


interface GameBoardCircleProps {
    cards: Array<Card>
    offset?: number
    selectIndex?: number
}
export const GameBoardCircle: React.FunctionComponent<GameBoardCircleProps> = ({ cards, offset=0, selectIndex }) => {
    const [width, setWidth] = useState<number>(0)
    const [height, setHeight] = useState<number>(0)

    const onLayout = (event: LayoutChangeEvent) => {
        const { width, height } = event.nativeEvent.layout;
        setWidth(width)
        setHeight(height)
    };

    const maxR = Math.min(width, height) / 2
    const cardWidth = Math.min(2 * Math.PI * maxR / cards.length - (16), 40)
    const cardHeight = cardWidth * 1.2
    const r = maxR
    const printWidth = cardWidth
    const pringHeight = cardHeight
    return (
        <AppDynamicContainer onLayout={onLayout}>
            {width && height ? cards.map((card, i) => {
                const ratio = i / cards.length
                  
                return (
                    <View
                        key={i}
                        style={{
                            position: "absolute",
                            width: cardWidth,
                            height: cardHeight,
                            backgroundColor: "red",
                            transform: `translate(${width/2 - cardWidth/2}px, ${height/2 - cardHeight/2}px) rotate(${Math.floor(ratio * 360 + 90 + offset)}deg) translate(${r-cardHeight/2}px, 0) rotate(90deg)`,
                            borderRadius: AppTheme.borderRadius,
                            opacity: selectIndex ? (selectIndex === i ? 1 : 0.5) : 1
                        }}
                    >
                        {card.type === CardType.FIGURE && <GameFigureCard size={{ width: printWidth, height: pringHeight }} type={(card as FigureCard).figureType} color={(card as FigureCard).figureColor} texture={(card as FigureCard).figureTexture} /> }
                        {card.type === CardType.CHANGER && <GameChangerCard size={{ width: printWidth, height: pringHeight }} type={(card as ChangerCard).changerType} /> }
                        {card.type === CardType.STARTER && <GameStarterCard size={{ width: printWidth, height: pringHeight }} type={(card as StarterCard).starterType} /> }
                        {card.type === CardType.TRAPDOOR && <GameTrapdoorCard size={{ width: printWidth, height: pringHeight }} /> }
                    </View>
                )
            }) : null}
        </AppDynamicContainer>
    )
}
