import { Card, ChangerCard, FigureCard, TrapdoorCard } from "./card"
import { CardType, ChangerType, FigureColor, FigureTexture, FigureType, StarterDirection } from "./types"


export class InputNotFoundError extends Error {
    public constructor(card: Card) {
        super(`Input card not found with type: ${card.type}, properties: ${card.properties}`)
    }
}

export class Solver {

    public constructor(private cards: Array<Card>) { }

    /*
        StarterDirection.White increments the array pointer
        StarterDirection.Black decrementes the array pointer
    */
    public calculate = async (
        starterCard: Card,
        starterDirection: StarterDirection,
        initialTargetCard: Card
    ): Promise<{ card: Card, index: number }> => {
        let targetCard = initialTargetCard
        let cardPointer = this.cards.findIndex(card => card.properties.toString() === starterCard.properties.toString())
        const direction = starterDirection === StarterDirection.WHITE ? +1 : -1

        if (cardPointer === -1)
            throw new InputNotFoundError(starterCard)

        while (!this.cards[cardPointer].isEqual(targetCard)) {
            cardPointer = (cardPointer + this.cards.length + direction) % this.cards.length

            targetCard = this.mutate(this.cards[cardPointer] as ChangerCard, targetCard as FigureCard)

            if (this.cards[cardPointer].type === CardType.TRAPDOOR) {
                cardPointer = this.findNext(cardPointer, direction, new TrapdoorCard())
                cardPointer += direction
            }
        }

        return { card: this.cards[cardPointer], index: cardPointer }
    }


    private mutate = (mutaterCard: ChangerCard, targetCard: FigureCard): Card => {
        if (targetCard.type !== CardType.FIGURE || mutaterCard.type !== CardType.CHANGER)
            return targetCard

        if (mutaterCard.changerType === ChangerType.FIGURETYPE) {
            return new FigureCard(
                targetCard.figureType === FigureType.ONEEYED ? FigureType.TOWEYED : FigureType.ONEEYED,
                targetCard.figureColor,
                targetCard.figureTexture
            )
        }

        if (mutaterCard.changerType === ChangerType.FIGURECOLOR) {
            return new FigureCard(
                targetCard.figureType,
                targetCard.figureColor === FigureColor.RED ? FigureColor.BLUE : FigureColor.RED,
                targetCard.figureTexture
            )
        }

        if (mutaterCard.changerType === ChangerType.FIGURETEXTURE) {
            return new FigureCard(
                targetCard.figureType,
                targetCard.figureColor,
                targetCard.figureTexture === FigureTexture.DOTTED ? FigureTexture.STRIPED : FigureTexture.DOTTED
            )
        }

        return targetCard
    }


    private findNext = (startPointer: number, direction: number, target: Card) => {
        let index = startPointer + direction
        while (!this.cards[index].isEqual(target))
            index += direction

        return index
    }
}
