import { useEffect, useState } from "react"
import { AppButton } from "../ui/app-button"
import { AppText } from "../ui/app-text"
import { AppBaseContainer } from "../ui/layouts/app-base-container"
import { ConfigFigureInput } from "./ConfigFigureInput"
import { GameStarterInput } from "./GameStarterInput"
import { Card } from "solver/card"
import { StarterDirection } from "solver/types"


interface GameReadyInputProps {
    cancel: () => void
    onSubmit: (starterCard: Card, starterDirection: StarterDirection, target: Card) => void
}
export const GameReadyInput: React.FunctionComponent<GameReadyInputProps> = ({
    cancel,
    onSubmit
}) => {
    const [targetCard, setTargetCard] = useState<Card | null>(null)
    const [starterCard, setStarterCard] = useState<Card | null>(null)
    const [starterDirection, setStarterDirection] = useState<StarterDirection | null>(null)

    useEffect(() => {
        if (targetCard !== null && starterCard !== null && starterDirection !== null)
            onSubmit(starterCard, starterDirection, targetCard)

    }, [targetCard, starterCard, starterDirection])

    return (
        <>
            <AppBaseContainer flex vertical gap={8}>
                <ConfigFigureInput onSelection={(card) => setTargetCard(card)} />
            </AppBaseContainer>
            <GameStarterInput
                onSelection={(starterCard, direction) => {
                    setStarterCard(starterCard)
                    setStarterDirection(direction)
                }}
            />
            <AppButton secondary onClick={cancel}>
                <AppText>Back</AppText>
            </AppButton>
        </>
    )
}
