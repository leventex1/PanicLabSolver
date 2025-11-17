import { ScrollView, TouchableOpacity } from "react-native"
import { AppText } from "../ui/app-text"
import { AppBaseContainer } from "../ui/layouts/app-base-container"
import { AppDynamicContainer } from "../ui/layouts/app-dynamic-container"
import { createDeck, getConfigs } from "../config"
import { useAsync } from "../hooks/useAsync"
import { useEffect } from "react"
import { InputButtonHeights } from "../utils/styles"
import { CardType, ChangerType } from "solver/types"
import { GameFigureCard } from "./cards/GameFigureCard"
import { Card, ChangerCard, FigureCard, StarterCard } from "solver/card"
import { GameChangerCard } from "./cards/GameChangerCard"
import { GameStarterCard } from "./cards/GameStarterCard"
import { GameTrapdoorCard } from "./cards/GameTrapdoorCard"
import { useRouter } from "expo-router"
import { useBoardContext } from "../contexts/board-context"


export const ConfigList: React.FunctionComponent = () => {
    const router = useRouter()
    const { setCards } = useBoardContext()
    const { trigger, result: configDecks } = useAsync(getConfigs)

    useEffect(() => {
        trigger()
    }, [])

    const onSelect = (cards: Array<Card>) => {
        setCards(cards)
        router.navigate("/game-board")
    }

    return (
        <ScrollView>
            <AppDynamicContainer vertical gap={8} scrollable>
                {configDecks && [...configDecks].reverse().map((config, configI) => {
                    const cards = createDeck(config)
                    const d = config.date
                    const label = `${d.getFullYear()}-${(d.getMonth() + 1) < 10 ? 0 : ""}${d.getMonth() + 1}-${d.getDate()} ${d.getHours() < 10 ? 0 : ""}${d.getHours()}:${d.getMinutes() < 10 ? 0 : ""}${d.getMinutes()}`

                    return (
                        <TouchableOpacity key={configI} onPress={() => onSelect(cards)}>
                            <AppBaseContainer flex vertical gap={4}>
                                <AppText key={configI} order={0} secondary>{label}</AppText>
                                <ScrollView horizontal={true} style={{ flexGrow: 0 }}>
                                    <AppBaseContainer flex gap={4} height={InputButtonHeights}>
                                        {cards.map((card, i) => {
                                            const key = configI * 32 + i

                                            if (card.type === CardType.FIGURE)
                                                return <GameFigureCard key={key} type={(card as FigureCard).figureType} color={(card as FigureCard).figureColor} texture={(card as FigureCard).figureTexture} scale={0.5} />
                                            if (card.type === CardType.CHANGER)
                                                return <GameChangerCard key={key} type={(card as ChangerCard).changerType} scale={0.5} />
                                            if (card.type === CardType.STARTER)
                                                return <GameStarterCard key={key} type={(card as StarterCard).starterType} scale={0.5} />
                                            if (card.type === CardType.TRAPDOOR)
                                                return <GameTrapdoorCard key={key} scale={0.5} />
                                            return null
                                        })}
                                    </AppBaseContainer>
                                </ScrollView>
                            </AppBaseContainer>
                        </TouchableOpacity>
                    )
                })}
            </AppDynamicContainer>
        </ScrollView>
    )
}
