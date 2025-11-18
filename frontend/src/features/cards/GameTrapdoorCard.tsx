import { AppTheme } from "@/src/utils/styles"
import { GameCard } from "./GameCard"


interface GameTrapdoorCardProps {
    scale?: number
    size?: { width: number, height: number }
}
export const GameTrapdoorCard: React.FunctionComponent<GameTrapdoorCardProps> = ({ scale, size }) => {

    return (
        <GameCard source={require("../../../assets/trapdoor.png")} width={100} height={120} scale={scale} background={AppTheme.light} size={size} />
    )
}