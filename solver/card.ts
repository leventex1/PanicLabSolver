import { CardType, ChangerType, FigureColor, FigureTexture, FigureType, StarterType } from "./types";


export class Card {
    public constructor(private cardType: CardType) { }

    public get type(): CardType {
        return this.cardType
    }

    public get properties(): Array<number> {
        throw Error("Card.properties getter not implemented!")
    }
}


export class FigureCard extends Card {
    public constructor(
        private _figureType: FigureType,
        private _figureColor: FigureColor,
        private _figureTexture: FigureTexture
    ) {
        super(CardType.FIGURE)
    }

    public get figureType(): FigureType { return this._figureType }
    public get figureColor(): FigureColor { return this._figureColor }
    public get figureTexture(): FigureTexture { return this._figureTexture }
    public get properties(): Array<number> { return [this.figureType, this.figureColor, this.figureTexture] }
}

export class TrapdoorCard extends Card {
    public constructor() { super(CardType.TRAPDOOR) }

    public get properties(): Array<number> { return [] }
}

export class ChangerCard extends Card {
    public constructor(private _changerType: ChangerType) {
        super(CardType.CHANGER)
    }

    public get changerType(): ChangerType { return this._changerType }
    public get properties(): Array<number> { return [this.changerType] }
}

export class StarterCard extends Card {
    public constructor(private _starterType: StarterType) {
        super(CardType.STARTER)
    }

    public get starterType(): StarterType { return this._starterType }
    public get properties(): Array<number> { return [this.starterType] }
}
