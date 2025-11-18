import { FigureColor, FigureTexture, FigureType } from "solver/types"
import { GameCard } from "./GameCard"
import { GameTheme } from "@/src/utils/styles"


const figureImages = [
    require("../../../assets/one-red-striped.png"),
    require("../../../assets/one-red-dotted.png"),
    require("../../../assets/one-blue-striped.png"),
    require("../../../assets/one-blue-dotted.png"),
    require("../../../assets/two-red-striped.png"),
    require("../../../assets/two-red-dotted.png"),
    require("../../../assets/two-blue-striped.png"),
    require("../../../assets/two-blue-dotted.png"),
]


interface GameFigureCardProps {
    type: FigureType
    color: FigureColor
    texture: FigureTexture
    scale?: number
    size?: { width: number, height: number }
}
export const GameFigureCard: React.FunctionComponent<GameFigureCardProps> = ({ type, color, texture, scale, size }) => {
    const index = type * 4 + color * 2 + texture

    return (
        <GameCard source={figureImages[index]} width={100} height={120} scale={scale} background={GameTheme.background} size={size} />
    )
}
