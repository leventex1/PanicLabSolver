import { useBoardContext } from "../contexts/board-context"
import { GameBoardCircle } from "../features/GameBoardCircle"
import { AppDynamicContainer } from "../ui/layouts/app-dynamic-container"


export const GameBoardPage: React.FunctionComponent = () => {
    const { cards } = useBoardContext()

    return (
        <AppDynamicContainer flex vertical>
            <AppDynamicContainer>
                <GameBoardCircle cards={cards} />
            </AppDynamicContainer>
            <AppDynamicContainer></AppDynamicContainer>
        </AppDynamicContainer>
    )
}
