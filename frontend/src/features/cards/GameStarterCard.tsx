import { StarterType } from "solver/types"
import { GameCard } from "./GameCard"
import { GameTheme } from "@/src/utils/styles"


interface GameChangerCardProps {
    type: StarterType
    scale?: number
    size?: { width: number, height: number }
}
export const GameStarterCard: React.FunctionComponent<GameChangerCardProps> = ({ type, scale, size }) => {
    const color = type === StarterType.BLUE ? GameTheme.starterBlue : type === StarterType.RED ? GameTheme.starterRed : GameTheme.starterYellow

    return (
        <GameCard source={require("../../../assets/starter.png")} width={100} height={120} scale={scale} background={color} size={size} />
    )
}