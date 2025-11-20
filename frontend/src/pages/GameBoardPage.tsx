import { useRef, useState } from "react"
import { useBoardContext } from "../contexts/board-context"
import { GameBoardCircle } from "../features/GameBoardCircle"
import { AppDynamicContainer } from "../ui/layouts/app-dynamic-container"
import { AppBaseContainer } from "../ui/layouts/app-base-container"
import { AppButton } from "../ui/app-button"
import { AppText } from "../ui/app-text"
import { GameReadyInput } from "../features/GameReadyInput"
import { Solution, Solver } from "solver/solver"
import { StarterDirection } from "solver/types"
import { Card, FigureCard } from "solver/card"
import { GameFigureCard } from "../features/cards/GameFigureCard"
import { GameTheme } from "../utils/styles"


export const GameBoardPage: React.FunctionComponent = () => {
    const { cards } = useBoardContext()
    const [offset, setOffset] = useState<number>(0)
    const [isReady, setIsReady] = useState<boolean>(false)
    const solver = useRef<Solver>(new Solver(cards))

    const [error, setError] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [solution, setSolution] = useState<Solution | null>(null)


    const onSubmit = async (start: Card, direction: StarterDirection, target: Card) => {
        setIsReady(false)
        setIsLoading(true)
        setError("")
        try {
            const solution = await solver.current.calculate(start, direction, target, cards.length * 16)
            setSolution(solution)
        } catch(err) {
            console.log(err)
            setError((err as Error).message)
        }
        setIsLoading(false)
    }

    return (
        <AppDynamicContainer flex vertical>
            {isReady &&
                <AppDynamicContainer vertical gap={8}>
                    <GameReadyInput 
                        cancel={() => setIsReady(false)}
                        onSubmit={onSubmit}
                    />
                </AppDynamicContainer>
            }
            {!isReady &&
            <>
                <AppDynamicContainer>
                    <GameBoardCircle cards={cards} offset={offset} selectIndex={solution?.index} />
                </AppDynamicContainer>
                <AppDynamicContainer vertical gap={16} pTop={32}>
                    <AppBaseContainer flex justify="space-between">
                        <AppButton secondary onClick={() => setOffset(prev => prev + 360 / cards.length)}>
                            <AppText>Left</AppText>
                        </AppButton>
                        <AppButton onClick={() => setIsReady(true)}>
                            <AppText colorSwap>Ready</AppText>
                        </AppButton>
                        <AppButton secondary onClick={() => setOffset(prev => prev - 360 / cards.length)}>
                            <AppText>Right</AppText>
                        </AppButton>
                    </AppBaseContainer>
                    <AppBaseContainer>
                        {isLoading && <AppText>Loading...</AppText>}
                        {error && <AppText>{error}</AppText>}
                        {!isLoading && solution !== null ? 
                        <AppBaseContainer grow flex justify="space-between">
                            <GameFigureCard 
                                type={(solution.card as FigureCard).figureType}
                                color={(solution.card as FigureCard).figureColor}
                                texture={(solution.card as FigureCard).figureTexture}
                            />
                            <AppButton secondary onClick={() => setSolution(null)}>
                                <AppText colorSwap>Ok</AppText>
                            </AppButton>
                        </AppBaseContainer> : null}
                    </AppBaseContainer>
                </AppDynamicContainer>
            </>
            }
        </AppDynamicContainer>
    )
}
