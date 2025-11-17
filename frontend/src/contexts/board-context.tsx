import { createContext, useContext, useState } from "react";
import { Card } from "solver/card";


interface BoardContextProps {
    cards: Array<Card>
    setCards: (cards: Array<Card>) => void
}
const BoardContext = createContext<BoardContextProps>({
    cards: [],
    setCards: () => { }
})


export const BoardContextProvider: React.FunctionComponent<{ children: React.ReactNode }> = ({ children }) => {
    const [cards, setCards] = useState<Array<Card>>([])

    return (
        <BoardContext.Provider value={{ cards, setCards }}>
            {children}
        </BoardContext.Provider>
    )
}

export const useBoardContext = () => useContext(BoardContext)
