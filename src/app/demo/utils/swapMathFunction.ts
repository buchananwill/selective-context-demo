import {MemoizedFunction} from "@/app/demo/types/memoizedFunction";
import {collatzCompressed, increment, initialFunction, otherFunction} from "@/app/demo/utils/mathFunctions";

function swapMathFunction(memoizedFunction: MemoizedFunction<number, number>) {
    if (memoizedFunction === initialFunction) return otherFunction
    else return initialFunction
}

export const memoizedSwapFunction = {
    memoizedFunction: swapMathFunction
}