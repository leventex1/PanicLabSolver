import { View } from "react-native"
import { AppDynamicContainer } from "../ui/layouts/app-dynamic-container"
import { Card } from "solver/card"
import { useEffect, useRef, useState } from "react"


interface GameBoardCircleProps {
    cards: Array<Card>
}
export const GameBoardCircle: React.FunctionComponent<GameBoardCircleProps> = ({ cards }) => {
    const containerRef = useRef<View>(null)
    const [width, setWidth] = useState<number>(0)
    const [height, setHeight] = useState<number>(0)

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.measure((x, y, w, h) => {
                setWidth(w)
                setHeight(h)
            })
        }
    }, [])

    return (
        <AppDynamicContainer ref={containerRef}>
            {width && height && cards.map((card, i) => {
                
                return (
                    <View
                        key={i}
                        style={{
                            position: "absolute",
                            width: 60,
                            height: 80,
                            backgroundColor: "red",
                            transform: `translate(${width / 2 - 30}px, ${height / 2 - 40}px) rotate(${Math.floor(i / cards.length * 360)}deg)`
                        }}
                    >
                    </View>
                )
            })}
        </AppDynamicContainer>
    )
}
