import {useEffect, useRef} from "react";

export function useRenderCounter() {
    let mutableRefObject = useRef(0);

    useEffect(() => {
        mutableRefObject.current++
    })

    return mutableRefObject.current
}