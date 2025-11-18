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
    size?: { width: number, height: number }
}
export const GameChangerCard: React.FunctionComponent<GameChangerCardProps> = ({ type, scale, size }) => {

    return (
        <GameCard source={changerImages[type]} width={100} height={120} scale={scale} background={AppTheme.light} size={size} />
    )
}