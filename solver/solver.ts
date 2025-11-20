import { Card, ChangerCard, FigureCard, TrapdoorCard } from "./card"
import { CardType, ChangerType, FigureColor, FigureTexture, FigureType, StarterDirection } from "./types"


export class InputNotFoundError extends Error {
    public constructor(card: Card) {
        super(`Input card not found with type: ${card.type}, properties: ${card.properties}`)
    }
}

export class IterationTimeoutError extends Error {
    public constructor(maxSteps: number) {
        super(`Iteration timeout error, max steps reached: ${maxSteps}`)
    }
}

export interface Solution {
    card: Card,
    index: number    
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
        initialTargetCard: Card,
        maxSteps: number
    ): Promise<Solution> => {
        let counter = 0;
        let targetCard = initialTargetCard
        let cardPointer = this.cards.findIndex(card => card.isEqual(starterCard))
        const direction = starterDirection === StarterDirection.WHITE ? +1 : -1

        if (cardPointer === -1)
            throw new InputNotFoundError(starterCard)

        while (!this.cards[cardPointer].isEqual(targetCard)) {
            cardPointer = this.movePointer(cardPointer, direction)

            targetCard = this.mutate(this.cards[cardPointer] as ChangerCard, targetCard as FigureCard)

            if (this.cards[cardPointer].type === CardType.TRAPDOOR) {
                cardPointer = this.findNext(cardPointer, direction, new TrapdoorCard())
                cardPointer = this.movePointer(cardPointer, direction)
            }

            counter += 1
            if (counter > maxSteps)
                throw new IterationTimeoutError(maxSteps)
        }

        return { card: this.cards[cardPointer], index: cardPointer }
    }


    private movePointer = (pointer: number, direction: number) => {
        return (pointer + this.cards.length + direction) % this.cards.length
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
        let index = this.movePointer(startPointer, direction)
        while (!this.cards[index].isEqual(target))
            index = this.movePointer(index, direction)

        return index
    }
}
