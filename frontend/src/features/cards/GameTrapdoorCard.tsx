import { GameTheme } from "@/src/utils/styles"
import { GameCard } from "./GameCard"


interface GameTrapdoorCardProps {
    scale?: number
}
export const GameTrapdoorCard: React.FunctionComponent<GameTrapdoorCardProps> = ({ scale }) => {

    return (
        <GameCard source={require("../../../assets/trapdoor.png")} width={132} height={132} scale={scale} background={GameTheme.dark} />
    )
}