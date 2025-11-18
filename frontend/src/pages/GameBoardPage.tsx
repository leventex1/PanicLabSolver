import { useRef, useState } from "react"
import { useBoardContext } from "../contexts/board-context"
import { GameBoardCircle } from "../features/GameBoardCircle"
import { AppDynamicContainer } from "../ui/layouts/app-dynamic-container"
import { AppBaseContainer } from "../ui/layouts/app-base-container"
import { AppButton } from "../ui/app-button"
import { AppText } from "../ui/app-text"
import { GameReadyInput } from "../features/GameReadyInput"
import { Solver } from "solver/solver"


export const GameBoardPage: React.FunctionComponent = () => {
    const { cards } = useBoardContext()
    const [offset, setOffset] = useState<number>(0)
    const [isReady, setIsReady] = useState<boolean>(false)
    const solver = useRef<Solver>(new Solver(cards))

    return (
        <AppDynamicContainer flex vertical>
            {isReady &&
                <AppDynamicContainer vertical gap={8}>
                    <GameReadyInput 
                        cancel={() => setIsReady(false)}
                        onSubmit={(start, direction, target) => {
                            solver.current.calculate(start, direction, target).then(solution => console.log(solution))
                        }}
                    />
                </AppDynamicContainer>
            }
            {!isReady &&
            <>
                <AppDynamicContainer>
                    <GameBoardCircle cards={cards} offset={offset} />
                </AppDynamicContainer>
                <AppDynamicContainer pTop={32}>
                    <AppBaseContainer grow flex justify="space-between">
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
                </AppDynamicContainer>
            </>
            }
        </AppDynamicContainer>
    )
}
