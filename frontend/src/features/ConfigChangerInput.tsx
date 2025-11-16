import { Card } from "solver/card"
import { AppBaseContainer } from "../ui/layouts/app-base-container"
import { GameChangerCard } from "./cards/GameChangerCard"
import { ChangerType } from "solver/types"
import { AppButton } from "../ui/app-button"


interface ConfigChangerInputProps {
    onSelection: (card: Card) => void
}
export const ConfigChangerInput: React.FunctionComponent<ConfigChangerInputProps> = ({ onSelection }) => {

    return (
        <>
            <AppBaseContainer>
                <AppButton>
                    <GameChangerCard type={ChangerType.FIGURETYPE} />
                </AppButton>
            </AppBaseContainer>
        </>
    )
}
