import { Card, ChangerCard, FigureCard, StarterCard, TrapdoorCard } from "solver/card"
import { CardType } from "solver/types"
import { Storage } from "./storage"


export interface CardConfig {
    cardType: CardType
    cardProperties: Array<number>
}


export interface DeckConfig {
    date: Date
    deck: Array<CardConfig>
}


export const createConfig = (cards: Array<Card>): DeckConfig => {
    const date = new Date()

    const cardConfigs: Array<CardConfig> = cards.map(card => ({
        cardType: card.type,
        cardProperties: card.properties
    }))

    return {
        date,
        deck: cardConfigs
    }
}

export const createDeck = (config: DeckConfig): Array<Card> => {
    const cards = config.deck.map(cardConfig => {
        if (cardConfig.cardType === CardType.FIGURE)
            return new FigureCard(cardConfig.cardProperties[0], cardConfig.cardProperties[1], cardConfig.cardProperties[2])
        if (cardConfig.cardType === CardType.CHANGER)
            return new ChangerCard(cardConfig.cardProperties[0])
        if (cardConfig.cardType === CardType.STARTER)
            return new StarterCard(cardConfig.cardProperties[0])
        if (cardConfig.cardType === CardType.TRAPDOOR)
            return new TrapdoorCard()

        throw Error(`Unknown card type from config: ${cardConfig.cardType}, properties: ${cardConfig.cardProperties}`)
    })

    return cards
}


export const getConfigs = (): Array<DeckConfig> => {
    try {
        const resource = Storage.getInstance().createResource("configs")
        const resourceObject: Array<DeckConfig> = resource.read()
        return resourceObject
    } catch (error) {
        console.error(error)
    }

    return []
}


export const saveConfig = (config: DeckConfig) => {
    try {
        const resource = Storage.getInstance().createResource("configs")
        const resourceObject: Array<DeckConfig> = resource.read()
        resourceObject.push(config)
        resource.write(resourceObject)
    } catch (error) {
        console.error(error)
    }
}
