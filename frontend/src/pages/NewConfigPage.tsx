import { useState } from "react"
import { AppDynamicContainer } from "../ui/layouts/app-dynamic-container"
import { Card, ChangerCard, FigureCard, StarterCard, TrapdoorCard } from "solver/card"
import { AppBaseContainer } from "../ui/layouts/app-base-container"
import { AppButton } from "../ui/app-button"
import { AppText } from "../ui/app-text"
import { CardType, ChangerType, StarterType } from "solver/types"
import { ConfigInput } from "../features/ConfigInput"
import { AppTheme, GameTheme, InputButtonHeights } from "../utils/styles"
import { GameFigureCard } from "../features/cards/GameFigureCard"
import { ScrollView } from "react-native"
import { GameTrapdoorCard } from "../features/cards/GameTrapdoorCard"
import { GameChangerCard } from "../features/cards/GameChangerCard"
import { GameStarterCard } from "../features/cards/GameStarterCard"
import { createConfig, saveConfig } from "../config"
import { useRouter } from "expo-router"


export const NewConfigPage: React.FunctionComponent = () => {
    const router = useRouter()
    const [cards, setCards] = useState<Array<Card>>([])
    const [currentInputType, setCurrentInputType] = useState<CardType | null>(null)

    const onNewCard = (card: Card) => {
        setCards(prev => [card, ...prev])
        setCurrentInputType(null)
    }

    const onPop = () => {
        setCards(([_, ...others]) => others)
    }

    const onSave = () => {
        const config = createConfig(cards)
        saveConfig(config)
        router.navigate("/")
    }

    return (
        <AppDynamicContainer vertical gap={16}>
            {currentInputType === null &&
            <>
                <AppDynamicContainer vertical gap={8}>
                    <ScrollView horizontal={true} style={{ flexGrow: 0 }}>
                        <AppBaseContainer flex gap={4} height={InputButtonHeights}>
                            {cards.map((card, i) => {
                                if (card.type === CardType.FIGURE)
                                    return <GameFigureCard key={i} type={(card as FigureCard).figureType} color={(card as FigureCard).figureColor} texture={(card as FigureCard).figureTexture} scale={0.5} />
                                if (card.type === CardType.CHANGER)
                                    return <GameChangerCard key={i} type={(card as ChangerCard).changerType} scale={0.5} />
                                if (card.type === CardType.STARTER)
                                    return <GameStarterCard key={i} type={(card as StarterCard).starterType} scale={0.5} />
                                if (card.type === CardType.TRAPDOOR)
                                    return <GameTrapdoorCard key={i} scale={0.5} />
                                return null
                            })}
                        </AppBaseContainer>
                    </ScrollView>
                    <AppBaseContainer flex justify="space-between">
                        <AppButton onClick={onPop}>
                            <AppText colorSwap>Pop</AppText>
                        </AppButton>
                        <AppButton color={GameTheme.background} onClick={onSave}>
                            <AppText>Save</AppText>
                        </AppButton>
                    </AppBaseContainer>
                    <AppBaseContainer>
                        <AppText order={0}>Add cards clickwise as you see on the table</AppText>
                    </AppBaseContainer>
                    <AppBaseContainer flex>
                        <AppButton secondary grow onClick={() => setCurrentInputType(CardType.FIGURE)}>
                            <AppBaseContainer disableBackground height={InputButtonHeights}>
                                <AppText>Figure</AppText>
                            </AppBaseContainer>
                        </AppButton>
                    </AppBaseContainer>
                    <AppBaseContainer flex gap={8}>
                        <AppButton grow pInline={8} pBlock={8} color={AppTheme.secondary} onClick={() => onNewCard(new ChangerCard(ChangerType.FIGURETYPE))}>
                            <AppBaseContainer grow flex justify="center" color={AppTheme.light}>
                                <GameChangerCard type={ChangerType.FIGURETYPE} scale={0.75} />
                            </AppBaseContainer>
                        </AppButton>
                        <AppButton grow pInline={8} pBlock={8} color={AppTheme.secondary} onClick={() => onNewCard(new ChangerCard(ChangerType.FIGURECOLOR))}>
                            <AppBaseContainer grow flex justify="center" color={AppTheme.light}>
                                <GameChangerCard type={ChangerType.FIGURECOLOR} scale={0.75} />
                            </AppBaseContainer>
                        </AppButton>
                        <AppButton grow pInline={8} pBlock={8} color={AppTheme.secondary} onClick={() => onNewCard(new ChangerCard(ChangerType.FIGURETEXTURE))}>
                            <AppBaseContainer grow flex justify="center" color={AppTheme.light}>
                                <GameChangerCard type={ChangerType.FIGURETEXTURE} scale={0.75} />
                            </AppBaseContainer>
                        </AppButton>
                    </AppBaseContainer>
                    <AppBaseContainer flex gap={8}>
                        <AppButton grow pInline={8} pBlock={8} color={AppTheme.secondary} onClick={() => onNewCard(new StarterCard(StarterType.BLUE))}>
                            <AppBaseContainer grow flex justify="center" color={GameTheme.starterBlue}>
                                <GameStarterCard type={StarterType.BLUE} scale={0.75} />
                            </AppBaseContainer>
                        </AppButton>
                        <AppButton grow pInline={8} pBlock={8} color={AppTheme.secondary} onClick={() => onNewCard(new StarterCard(StarterType.RED))}>
                            <AppBaseContainer grow flex justify="center" color={GameTheme.starterRed}>
                                <GameStarterCard type={StarterType.RED} scale={0.75} />
                            </AppBaseContainer>
                        </AppButton>
                        <AppButton grow pInline={8} pBlock={8} color={AppTheme.secondary} onClick={() => onNewCard(new StarterCard(StarterType.YELLOW))}>
                            <AppBaseContainer grow flex justify="center" color={GameTheme.starterYellow}>
                                <GameStarterCard type={StarterType.YELLOW} scale={0.75} />
                            </AppBaseContainer>
                        </AppButton>
                    </AppBaseContainer>
                    <AppBaseContainer flex>
                        <AppButton secondary grow onClick={() => onNewCard(new TrapdoorCard())}>
                            <AppBaseContainer disableBackground height={InputButtonHeights}>
                                <AppText>Trapdoor</AppText>
                            </AppBaseContainer>
                        </AppButton>
                    </AppBaseContainer>
                </AppDynamicContainer>
            </>
            }
            {currentInputType !== null &&
                <ConfigInput inputType={currentInputType} onCancel={() => setCurrentInputType(null)} onSave={onNewCard} />
            }
        </AppDynamicContainer>
    )
}
