import { CardType } from "solver/types"
import { AppButton } from "../ui/app-button"
import { AppText } from "../ui/app-text"
import { AppBaseContainer } from "../ui/layouts/app-base-container"
import { AppDynamicContainer } from "../ui/layouts/app-dynamic-container"
import { ConfigFigureInput } from "./ConfigFigureInput"
import { Card } from "solver/card"
import { ConfigChangerInput } from "./ConfigChangerInput"


interface ConfigInputProps {
    inputType: CardType
    onCancel: () => void
    onSave: (card: Card) => void
}
export const ConfigInput: React.FunctionComponent<ConfigInputProps> = ({ inputType, onCancel, onSave }) => {

    return (
        <AppBaseContainer flex vertical gap={8}>
            <AppButton onClick={onCancel}>
                <AppText colorSwap>Cancel</AppText>
            </AppButton>
            {inputType === CardType.FIGURE && <ConfigFigureInput onSelection={onSave} />}
            {inputType === CardType.CHANGER && <ConfigChangerInput onSelection={onSave} />}
        </AppBaseContainer>
    )
}
