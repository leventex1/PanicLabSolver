import { ChangerType } from "solver/types"
import { GameCard } from "./GameCard"
import { AppTheme } from "@/src/utils/styles"


const changerImages = [
    require("../../../assets/changer-figure.png"),
    require("../../../assets/changer-color.png"),
    require("../../../assets/changer-texture.png")
]


interface GameChangerCardProps {
    type: ChangerType
    scale?: number
}
export const GameChangerCard: React.FunctionComponent<GameChangerCardProps> = ({ type, scale }) => {

    return (
        <GameCard source={changerImages[type]} width={110} height={98} scale={scale} background={AppTheme.light} />
    )
}