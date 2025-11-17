import { useState } from "react"


export const useAsync = <Args extends any[], T>(asyncCallback: (...args: Args) => Promise<T>) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [result, setResult] = useState<T | null>(null)

    const trigger = async (...args: Args): Promise<T> => {
        setIsLoading(true)
        const result = await asyncCallback(...args)
        setResult(result)
        setIsLoading(false)
        return result
    }

    return { trigger, result, isLoading }
}
